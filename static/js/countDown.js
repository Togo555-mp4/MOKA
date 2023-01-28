const postUrl = "http://34.168.254.39/sendOkPost";
const resetCount = 1;

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
let counter = resetCount;
function countStart() {
  counter = resetCount;
  timerfactor = setInterval(function() {
    console.log("count "+counter)
    if (counter == 0) {
      //規定値になると要素を削除
      clearInterval(timerfactor);
      sendOkPost();
      msg.textContent = "";
      beforeSendSign = "NO";
    } else {
      counter--;
      msg.textContent = counter;
    }
  }, 1000);
}
