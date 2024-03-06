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
    allowed_extensions = {'xls', 'xlsx', 'csv'}

    # Extract the file extension and check if it's allowed
    file_extension = file.filename.rsplit('.', 1)[1].lower()
    if file_extension in allowed_extensions:
        if os.getenv("APP_STORAGE") == "local":
            file.save(os.path.join("upload", f"{file.filename.rsplit('.', 1)[0].lower()}-{time.time()}.{file_extension}"))
            return jsonify({"timestamp": time.time(), "success": "Upload Successfully", "status": 204, 'message': 'File uploaded successfully'}), 200
        else:
            # Handle non-local storage logic if applicable
            pass
    else:
        return jsonify({"timestamp": time.time(), "error" : "Upload Error", "status": 400, 'message': 'File format not supported. Please upload xls, xlsx, or csv files only.'}), 400
    # If APP_STORAGE is not set to "local" and no file is processed
    return jsonify({"timestamp": time.time(), "error" : "Upload Error", "status": 401, 'message': 'File upload failed'}), 401