const textboxElement = document.getElementById('Area_AnsOutput');
const answerForm = document.querySelector('#answerForm');
const btn = document.querySelector('#btn');

let odai;
let getAnswerData = "ああああ";

function answerGet(url){
    fetch(url)
    .then(function(response) {
        return response.text();
    })
    .then(function(text) {
        console.log(text)
        if(text !== "data is none" & text !== getAnswerData){
            // 新しいHTML要素を作成
            let newElement = document.createElement('p');
            let newContent = document.createTextNode(text);
            newElement.appendChild(newContent);
            newElement.setAttribute("class","answerElement");
            // 指定した要素の中の末尾に挿入
            textboxElement.appendChild(newElement);
            getAnswerData = text;
            answerCheck(text, "get");
        }
    }).catch(error => {
        console.log(error.message)
    });
}

function answerPost(url) {
    // Postで送るパラメータを作成
    let formData = new FormData(answerForm);
    let answer;
    for (let value of formData.entries()) {
        answer = value[1];
    }
    answerCheck(answer, "post");
    fetch(url, {
        method: 'POST',  // methodを指定しないとGETになる
        body: formData,  // Postで送るパラメータを指定
    })
    .then(function() {  // Postした後に結果をGetする
        answerGet('http://34.127.34.164/answerGet');
        console.log("Answer Post Success");
    }).catch(error => {
        console.log(error.message)
    });
}

function answerCheck(userAnswer, dic){
    if(userAnswer === odai){
        if(dic === "post"){
            sumPoint();
            postFinish();
        }
        dispOdai();
        clearInterval(gameInterval);
        setTimeout(finish(), 1000);
    }
}

function sumPoint(){
    let userPoint = document.getElementById('userPoint');
    let newPoint = Number(userPoint.textContent) + 100;
    userPoint.textContent = newPoint;
}

function dispOdai(){
    let odaiArea = document.getElementById('odaiAnswer');
    odaiArea.textContent = odai;
}

function getOdai(){
    fetch("http://34.127.34.164/trueAnswer")
    .then(function(response) {
        return response.text();
    })
    .then(function(text) {
        odai = text;
        console.log(odai)
        if(whichUser == "gesture"){
            dispOdai();
        }
    }).catch(error => {
        console.log(error.message)
    });
}