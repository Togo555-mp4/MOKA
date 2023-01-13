const textbox_element = document.getElementById('Area_AnsOutput');
// 新しいHTML要素を作成
const new_element = document.createElement('p');

function answerGet(url){
    fetch(url)
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
        new_element.textContent = text;
        // 指定した要素の中の末尾に挿入
        textbox_element.appendChild(new_element);
    });
}

function answerPost(url) {
    // Postで送るパラメータを作成
    let formData = new FormData();
    formData.append('answer', document.getElementById('writeArea').value);
    fetch(url, {
        method: 'POST',  // methodを指定しないとGETになる
        body: formData,  // Postで送るパラメータを指定
    })
    .then(function() {  // Postした後に結果をGetする（コールバックなのでPostが実行完了してから実行される）
        answerGet('http://35.230.86.157/answerGet');
    });
}