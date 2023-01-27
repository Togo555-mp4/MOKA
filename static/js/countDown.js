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
let counter;
function countStart() {
  counter = 4;
  timerfactor = setInterval(function() {
    console.log("Count " + counter);
    if (counter == 0) {
      //規定値になると要素を削除
      clearInterval(timerfactor);
      console.log("finish");
      msg.textContent = "";
      beforeSendSign = "NO";
      sendOkPost();
    } else {
      picturePost("countCheck");
      counter--;
      msg.textContent = counter;
    }
  }, 1000);
}
