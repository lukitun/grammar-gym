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

## Deploy
Any static host. Configured for Netlify (`netlify.toml`, publish root).
