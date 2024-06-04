import joblib
from service.text_utils import * 
# Load the trained model
model = joblib.load('model.pkl')

class PredictionService:
  def predict(self, observation, axe):
    # Preprocess the observation
    clean_observation = preprocess_text(observation)
    combined_input = axe + " " + clean_observation

    # Make prediction
    predicted_score = model.predict([combined_input])[0]
    recommendation = generate_recommendations(predicted_score, clean_observation)

    return predicted_score, recommendation

 