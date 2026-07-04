(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);

  const views = {
    home: $("homeView"), theme: $("themeView"), learn: $("learnView"),
    find: $("findView"), spell: $("spellView"),
    lesson: $("lessonView"), pick: $("pickView"), build: $("buildView"),
    cheer: $("cheerView")
  };
  function show(name) {
    Object.entries(views).forEach(([k, el]) => (el.hidden = k !== name));
    window.scrollTo(0, 0);
  }

  // ---- Progress (localStorage) ----
  const KEY = "wordparrot-progress";
  let progress = {};
  try { progress = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { progress = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch (e) {} }
  function gamesFor(t) {
    return t.words ? ["learn", "find", "spell"] : ["learn", "pick", "build"];
  }
  function themeStars(t) {
    const p = progress[t.id] || {};
    return gamesFor(t).filter((g) => p[g]).length;
  }
  function totalStars() {
    return window.THEMES.concat(window.GRAMMAR).reduce((n, t) => n + themeStars(t), 0);
  }
  function award(themeId, game) {
    progress[themeId] = progress[themeId] || {};
    const isNew = !progress[themeId][game];
    progress[themeId][game] = true;
    save();
    updateStarBank();
    return isNew;
  }
  function updateStarBank() { $("starCount").textContent = totalStars(); }

  // ---- Speech ----
  let voice = null;
  function pickVoice() {
    const vs = window.speechSynthesis ? speechSynthesis.getVoices() : [];
    voice =
      vs.find((v) => v.lang === "en-US" && /female|samantha|zira|aria/i.test(v.name)) ||
      vs.find((v) => v.lang === "en-US") ||
      vs.find((v) => v.lang && v.lang.startsWith("en")) || null;
  }
  if (window.speechSynthesis) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }
  function speak(text) {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.lang = (voice && voice.lang) || "en-US";
    u.rate = 0.85;
    u.pitch = 1.15;
    const parrot = $("parrot");
    u.onstart = () => parrot.classList.add("talking");
    u.onend = () => parrot.classList.remove("talking");
    u.onerror = () => parrot.classList.remove("talking");
    speechSynthesis.speak(u);
  }

  // ---- Sound effects (WebAudio, no files) ----
  let actx = null;
  function beep(freqs, dur) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
      freqs.forEach((f, i) => {
        const o = actx.createOscillator();
        const g = actx.createGain();
        o.type = "sine";
        o.frequency.value = f;
        const t = actx.currentTime + i * dur;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g).connect(actx.destination);
        o.start(t);
        o.stop(t + dur + 0.05);
      });
    } catch (e) {}
  }
  const sfxYay = () => beep([523, 659, 784], 0.12);
  const sfxNope = () => beep([220, 180], 0.15);
  const sfxTap = () => beep([440], 0.08);

  // ---- Confetti ----
  const canvas = $("confetti");
  const cctx = canvas.getContext("2d");
  let pieces = [];
  let confettiRunning = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function confetti() {
    if (reducedMotion) return;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const colors = ["#ffc93c", "#ff5d73", "#4cc98a", "#3da5ff", "#b266e8"];
    for (let i = 0; i < 120; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.4,
        r: 5 + Math.random() * 6,
        c: colors[(Math.random() * colors.length) | 0],
        vy: 2 + Math.random() * 3,
        vx: -1.5 + Math.random() * 3,
        rot: Math.random() * Math.PI,
        vr: -0.1 + Math.random() * 0.2
      });
    }
    if (!confettiRunning) { confettiRunning = true; tick(); }
  }
  function tick() {
    cctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      cctx.save();
      cctx.translate(p.x, p.y);
      cctx.rotate(p.rot);
      cctx.fillStyle = p.c;
      cctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
      cctx.restore();
    });
    pieces = pieces.filter((p) => p.y < canvas.height + 30);
    if (pieces.length) requestAnimationFrame(tick);
    else { confettiRunning = false; cctx.clearRect(0, 0, canvas.width, canvas.height); }
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
  function renderDots(el, total, current, doneCount) {
    el.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const d = document.createElement("span");
      d.className = "dot" + (i < doneCount ? " done" : "") + (i === current ? " now" : "");
      el.appendChild(d);
    }
  }

  // ---- Home ----
  function themeCard(t, badge) {
    const stars = themeStars(t);
    const card = document.createElement("button");
    card.className = "theme-card";
    card.style.setProperty("--c", t.color);
    card.innerHTML =
      (badge ? `<span class="lvl">${badge}</span>` : "") +
      `<span class="th-emoji">${t.emoji}</span>` +
      `<span class="th-title">${t.title}</span>` +
      `<span class="th-stars">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</span>`;
    card.addEventListener("click", () => openTheme(t));
    return card;
  }
  function renderHome() {
    const grid = $("themeGrid");
    grid.innerHTML = "";
    window.THEMES.forEach((t) => grid.appendChild(themeCard(t)));
    const ggrid = $("grammarGrid");
    ggrid.innerHTML = "";
    window.GRAMMAR.forEach((t, i) => ggrid.appendChild(themeCard(t, i + 1)));
    updateStarBank();
    show("home");
  }

  // ---- Theme ----
  let theme = null;
  function openTheme(t) {
    theme = t;
    const grammar = !t.words;
    $("themeEmoji").textContent = t.emoji;
    $("themeTitle").textContent = t.title;
    $("themeTip").textContent = grammar ? t.tip : `${t.words.length} words`;
    $("gFind").querySelector(".g-ico").textContent = grammar ? "✅" : "👆";
    $("gFind").querySelector(".g-name").textContent = grammar ? "Pick it" : "Find it";
    $("gSpell").querySelector(".g-ico").textContent = grammar ? "🧱" : "🔤";
    $("gSpell").querySelector(".g-name").textContent = grammar ? "Build it" : "Spell it";
    const p = progress[t.id] || {};
    const games = gamesFor(t);
    $("sLearn").textContent = p[games[0]] ? "⭐" : "☆";
    $("sFind").textContent = p[games[1]] ? "⭐" : "☆";
    $("sSpell").textContent = p[games[2]] ? "⭐" : "☆";
    show("theme");
  }

  // ================= LEARN =================
  let learnCards = [], learnIdx = 0;
  function startLearn() {
    learnCards = shuffle(theme.words);
    learnIdx = 0;
    show("learn");
    renderLearn();
  }
  function renderLearn() {
    const w = learnCards[learnIdx];
    renderDots($("learnDots"), learnCards.length, learnIdx, learnIdx);
    $("fcEmoji").textContent = w.e;
    $("fcWord").textContent = w.w;
    $("learnNext").textContent = learnIdx === learnCards.length - 1 ? "Done! ⭐" : "Next ➜";
    const fc = $("flashcard");
    fc.classList.remove("pop");
    void fc.offsetWidth;
    fc.classList.add("pop");
    speak(w.w);
  }
  $("flashcard").addEventListener("click", () => {
    const fc = $("flashcard");
    fc.classList.remove("pop");
    void fc.offsetWidth;
    fc.classList.add("pop");
    speak(learnCards[learnIdx].w);
  });
  $("learnNext").addEventListener("click", () => {
    sfxTap();
    learnIdx++;
    if (learnIdx >= learnCards.length) return finishGame("learn");
    renderLearn();
  });

  // ================= FIND IT =================
  const FIND_ROUNDS = 8;
  let findWords = [], findIdx = 0, findLocked = false;
  function startFind() {
    findWords = shuffle(theme.words).slice(0, Math.min(FIND_ROUNDS, theme.words.length));
    findIdx = 0;
    show("find");
    renderFind();
  }
  function renderFind() {
    findLocked = false;
    const target = findWords[findIdx];
    renderDots($("findDots"), findWords.length, findIdx, findIdx);
    $("findWord").textContent = target.w;
    const others = shuffle(theme.words.filter((w) => w.w !== target.w)).slice(0, 3);
    const opts = shuffle([target, ...others]);
    const grid = $("pickGrid");
    grid.innerHTML = "";
    opts.forEach((o) => {
      const b = document.createElement("button");
      b.className = "pick";
      b.textContent = o.e;
      b.setAttribute("aria-label", "picture choice");
      b.addEventListener("click", () => {
        if (findLocked) return;
        if (o.w === target.w) {
          findLocked = true;
          b.classList.add("yay");
          sfxYay();
          speak(target.w);
          setTimeout(() => {
            findIdx++;
            if (findIdx >= findWords.length) return finishGame("find");
            renderFind();
          }, 900);
        } else {
          b.classList.add("nope");
          sfxNope();
          setTimeout(() => b.classList.remove("nope"), 450);
        }
      });
      grid.appendChild(b);
    });
    speak(target.w);
  }
  $("findSpeak").addEventListener("click", () => speak(findWords[findIdx].w));

  // ================= SPELL IT =================
  const SPELL_ROUNDS = 6;
  let spellWords = [], spellIdx = 0, spellPos = 0, spellLocked = false;
  function startSpell() {
    const easy = theme.words.filter((w) => w.w.length <= 6);
    spellWords = shuffle(easy.length >= 4 ? easy : theme.words).slice(0, SPELL_ROUNDS);
    spellIdx = 0;
    show("spell");
    renderSpell();
  }
  function renderSpell() {
    spellLocked = false;
    spellPos = 0;
    const target = spellWords[spellIdx];
    renderDots($("spellDots"), spellWords.length, spellIdx, spellIdx);
    $("spellPic").textContent = target.e;
    const slots = $("slots");
    slots.innerHTML = "";
    target.w.split("").forEach(() => {
      const s = document.createElement("span");
      s.className = "slot";
      slots.appendChild(s);
    });
    const tiles = $("tiles");
    tiles.innerHTML = "";
    shuffle(target.w.split("")).forEach((ch) => {
      const t = document.createElement("button");
      t.className = "tile";
      t.textContent = ch;
      t.addEventListener("click", () => onTile(t, ch, target));
      tiles.appendChild(t);
    });
    speak(target.w);
  }
  function onTile(tileEl, ch, target) {
    if (spellLocked || tileEl.classList.contains("used")) return;
    if (ch === target.w[spellPos]) {
      tileEl.classList.add("used");
      const slot = $("slots").children[spellPos];
      slot.textContent = ch;
      slot.classList.add("filled");
      spellPos++;
      sfxTap();
      if (spellPos === target.w.length) {
        spellLocked = true;
        [...$("slots").children].forEach((s) => s.classList.add("win"));
        sfxYay();
        speak(target.w);
        setTimeout(() => {
          spellIdx++;
          if (spellIdx >= spellWords.length) return finishGame("spell");
          renderSpell();
        }, 1100);
      }
    } else {
      tileEl.classList.add("nope");
      sfxNope();
      setTimeout(() => tileEl.classList.remove("nope"), 450);
    }
  }
  $("spellReset").addEventListener("click", renderSpell);
  $("spellPic").addEventListener("click", () => speak(spellWords[spellIdx].w));

  // ================= LESSON (grammar Learn) =================
  let lsSlides = [], lsIdx = 0;
  const slideSentence = (s) => s.text.replace(/\*/g, "");
  function startLesson() {
    lsSlides = theme.slides; // pedagogical order, no shuffle
    lsIdx = 0;
    show("lesson");
    renderLesson();
  }
  function renderLesson() {
    const s = lsSlides[lsIdx];
    renderDots($("lessonDots"), lsSlides.length, lsIdx, lsIdx);
    $("lsEmoji").textContent = s.e;
    $("lsText").innerHTML = s.text.replace(/\*(.+?)\*/g, "<strong>$1</strong>");
    $("lsNote").textContent = s.note;
    $("lessonNext").textContent = lsIdx === lsSlides.length - 1 ? "Done! ⭐" : "Next ➜";
    const fc = $("lessonCard");
    fc.classList.remove("pop");
    void fc.offsetWidth;
    fc.classList.add("pop");
    speak(slideSentence(s));
  }
  $("lessonCard").addEventListener("click", () => speak(slideSentence(lsSlides[lsIdx])));
  $("lessonNext").addEventListener("click", () => {
    sfxTap();
    lsIdx++;
    if (lsIdx >= lsSlides.length) return finishGame("learn");
    renderLesson();
  });

  // ================= PICK IT (grammar quiz) =================
  let pkQs = [], pkIdx = 0, pkLocked = false;
  function startPick() {
    pkQs = shuffle(theme.pick);
    pkIdx = 0;
    show("pick");
    renderPick();
  }
  function renderPick() {
    pkLocked = false;
    const q = pkQs[pkIdx];
    renderDots($("pickDots"), pkQs.length, pkIdx, pkIdx);
    $("qEmoji").textContent = q.e;
    $("qText").innerHTML = q.q.replace("___", '<span class="gap" id="gap">&nbsp;</span>');
    $("qNote").hidden = true;
    const list = $("optList");
    list.innerHTML = "";
    shuffle(q.options).forEach((opt) => {
      const b = document.createElement("button");
      b.className = "opt";
      b.textContent = opt;
      b.addEventListener("click", () => {
        if (pkLocked) return;
        if (opt === q.a) {
          pkLocked = true;
          b.classList.add("yay");
          $("gap").textContent = q.a;
          $("qNote").textContent = q.note;
          $("qNote").hidden = false;
          sfxYay();
          speak(q.q.replace("___", q.a));
          setTimeout(() => {
            pkIdx++;
            if (pkIdx >= pkQs.length) return finishGame("pick");
            renderPick();
          }, 1700);
        } else {
          b.classList.add("nope");
          sfxNope();
          setTimeout(() => b.classList.remove("nope"), 450);
        }
      });
      list.appendChild(b);
    });
  }

  // ================= BUILD IT (sentence tiles) =================
  let bdItems = [], bdIdx = 0, bdPos = 0, bdLocked = false;
  function startBuild() {
    bdItems = shuffle(theme.build);
    bdIdx = 0;
    show("build");
    renderBuild();
  }
  function renderBuild() {
    bdLocked = false;
    bdPos = 0;
    const item = bdItems[bdIdx];
    const words = item.s.split(" ");
    renderDots($("buildDots"), bdItems.length, bdIdx, bdIdx);
    $("buildPic").textContent = item.e;
    const slots = $("buildSlots");
    slots.innerHTML = "";
    words.forEach(() => {
      const s = document.createElement("span");
      s.className = "slot word";
      slots.appendChild(s);
    });
    const tiles = $("buildTiles");
    tiles.innerHTML = "";
    shuffle(words).forEach((w) => {
      const t = document.createElement("button");
      t.className = "tile word";
      t.textContent = w;
      t.addEventListener("click", () => onWordTile(t, w, words, item));
      tiles.appendChild(t);
    });
    speak(item.s);
  }
  function onWordTile(tileEl, w, words, item) {
    if (bdLocked || tileEl.classList.contains("used")) return;
    if (w === words[bdPos]) {
      tileEl.classList.add("used");
      const slot = $("buildSlots").children[bdPos];
      slot.textContent = w;
      slot.classList.add("filled");
      bdPos++;
      sfxTap();
      if (bdPos === words.length) {
        bdLocked = true;
        [...$("buildSlots").children].forEach((s) => s.classList.add("win"));
        sfxYay();
        speak(item.s);
        setTimeout(() => {
          bdIdx++;
          if (bdIdx >= bdItems.length) return finishGame("build");
          renderBuild();
        }, 1300);
      }
    } else {
      tileEl.classList.add("nope");
      sfxNope();
      setTimeout(() => tileEl.classList.remove("nope"), 450);
    }
  }
  $("buildReset").addEventListener("click", () => renderBuild());
  $("buildPic").addEventListener("click", () => speak(bdItems[bdIdx].s));

  // ---- Finish / cheer ----
  const GAME_NAMES = { learn: "Learn", find: "Find it", spell: "Spell it", pick: "Pick it", build: "Build it" };
  function finishGame(game) {
    award(theme.id, game);
    const stars = themeStars(theme);
    $("cheerTitle").textContent =
      stars === 3 ? `${theme.title} — all done! 🏆` : `Great job! ${GAME_NAMES[game]} ⭐`;
    $("cheerStars").textContent = "⭐".repeat(stars) + "☆".repeat(3 - stars);
    show("cheer");
    confetti();
    sfxYay();
    speak(stars === 3 ? "Amazing! You did it!" : "Great job!");
  }
  $("cheerNext").addEventListener("click", () => openTheme(theme));

  // ---- Wire up ----
  $("gLearn").addEventListener("click", () => (theme.words ? startLearn() : startLesson()));
  $("gFind").addEventListener("click", () => (theme.words ? startFind() : startPick()));
  $("gSpell").addEventListener("click", () => (theme.words ? startSpell() : startBuild()));
  $("backHome").addEventListener("click", renderHome);
  ["backLearn", "backFind", "backSpell", "backLesson", "backPick", "backBuild"].forEach((id) =>
    $(id).addEventListener("click", () => openTheme(theme))
  );
  $("homeLink").addEventListener("click", renderHome);

  renderHome();
})();
