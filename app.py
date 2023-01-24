# Flaskとrender_template（HTMLを表示させるための関数）をインポート
from flask import Flask, render_template, request
# base64のインポート
import base64
from python import connect_Maria, compare_Pic

# Flaskオブジェクトの生成
app = Flask(__name__)

#「/」へアクセスがあった場合に、"Hello World"の文字列を返す
@app.route("/")
def hello():
    return "Hello World"

#最初の画面
@app.route("/index")
def index():
    return render_template("index.html")

#メインのゲーム画面
@app.route("/game")
def game():
    return render_template("playerView.html")

# @app.route("/playerCheck")
# def playerCheck():
#     return "player"

startOK = "ON"
sendOK = "ON"
#表示画像のget
@app.route("/pictureGet", methods=['GET'])
def pictureGet():
    global sendOK
    if(sendOK == "ON"):
        return 0
    elif(sendOK == "OK"):
        enc_data = ""
        with open("after.jpg", "rb") as f:
            enc_data = base64.b64decode(f.read())
        return enc_data.decode('utf-8')

#比較画像のpost
@app.route("/picturePost", methods=['POST'])
def picturePost():
    global startOK
    enc_data = request.json['img']
    dec_data = base64.b64decode(enc_data)
    with open("/var/www/html/MOKA/python/img/before.jpg", mode='wb') as f:
        f.write(dec_data)

    difference = compare_Pic.comparePic("/var/www/html/MOKA/python/img/before.jpg", "/var/www/html/MOKA/python/img/after.jpg")

    with open("/var/www/html/MOKA/python/img/after.jpg", mode='wb') as f:
        f.write(dec_data)

    if(difference < 5):
        startOK = "OK"
    else:
        startOK = "ON"
    return 0

#カウント開始・中断合図のget
@app.route("/countStartGet", methods=['GET'])
def countStartGet():
    global startOK
    return startOK

#送信許可のpost
@app.route("/sendOkPost", methods=['POST'])
def sendOkPost():
    global sendOK
    sendOK = "OK"
    return 0

#回答データのget
@app.route('/answerGet', methods=['GET'])  # Getだけ受け付ける
def answerGet():
    data = connect_Maria.getMariadb("SELECT comment from answers where comid=(select MAX(comid) from answers);")
    if data is None:
        result = "data is none"
    else:
        result = data[0][0]
    return result

#回答データのpost
postNum = 1
@app.route('/answerPost', methods=['POST'])
def answerPost():
    global postNum
    answer = request.form['answer']
    connect_Maria.postMariadb("INSERT INTO answers (userid, comment) VALUES(1, '" + answer + "');")
    return answer

#正解データのget
@app.route("/trueAnswer", methods=['GET'])
def trueAnswer():
    ans = connect_Maria.getMariadb("SELECT question FROM questions ORDER BY RAND() LIMIT 1;")
    if ans is None:
        result = "ans is none"
    else:
        result = ans[0][0]
    return result
    
#サーバ起動
if __name__ == "__main__":
    app.run(debug=True)