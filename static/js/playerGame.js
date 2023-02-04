let whichUser = "player";
let gameCome = true;

function playerGet(){
    if(whichUser === "gesture"){
        document.getElementById("answerForm").style.display ="none";
        dispVideo();
    }else{
        document.getElementById("Area_Countdown").style.display ="none";
        dispImg();
    }
}

function finish(){
    gameCome = false;
    // 次のゲームの準備
    if(whichUser === "gesture"){
        whichUser = "player";
    }else{
        whichUser = "gesture";
    }
    // 要素削除
    let parent = document.querySelector('Area_Picture');
    let target
    if(whichUser === "gesture"){
        target = document.querySelector('video');
    }else{
        target = document.querySelector('viewImg');
    }
    parent.removeChild(target);
    // 次のゲームを開始
    gameActivity();
}

function gameActivity(){
    getOdai();
    // 1秒ごとに行うもの
    gameInterval = setInterval(() => {
        // 画面表示について
        if(whichUser === "gesture"){
            picturePost();
        }else{
            pictureGet();
        }
        // 回答について
        answerGet('http://34.127.34.164/answerGet');
    }, 1000);
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