from flask import Blueprint, request, jsonify

import time
import os

import pandas as pd

class FileUploadController:
    endpoint = Blueprint('file_upload', __name__, url_prefix='/v1/api/upload')

    def __init__(self, app):
        app.register_blueprint(self.endpoint)
        if not os.path.exists("upload"):
            os.makedirs("upload")

    @endpoint.route('', methods=['POST'])
    def upload():
        try:
            file = request.files['file']
            allowed_extensions = {'xls', 'xlsx', 'csv'}
            file_extension = file.filename.rsplit('.', 1)[1].lower()

            if file_extension not in allowed_extensions:
                return jsonify({"timestamp": time.time(), "error": "Upload Error", "status": 400, "message": "File format not supported. Please upload xls, xlsx, or csv files only."}), 400

            if file_extension in {'xls', 'xlsx'}:
                # Convert Excel to CSV
                try:
                    df = pd.read_excel(file)
                    df.to_csv(os.path.join("upload", "pool.csv"), index=False)
                    return jsonify({"timestamp": time.time(), "success": "Upload and Conversion Successfully", "status": 200, "message": "File uploaded and converted to CSV successfully"}), 200
                except Exception as e:
                    return jsonify({ "timestamp": time.time(), "error": "Conversion Error", "status": 500, "message": f"Error converting file to CSV: {str(e)}"
                    }), 500
            elif file_extension == 'csv':
                # Save CSV file
                file.save(os.path.join("upload", "pool.csv"))
                return jsonify({ "timestamp": time.time(), "success": "Upload Successfully", "status": 200, "message": "File uploaded successfully"}), 200
            else:
                return jsonify({ "timestamp": time.time(), "error": "Upload Error", "status": 400, "message": "Unsupported file format"}), 400

        except KeyError:
            return jsonify({ "timestamp": time.time(), "error": "Upload Error", "status": 400, "message": "No file part in the request"}), 400
        except Exception as e:
            return jsonify({ "timestamp": time.time(), "error": "Upload Error", "status": 500, "message": f"An error occurred: {str(e)}"}), 500

