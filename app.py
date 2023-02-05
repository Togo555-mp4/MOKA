# Flaskとrender_template（HTMLを表示させるための関数）をインポート
from flask import Flask, render_template, request
# base64のインポート
import base64
import random
from python import connect_Maria, compare_Pic

# Flaskオブジェクトの生成
app = Flask(__name__)
# 生成する答えの番号
answerNum = random.randrange(11)
# 画像の送信許可
sendOK = "NO"
# 回答の送信許可
answerFirst = "NO"

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
    global answerFirst
    answerFirst = "NO"
    return render_template("gestureView.html")

# メインのゲーム画面(はじめ回答者側)
@app.route("/playerGame")
def playerGame():
    global answerFirst
    answerFirst = "NO"
    return render_template("playerView.html")

#ゲームの終了post
@app.route("/finishPost", methods=['POST'])
def finishPost():
    global answerNum
    global answerFirst
    answerNum = random.randrange(11)
    answerFirst = "NO"
    return "finish " + answerFirst + " answerNum:" + str(answerNum)

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

    if(difference < 5):
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
    if(answerFirst == "OK"):
        data = connect_Maria.getMariadb("SELECT comment from answers where comid=(select MAX(comid) from answers);")
        if data is None:
            result = "data is none"
        else:
            result = data[0][0]
        return result
    else:
        return "data is none"

# 回答データのpost
@app.route('/answerPost', methods=['POST'])
def answerPost():
    global answerFirst
    answer = request.form['answer']
    connect_Maria.postMariadb("INSERT INTO answers (userid, comment) VALUES(1, '" + answer + "');")
    answerFirst = "OK"
    return answer

# 正解データのget
@app.route("/trueAnswer", methods=['GET'])
def trueAnswer():
    global answerNum
    ans = connect_Maria.getMariadb("SELECT question FROM questions LIMIT 1 OFFSET " + str(answerNum) + ";")
    if ans is None:
        result = "ans is none"
    else:
        result = ans[0][0]
    return result
    
# サーバ起動
if __name__ == "__main__":
    app.run(debug=True)