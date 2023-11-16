from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/count')
def count():
    return {"counter": ["add", "subtract"]}


if __name__ == "__main__":
    app.run(debug=True)
