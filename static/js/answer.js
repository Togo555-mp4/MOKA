const textbox_element = document.getElementById('Area_AnsOutput');
const answerForm = document.querySelector('#answerForm');
const btn = document.querySelector('#btn');

function answerGet(url){
    fetch(url)
    .then(function(response) {
        confirm.log(response)
        return response.text();
    })
    .then(function(text) {
        // 新しいHTML要素を作成
        let new_element = document.createElement('p');
        new_element.textContent = text;
        // 指定した要素の中の末尾に挿入
        textbox_element.appendChild(new_element);
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
    .then(function() {  // Postした後に結果をGetする（コールバックなのでPostが実行完了してから実行される）
        answerGet('http://35.230.86.157/answerGet');
        console.log("Answer Post Success");
    });
}

function answerCheck(userAnswer, dic){
    fetch("http://35.230.86.157/trueAnswer")
    .then(function(response) {
        return response.text();
    })
    .then(function(tureAnswer) {
        if(userAnswer === tureAnswer){
            if(dic === "post"){
                sumPoint()
            }else{
                dispOdai()
            }
        }
    });
}

function sumPoint(){
    let userPoint = document.getElementById('userPoint');
    let newPoint = Number(userPoint.textContent) + 100;
    userPoint.textContent = newPoint;
}

function dispOdai(getAnswer){
    fetch("http://35.230.86.157/trueAnswer")
    .then(function(response) {
        return response.text();
    })
    .then(function(tureAnswer) {
        if(getAnswer === tureAnswer){
            let odai = document.getElementById('odaiAnswer');
            odai.textContent = getAnswer;
        }
    });
}

// function testAnswerCheck(usetAnswer){
//     tureAnswer = "あいうえお";
//     let userPoint = document.getElementById('userPoint');
//     if(usetAnswer == tureAnswer){
//         // let userPoint = document.getElementById('userPoint');
//         let newPoint = Number(userPoint.textContent) + 100;
//         userPoint.textContent = newPoint;
//     }
// }

btn.addEventListener('click', answerForm, false);