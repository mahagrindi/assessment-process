from flask import Flask, jsonify
from kafka import KafkaProducer, KafkaConsumer
from queue import Queue

import time
import json
import threading

from service.StartupActScrapper import StartupActScrapper
from service.StartupIndexScrapper import StartupIndexScraper

app = Flask(__name__)
producer = KafkaProducer(bootstrap_servers='172.25.112.1:9092', value_serializer=lambda x: json.dumps(x).encode('utf-8'))

@app.route('/scrape', methods=['GET'])
def startup_gov():
    scrapper = StartupActScrapper('https://startup.gov.tn/fr/database')
    start_time = time.time()
    try:
        startups = scrapper.scrape()
        # Send data through Kafka
        for startup in startups:
            producer.send('startups', value=startup)
        producer.flush()
        end_time = time.time()
        # Return response
        return jsonify({'took': end_time - start_time ,'status': 'success', 'statusCode': 204, 'startups': startups})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})


# Shared queue for messages
messages_queue = Queue()

def consume_messages():
    consumer = KafkaConsumer('startups',
                             bootstrap_servers=['172.25.112.1:9092'],
                             auto_offset_reset='earliest',
                             enable_auto_commit=True,
                             group_id='my-group',
                             value_deserializer=lambda x: json.loads(x.decode('utf-8')))
    for message in consumer:
        messages_queue.put(message.value)
        print(f"Consumed message: {message.value}")

# Start Kafka consumer in a background thread
threading.Thread(target=consume_messages, daemon=True).start()

@app.route('/communicate', methods=['GET'])
def get_startups():
    startups = []
    # Retrieve messages from the queue
    while not messages_queue.empty():
        startups.append(messages_queue.get())
    return jsonify({'status': 'success', 'startups': startups})