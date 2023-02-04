const nameForm = document.querySelector('#nameForm');
const answerForm = document.querySelector('#nameForm');

function gameStartPost(url) {
    // Postで送るパラメータを作成
    let formData = new FormData(answerForm);
    let name;
    for (let value of formData.entries()) {
        name = value[1];
    }
    console.log(name);
    if(name === "test1"){
        window.location.href = "/gestureGame";
    }else{
        window.location.href = "/playerGame";
    }

    // fetch(url, {
    //     method: 'POST',
    //     body: formData,
    // })
    // .then(function() {
    //     window.location.href = "/game";
    //     console.log("Answer Post Success");
    // }).catch(error => {
    //     console.log(error.message)
    // });
}

