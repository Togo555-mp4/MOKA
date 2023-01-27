const picturepostUrl = "http://34.168.254.39/picturePost";
const pictureGetUrl = "http://34.168.254.39/pictureGet";
let beforeStartSign = "ON";

// 動画を写真にしたものを表示するcanvas要素
const canvasSize = { w: 640, h: 480 };
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = canvasSize.w;
canvas.height = canvasSize.h;
document.getElementById('canvasArea').appendChild(canvas);
// コンテキストを取得する
canvasCtx = canvas.getContext('2d');


function picturePost(flag){
    // video要素の映像をcanvasに描画する
    canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
    let base64 = this.canvas.toDataURL();
    let postPicture = base64.replace(/^data:\w+\/\w+;base64,/, "");
    fetch(picturepostUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
          img: postPicture
        }),
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(text){
        console.log(flag + " " + text);
        if(flag === "nomal"){
            if(text === "OK" && text !== beforeStartSign){
                beforeStartSign = text;
                countStart();
            }
        }else{
            if(text === "NO"){
                counter = 4;
                console.log("cancel");
            }
        }
    }).catch(error => {
        console.log(error.message);
    });
}

function pictureGet(){
    fetch(pictureGetUrl)
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
        if(text != "ON"){
            console.log("pictureGet");
            // // コンテキストを取得する
            // imgCtx = viewImg.getContext('2d');
            // //画像オブジェクトを生成
            // let img = new Image();
            // img.src = text;
            // //画像をcanvasに設定
            // img.onload = function(){
            //     imgCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
            // }
        }
    });
}

function dispVideo(){
    //動画の描画
    const video = document.createElement('video');
    video.id = 'video';
    document.getElementById('Area_Picture').appendChild(video);
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    }).then(stream => {
        video.srcObject = stream;
        video.play()
    }).catch(e => {
        console.log(e)
    })
}

//　取得した画像を表示するcanvas要素
const viewImg = document.createElement('canvas');
function dispImg(){
    viewImg.id = 'viewImg';
    viewImg.width = canvasSize.w;
    viewImg.height = canvasSize.h;
    document.getElementById('testImg').appendChild(viewImg);
}