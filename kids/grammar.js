// Word Parrot grammar path. Ordered curriculum — level number matters.
// Each topic: slides (Learn), pick (gap-fill quiz), build (sentence from word tiles).
// In slide text, *stars* mark the grammar bit to highlight.
window.GRAMMAR = [
  {
    id: "present-simple", title: "Present Simple", emoji: "☀️", color: "#FFB63D",
    tip: "Things we do every day",
    slides: [
      { text: "I *play* football every day.", e: "⚽", note: "every day → play" },
      { text: "She *drinks* milk every morning.", e: "🥛", note: "she → drink + s" },
      { text: "He *likes* ice cream.", e: "🍦", note: "he → like + s" },
      { text: "We *go* to school on Monday.", e: "🏫", note: "we → go (no s)" },
      { text: "Cats *sleep* a lot.", e: "🐱", note: "cats → sleep (no s)" }
    ],
    pick: [
      { q: "I ___ to school every day.", e: "🏫", options: ["go", "goes", "going"], a: "go", note: "I → go" },
      { q: "She ___ milk every morning.", e: "🥛", options: ["drinks", "drink", "drinking"], a: "drinks", note: "she → drink + s" },
      { q: "He ___ football on Sunday.", e: "⚽", options: ["plays", "play", "playing"], a: "plays", note: "he → play + s" },
      { q: "We ___ TV in the evening.", e: "📺", options: ["watch", "watches", "watching"], a: "watch", note: "we → watch (no s)" },
      { q: "My dog ___ a lot.", e: "🐶", options: ["sleeps", "sleep", "sleeping"], a: "sleeps", note: "my dog = he → + s" },
      { q: "They ___ in a big house.", e: "🏠", options: ["live", "lives", "living"], a: "live", note: "they → live (no s)" },
      { q: "Dad ___ pizza.", e: "🍕", options: ["likes", "like", "liking"], a: "likes", note: "dad = he → + s" },
      { q: "I ___ my teeth every morning.", e: "🦷", options: ["brush", "brushes", "brushing"], a: "brush", note: "I → brush" }
    ],
    build: [
      { s: "I play football every day", e: "⚽" },
      { s: "She drinks milk every morning", e: "🥛" },
      { s: "He likes ice cream", e: "🍦" },
      { s: "We go to school", e: "🏫" },
      { s: "Cats sleep a lot", e: "🐱" }
    ]
  },
  {
    id: "present-continuous", title: "Present Continuous", emoji: "🏃", color: "#3DA5FF",
    tip: "Things happening right now",
    slides: [
      { text: "I *am running* now!", e: "🏃", note: "now → am + running" },
      { text: "She *is eating* an apple.", e: "🍎", note: "she → is + eating" },
      { text: "They *are dancing*.", e: "💃", note: "they → are + dancing" },
      { text: "The cat *is sleeping*.", e: "😴", note: "the cat → is + sleeping" },
      { text: "Look! It *is raining*.", e: "🌧️", note: "look! = right now" }
    ],
    pick: [
      { q: "Look! The dog ___ .", e: "🐶", options: ["is running", "runs", "run"], a: "is running", note: "look! → is + ing" },
      { q: "I ___ a book now.", e: "📖", options: ["am reading", "read", "reads"], a: "am reading", note: "now → am + ing" },
      { q: "She ___ now.", e: "🎤", options: ["is singing", "sings", "sing"], a: "is singing", note: "now → is + ing" },
      { q: "They ___ football now.", e: "⚽", options: ["are playing", "plays", "play"], a: "are playing", note: "they → are + ing" },
      { q: "Shh! The baby ___ .", e: "👶", options: ["is sleeping", "sleeps", "sleep"], a: "is sleeping", note: "right now → is + ing" },
      { q: "We ___ a cake now.", e: "🎂", options: ["are making", "make", "makes"], a: "are making", note: "we → are + ing" },
      { q: "It ___ now.", e: "❄️", options: ["is snowing", "snows", "snow"], a: "is snowing", note: "now → is + ing" },
      { q: "He ___ TV now.", e: "📺", options: ["is watching", "watches", "watch"], a: "is watching", note: "he → is + ing" }
    ],
    build: [
      { s: "I am running now", e: "🏃" },
      { s: "She is eating an apple", e: "🍎" },
      { s: "They are dancing", e: "💃" },
      { s: "The cat is sleeping", e: "😴" },
      { s: "It is raining now", e: "🌧️" }
    ]
  },
  {
    id: "past-simple", title: "Past Simple", emoji: "🕰️", color: "#B266E8",
    tip: "Things that happened yesterday",
    slides: [
      { text: "Yesterday I *played* football.", e: "⚽", note: "yesterday → play + ed" },
      { text: "She *watched* a movie last night.", e: "🎬", note: "watch + ed" },
      { text: "We *went* to the zoo.", e: "🦁", note: "go → went!" },
      { text: "He *ate* a big cake.", e: "🍰", note: "eat → ate!" },
      { text: "I *saw* a rainbow.", e: "🌈", note: "see → saw!" }
    ],
    pick: [
      { q: "Yesterday I ___ football.", e: "⚽", options: ["played", "play", "plays"], a: "played", note: "yesterday → + ed" },
      { q: "She ___ a movie last night.", e: "🎬", options: ["watched", "watches", "watch"], a: "watched", note: "last night → + ed" },
      { q: "We ___ to the zoo yesterday.", e: "🦁", options: ["went", "go", "goed"], a: "went", note: "go → went!" },
      { q: "He ___ all the cookies!", e: "🍪", options: ["ate", "eat", "eated"], a: "ate", note: "eat → ate!" },
      { q: "I ___ a big fish.", e: "🐟", options: ["saw", "see", "seed"], a: "saw", note: "see → saw!" },
      { q: "They ___ a sandcastle.", e: "🏖️", options: ["made", "make", "maked"], a: "made", note: "make → made!" },
      { q: "The dog ___ very fast.", e: "🐕", options: ["ran", "run", "runned"], a: "ran", note: "run → ran!" },
      { q: "Last week we ___ grandma.", e: "👵", options: ["visited", "visit", "visits"], a: "visited", note: "last week → + ed" }
    ],
    build: [
      { s: "Yesterday I played football", e: "⚽" },
      { s: "We went to the zoo", e: "🦁" },
      { s: "He ate a big cake", e: "🍰" },
      { s: "I saw a rainbow", e: "🌈" },
      { s: "She watched a movie", e: "🎬" }
    ]
  },
  {
    id: "past-continuous", title: "Past Continuous", emoji: "🌙", color: "#5D7CF3",
    tip: "Was and were + ing",
    slides: [
      { text: "I *was sleeping* at night.", e: "😴", note: "I → was + sleeping" },
      { text: "They *were playing* at five o'clock.", e: "⚽", note: "they → were" },
      { text: "She *was reading* a book.", e: "📖", note: "she → was" },
      { text: "The birds *were singing*.", e: "🐦", note: "birds → were" },
      { text: "It *was raining* all day.", e: "🌧️", note: "it → was" }
    ],
    pick: [
      { q: "I ___ when you called.", e: "😴", options: ["was sleeping", "were sleeping", "am sleeping"], a: "was sleeping", note: "I → was" },
      { q: "They ___ football at five.", e: "⚽", options: ["were playing", "was playing", "are playing"], a: "were playing", note: "they → were" },
      { q: "She ___ a book.", e: "📖", options: ["was reading", "were reading", "is reading"], a: "was reading", note: "she → was" },
      { q: "The birds ___ .", e: "🐦", options: ["were singing", "was singing", "is singing"], a: "were singing", note: "birds → were" },
      { q: "It ___ all day.", e: "🌧️", options: ["was raining", "were raining", "is raining"], a: "was raining", note: "it → was" },
      { q: "We ___ TV at eight.", e: "📺", options: ["were watching", "was watching", "am watching"], a: "were watching", note: "we → were" },
      { q: "The cat ___ with a ball.", e: "🐱", options: ["was playing", "were playing", "am playing"], a: "was playing", note: "the cat → was" },
      { q: "You ___ so fast!", e: "🏃", options: ["were running", "was running", "am running"], a: "were running", note: "you → were" }
    ],
    build: [
      { s: "I was sleeping", e: "😴" },
      { s: "They were playing football", e: "⚽" },
      { s: "She was reading a book", e: "📖" },
      { s: "It was raining all day", e: "🌧️" },
      { s: "The birds were singing", e: "🐦" }
    ]
  },
  {
    id: "future", title: "Future", emoji: "🚀", color: "#39BFD8",
    tip: "Will and going to",
    slides: [
      { text: "Tomorrow I *will play* with you.", e: "🤝", note: "tomorrow → will + play" },
      { text: "It *will rain* tomorrow.", e: "🌧️", note: "will + rain" },
      { text: "I *am going to eat* pizza tonight.", e: "🍕", note: "a plan → going to" },
      { text: "She *will be* a doctor.", e: "🩺", note: "will + be" },
      { text: "We *are going to visit* grandma.", e: "👵", note: "a plan → going to" }
    ],
    pick: [
      { q: "Tomorrow I ___ to the park.", e: "🛝", options: ["will go", "go", "went"], a: "will go", note: "tomorrow → will" },
      { q: "It ___ tomorrow.", e: "❄️", options: ["will snow", "snows", "snowed"], a: "will snow", note: "tomorrow → will" },
      { q: "I ___ pizza tonight.", e: "🍕", options: ["am going to eat", "eat", "ate"], a: "am going to eat", note: "a plan → going to" },
      { q: "She ___ you tomorrow.", e: "🤝", options: ["will help", "helps", "helped"], a: "will help", note: "tomorrow → will" },
      { q: "We ___ grandma on Sunday.", e: "👵", options: ["are going to visit", "visited", "visits"], a: "are going to visit", note: "a plan → going to" },
      { q: "Don't worry! I ___ you.", e: "💪", options: ["will help", "helped", "helping"], a: "will help", note: "a promise → will" },
      { q: "He ___ six next year.", e: "🎂", options: ["will be", "is", "was"], a: "will be", note: "next year → will" },
      { q: "They ___ a movie tonight.", e: "🎬", options: ["are going to watch", "watched", "watch"], a: "are going to watch", note: "a plan → going to" }
    ],
    build: [
      { s: "Tomorrow I will play with you", e: "🤝" },
      { s: "It will rain tomorrow", e: "🌧️" },
      { s: "I am going to eat pizza", e: "🍕" },
      { s: "She will be a doctor", e: "🩺" },
      { s: "We are going to visit grandma", e: "👵" }
    ]
  },
  {
    id: "present-perfect", title: "Present Perfect", emoji: "✅", color: "#4CC98A",
    tip: "Have and has + done",
    slides: [
      { text: "I *have finished* my homework!", e: "📚", note: "have + finished" },
      { text: "She *has eaten* all the cake.", e: "🍰", note: "she → has" },
      { text: "We *have seen* that movie.", e: "🎬", note: "see → seen" },
      { text: "He *has lost* his shoe.", e: "👟", note: "lose → lost" },
      { text: "Look! I *have made* a cake.", e: "🎂", note: "make → made" }
    ],
    pick: [
      { q: "I ___ my homework.", e: "📚", options: ["have finished", "has finished", "finishing"], a: "have finished", note: "I → have" },
      { q: "She ___ all the cookies.", e: "🍪", options: ["has eaten", "have eaten", "eating"], a: "has eaten", note: "she → has" },
      { q: "We ___ that movie before.", e: "🎬", options: ["have seen", "has seen", "seeing"], a: "have seen", note: "we → have" },
      { q: "He ___ his key.", e: "🔑", options: ["has lost", "have lost", "losing"], a: "has lost", note: "he → has" },
      { q: "They ___ a snowman.", e: "⛄", options: ["have made", "has made", "making"], a: "have made", note: "they → have" },
      { q: "I ___ my hands.", e: "🧼", options: ["have washed", "has washed", "washing"], a: "have washed", note: "I → have" },
      { q: "The cat ___ the milk.", e: "🥛", options: ["has drunk", "have drunk", "drinking"], a: "has drunk", note: "the cat → has" },
      { q: "Look! It ___ !", e: "❄️", options: ["has snowed", "have snowed", "snowing"], a: "has snowed", note: "it → has" }
    ],
    build: [
      { s: "I have finished my homework", e: "📚" },
      { s: "She has eaten the cake", e: "🍰" },
      { s: "We have seen that movie", e: "🎬" },
      { s: "He has lost his shoe", e: "👟" },
      { s: "I have made a cake", e: "🎂" }
    ]
  },
  {
    id: "first-conditional", title: "If… (First)", emoji: "🔮", color: "#FF8A3D",
    tip: "If this happens, that will happen",
    slides: [
      { text: "If it rains, we *will stay* home.", e: "🌧️", note: "if… → will" },
      { text: "If you eat your soup, you *will grow* big.", e: "🍲", note: "if… → will grow" },
      { text: "If I find it, I *will tell* you.", e: "🔍", note: "if… → will tell" },
      { text: "If we *hurry*, we will catch the bus.", e: "🚌", note: "after if → no will!" },
      { text: "If it *snows*, we will make a snowman.", e: "⛄", note: "after if → no will!" }
    ],
    pick: [
      { q: "If it rains, we ___ home.", e: "🌧️", options: ["will stay", "stay", "stayed"], a: "will stay", note: "if… → will" },
      { q: "If you eat your soup, you ___ big.", e: "🍲", options: ["will grow", "grew", "growing"], a: "will grow", note: "if… → will" },
      { q: "If I find your toy, I ___ you.", e: "🧸", options: ["will tell", "told", "telling"], a: "will tell", note: "if… → will" },
      { q: "If we run, we ___ the bus.", e: "🚌", options: ["will catch", "caught", "catching"], a: "will catch", note: "if… → will" },
      { q: "If it ___ , we will make a snowman.", e: "⛄", options: ["snows", "will snow", "snowed"], a: "snows", note: "after if → no will!" },
      { q: "If you ___ hard, you will win.", e: "🏆", options: ["practice", "will practice", "practiced"], a: "practice", note: "after if → no will!" },
      { q: "If she is tired, she ___ .", e: "😴", options: ["will sleep", "slept", "sleeping"], a: "will sleep", note: "if… → will" },
      { q: "If the sun ___ , we will swim.", e: "☀️", options: ["shines", "will shine", "shone"], a: "shines", note: "after if → no will!" }
    ],
    build: [
      { s: "If it rains we will stay home", e: "🌧️" },
      { s: "If you run you will win", e: "🏆" },
      { s: "If I find it I will tell you", e: "🔍" },
      { s: "If it snows we will play", e: "⛄" },
      { s: "If we hurry we will catch the bus", e: "🚌" }
    ]
  },
  {
    id: "second-conditional", title: "If… (Dream)", emoji: "🦄", color: "#F27EC4",
    tip: "Dreams: if I had… I would…",
    slides: [
      { text: "If I had wings, I *would fly*.", e: "🕊️", note: "a dream → had + would" },
      { text: "If I *were* a king, I would live in a castle.", e: "🏰", note: "if I were!" },
      { text: "If we had a dog, we *would play* all day.", e: "🐶", note: "had… would" },
      { text: "If she had a rocket, she *would fly* to the moon.", e: "🚀", note: "had… would" },
      { text: "If I *were* you, I would say sorry.", e: "🤗", note: "if I were you…" }
    ],
    pick: [
      { q: "If I had wings, I ___ .", e: "🕊️", options: ["would fly", "will fly", "fly"], a: "would fly", note: "a dream → would" },
      { q: "If I ___ a king, I would live in a castle.", e: "🏰", options: ["were", "am", "is"], a: "were", note: "if I were!" },
      { q: "If we had a dog, we ___ all day.", e: "🐶", options: ["would play", "will play", "play"], a: "would play", note: "a dream → would" },
      { q: "If she ___ a rocket, she would fly to the moon.", e: "🚀", options: ["had", "has", "have"], a: "had", note: "a dream → had" },
      { q: "If I were you, I ___ sorry.", e: "🤗", options: ["would say", "will say", "say"], a: "would say", note: "a dream → would" },
      { q: "If cats ___ talk, what would they say?", e: "🐱", options: ["could", "can", "will"], a: "could", note: "a dream → could" },
      { q: "If he ___ taller, he would reach it.", e: "🧗", options: ["were", "is", "am"], a: "were", note: "a dream → were" },
      { q: "If I ___ magic, I would help everyone.", e: "🪄", options: ["had", "have", "has"], a: "had", note: "a dream → had" }
    ],
    build: [
      { s: "If I had wings I would fly", e: "🕊️" },
      { s: "If I were you I would say sorry", e: "🤗" },
      { s: "If we had a dog we would play", e: "🐶" },
      { s: "If I were a king I would live in a castle", e: "🏰" },
      { s: "If she had a rocket she would fly", e: "🚀" }
    ]
  }
];
