
from flask import Flask, request, render_template, jsonify
from model import Model

app = Flask(__name__)

model_instance = Model()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_data', methods=['POST'])
def get_data():
    global model_instance
    selected_values = {
        'selectBox': request.form['selectBox'],
        'selectBox2': request.form['selectBox2'],
        'selectBox3': request.form['selectBox3'],
        'selectBox4': request.form['selectBox4'],
        'selectBox5': request.form['selectBox5'],
        'selectBox6': request.form['selectBox6']
    }

    # Modelクラスのインスタンスを通じてデータを更新
    model_instance.update_data(selected_values)

    return 'Data received successfully'

if __name__ == '__main__':
    app.run(debug=True)
