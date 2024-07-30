from arguments import args
from analyzer import Analyzer
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'application/json'

@app.route("/", methods=["POST"])
def three():
    request_data = request.get_json()
    text = request_data["text"]
    sentiment, percentage = analyzer.classify_sentiment(text)
    result = {"sentiment": sentiment, "percentage": percentage}
    return jsonify(result)

if __name__ == "__main__":
    print("Please wait while the analyzer is being initialized.")
    analyzer = Analyzer(will_train=False, args=args)
    app.run(host="localhost", port=5000, debug=True)
