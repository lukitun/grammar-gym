// AI coach: explains quiz mistakes via NVIDIA NIM (llama-3.3-70b).
// The API key lives in the NVIDIA_API_KEY environment variable on Netlify —
// it is never exposed to the browser.

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let mistakes;
  try {
    ({ mistakes } = await req.json());
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
  if (!Array.isArray(mistakes) || mistakes.length === 0) {
    return Response.json({ error: "No mistakes sent" }, { status: 400 });
  }

  const items = mistakes.slice(0, 10).map((m, i) => {
    const q = String(m.q || "").slice(0, 300);
    const correct = String(m.correct || "").slice(0, 100);
    const chosen = String(m.chosen || "").slice(0, 100);
    return `${i + 1}. Question: ${q}\n   Correct answer: ${correct}\n   Learner answered: ${chosen}`;
  }).join("\n");

  const prompt =
    "You are a friendly English grammar coach. A learner just finished a grammar quiz. " +
    "For each mistake below, explain in 1-2 short sentences WHY the correct answer is right and " +
    "why their answer was wrong. Be concrete and practical, no fluff. If several mistakes share " +
    "a pattern, end with one line starting with 'Pattern:' naming what to study.\n\n" + items;

  try {
    const r = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-8b-instruct", // fast enough for Netlify's 10s function limit
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 600
      })
    });
    if (!r.ok) {
      return Response.json({ error: "Coach unavailable" }, { status: 502 });
    }
    const data = await r.json();
    const text = data.choices?.[0]?.message?.content || "";
    return Response.json({ text });
  } catch {
    return Response.json({ error: "Coach unavailable" }, { status: 502 });
  }
};

export const config = { path: "/api/coach" };
