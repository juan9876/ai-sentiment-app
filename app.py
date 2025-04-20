from flask import Flask, request, jsonify 
import openai
import os

app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/sentiment", methods=["POST"])
def sentiment():
    data = request.get_json()
    text = data.get("text")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        prompt = f"Classify the sentiment of the following text as Positive, Negative, or Neutral:\n\n{text}"
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=10,
            temperature=0
        )
        sentiment = response.choices[0].text.strip()
        return jsonify({"sentiment": sentiment})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# For Vercel handler
handler = app
