//要素
const box = document.getElementById('box');
const msg = document.getElementById('msg');

//変数
let counter = 3;
let before = "";
let now = "";

function sameGet(url){
  fetch(url)
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
      //一致信号を受け取った処理
      now = text;
      if(before != after){
        countStart()
      }
      before = now;
  });
}

function countStart() {
    let timerfactor = setInterval(function() {
      if (counter == 0) {
        //規定値になると要素を削除
        clearInterval(timerfactor);
      } else {
        counter--;
        msg.textContent = counter;
      }
    }, 1000);
}