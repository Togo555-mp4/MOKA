let whichUser = "gesture";
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
    clearInterval(gameInterval);
    gameCome = false;
    // 次のゲームの準備
    if(whichUser === "gesture"){
        whichUser = "player";
    }else{
        whichUser = "gesture";
    }
    // 次のゲームを開始
    gameActivity();
}

function gameActivity(){
    getOdai();
    // 1秒ごとに行うもの
    gameInterval = setInterval(() => {
        // 画面表示について
        console.log(whichUser);
        if(whichUser === "gesture"){
            picturePost();
        }else{
            pictureGet();
        }
        // 回答について
        // answerGet('http://34.127.34.164/answerGet');
    }, 1000);
}

if(gameCome){
    playerGet();
    gameActivity();
}