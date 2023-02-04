let whichUser = "gesture";
let gameCome = true;

function playerGet(){
    if(whichUser === "gesture"){
        document.getElementById("Area_Countdown").style.visibility = "visible";
        document.getElementById("answerForm").style.visibility = "hidden";
        dispVideo();
    }else{
        document.getElementById("answerForm").style.visibility = "visible";
        document.getElementById("Area_Countdown").style.visibility = "hidden";
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
    let parent = document.getElementById('Area_Picture');
    // let target
    // if(whichUser === "gesture"){
    //     target = document.getElementById('video');
    // }else{
    //     target = document.getElementById('viewImg');
    // }
    for (let i = parent.childNodes.length1; i>=0; i--) {
        parent.removeChild(parent.childNodes[1]);
    }
    // 次のゲームを開始
    setTimeout(gameActivity(), 2000);
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