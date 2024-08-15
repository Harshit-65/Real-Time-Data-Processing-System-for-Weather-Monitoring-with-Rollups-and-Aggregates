from flask import Flask, render_template, request, jsonify
import requests
from config import OPENWEATHER_API_KEY
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['POST'])
def weather():
    data = request.get_json()
    city = data.get('city')
    print(city)
    if city:
        url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric'
        response = requests.get(url)
        weather_data = response.json()

        if response.status_code == 200:
            data = {
                'city': weather_data['name'],
                'main':weather_data['weather'][0]['main'],
                'temperature': weather_data['main']['temp'],
                'feels_like':weather_data['main']['feels_like'],
                'description': weather_data['weather'][0]['description'],
                'icon': weather_data['weather'][0]['icon'],
                'date':weather_data.get('dt')
            }
            print(data)
            return jsonify(data)
        else:
            return jsonify({'error': weather_data.get('message', 'City not found')}), 404
    return jsonify({'error': 'City not specified'}), 400

if __name__ == '__main__':
    app.run(debug=True)
