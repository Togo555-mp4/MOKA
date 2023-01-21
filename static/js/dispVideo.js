const postUrl = "http://35.230.86.157/picturePost";
const pictureGetUrl = "http://35.230.86.157/pictureGet"

function picturePost(){
    // video要素の映像をcanvasに描画する
    canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
    let base64 = this.canvas.toDataURL('image/png');;
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
        let img = document.getElementById('Area_Picture');
        let b64 = ImageToBase64(img, "image/jpeg")
    });
}


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

// 画像の描画
function dispPictrue(){
    const img = document.createElement('img');
    video.id = 'img';
    document.getElementById('Area_Picture').appendChild(img);
}

function vinCon(){
    console.log("video");
}

// canvas要素をつくる
const canvasSize = { w: 640, h: 480 };
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = canvasSize.w;
canvas.height = canvasSize.h;
document.getElementById('canvasArea').appendChild(canvas);
// コンテキストを取得する
canvasCtx = canvas.getContext('2d');
