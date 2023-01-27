const postUrl = "http://34.168.254.39/sendOkPost";

//要素
const box = document.getElementById('box');
const msg = document.getElementById('msg');

function sendOkPost(){
  fetch(postUrl, {
    method: 'POST',
    body: "",
  })
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
      console.log(text + "(SendOK)");
  }).catch(error => {
      console.log(error.message);
  });
}

let timerfactor;
let counter = 4;
function countStart() {
  timerfactor = setTimeout(count(), 1000);
}

function count(){
  if (counter == 0) {
    //規定値になるとタイマーストップ
    clearTimeout(timerfactor);
    console.log("finish");
    msg.textContent = "";
    beforeSendSign = "NO";
    sendOkPost();
  } else {
    console.log("Count " + counter);
    counter--;
    msg.textContent = counter;
  }
}