# Flaskとrender_template（HTMLを表示させるための関数）をインポート
from flask import Flask, render_template, request
# base64のインポート
import base64
from .python import compare_Pic

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

#表示画像のget
@app.route("/pictureGet")
def pictureGet():
    
    enc_data = ""
    return enc_data

#比較画像のpost
@app.route("/picturePost")
def picturePost():
    enc_data  = request.form['img']
    dec_data = base64.b64decode(enc_data.split(',')[1] ) # 環境依存の様(","で区切って本体をdecode)
    with open("before.jpg", 'bw') as f:
        f.write(dec_data)
    # compare_Pic.
    return 0

#カウント開始・中断合図のget
@app.route("/countStartGet")
def countStartGet():
    return 0

#送信許可のpost
@app.route("/sendOkPost")
def sendOkPost():
    return 0

#回答データのget
@app.route('/answerGet', methods=['GET'])  # Getだけ受け付ける
def answerGet():  # 関数名は重複していなければなんでもよい
    cur.execute("SELECT * FROM テーブル名 ORDER BY 列名 DESC LIMIT 1")

    result = ""
    return result

#回答データのpost	
@app.route('/answerPost', methods=['POST'])
def answerPost():
    answer = request.form['answer']
    cur.execute("INSERT INTO テーブル名 VALUES " + answer)
    return 0

#正解データのget
@app.route("/trueAnswer")
def trueAnswer():
    return 0

#サーバ起動
if __name__ == "__main__":
    app.run(debug=True)