from flask import Flask, jsonify
import time

from service.StartupActScrapper import StartupActScrapper
from service.StartupIndexScrapper import StartupIndexScraper

app = Flask(__name__)

@app.route('/startup-gov', methods=['GET'])
def startup_gov():
    scrapper = StartupActScrapper('https://startup.gov.tn/fr/database')
    start_time = time.time()
    try:
        startups = scrapper.scrape()
        end_time = time.time()
        # return time is seconds 
        return jsonify({'took': end_time - start_time ,'status': 'success', 'statusCode': 204, 'startups': startups})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})
    
@app.route('/startup-index', methods=['GET'])
def startup_index():
    scrapper = StartupIndexScraper('https://tsindex.tunisian-startups.com/all-startups')
    start_time = time.time()
    try:
        startups = scrapper.scrape()
        end_time = time.time()
        # return time is seconds 
        return jsonify({'took': end_time - start_time ,'status': 'success', 'statusCode': 204, 'startups': startups})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})