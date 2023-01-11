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
canvas.id     = 'canvas';
canvas.width  = canvasSize.w;
canvas.height = canvasSize.h;
document.getElementById('canvasArea').appendChild(canvas);

let base64;

// コンテキストを取得する
canvasCtx = canvas.getContext('2d');

// video要素の映像をcanvasに描画する
// 1秒ごとに実行
setInterval(() => {
  canvasUpdate();
  let request = {
    url: 'http://localhost:4567/base64',
    method: 'POST',
    params: {
        image: base64.replace(/^.*,/, '')
    },
    success: function (response) {
        console.log(response.responseText);
    }
  };
  Ext.Ajax.request(request);
}, 1000);

function canvasUpdate() {
  canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
  base64 = this.canvas.toDataURL('image/png');
};