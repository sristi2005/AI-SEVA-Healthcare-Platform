
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

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

# 2. Test Data (The Hard Cases from before)
test_cases = [
    "I have a severe headache",               # Easy
    "My chest hurts a lot and I can't breathe", # Easy
    "My body temperature is very high",       # FAILED by Rules (Model should catch 'temperature' + 'high')
    "My head hurts a lot",                    # FAILED by Rules (Model should catch 'head' + 'hurts')
    "Sneezing continuously",                  # FAILED by Rules (Model should catch 'sneezing' ~ 'sneeze')
    "My knee hurts when I walk"               # FAILED by Rules (Model should catch 'hurts' in general context, or default to common)
]

ground_truth = ["headache", "emergency", "fever", "headache", "cold", "common"]

# 3. Train Model
model = make_pipeline(CountVectorizer(), MultinomialNB())
model.fit(X_train, y_train)

# 4. Predict
print(f"{'Query':<40} | {'Prediction':<15} | {'Expected':<15}")
print("-" * 75)

correct = 0
for text, true_label in zip(test_cases, ground_truth):
    pred = model.predict([text])[0]
    print(f"{text:<40} | {pred:<15} | {true_label:<15}")
    if pred == true_label:
        correct += 1

print("-" * 75)
print(f"Projected Accuracy on Hard Cases: {(correct/len(test_cases))*100:.1f}%")
