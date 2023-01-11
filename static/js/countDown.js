onload = function() {
    //変数
    let min = 0;
    let counter = 10;

    //要素
    let box = document.getElementById('box');
    let msg = document.getElementById('msg');

    var timerfactor = setInterval(function() {
      if (counter == min) {
        //規定値になると要素を削除
        clearInterval(timerfactor);
      } else {
        counter--;
        msg.textContent = counter;
      }
    }, 1000);
  }