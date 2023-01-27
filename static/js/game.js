function playerGet(){
    fetch("/playerCheck")
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
        whichDisp = text;
        if(text === "player"){
            document.getElementById("answerForm").style.display ="none";
        }else{
            document.getElementById("Area_Countdown").style.display ="none";
        }
    });
}

dispVideo()
// dispImg()
getOdai()

// 1秒ごとに行うもの
setInterval(() => {
    // 画面表示について
    // picturePost();
    // pictureGet();
    // 回答について
    // answerGet('http://35.230.86.157/answerGet');
    // カウンターについて
    countStartGet();
}, 1000);
