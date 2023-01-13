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

// canvas要素をつくる
const canvasSize = { w: 640, h: 480 };
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = canvasSize.w;
canvas.height = canvasSize.h;
document.getElementById('canvasArea').appendChild(canvas);

// コンテキストを取得する
canvasCtx = canvas.getContext('2d');

const url = "http://35.230.86.157/picturePost";
let base64;
let postPicture = new FormData();
// 1秒ごとに実行
setInterval(() => {
    // video要素の映像をcanvasに描画する
    canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
    base64 = this.canvas.toDataURL('image/png');
    postPicture.append('img', base64);
    fetch(url, {
        method: 'POST',
        body: postPicture,
    })
    .then(function() {
        deleteAllFormData(postPicture); 
        console.log("Picture Post Success");
    });
}, 1000);

function deleteAllFormData(formData) {
  const keys = [];
  for (const key of formData.keys()) {
      keys.push(key);
  }
  for (const idx in keys) {
      formData.delete(keys[idx]);
  }
}