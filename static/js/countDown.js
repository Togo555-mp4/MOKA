const postUrl = "http://35.230.86.157/sendOkPost";
const getUrl = "http://35.230.86.157/countStartGet"

//要素
const box = document.getElementById('box');
const msg = document.getElementById('msg');

let before = "";
let now = "";

function countStartGet(url){
  fetch(url)
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
      //一致信号を受け取った処理
      now = text;
      if(before != now){
        if(now === "OK"){
          countStart();
        }else{
          countStop();
        }
      }
      before = now;
  });
}

function sendOkPost(postUrl){
  fetch(postUrl, {
    method: 'POST',
    body: postPicture,
  })
  .then(function() {
    console.log("OK Post Success");
  });
}

let timerfactor;
function countStart() {
  let counter = 3;
  timerfactor = setInterval(function() {
    if (counter == 0) {
      //規定値になると要素を削除
      countStop()
      sendOkPost("http://35.230.86.157/okPost")
    } else {
      counter--;
      msg.textContent = counter;
    }
  }, 1000);
}

function countStart() {
  clearInterval(timerfactor);
}

// 1秒ごとに実行
// setInterval(() => {
//   countStartGet(getUrl)
// }, 1000);