const postUrl = "http://35.230.86.157/sendOkPost";
const getUrl = "http://35.230.86.157/countStartGet";

//要素
const box = document.getElementById('box');
const msg = document.getElementById('msg');

function countStartGet(){
  fetch(postUrl)
  .then(function(response) {
      return response.text();
  })
  .then(function(text) {
    console.log(text)
  }).catch(error => {
    console.log(error.message)
  });
}

function sendOkPost(){
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
      clearInterval(timerfactor);
      sendOkPost();
    } else {
      counter--;
      msg.textContent = counter;
    }
  }, 1000);
}
