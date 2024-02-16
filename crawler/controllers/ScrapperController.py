from flask import Flask, jsonify
from service.StartupActScrapper import StartupActScrapper

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    try:
        scrapper = StartupActScrapper('https://startup.gov.tn/fr/database')
        startups = scrapper.scrape()
        return jsonify({'status': 'success', 'startups': startups})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})