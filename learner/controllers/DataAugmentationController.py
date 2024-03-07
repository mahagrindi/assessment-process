from flask import Blueprint, jsonify
from transformers import AutoTokenizer

import os
import time

from service.DataAugmentationService import DataAugmentationService

class DataAugmentationController:
    endpoint = Blueprint('data_augmentation', __name__, url_prefix='/v1/api/augmentation')

    def __init__(self, app):
        if not os.path.exists(os.path.join("..", "DB", "crates")):
            os.makedirs(os.path.join("..", "DB", "crates"))

        app.register_blueprint(self.endpoint)

    @endpoint.route('', methods=['POST'])
    def index():
        start_time = time.time()
        try:
            service = DataAugmentationService(AutoTokenizer.from_pretrained("humarin/chatgpt_paraphraser_on_T5_base"))
            result = service.augment_data(os.path.join("upload", "pool.csv"), num_sequences=5)
            if result:
                return jsonify({'status': 'success', 'statusCode': 200, 'time': time.time() - start_time, 'message': "Data has been augmented successfully"}), 200
            else:
                return jsonify({'status': 'error', 'statusCode': 500, 'time': time.time() - start_time, 'message': "Data augmentation failed"}), 500
        except Exception as e:
            return jsonify({'status': 'error', 'statusCode': 500, 'message': str(e)}), 500