// src/api.js
export async function getCohereResponse(message) {
  const response = await fetch("https://api.cohere.ai/v1/chat", {
    method: "POST",
    headers: {
      Authorization: "Bearer x4wza6tXFaYMGIMeiSsrs1Nl6IYjMhtvW0pTIF53",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "command-r",
      message: message,
    }),
  });

  const data = await response.json();
  return data.text || "Sorry, I couldn’t understand that.";
}
