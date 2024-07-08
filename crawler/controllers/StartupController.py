from flask import Blueprint, jsonify
import time
from service.StartupActScrapper import StartupActScraper

endpoint = Blueprint('startup_tunisia', __name__, url_prefix='/api/startup')

class StartupController:
    def __init__(self, app):
        app.register_blueprint(endpoint)

    @endpoint.route('', methods=['POST'])
    def index():
        scrapper = StartupActScraper('https://startup.gov.tn/en/database')
        start_time = time.time()
        try:
            startups = scrapper.scrape()
            if len(startups) > 0:
                if scrapper.save_to_file(startups, f"startups.csv"):
                    return jsonify({'status': 'success', 'statusCode': 200, 'time': time.time() - start_time, 'fileName': f"startups.csv"})
                return jsonify({'status': 'error', 'message': 'Error saving data to file', 'time': time.time() - start_time})
            return jsonify({'status': 'error', 'message': 'No data scraped', 'time': time.time() - start_time})
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e), 'time': time.time() - start_time})

    @endpoint.route('', methods=['GET'])
    def create():
        return jsonify({'status': 'success', 'message': 'Welcome to the Startup Act Scrapper API!'})
