var images = document.getElementsByClassName('image');
var currentIndex = 0;

function showImage(index) {
  if (index < 0 || index >= images.length) {
    return;
  }

  for (var i = 0; i < images.length; i++) {
    images[i].classList.remove('active');
  }

  images[index].classList.add('active');
  currentIndex = index;

  // Change page background color based on the dominant color of the image
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var img = new Image();
  img.src = images[index].src;
  img.onload = function() {
    context.drawImage(img, 0, 0);
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
    var dominantColor = getDominantColor(imageData);
    document.body.style.backgroundColor = dominantColor;
  };
}

function getDominantColor(imageData) {
  var colorCount = {};
  var maxCount = 0;
  var dominantColor = '';

  for (var i = 0; i < imageData.length; i += 4) {
    var r = imageData[i];
    var g = imageData[i + 1];
    var b = imageData[i + 2];
    var color = rgbToHex(r, g, b);

    if (!colorCount[color]) {
      colorCount[color] = 0;
    }

    colorCount[color]++;

    if (colorCount[color] > maxCount) {
      maxCount = colorCount[color];
      dominantColor = color;
    }
  }

  return dominantColor;
}

function rgbToHex(r, g, b) {
  var hex = ((r << 16) | (g << 8) | b).toString(16);
  return '#' + ('000000' + hex).slice(-6);
}

function previousImage() {
  var newIndex = currentIndex - 1;
  if (newIndex < 0) {
    newIndex = images.length - 1;
  }
  showImage(newIndex);
}

function nextImage() {
  var newIndex = currentIndex + 1;
  if (newIndex >= images.length) {
    newIndex = 0;
  }
  showImage(newIndex);
}

// Automatically transition to the next image every 5 seconds
setInterval(nextImage, 5000);
