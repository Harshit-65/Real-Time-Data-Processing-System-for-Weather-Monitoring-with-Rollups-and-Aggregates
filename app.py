<<<<<<< HEAD
from flask import Flask, jsonify, request
from weather_scheduler import fetch_current_data, start_scheduler
from pymongo import MongoClient
from bson import ObjectId
from config import MONGO_URI
import json
import datetime
from flask_cors import CORS, cross_origin
from weather_scheduler import update_threshold, get_count, get_threshold


app = Flask(__name__)
CORS(app, resources={r"/current-weather*": {"origins": "http://localhost:3000"}})  # Allow specific origin
client = MongoClient(MONGO_URI)
db = client.weather_db

class MongoJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        elif isinstance(obj, datetime.date):  # Handle datetime.date
            return obj.isoformat()
        elif isinstance(obj, datetime.datetime):  # Handle datetime.datetime
            return obj.isoformat()
        return super().default(obj)

@app.route('/current-weather', methods=['POST'])
@cross_origin(origins='http://localhost:3000')
def current_weather():
    if request.method == 'OPTIONS':
        # Handle CORS preflight request
        return jsonify({'message': 'CORS preflight request successful'}), 200
    data = request.get_json()
    city = data.get('city')
    days = int(data.get('days', 0))
    
    if city and days == 0:
        new_count = get_count(city)
        print(new_count,get_threshold())

        now = datetime.datetime.utcnow()
        res = fetch_current_data(city)
        if res.status_code == 200:
            weather_data = res.json()
            response = {
                "city": city,
                "count": new_count,
                "main": {
                    "icon": weather_data['weather'][0]['icon'],
                    "feels_like": weather_data['main']['feels_like'],
                    "temp": weather_data['main']['temp'],
                    "wind": weather_data['wind']['speed'],
                    "description": weather_data['weather'][0]['description'],
                    "humidity": weather_data['main']['humidity']
                }
            }
            return jsonify(response), 200
        else:
            return jsonify({'error': f"Failed to fetch data for {city}: {res.status_code}"}), res.status_code
    elif city and days > 0:
        end_date = datetime.datetime.utcnow().date()
        start_date = end_date - datetime.timedelta(days=days-1)

        summaries = db.daily_summaries.find({
            "city": city,
            "date": {"$gte": datetime.datetime.combine(start_date, datetime.datetime.min.time()), "$lte": datetime.datetime.combine(end_date, datetime.datetime.max.time())}
        }).sort("date", -1)

        summary_list = []
        for summary in summaries:
            summary_list.append({
                "date": summary["date"].isoformat(),
                "avg_temp": summary["avg_temp"],
                "max_temp": summary["max_temp"],
                "min_temp": summary["min_temp"],
                "dominant_condition": summary.get("dominant_condition", "N/A")
            })

        response = {
            "city": city,
            "days": days,
            "summaries": summary_list
        }
        return jsonify(response), 200
    else:
        return jsonify({'error': 'City not specified or incorrect days parameter'}), 400




@app.route('/set_threshold', methods=['POST'])
@cross_origin(origins='http://localhost:3000')

def set_threshold():
    threshold = request.get_json()
    threshold = threshold.get('threshold')
    update_threshold(threshold)
    response= {
        "Status": "ok"
    }
    return jsonify(response), 200


if __name__ == "__main__":
    app.json_encoder = MongoJSONEncoder  
    start_scheduler() 
    app.run(debug=False)
=======
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
>>>>>>> 6b0e34fe17c1c762f8e27d34b69521dc778bfcfa
