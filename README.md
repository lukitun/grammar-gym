# Grammar Gym

Free English grammar exercises for non-native speakers. No paywall, no signup, no tracking.

Static site — pure HTML/CSS/JS, no build step. Open `index.html` or serve the folder.

## Content
**600 exercises across 20 topics:** Articles · Verb Tenses · Present Perfect vs Past · Prepositions · Phrasal Verbs · Conditionals · Passive Voice · Modal Verbs · Relative Clauses · Comparatives · Gerunds & Infinitives · Reported Speech · Question Formation · Quantifiers · Countable & Uncountable · Pronouns · Adverbs & Word Order · Used to / Be used to · Subject–Verb Agreement · Commonly Confused Words.

## Add / edit exercises
Source of truth is `build/topics/*.json` (one file per topic). Edit those, then regenerate the bundle:

```
node build/assemble.mjs   # validates + rebuilds exercises.js
```

The assembler checks every `mc` answer matches an option, drops duplicates, and reports issues. Each question is `mc` (multiple choice) or `fill` (typed; `answer` is an array of accepted variants).

## Word Parrot (kids)
`kids/` is a separate mini-site for children (~4–8): ~110 vocabulary words in 10 themes, three games per theme (Learn flashcards, Find-it listening quiz, Spell-it letter tiles). Every word is spoken aloud via the browser's Speech Synthesis API — no audio files. Stars are stored in localStorage. Vocabulary lives in `kids/words.js`.

There is also a **Grammar Path** — an 8-level kid-friendly tense curriculum (Present Simple → Present Continuous → Past Simple → Past Continuous → Future → Present Perfect → First Conditional → Second Conditional). Each level has spoken rule slides (Learn), a gap-fill quiz (Pick it) and a sentence-builder from word tiles (Build it). Content lives in `kids/grammar.js`.

## Deploy
Any static host. Configured for Netlify (`netlify.toml`, publish root).
