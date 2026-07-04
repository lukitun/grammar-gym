// Word Parrot vocabulary. Each theme: id, title, emoji, color, words[{w, e}]
// w = word (single word, lowercase — also used for the spelling game)
// e = emoji picture
window.THEMES = [
  {
    id: "animals", title: "Animals", emoji: "🦁", color: "#FF8A3D",
    words: [
      { w: "dog", e: "🐶" }, { w: "cat", e: "🐱" }, { w: "lion", e: "🦁" },
      { w: "elephant", e: "🐘" }, { w: "monkey", e: "🐵" }, { w: "fish", e: "🐟" },
      { w: "bird", e: "🐦" }, { w: "horse", e: "🐴" }, { w: "rabbit", e: "🐰" },
      { w: "bear", e: "🐻" }, { w: "duck", e: "🦆" }, { w: "frog", e: "🐸" }
    ]
  },
  {
    id: "colors", title: "Colors", emoji: "🌈", color: "#B266E8",
    words: [
      { w: "red", e: "🔴" }, { w: "blue", e: "🔵" }, { w: "green", e: "🟢" },
      { w: "yellow", e: "🟡" }, { w: "orange", e: "🟠" }, { w: "purple", e: "🟣" },
      { w: "pink", e: "🩷" }, { w: "brown", e: "🟤" }, { w: "black", e: "⚫" },
      { w: "white", e: "⚪" }
    ]
  },
  {
    id: "numbers", title: "Numbers", emoji: "🖐️", color: "#3DA5FF",
    words: [
      { w: "one", e: "1️⃣" }, { w: "two", e: "2️⃣" }, { w: "three", e: "3️⃣" },
      { w: "four", e: "4️⃣" }, { w: "five", e: "5️⃣" }, { w: "six", e: "6️⃣" },
      { w: "seven", e: "7️⃣" }, { w: "eight", e: "8️⃣" }, { w: "nine", e: "9️⃣" },
      { w: "ten", e: "🔟" }
    ]
  },
  {
    id: "food", title: "Food", emoji: "🍎", color: "#FF5D73",
    words: [
      { w: "apple", e: "🍎" }, { w: "banana", e: "🍌" }, { w: "bread", e: "🍞" },
      { w: "milk", e: "🥛" }, { w: "egg", e: "🥚" }, { w: "cheese", e: "🧀" },
      { w: "pizza", e: "🍕" }, { w: "cake", e: "🍰" }, { w: "carrot", e: "🥕" },
      { w: "grapes", e: "🍇" }, { w: "cookie", e: "🍪" }, { w: "orange", e: "🍊" }
    ]
  },
  {
    id: "body", title: "My Body", emoji: "👋", color: "#FFB63D",
    words: [
      { w: "eye", e: "👁️" }, { w: "ear", e: "👂" }, { w: "nose", e: "👃" },
      { w: "mouth", e: "👄" }, { w: "hand", e: "✋" }, { w: "foot", e: "🦶" },
      { w: "leg", e: "🦵" }, { w: "arm", e: "💪" }, { w: "tooth", e: "🦷" },
      { w: "tongue", e: "👅" }
    ]
  },
  {
    id: "family", title: "Family", emoji: "👨‍👩‍👧", color: "#4CC98A",
    words: [
      { w: "mother", e: "👩" }, { w: "father", e: "👨" }, { w: "baby", e: "👶" },
      { w: "boy", e: "👦" }, { w: "girl", e: "👧" }, { w: "grandma", e: "👵" },
      { w: "grandpa", e: "👴" }, { w: "family", e: "👨‍👩‍👧‍👦" }
    ]
  },
  {
    id: "clothes", title: "Clothes", emoji: "👕", color: "#5D7CF3",
    words: [
      { w: "shirt", e: "👕" }, { w: "dress", e: "👗" }, { w: "shoe", e: "👟" },
      { w: "hat", e: "🧢" }, { w: "sock", e: "🧦" }, { w: "coat", e: "🧥" },
      { w: "scarf", e: "🧣" }, { w: "gloves", e: "🧤" }, { w: "crown", e: "👑" },
      { w: "boot", e: "👢" }
    ]
  },
  {
    id: "weather", title: "Weather", emoji: "☀️", color: "#39BFD8",
    words: [
      { w: "sun", e: "☀️" }, { w: "rain", e: "🌧️" }, { w: "snow", e: "❄️" },
      { w: "cloud", e: "☁️" }, { w: "wind", e: "💨" }, { w: "storm", e: "⛈️" },
      { w: "rainbow", e: "🌈" }, { w: "star", e: "⭐" }, { w: "moon", e: "🌙" },
      { w: "cold", e: "🥶" }
    ]
  },
  {
    id: "home", title: "My Home", emoji: "🏠", color: "#F27EC4",
    words: [
      { w: "house", e: "🏠" }, { w: "bed", e: "🛏️" }, { w: "door", e: "🚪" },
      { w: "chair", e: "🪑" }, { w: "key", e: "🔑" }, { w: "lamp", e: "💡" },
      { w: "bath", e: "🛁" }, { w: "clock", e: "🕐" }, { w: "window", e: "🪟" },
      { w: "cup", e: "☕" }
    ]
  },
  {
    id: "actions", title: "Actions", emoji: "🏃", color: "#8ED14B",
    words: [
      { w: "run", e: "🏃" }, { w: "swim", e: "🏊" }, { w: "dance", e: "💃" },
      { w: "sleep", e: "😴" }, { w: "read", e: "📖" }, { w: "write", e: "✍️" },
      { w: "sing", e: "🎤" }, { w: "walk", e: "🚶" }, { w: "climb", e: "🧗" },
      { w: "wave", e: "👋" }
    ]
  }
];
