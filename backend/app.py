from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Temporary in-memory user storage
users = []

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # Check if user already exists
    if any(user["email"] == email for user in users):
        return jsonify({"message": "User already exists"}), 400

    # Save new user
    users.append({"email": email, "password": password})
    return jsonify({"message": "Signup successful!"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # Find user
    user = next((u for u in users if u["email"] == email and u["password"] == password), None)
    if user:
        return jsonify({
            "token": "fake-jwt-token",
            "message": "Login successful"
        }), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401


if __name__ == "__main__":
    app.run(debug=True, port=5000)
