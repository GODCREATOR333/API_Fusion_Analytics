from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
     r"/count": {"origins": "http://localhost:3000"}, "/*": {"origins": "*"}})
counter_value = 0


@app.route('/')
def main():
    return "go to /count to get count data"


@app.route('/count', methods=['GET', 'POST'])
def count():
    global counter_value
    if request.method == 'POST':
        data = request.get_json()
        counter_value = data.get('key1', counter_value)
    return {"counter": [counter_value]}


if __name__ == "__main__":
    app.run(debug=True)
