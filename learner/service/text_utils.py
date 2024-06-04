import nltk
nltk.download('stopwords') 
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer

def preprocess_text(text):
 
  tokens = nltk.word_tokenize(text.lower())
  tokens = [token for token in tokens if token.isalpha()]
  stop_words = nltk.corpus.stopwords.words('english')
  tokens = [token for token in tokens if token not in stop_words]
  return " ".join(tokens)

def generate_recommendations(predicted_score, observation):
  """
  Generates recommendations based on the predicted score and keywords in the observation.
  """
  recommendations = []

  # Keyword-based recommendations
  if "product" in observation:
    recommendations.append("Focus on enhancing your product's unique selling points and ensuring it meets customer needs.")
  if "service" in observation:
    recommendations.append("Improve your customer service by addressing common pain points and being responsive to feedback.")
  if "market" in observation:
    recommendations.append("Conduct thorough market research to identify opportunities and understand your target audience.")
  if "development" in observation:
    recommendations.append("Adopt agile development practices to increase productivity and adaptability.")
  if "team" in observation:
    recommendations.append("Invest in team building and ensure you have the right skills and a collaborative culture.")
  if "funding" in observation:
    recommendations.append("Explore diverse funding options and build strong relationships with investors.")
  if "operations" in observation:
    recommendations.append("Optimize your operations for efficiency and scalability.")

  # Score-based recommendations
  if predicted_score >= 4.5:
    recommendations.append("Your startup is on the right track. Keep up the excellent work!")
  elif 3.5 <= predicted_score < 4.5:
    recommendations.append("Your startup is doing well. Focus on refining your strategies for even better results.")
  elif 2.5 <= predicted_score < 3.5:
    recommendations.append("Your startup has potential. Consider making improvements in key areas to boost growth.")
  elif 1.5 <= predicted_score < 2.5:
    recommendations.append("Your startup needs significant improvements. Identify critical areas for development.")
  else:
    recommendations.append("Your startup is facing major challenges. Prioritize addressing foundational issues.")

  return " ".join(recommendations)
