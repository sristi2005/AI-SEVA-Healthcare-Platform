from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ---------------------------------------
# Root route
# ---------------------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "project": "AI-SEVA",
        "status": "Backend is running successfully"
    })


# ---------------------------------------
# Health check route
# ---------------------------------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "OK"})


# ---------------------------------------
# MAIN HEALTH QUERY API (FULL LOGIC)
# ---------------------------------------
@app.route("/health-query", methods=["POST"])
def health_query():
    data = request.get_json()
    question = data.get("question", "")

    if not question:
        return jsonify({"error": "Question is required"}), 400

    q = question.lower()

    # Emergency symptoms
    emergency_keywords = [
        "chest pain", "difficulty breathing", "shortness of breath",
        "unconscious", "severe bleeding", "heart attack",
        "stroke", "fits", "seizure"
    ]

    for word in emergency_keywords:
        if word in q:
            return jsonify({
                "question": question,
                "answer": (
                    "⚠️ This may be a medical emergency. "
                    "Please seek immediate medical attention or visit the nearest hospital."
                )
            })

    # Common conditions
    if "fever" in q:
        answer = (
            "Fever may indicate an infection. Drink plenty of fluids, take rest, "
            "and consult a doctor if fever persists for more than two days."
        )
    elif "headache" in q:
        answer = (
            "Headache can be caused by stress, dehydration, or lack of sleep. "
            "Rest in a quiet place and stay hydrated."
        )
    elif "cough" in q or "cold" in q:
        answer = (
            "Cough or cold is usually viral. Drink warm fluids, take steam inhalation, "
            "and rest well."
        )
    elif "stomach" in q or "abdominal" in q:
        answer = (
            "Stomach discomfort may be due to indigestion. Avoid spicy food and "
            "drink warm water. Consult a doctor if pain continues."
        )
    elif "vomiting" in q or "nausea" in q:
        answer = (
            "Vomiting may cause dehydration. Take small sips of fluids and rest. "
            "Seek medical care if it continues."
        )
    elif "diabetes" in q:
        answer = (
            "Diabetes requires proper medical diagnosis and monitoring. "
            "Maintain a healthy diet and consult a healthcare professional."
        )
    elif "blood pressure" in q:
        answer = (
            "Blood pressure issues should be monitored regularly. "
            "Reduce salt intake and consult a doctor for proper evaluation."
        )
    else:
        answer = (
            "Based on the symptoms described, this may be a common health condition. "
            "Maintain hydration, take adequate rest, avoid self-medication, "
            "and consult a qualified healthcare professional if symptoms persist."
        )

    return jsonify({
        "question": question,
        "answer": answer
    })



# ---------------------------------------
# NEWS API (MOCK DATA)
# ---------------------------------------
@app.route("/news", methods=["POST"])
def get_news():
    data = request.get_json()
    language = data.get("language", "English")

    # Mock news data based on language (simplified for demo)
    # The frontend parses "Title: ...\nDescription: ...\nContent: ...\nURL: ...\nSource: ...\nDate: ..."
    
    news_content = ""
    
    if language == "Hindi":
        news_content = """Title: ग्रामीण क्षेत्रों में टेलीमेडिसिन का विस्तार
Description: सरकार ने ग्रामीण भारत में स्वास्थ्य सेवाओं को बेहतर बनाने के लिए नई टेलीमेडिसिन पहल शुरू की है।
Content: स्वास्थ्य मंत्रालय ने घोषणा की है कि अगले वर्ष तक 50,000 गांवों को टेलीमेडिसिन नेटवर्क से जोड़ा जाएगा। इससे दूरदराज के इलाकों में विशेषज्ञ डॉक्टरों की सलाह लेना आसान होगा।
URL: https://example.com/news1
Source: स्वास्थ्य मंत्रालय
Date: 2024-05-20

Title: मधुमेह के लिए नए दिशा-निर्देश जारी
Description: आईसीएमआर ने टाइप 2 मधुमेह के प्रबंधन के लिए नए दिशा-निर्देश जारी किए हैं।
Content: भारतीय चिकित्सा अनुसंधान परिषद (ICMR) ने कहा है कि जीवनशैली में बदलाव और नियमित जांच से मधुमेह को नियंत्रित किया जा सकता है। नए दिशा-निर्देशों में आहार और व्यायाम पर जोर दिया गया है।
URL: https://example.com/news2
Source: ICMR
Date: 2024-05-18"""
    else:
        news_content = """Title: Telemedicine Expansion in Rural Areas
Description: The government has launched a new telemedicine initiative to improve healthcare services in rural India.
Content: The Ministry of Health announced that 50,000 villages will be connected to the telemedicine network by next year. This will make it easier to consult specialist doctors in remote areas.
URL: https://example.com/news1
Source: Ministry of Health
Date: 2024-05-20

Title: New Guidelines Issued for Diabetes
Description: ICMR has issued new guidelines for the management of Type 2 diabetes.
Content: The Indian Council of Medical Research (ICMR) has stated that diabetes can be controlled through lifestyle changes and regular check-ups. The new guidelines emphasize diet and exercise.
URL: https://example.com/news2
Source: ICMR
Date: 2024-05-18"""

    return jsonify({"news": news_content})


# ---------------------------------------
# FIND DOCTORS API (FOR MAP + CARDS)
# ---------------------------------------
@app.route("/doctors", methods=["POST"])
def find_doctors():
    data = request.get_json()
    condition = data.get("condition", "").lower()
    location = data.get("location", "").lower()

    if not condition or not location:
        return jsonify({"error": "Condition and location required"}), 400

    # Dummy doctor database
    doctors_data = [
        {
            "name": "Dr. Ramesh Kumar",
            "specialization": "Cardiologist",
            "experience": "10 years",
            "fee": "₹500",
            "location": "Hyderabad",
            "profile": "https://example.com",
            "lat": 17.3850,
            "lng": 78.4867
        },
        {
            "name": "Dr. Anil Reddy",
            "specialization": "General Physician",
            "experience": "8 years",
            "fee": "₹400",
            "location": "Hyderabad",
            "profile": "https://example.com",
            "lat": 17.4000,
            "lng": 78.4900
        }
    ]

    results = [
        doc for doc in doctors_data
        if location in doc["location"].lower()
    ]

    return jsonify({
        "doctorsData": results
    })


# ---------------------------------------
# Handle unknown routes
# ---------------------------------------
@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "API route not found"}), 404


# ---------------------------------------
# Run server
# ---------------------------------------
if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
