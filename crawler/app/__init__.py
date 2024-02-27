from flask import Flask
from dotenv import load_dotenv

from controllers.StartupController import StartupController

load_dotenv()


app = Flask(__name__)
StartupController(app)