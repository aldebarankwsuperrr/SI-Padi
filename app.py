from flask import Flask, render_template, request, Response
from tensorflow.keras.models import load_model
import numpy as np
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.applications.vgg16 import preprocess_input
import os
import cv2
from tensorflow.keras.preprocessing import image
import tensorflow as tf
app = Flask(__name__)


leafCascade = cv2.CascadeClassifier("static/src/cascade3.xml")
model = load_model('static/src/test_model08.h5')
label= ['Bacterial leaf blight',
          'Brown Spot',
          'Leaf Smut']


@app.route('/')
def index_view():
    return render_template('index.html')

#Allow files with extension png, jpg and jpeg
ALLOWED_EXT = set(['jpg' , 'jpeg' , 'png'])
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXT
           
# Function to load and prepare the image in right shape
def read_image(filename):

    img = load_img(filename, target_size=(150, 150))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    return x

@app.route('/predict',methods=['GET','POST'])
def predict():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            filename = file.filename
            file_path = os.path.join('static/images', filename)
            file.save(file_path)
            img = read_image(file_path)
            classes=model.predict(img) 
            index = np.argmax(classes)
            return render_template('predict.html', fruit = label[index],prob=classes[0][index]*100, user_image = file_path)
        else:
            return render_template('index.html')


def detect_leaf(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    leaf = leafCascade.detectMultiScale(
        gray,
        scaleFactor = 1.05,
        minNeighbors = 6,
        minSize = (150,150),
        maxSize = (800,800)
    )
    
    for (x, y, w, h) in leaf:
        load = frame[y:y+h, x:x+w]
        load = cv2.resize(load, (150,150))
        z = tf.keras.utils.img_to_array(load)
        z = np.expand_dims(z, axis=0)
        images = np.vstack([z])
        classes = model.predict(images)
        index = np.argmax(classes)    
        cv2.putText(frame, label[index], (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0), 2) 
        cv2.rectangle(frame, (x,y), (x+w,y+h), (255,0,255), 2)
    return frame

def gen_frames():  
    camera = cv2.VideoCapture(0)
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            frame = detect_leaf(frame)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), 
                    mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/detect')
def detector():
    return render_template('detect.html')

if __name__ == '__main__':
    app.run(debug=True,use_reloader=False, port=8000)