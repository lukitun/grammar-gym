(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);

  const views = { topic: $("topicView"), quiz: $("quizView"), result: $("resultView") };
  function show(name) {
    Object.entries(views).forEach(([k, el]) => (el.hidden = k !== name));
  }

  // ---- State ----
  let topic = null;
  let order = [];
  let idx = 0;
  let score = 0;
  let answered = false;

  // ---- Topic grid ----
  function renderTopics() {
    const grid = $("topicGrid");
    grid.innerHTML = "";
    window.TOPICS.forEach((t) => {
      const card = document.createElement("button");
      card.className = "topic-card";
      card.innerHTML =
        `<span class="t-title">${t.title}</span>` +
        `<span class="t-blurb">${t.blurb}</span>` +
        `<span class="t-count">${t.questions.length} questions</span>`;
      card.addEventListener("click", () => startTopic(t));
      grid.appendChild(card);
    });
  }

  // ---- Quiz flow ----
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startTopic(t) {
    topic = t;
    order = shuffle(t.questions);
    idx = 0;
    score = 0;
    $("quizTitle").textContent = t.title;
    show("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    answered = false;
    const q = order[idx];
    $("progress").textContent = `${idx + 1} / ${order.length}`;
    $("explain").hidden = true;
    $("explain").className = "explain";
    $("checkBtn").hidden = false;
    $("checkBtn").disabled = false;
    $("nextBtn").hidden = true;

    const card = $("questionCard");
    card.innerHTML = `<p class="prompt">${q.q}</p>`;

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

  function norm(s) {
    return s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.!?]+$/, "");
  }

  function onCheck() {
    if (answered) return;
    const q = order[idx];
    let userAns = null;
    let correct = false;

    if (q.type === "mc") {
      const sel = $("questionCard").querySelector(".option.selected");
      if (!sel) return; // force a choice
      userAns = sel.textContent;
      correct = norm(userAns) === norm(q.answer);
      $("questionCard").querySelectorAll(".option").forEach((o) => {
        o.disabled = true;
        if (norm(o.textContent) === norm(q.answer)) o.classList.add("correct");
        else if (o.classList.contains("selected")) o.classList.add("wrong");
      });
    } else {
      const input = $("fillInput");
      userAns = input.value;
      if (!userAns.trim()) return;
      const accepts = Array.isArray(q.answer) ? q.answer : [q.answer];
      correct = accepts.some((a) => norm(a) === norm(userAns));
      input.disabled = true;
      input.classList.add(correct ? "correct" : "wrong");
    }

    answered = true;
    if (correct) score++;

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
    if (idx >= order.length) return finish();
    renderQuestion();
  }

  function finish() {
    show("result");
    const pct = Math.round((score / order.length) * 100);
    let line = pct === 100 ? "Perfect. 💪" : pct >= 70 ? "Solid." : "Keep drilling.";
    $("scoreText").textContent = `${score} / ${order.length} correct (${pct}%). ${line}`;
  }

  // ---- Wire up ----
  $("checkBtn").addEventListener("click", onCheck);
  $("nextBtn").addEventListener("click", onNext);
  $("backBtn").addEventListener("click", () => show("topic"));
  $("homeBtn").addEventListener("click", () => show("topic"));
  $("homeLink").addEventListener("click", (e) => { e.preventDefault(); show("topic"); });
  $("retryBtn").addEventListener("click", () => startTopic(topic));

  renderTopics();
  show("topic");
})();
