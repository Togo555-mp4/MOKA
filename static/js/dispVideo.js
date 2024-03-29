const picturepostUrl = "http://34.127.34.164/picturePost";
const pictureGetUrl = "http://34.127.34.164/pictureGet";
let beforeSendSign = "NO";

// 動画を写真にしたものを表示するcanvas要素
const canvasSize = { w: 640, h: 480 };
const dispImgSize = { w: 720, h: 540 };
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = canvasSize.w;
canvas.height = canvasSize.h;
document.getElementById('canvasArea').appendChild(canvas);
// コンテキストを取得する
canvasCtx = canvas.getContext('2d');


function picturePost(){
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
        if(text == "OK" && text != beforeSendSign){
            beforeSendSign = text;
            countStart();
        }else if(text == "NO"){
            beforeSendSign = text;
            clearInterval(timerfactor);
            msg.textContent = "";
            counter = resetCount;
            console.log("cancel");
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
        if(text === "OK"){
            // コンテキストを取得する
            imgCtx = viewImg.getContext('2d');
            //画像オブジェクトを生成
            let img = new Image();
            img.src = "../static/img/after.jpg";
            //画像をcanvasに設定
            img.onload = function(){
                imgCtx.drawImage(img, 0, 0, dispImgSize.w, dispImgSize.h);
            }
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
const imgAria = document.createElement('div'); //css用
const viewImg = document.createElement('canvas');
function dispImg(){
    imgAria.id = 'imgAria';
    document.getElementById('Area_Picture').appendChild(imgAria);
    viewImg.id = 'viewImg';
    viewImg.width = dispImgSize.w;
    viewImg.height = dispImgSize.h;
    document.getElementById('imgAria').appendChild(viewImg);
}