
import joblib
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

# 1. Training Data (Expanded Rule-Based Logic)
# We need to TEACH the model what words mean what categories.
X_train = [
    # Emergency
    "heart attack chest pain", "severe breathing difficulty", "unconscious patient", 
    "heavy bleeding accident", "emergency help needed", "collapsed on floor",
    "severe trauma and injury", "cannot breathe choking", "chest feels heavy",
    
    # Fever
    "high fever temperature", "shivering and hot", "burning up body heat", 
    "thermometer shows high degrees", "feeling feverish and cold", "viral fever symptoms",
    
    # Headache
    "severe headache migraine", "head hurts a lot", "dizzy and head spinning",
    "splitting head pain", "throbbing headache", "cannot open eyes head hurts",
    
    # Cold
    "runny nose sneezing", "cold and cough", "sore throat infection",
    "flu symptoms weakness", "blocked nose congestion", "coughing constantly",
    
    # Stomach
    "stomach ache pain", "abdominal cramps gas", "acidity and digestion issues",
    "belly hurts food poisoning", "severe stomach burn", "digestive problem",
    
    # Vomiting
    "vomiting and nausea", "feel like puking", "threw up food",
    "nauseous sensation", "vomit smell sickness",
    
    # Diabetes
    "high blood sugar", "insulin injection diabetes", "glucose levels shot up",
    "diabetic patient sugar", "need sweet for low sugar",
    
    # BP
    "high blood pressure", "hypertension symptoms", "bp is very high",
    "low bp dizziness", "blood pressure checkup",
    
    # Common / Other
    "feeling tired weakness", "general body pain", "knee hurts joint pain",
    "back ache", "skin rash itching", "hair fall problem", "cut on finger"
]

y_train = [
    "emergency", "emergency", "emergency", "emergency", "emergency", "emergency", "emergency", "emergency", "emergency",
    "fever", "fever", "fever", "fever", "fever", "fever",
    "headache", "headache", "headache", "headache", "headache", "headache",
    "cold", "cold", "cold", "cold", "cold", "cold",
    "stomach", "stomach", "stomach", "stomach", "stomach", "stomach",
    "vomiting", "vomiting", "vomiting", "vomiting", "vomiting",
    "diabetes", "diabetes", "diabetes", "diabetes", "diabetes",
    "blood_pressure", "blood_pressure", "blood_pressure", "blood_pressure", "blood_pressure",
    "common", "common", "common", "common", "common", "common", "emergency" # "cut on finger" -> simulating emergency logic? or common. Let's say common for small cut, but rules said emergency. 
]

print("Training Naive Bayes Model...")
model = make_pipeline(CountVectorizer(), MultinomialNB())
model.fit(X_train, y_train)

# Save Model
joblib.dump(model, "model.pkl")
print("Model saved to 'model.pkl'")
print("Ready for backend integration.")
