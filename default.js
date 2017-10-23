function drawText(potgText, nickText, heroText) {
  if (potgText == "") potgText = "최고의 플레이";
  if (nickText == "") nickText = "닉네임";
  if (heroText == "") heroText = "영웅 이름";

  $('canvas').drawText({ //팟지 텍스트
    layer: true,
    name: 'potgtext',
    fillStyle: '#FBF6EF',
    strokeWidth: 2,
    x: 90, y: 132,
    fontSize: 27,
    fontStyle: 'italic',
    fontFamily: 'Koverwatch',
    shadowColor: '#FBF6EF',
    shadowBlur: 5,
    fromCenter: false,
    text: potgText,
    bringToFront: true
  });

  $('canvas').drawText({
    layer: true,
    name: 'nicktext',
    fillStyle: '#FFE02B',
    strokeWidth: 2,
    x: 105, y: 160,
    fontSize: 43,
    fontStyle: 'italic',
    fontFamily: 'Koverwatch',
    shadowColor: '#FFE02B',
    shadowBlur: 5,
    fromCenter: false,
    text: nickText,
    bringToFront: true
  });

  $('canvas').drawText({
    layer: true,
    name: 'herotext',
    fillStyle: '#FBF6EF',
    strokeWidth: 2,
    x: 120, y: 205,
    fontSize: 21,
    fontStyle: 'italic',
    fontFamily: 'Koverwatch',
    shadowColor: '#FBF6EF',
    shadowBlur: 5,
    fromCenter: false,
    text: heroText,
    bringToFront: true
  });
}

function drawImage(path, scale) {
  if (path == undefined) path = './sample.png';
  if (scale == "") scale = 100;

  $('canvas').drawImage({
    layer:true,
    name: 'background',
    source: path,
    x: 320, y: 180,
    scale:scale/100,
    draggable: true,
    bringToFront: false
  });
}

function drawWatermark(allowWatermark) {
  if (allowWatermark == true) {
    $('canvas').drawText({
      layer:true,
      name: 'watermark',
      fillStyle: '#FFF',
      opacity:0.4,
      strokeWidth: 2,
      x: 490, y: 330,
      fontSize: 21,
      fontFamily: 'Koverwatch',
      shadowColor: '#000',
      shadowBlur: 5,
      fromCenter: false,
      text: "http://potgmaker.xyz"
    });
  }
}

function setImgDownloadLink() {
  var canvas = document.getElementById('canvas');
  var download = document.getElementById('btn-download');
  var cantDownload = document.getElementById('btn-cant-download');
  download.href = canvas.toDataURL('image/png');
  cantDownload.href = canvas.toDataURL('image/png');

}

function clearCanvas() {
  $('canvas').removeLayer('background').drawLayers(); //background layer removing
  $('canvas').removeLayer('potgtext').drawLayers(); //background layer removing
  $('canvas').removeLayer('nicktext').drawLayers(); //background layer removing
  $('canvas').removeLayer('herotext').drawLayers(); //background layer removing
  $('canvas').removeLayer('watermark').drawLayers(); //background layer removing
  $('canvas').clearCanvas(); //etc entries removing
}


$(document).ready(function() {

  drawImage('./sample.png', 100);

  var tmppath;

  $('input[type=file]').change(function (event) {
    clearCanvas();
    tmppath = URL.createObjectURL(event.target.files[0]);
    drawImage(tmppath, 100);
  });

  $("#createImg").click(function() {
    var scalePer = $("#scale").val();

    var potgText = $("#potg").val(),
        nickText = $("#nick").val(),
        heroText = $("#hero").val();

    clearCanvas();
    drawImage(tmppath, scalePer);
    drawText(potgText, nickText, heroText);
    drawWatermark(true);

    setImgDownloadLink();

  });

  $('canvas').hover(function() {
    setImgDownloadLink();
  });

  $('canvas').bind('touchend', function() {
    setImgDownloadLink();
  });

  $('#itstimenoon').click(function() {

    download(document.getElementById('canvas').toDataURL('image/png'), "potgmaker.png", "image/png");
    alert("asdf");
  });

});
