from flask import Flask, request, jsonify
import cv2
import cvzone
from cvzone.FaceMeshModule import FaceMeshDetector
from cvzone.PlotModule import LivePlot

app = Flask(__name__)

detector = FaceMeshDetector(maxFaces=1)
plotY = LivePlot(640, 360, [20, 50], invert=True)

# the idlist will be give the distance around the eyes google distance 243=edge distance of eye
idList = [22, 23, 24, 26, 110, 157, 158, 159, 160, 161, 130, 243]
ratioList = []
blinkCounter = 0
counter = 0
color = (255, 0, 255)

def detect_blink(face):
    global blinkCounter, counter, color, ratioList

    for id in idList:
        cv2.circle(face, face[id], 5, color, cv2.FILLED)

    leftUp = face[159]
    leftDown = face[23]
    leftLeft = face[130]
    leftRight = face[243]
    lengthVer, _ = detector.findDistance(leftUp, leftDown)
    lengthHor, _ = detector.findDistance(leftLeft, leftRight)

    cv2.line(face, leftUp, leftDown, (0, 200, 0), 3)
    cv2.line(face, leftLeft, leftRight, (0, 200, 0), 3)

    ratio = int((lengthVer / lengthHor) * 100)
    ratioList.append(ratio)
    if len(ratioList) > 3:
        ratioList.pop(0)
    ratioAvg = sum(ratioList) / len(ratioList)

    if ratioAvg < 35 and counter == 0:
        blinkCounter += 1
        color = (0, 200, 0)  # green --blink then green
        counter = 1
    if counter != 0:
        counter += 1
        if counter > 10:
            counter = 0
            color = (255, 0, 255)  # all other time it's purple

    cvzone.putTextRect(face, f'Blink Count: {blinkCounter}', (50, 100), colorR=color)

    imgPlot = plotY.update(ratioAvg, color)
    face = cv2.resize(face, (640, 360))
    imgStack = cvzone.stackImages([face, imgPlot], 2, 1)
    
    return imgStack

@app.route('/detect_blink', methods=['POST'])
def detect_blink_route():
    data = request.json
    # print(data)

    # Assuming 'face' is a dictionary key in 'data' containing face information
    face_data = data.get('face', {})
    
    # Perform eye blink detection on the face data
    result_image = detect_blink(face_data)

    # You can save the result_image or further process it as needed

    return jsonify({'blinkCount': blinkCounter})

if __name__ == '__main__':
    app.run(port=5000)
