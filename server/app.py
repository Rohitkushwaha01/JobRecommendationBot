from flask import Flask, request, jsonify
from keras.models import load_model
import nltk
import numpy as np
import pickle
import json
import random
from nltk.stem import WordNetLemmatizer


app = Flask(__name__)

nltk.download('punkt')
nltk.download('wordnet')
lemmatizer = WordNetLemmatizer()

# Load the trained model and preprocessed data
model = load_model('/content/chatbot_model.h5')
words = pickle.load(open('/content/words.pkl', 'rb'))
categories = pickle.load(open('/content/categories.pkl', 'rb'))

with open('/content/Chabotdataset.json', 'r') as file:
    intents_json = json.load(file)

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bow(sentence, words, show_details=True):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
                if show_details:
                    print("found in bag: %s" % w)
    return np.array(bag)

def predict_class(sentence, model):
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]

    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": categories[r[0]], "probability": str(r[1])})
    return return_list

def get_response(intents_list, intents_json):
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break
    return result

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    user_input = data['user_input']
    intents = predict_class(user_input, model)
    response = get_response(intents, intents_json)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)