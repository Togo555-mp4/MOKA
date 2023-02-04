let whichUser = "player";
let gameCome = true;

function playerGet(){
    // fetch("http://34.168.254.39/userCheck")
    // .then(function(response) {
    //   return response.text();
    // })
    // .then(function(text) {
    //     whichUser = text;
    //     if(whichUser === "player"){
    //         document.getElementById("answerForm").style.display ="none";
    //         dispImg();
    //     }else{
    //         document.getElementById("Area_Countdown").style.display ="none";
    //         dispImg();
    //     }
    // });
    if(whichUser === "player"){
        document.getElementById("answerForm").style.display ="none";
        dispImg();
    }else{
        document.getElementById("Area_Countdown").style.display ="none";
        dispVideo();
    }
}

function finish(){
    clearInterval(gameInterval);
    gameCome = false;
    // 次のゲームの準備
    if(whichUser === "player"){
        whichUser = "answer";
    }else{
        whichUser = "player";
    }
    // 次のゲームを開始
    gameActivity();
}

function gameActivity(){
    getOdai();
    // 1秒ごとに行うもの
    gameInterval = setInterval(() => {
        // 画面表示について
        if(whichUser === "player"){
            picturePost();
        }else{
            pictureGet();
        }
        // 回答について
        // answerGet('http://34.168.254.39/answerGet');
    }, 1000);
}

if(gameCome){
    playerGet();
    gameActivity();
}