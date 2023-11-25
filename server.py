from flask import Flask, request
from flask_cors import CORS
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

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


processed_data_api1 = []
processed_data_api2 = []


@app.route('/api1', methods=['POST'])
def api1data():
    global processed_data_api1

    if request.method == 'POST':
        data = request.get_json()
        data_from_api1 = data.get('data_from_api1', [])
        processed_data_api1.append(data_from_api1)

    return {"DATA": processed_data_api1}


@app.route('/api2', methods=['POST'])
def api2data():
    global processed_data_api2

    if request.method == 'POST':
        data = request.get_json()
        data_from_api2 = data.get('data_from_api2', [])
        processed_data_api2.append(data_from_api2)

    return {"DATA": processed_data_api2}


def d0_calc(data_from_api1, data_from_api2):

    print(data_from_api1)
    print(data_from_api2)

    return "computed"


def generate_plot(inflation_data, sentiment_data):
    plt.plot(inflation_data, label='Inflation')
    plt.plot(sentiment_data, label='Sentiment Score')
    plt.legend()

    # Save the plot to a BytesIO object
    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format='png')
    img_buffer.seek(0)

    # Encode the image to base64
    img_str = base64.b64encode(img_buffer.read()).decode('utf-8')

    return img_str


@app.route('/get_plot', methods=['GET'])
def get_plot():
    inflation_data = [1, 2, 3, 6, 7, 8, 2, 5, 3, 6, 5, 0, 4]
    sentiment_data = [3, 7, 1, 5, 2, 9, 0, 5, 9, 6, 5, 7, 4]

    img_str = generate_plot(inflation_data, sentiment_data)

    # Return the base64-encoded image data
    return jsonify({'plot': img_str})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
