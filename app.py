# Flaskとrender_template（HTMLを表示させるための関数）をインポート
from flask import Flask, render_template, request
# base64のインポート
import base64
import random
from python import connect_Maria, compare_Pic

# Flaskオブジェクトの生成
app = Flask(__name__)

#「/」へアクセスがあった場合に、"Hello World"の文字列を返す
@app.route("/")
def hello():
    return "Hello World"

# 最初の画面
@app.route("/index")
def index():
    return render_template("index.html")

# メインのゲーム画面(はじめジェスチャー側)
@app.route("/gestureGame")
def gestureGame():
    return render_template("gestureView.html")

# メインのゲーム画面(はじめ回答者側)
@app.route("/playerGame")
def playerGame():
    return render_template("playerView.html")

# gameFinsh = "noFinish"
#ゲームの終了post
@app.route("/finishPost", methods=['POST'])
def finishPost():
    global answerNum
    answerNum = random.randrange(11)
    # global gameFinsh
    # gameFinsh = "finish"
    return "finish"

# #ゲームの終了get
# @app.route("/finishGet", methods=['Get'])
# def finishGet():
#     global gameFinsh
#     if(gameFinsh == "noFinish"):
#         return "NO"
#     elif(gameFinsh == "finish"):
#         gameFinsh == "noFinish"
#         return "finish"


sendOK = "NO"
# 表示画像のget
@app.route("/pictureGet", methods=['GET'])
def pictureGet():
    global sendOK
    if(sendOK == "NO"):
        return "NO"
    elif(sendOK == "OK"):
        sendOK = "NO"
        # enc_data = ""
        # with open("/var/www/html/MOKA/python/img/after.jpg", "rb") as f:
        #     enc_data = base64.b64encode(f.read())
        # sendOK = "NO"
        # return {"img": enc_data.decode('utf-8')}
        return "OK"

# 比較画像のpost
@app.route("/picturePost", methods=['POST'])
def picturePost():
    startOK = ""
    enc_data = request.json['img']
    dec_data = base64.b64decode(enc_data)
    with open("/var/www/html/MOKA/static/img/before.jpg", mode='wb') as f:
        f.write(dec_data)
    difference = compare_Pic.comparePic("/var/www/html/MOKA/static/img/before.jpg", "/var/www/html/MOKA/static/img/after.jpg")
    with open("/var/www/html/MOKA/static/img/after.jpg", mode='wb') as f:
        f.write(dec_data)

    if(difference < 15):
        startOK = "OK"
    else:
        startOK = "NO"
    return startOK

# 送信許可のpost
@app.route("/sendOkPost", methods=['POST'])
def sendOkPost():
    global sendOK
    sendOK = "OK"
    return sendOK

# 回答データのget
@app.route('/answerGet', methods=['GET'])  # Getだけ受け付ける
def answerGet():
    data = connect_Maria.getMariadb("SELECT comment from answers where comid=(select MAX(comid) from answers);")
    if data is None:
        result = "data is none"
    else:
        result = data[0][0]
    return result

# 回答データのpost
postNum = 1
@app.route('/answerPost', methods=['POST'])
def answerPost():
    global postNum
    answer = request.form['answer']
    connect_Maria.postMariadb("INSERT INTO answers (userid, comment) VALUES(1, '" + answer + "');")
    return answer

# 正解データのget
answerNum = random.randrange(11)
@app.route("/trueAnswer", methods=['GET'])
def trueAnswer():
    global answerNum
    ans = connect_Maria.getMariadb("SELECT question FROM questions LIMIT 1 OFFSET" + str(answerNum) + ";")
    if ans is None:
        result = "ans is none"
    else:
        result = ans[0][0]
    return result
    
# サーバ起動
if __name__ == "__main__":
    app.run(debug=True)