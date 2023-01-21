# Flaskとrender_template（HTMLを表示させるための関数）をインポート
from flask import Flask, render_template, request
# base64のインポート
import base64
from python import connect_Maria

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

# startOK = "ON"
# sendOK = "ON"
# #表示画像のget
# @app.route("/pictureGet")
# def pictureGet():
#     if(sendOK == "ON"):
#         return 0
#     elif(sendOK == "OK"):
#         enc_data = ""
#         with open("after.jpg", "rb") as f:
#             enc_data = base64.b64decode(f.read())
#         return enc_data.decode('utf-8')

# #比較画像のpost
# @app.route("/picturePost")
# def picturePost():
#     enc_data  = request.form['img']
#     dec_data = base64.b64decode(enc_data.split(',')[1] ) # 環境依存の様(","で区切って本体をdecode)
#     with open("before.jpg", 'bw') as f:
#         f.write(dec_data)
#     difference = 0
#     if(difference < 5):
#         startOK = "OK"
#     else:
#         startOK = "ON"
#     return 0

# #カウント開始・中断合図のget
# @app.route("/countStartGet")
# def countStartGet():
#     return startOK

# #送信許可のpost
# @app.route("/sendOkPost")
# def sendOkPost():
#     sendOK = "sendOKPost"
#     return 0

#回答データのget
@app.route('/answerGet', methods=['GET'])  # Getだけ受け付ける
def answerGet():
    data = connect_Maria.getMariadb("SELECT * FROM answers ORDER BY userid ASCS LIMIT 1")
    if data is None:
        result = "data is none"
    else:
        result = data[0][1]
    return result

#回答データのpost
postNum = 1
@app.route('/answerPost', methods=['POST'])
def answerPost():
    global postNum
    answer = request.form['answer']
    connect_Maria.postMariadb("INSERT INTO answers VALUES (" + str(postNum) + ", '" + answer + "')")
    return answer

#正解データのget
@app.route("/trueAnswer", methods=['GET'])
def trueAnswer():
    return ""
    
#サーバ起動
if __name__ == "__main__":
    app.run(debug=True)