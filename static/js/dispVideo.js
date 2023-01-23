let whichDisp = ""
const postUrl = "http://35.230.86.157/picturePost";
const pictureGetUrl = "http://35.230.86.157/pictureGet"

function picturePost(){
    // video要素の映像をcanvasに描画する
    canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
    let base64 = this.canvas.toDataURL('image/jpg');;
    let postPicture = new FormData();
    postPicture.append('img', base64);
    fetch(postUrl, {
        method: 'POST',
        body: postPicture,
    })
    .then(function() {
        console.log("Picture Post Success");
    });
}

function pictureGet(){
    fetch(pictureGetUrl)
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
        //画像オブジェクトを生成
        let img = new Image();
        img.src = text;
        //画像をcanvasに設定
        img.onload = function(){
            imgCtx.drawImage(img, 0, 0, 200, 200);
        }
    });
}


if(whichDisp == ""){

}else if(whichDisp == "player"){
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

// 動画を写真にしたものを表示するcanvas要素
const canvasSize = { w: 640, h: 480 };
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = canvasSize.w;
canvas.height = canvasSize.h;
document.getElementById('canvasArea').appendChild(canvas);
// コンテキストを取得する
canvasCtx = canvas.getContext('2d');

//　取得した画像を表示するcanvas要素
const viewImg = document.createElement('canvas');
viewImg.id = 'viewImg';
viewImg.width = canvasSize.w;
viewImg.height = canvasSize.h;
document.getElementById('canvasArea').appendChild(viewImg);
// コンテキストを取得する
imgCtx = viewImg.getContext('2d');