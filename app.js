(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);

  const views = {
    home: $("homeView"), quiz: $("quizView"), builder: $("builderView"),
    listen: $("listenView"), result: $("resultView")
  };
  function show(name) {
    Object.entries(views).forEach(([k, el]) => (el.hidden = k !== name));
    window.scrollTo(0, 0);
  }

  // ---- Curriculum order ----
  const LEVELS = [
    {
      title: "Level 1 · Foundations",
      sub: "Word-level building blocks",
      ids: ["articles", "pronouns", "subject-verb-agreement", "questions",
            "prepositions", "countable-uncountable", "quantifiers", "comparatives"]
    },
    {
      title: "Level 2 · Core grammar",
      sub: "Tenses and verb patterns",
      ids: ["tenses", "present-perfect", "used-to", "modals",
            "gerunds-infinitives", "adverbs-word-order", "phrasal-verbs"]
    },
    {
      title: "Level 3 · Advanced",
      sub: "Complex structures",
      ids: ["passive", "conditionals", "relative-clauses", "reported", "confusing-words"]
    }
  ];
  const topicById = {};
  window.TOPICS.forEach((t) => (topicById[t.id] = t));

  // ---- Stats (localStorage) ----
  const KEY = "gg-stats";
  let stats = {};
  try { stats = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { stats = {}; }
  function saveStats() { try { localStorage.setItem(KEY, JSON.stringify(stats)); } catch (e) {} }
  function isMastered(t) {
    const s = stats[t.id];
    return !!s && s.best / s.total >= 0.9;
  }
  function updateMastery() {
    $("masteryCount").textContent = window.TOPICS.filter(isMastered).length;
  }

  // ---- Speech (English, picked at call time — voices load async) ----
  function enVoice() {
    const vs = window.speechSynthesis ? speechSynthesis.getVoices() : [];
    const en = vs.filter((v) => /^en[-_]?/i.test(v.lang));
    return (
      en.find((v) => /en[-_]US/i.test(v.lang) && /google/i.test(v.name)) ||
      en.find((v) => /en[-_](US|GB)/i.test(v.lang)) ||
      en[0] || null
    );
  }
  if (window.speechSynthesis) speechSynthesis.getVoices(); // warm the voice list
  function speak(text, rate) {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; // always English, even if no named voice matched
    const v = enVoice();
    if (v) u.voice = v;
    u.rate = rate || 0.95;
    speechSynthesis.speak(u);
  }

  // ---- Helpers ----
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function norm(s) {
    return s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.!?]+$/, "");
  }

  // ---- Home ----
  function renderHome() {
    $("builderCount").textContent = `${window.BUILD_SENTENCES.length} sentences`;
    $("listenCount").textContent = `${window.VOCAB.length} words`;
    const wrap = $("levels");
    wrap.innerHTML = "";
    let num = 0;
    LEVELS.forEach((level) => {
      const head = document.createElement("div");
      head.className = "level-head";
      head.innerHTML = `<h2 class="level-title">${level.title}</h2><span class="level-sub">${level.sub}</span>`;
      wrap.appendChild(head);
      const grid = document.createElement("div");
      grid.className = "topic-grid";
      level.ids.forEach((id) => {
        const t = topicById[id];
        if (!t) return;
        num++;
        const s = stats[t.id];
        const pct = s ? Math.round((s.best / s.total) * 100) : 0;
        const card = document.createElement("button");
        card.className = "topic-card" + (isMastered(t) ? " mastered" : "");
        card.innerHTML =
          `<span class="t-num">${String(num).padStart(2, "0")}</span>` +
          `<span class="t-title">${t.title}</span>` +
          `<span class="t-blurb">${t.blurb}</span>` +
          `<div class="t-meta"><span class="t-count">${t.questions.length} reps</span>` +
          `<span class="t-best${isMastered(t) ? " done" : ""}">${s ? (isMastered(t) ? "✓ mastered" : `best ${pct}%`) : "not started"}</span></div>` +
          `<div class="t-bar"><span style="width:${pct}%"></span></div>`;
        card.addEventListener("click", () => startTopic(t));
        grid.appendChild(card);
      });
      wrap.appendChild(grid);
    });
    updateMastery();
    show("home");
  }

  // ---- Quiz engine (topic / workout / mistakes) ----
  const WORKOUT_SIZE = 15;
  let quiz = null; // { title, questions:[{...q, topicTitle?}], mode:'topic'|'workout'|'mistakes', topic? }
  let idx = 0, score = 0, answered = false, wrongs = [];

  function startTopic(t) {
    quiz = { title: t.title, questions: shuffle(t.questions), mode: "topic", topic: t };
    beginQuiz();
  }
  function startWorkout() {
    const pool = [];
    window.TOPICS.forEach((t) =>
      t.questions.forEach((q) => pool.push(Object.assign({ topicTitle: t.title }, q)))
    );
    quiz = { title: "Quick workout", questions: shuffle(pool).slice(0, WORKOUT_SIZE), mode: "workout" };
    beginQuiz();
  }
  function startMistakes() {
    quiz = { title: "Your mistakes", questions: shuffle(wrongs), mode: "mistakes" };
    beginQuiz();
  }
  function beginQuiz() {
    idx = 0; score = 0; wrongs = [];
    $("quizTitle").textContent = quiz.title;
    show("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    answered = false;
    const q = quiz.questions[idx];
    $("progress").textContent = `${idx + 1} / ${quiz.questions.length}`;
    $("explain").hidden = true;
    $("checkBtn").hidden = false;
    $("nextBtn").hidden = true;

    const card = $("questionCard");
    card.innerHTML =
      (q.topicTitle ? `<span class="tag">${q.topicTitle}</span>` : "") +
      `<p class="prompt">${q.q}</p>`;

    if (q.type === "mc") {
      const opts = document.createElement("div");
      opts.className = "options";
      shuffle(q.options).forEach((opt) => {
        const b = document.createElement("button");
        b.className = "option";
        b.textContent = opt;
        b.addEventListener("click", () => {
          if (answered) return;
          opts.querySelectorAll(".option").forEach((o) => o.classList.remove("selected"));
          b.classList.add("selected");
        });
        opts.appendChild(b);
      });
      card.appendChild(opts);
    } else {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "fill-input";
      input.id = "fillInput";
      input.autocomplete = "off";
      input.spellcheck = false;
      input.placeholder = "Type your answer…";
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); onCheck(); }
      });
      card.appendChild(input);
      setTimeout(() => input.focus(), 30);
    }
  }

  function onCheck() {
    if (answered) return;
    const q = quiz.questions[idx];
    let correct = false;
    let chosen = "";

    if (q.type === "mc") {
      const sel = $("questionCard").querySelector(".option.selected");
      if (!sel) return;
      chosen = sel.textContent;
      correct = norm(chosen) === norm(q.answer);
      $("questionCard").querySelectorAll(".option").forEach((o) => {
        o.disabled = true;
        if (norm(o.textContent) === norm(q.answer)) o.classList.add("correct");
        else if (o.classList.contains("selected")) o.classList.add("wrong");
      });
    } else {
      const input = $("fillInput");
      if (!input.value.trim()) return;
      chosen = input.value;
      const accepts = Array.isArray(q.answer) ? q.answer : [q.answer];
      correct = accepts.some((a) => norm(a) === norm(chosen));
      input.disabled = true;
      input.classList.add(correct ? "correct" : "wrong");
    }

    answered = true;
    if (correct) score++;
    else wrongs.push(Object.assign({ chosen }, q));

    const ex = $("explain");
    const shown = Array.isArray(q.answer) ? q.answer[0] : q.answer;
    ex.innerHTML = correct
      ? `<strong class="ok">Correct.</strong> ${q.why}`
      : `<strong class="no">Not quite.</strong> Answer: <em>${shown}</em>. ${q.why}`;
    ex.hidden = false;

    $("checkBtn").hidden = true;
    $("nextBtn").hidden = false;
    $("nextBtn").focus();
  }

  function onNext() {
    idx++;
    if (idx >= quiz.questions.length) return finishQuiz();
    renderQuestion();
  }

  function finishQuiz() {
    const total = quiz.questions.length;
    const pct = Math.round((score / total) * 100);

    // Save best score for full topic runs
    if (quiz.mode === "topic") {
      const t = quiz.topic;
      const s = stats[t.id] || { best: 0, total: t.questions.length, runs: 0 };
      s.total = t.questions.length;
      s.runs++;
      if (score > s.best) s.best = score;
      stats[t.id] = s;
      saveStats();
    }

    $("resultTitle").textContent = pct === 100 ? "Perfect." : "Done.";
    const line = pct === 100 ? "💪" : pct >= 70 ? "Solid." : "Keep drilling.";
    $("scoreText").textContent = `${score} / ${total} correct (${pct}%). ${line}`;

    const mb = $("mistakesBtn");
    mb.hidden = wrongs.length === 0;
    mb.textContent = `Drill my ${wrongs.length} mistake${wrongs.length === 1 ? "" : "s"}`;

    const rb = $("retryBtn");
    rb.textContent = quiz.mode === "workout" ? "New workout" : "Go again";
    $("aiBtn").hidden = wrongs.length === 0;
    $("aiOut").hidden = true;
    show("result");
  }

  // ---- AI coach (server-side proxy keeps the API key private) ----
  async function askCoach() {
    const btn = $("aiBtn");
    const out = $("aiOut");
    btn.disabled = true;
    btn.textContent = "Thinking…";
    out.hidden = true;
    try {
      const payload = wrongs.slice(0, 10).map((w) => ({
        q: w.q,
        correct: Array.isArray(w.answer) ? w.answer[0] : w.answer,
        chosen: w.chosen || ""
      }));
      const r = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mistakes: payload })
      });
      const data = await r.json();
      if (!r.ok || !data.text) throw new Error(data.error || "no text");
      out.textContent = data.text;
      out.hidden = false;
      btn.hidden = true;
    } catch (e) {
      out.textContent = "The AI coach is not available right now. Your mistakes are still listed above — try the drill button.";
      out.hidden = false;
    } finally {
      btn.disabled = false;
      btn.textContent = "🤖 AI coach — explain my mistakes";
    }
  }
  $("aiBtn").addEventListener("click", askCoach);

  // ---- Sentence Builder ----
  const BUILDER_ROUNDS = 10;
  let bItems = [], bIdx = 0, bPos = 0, bWords = [], bDone = false, bScore = 0, bRevealed = false;
  function startBuilder() {
    bItems = shuffle(window.BUILD_SENTENCES).slice(0, BUILDER_ROUNDS);
    bIdx = 0; bScore = 0;
    show("builder");
    renderBuilderRound();
  }
  function renderBuilderRound() {
    bDone = false; bRevealed = false; bPos = 0;
    const item = bItems[bIdx];
    bWords = item.s.split(" ");
    $("bProgress").textContent = `${bIdx + 1} / ${bItems.length}`;
    $("bTag").textContent = item.tag;
    $("bReveal").hidden = false;
    $("bNext").hidden = true;
    $("bSlots").innerHTML = "";
    const tiles = $("bTiles");
    tiles.innerHTML = "";
    shuffle(bWords).forEach((w) => {
      const b = document.createElement("button");
      b.className = "tile";
      b.textContent = w;
      b.addEventListener("click", () => onBuilderTile(b, w));
      tiles.appendChild(b);
    });
  }
  function placeWord(w, revealed) {
    const span = document.createElement("span");
    span.className = "slot-word" + (revealed ? " revealed" : "");
    span.textContent = w;
    $("bSlots").appendChild(span);
  }
  function onBuilderTile(tileEl, w) {
    if (bDone || tileEl.classList.contains("used")) return;
    if (w === bWords[bPos]) {
      tileEl.classList.add("used");
      placeWord(w, false);
      bPos++;
      if (bPos === bWords.length) builderRoundDone(false);
    } else {
      tileEl.classList.add("shake");
      setTimeout(() => tileEl.classList.remove("shake"), 380);
    }
  }
  function builderRoundDone(revealed) {
    bDone = true;
    if (!revealed) bScore++;
    speak(bItems[bIdx].s);
    $("bReveal").hidden = true;
    $("bNext").hidden = false;
    $("bNext").focus();
  }
  $("bReveal").addEventListener("click", () => {
    if (bDone) return;
    bRevealed = true;
    $("bSlots").innerHTML = "";
    bWords.forEach((w) => placeWord(w, true));
    [...$("bTiles").children].forEach((t) => t.classList.add("used"));
    builderRoundDone(true);
  });
  $("bNext").addEventListener("click", () => {
    bIdx++;
    if (bIdx >= bItems.length) {
      $("resultTitle").textContent = "Builder done.";
      $("scoreText").textContent = `${bScore} / ${bItems.length} built without help.`;
      $("mistakesBtn").hidden = true;
      $("retryBtn").textContent = "New set";
      quiz = { mode: "builder" };
      show("result");
      return;
    }
    renderBuilderRound();
  });

  // ---- Listening Drill ----
  const LISTEN_ROUNDS = 10;
  let lWords = [], lIdx = 0, lAnswered = false, lScore = 0;
  function startListen() {
    lWords = shuffle(window.VOCAB).slice(0, LISTEN_ROUNDS);
    lIdx = 0; lScore = 0;
    show("listen");
    renderListenRound();
  }
  function renderListenRound() {
    lAnswered = false;
    $("lProgress").textContent = `${lIdx + 1} / ${lWords.length}`;
    $("lReveal").hidden = true;
    $("lCheck").hidden = false;
    $("lNext").hidden = true;
    const input = $("lInput");
    input.value = "";
    input.disabled = false;
    input.className = "fill-input";
    setTimeout(() => { input.focus(); speak(lWords[lIdx].w, 0.85); }, 250);
  }
  function onListenCheck() {
    if (lAnswered) return;
    const input = $("lInput");
    if (!input.value.trim()) return;
    const w = lWords[lIdx];
    const correct = norm(input.value) === norm(w.w);
    lAnswered = true;
    if (correct) lScore++;
    input.disabled = true;
    input.classList.add(correct ? "correct" : "wrong");
    const r = $("lReveal");
    r.innerHTML = correct
      ? `<strong class="ok">Correct.</strong> ${w.e} <em>${w.w}</em>`
      : `<strong class="no">Not quite.</strong> The word was ${w.e} <em>${w.w}</em>.`;
    r.hidden = false;
    $("lCheck").hidden = true;
    $("lNext").hidden = false;
    $("lNext").focus();
  }
  $("lPlay").addEventListener("click", () => speak(lWords[lIdx].w, 0.85));
  $("lCheck").addEventListener("click", onListenCheck);
  $("lInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); lAnswered ? onListenNext() : onListenCheck(); }
  });
  function onListenNext() {
    lIdx++;
    if (lIdx >= lWords.length) {
      $("resultTitle").textContent = "Drill done.";
      $("scoreText").textContent = `${lScore} / ${lWords.length} words correct.`;
      $("mistakesBtn").hidden = true;
      $("retryBtn").textContent = "New set";
      quiz = { mode: "listen" };
      show("result");
      return;
    }
    renderListenRound();
  }
  $("lNext").addEventListener("click", onListenNext);

  // ---- Result actions ----
  $("retryBtn").addEventListener("click", () => {
    if (quiz.mode === "topic") return startTopic(quiz.topic);
    if (quiz.mode === "workout") return startWorkout();
    if (quiz.mode === "builder") return startBuilder();
    if (quiz.mode === "listen") return startListen();
    if (quiz.mode === "mistakes") return startMistakes();
    renderHome();
  });
  $("mistakesBtn").addEventListener("click", startMistakes);

  // ---- Wire up ----
  $("checkBtn").addEventListener("click", onCheck);
  $("nextBtn").addEventListener("click", onNext);
  $("backBtn").addEventListener("click", renderHome);
  $("backBuilder").addEventListener("click", renderHome);
  $("backListen").addEventListener("click", renderHome);
  $("homeBtn").addEventListener("click", renderHome);
  $("homeLink").addEventListener("click", (e) => { e.preventDefault(); renderHome(); });
  $("workoutBtn").addEventListener("click", startWorkout);
  $("builderCard").addEventListener("click", startBuilder);
  $("listenCard").addEventListener("click", startListen);

  renderHome();
})();
