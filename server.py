from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def main():
    return "go to /count to get count data"


@app.route('/count')
def count():
    return {"counter": ["0"]}


if __name__ == "__main__":
    app.run(debug=True)
