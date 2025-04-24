import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState(null);

  const analyzeSentiment = async () => {
    try {
      const response = await fetch("https://your-replit-url.repl.co/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }), // Send the text entered
      });

      const data = await response.json();
      if (data.sentiment !== undefined) {
        setSentiment(data.sentiment);
      } else {
        console.error(data.error || "Error analyzing sentiment");
      }
    } catch (error) {
      console.error("Error with the API call:", error);
    }
  };

  return (
    <div>
      <h1>Sentiment Analysis</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for sentiment analysis"
      />
      <button onClick={analyzeSentiment}>Analyze Sentiment</button>

      {sentiment !== null && (
        <div>
          <h3>Sentiment Score: {sentiment}</h3>
          <p>{sentiment > 0 ? "Positive" : sentiment < 0 ? "Negative" : "Neutral"}</p>
        </div>
      )}
    </div>
  );
}

export default App;
