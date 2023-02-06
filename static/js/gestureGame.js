let whichUser = "gesture";
let gameCome = true;

function playerGet(){
    if(whichUser === "gesture"){
        document.getElementById("pose").textContent = "ポーズを決めよう";
        document.getElementById("Area_Countdown").style.visibility = "visible";
        document.getElementById("answerForm").style.visibility = "hidden";
        dispVideo();
    }else{
        document.getElementById("pose").textContent = "このポーズが何か書こう！";
        document.getElementById("answerForm").style.visibility = "visible";
        document.getElementById("Area_Countdown").style.visibility = "hidden";
        dispImg();
    }
}

function finish(){
    gameCome = false;
    // 回答データをリセット
    getAnswerData = "ああああ";
    // 要素削除
    let parent = document.getElementById('Area_Picture');
    parent.innerHTML = "";
    textboxElement.innerHTML = "";

    // 次のゲームの準備
    if(whichUser === "gesture"){
        whichUser = "player";
    }else{
        whichUser = "gesture";
    }
    
    // 次のゲームを開始
    setTimeout(() => {
        console.log("nextGameStart")
        playerGet();
        gameActivity();
    }, 5000);
}

function gameActivity(){
    getOdai();
    // 画面表示について
    gameInterval = setInterval(() => {
        if(whichUser === "gesture"){
            picturePost();
        }else{
            pictureGet();
        }
    }, 2000);
    // 回答について
    answerInterval = setInterval(() => {    
        answerGet('http://34.127.34.164/answerGet');
    }, 1000)
}

if(gameCome){
    playerGet();
    gameActivity();
}

function postFinish(){
    fetch("http://34.127.34.164/finishPost", {
        method: 'POST',
        body: "",
    }).then(function(response) {
        return response.text();
    }).then(function(text) {
        console.log(text);
    }).catch(error => {
        console.log(error.message);
    });
}

// function getFinish(){
//     fetch("http://34.127.34.164/finishGet", {
//     }).then(function(response) {
//         return response.text();
//     }).then(function(text) {
//         console.log(text);
//         finish();
//     }).catch(error => {
//         console.log(error.message);
//     });
// }