from flask import Blueprint, request, jsonify

import time
import os

endpoint = Blueprint('file_upload', __name__, url_prefix='/v1/api/upload')

class FileUploadController:
    def __init__(self, app):
        app.register_blueprint(endpoint)
        if not os.path.exists("upload"):
                os.makedirs("upload")

    @endpoint.route('', methods=['POST'])
    def upload():
        file = request.files['file']
        if os.getenv("APP_STORAGE") == "local":
            file.save(os.path.join("upload", file.filename))
            return jsonify({"timestamp": time.time(), "status": 204, 'message': 'File uploaded successfully'}), 200
        return jsonify({"timestamp": time.time(), "status": 401, 'message': 'File uploaded failed'}), 401