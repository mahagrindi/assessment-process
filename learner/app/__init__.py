from flask import Flask
from dotenv import load_dotenv

from controllers.FileUploadController import FileUploadController
from controllers.DataAugmentationController import DataAugmentationController

load_dotenv()

app = Flask(__name__)
FileUploadController(app)
DataAugmentationController(app)