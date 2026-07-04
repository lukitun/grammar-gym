# Grammar Gym

Free English grammar exercises for non-native speakers. No paywall, no signup, no tracking.

Static site — pure HTML/CSS/JS, no build step. Open `index.html` or serve the folder.

## Content
**695 exercises across 20 topics**, organised as a learning path (Level 1 Foundations → Level 2 Core grammar → Level 3 Advanced): Articles · Pronouns · Subject–Verb Agreement · Question Formation · Prepositions · Countable & Uncountable · Quantifiers · Comparatives · Verb Tenses · Present Perfect vs Past · Used to · Modal Verbs · Gerunds & Infinitives · Adverbs & Word Order · Phrasal Verbs · Passive Voice · Conditionals · Relative Clauses · Reported Speech · Commonly Confused Words.

**Training modes:** per-topic quizzes with best-score tracking (localStorage) and a "drill my mistakes" retry · Quick Workout (15 mixed questions across all topics) · Sentence Builder (`builder.js`, rebuild scrambled sentences) · Listening Drill (`vocab.js`, hear a word via Speech Synthesis and type it).

## Add / edit exercises
Source of truth is `build/topics/*.json` (one file per topic). Edit those, then regenerate the bundle:

```
node build/assemble.mjs   # validates + rebuilds exercises.js
```

The assembler checks every `mc` answer matches an option, drops duplicates, and reports issues. Each question is `mc` (multiple choice) or `fill` (typed; `answer` is an array of accepted variants).

## Deploy
Any static host. Configured for Netlify (`netlify.toml`, publish root).
