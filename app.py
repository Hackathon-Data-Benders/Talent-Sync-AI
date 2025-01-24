from flask import Flask, render_template, request, jsonify
from models.GPT2_Small import get_response

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.form['message']
    # Simulate a chatbot response (for demonstration purposes)
    #bot_response = f"Echo: {user_message}"
    response = get_response(user_message)
    bot_response = f"{response}"
    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)
