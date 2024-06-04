from flask import Blueprint, request, jsonify
from service.prediction_service import preprocess_text, generate_recommendations, model

def PredictionController(app):
    prediction_bp = Blueprint('prediction', __name__)

    @prediction_bp.route('/api/predict', methods=['POST'])
    def predict():
        data = request.json
        new_axe = data.get('axe', '')
        new_observation = data.get('observation', '')

        if not new_axe or not new_observation:
            return jsonify({"error": "Both 'axe' and 'observation' are required."}), 400

        # Preprocess the new observation
        clean_observation = preprocess_text(new_observation)
        combined_input = new_axe + " " + clean_observation

        # Make prediction
        predicted_score = model.predict([combined_input])[0]
        recommendation = generate_recommendations(predicted_score, clean_observation)

        response = {
            "predicted_score": predicted_score,
            "recommendation": recommendation
        }

        return jsonify(response)

    app.register_blueprint(prediction_bp)
