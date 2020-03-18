/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var tickCount = 60;
var width = 0;
var height = 0;
var frameSize = 0;
var htmlFrameSize = 0;
var frameX = 0;
var frameY = 0;
var htmlFrameX = 0;
var htmlFrameY = 0;
var margin = 0; //= 20;

var errorElement = document.querySelector('#errorMsg');
var video = document.querySelector('video');
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var frame = jQuery('#frame');

var picResult = document.getElementById("picResult");
var pubRotation = "";
var pubIDName = "";
var pubOffsetWidth = 0.0, pubOffsetHeight = 0.0;

var sW = 0, sH = 0, sSize = 0, sFrame = 0;
function tick() {
    requestAnimationFrame(tick);
    tickCount++;
    if ((tickCount > 2) && (video.readyState === video.HAVE_ENOUGH_DATA)) {
        tickCount = 0;

        //setup canvas
//        if (canvas.width == 0) { 

//        console.log(video.offsetWidth);

        var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
        if ((pubRotation.localeCompare(orientation.type) !== 0) || (pubOffsetWidth !== video.offsetWidth && pubOffsetHeight !== video.offsetHeight))
        {
            pubRotation = orientation.type;
            // alert("orientation.type: " + orientation.type);

            pubOffsetWidth = video.offsetWidth;
            pubOffsetHeight = video.offsetHeight
//            alert("video.offsetWidth: " + video.offsetWidth + " video.offsetHeight: " + video.offsetHeight);

//            width = jQuery(video).width();
//            height = jQuery(video).height();
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            width = video.offsetWidth;
            height = video.offsetHeight;

//            alert("jQuery(video).width(): " + width + " jQuery(video).height(): " + height
//                    + "\n video.videoWidth: " + video.videoWidth + " video.videoHeight: " + video.videoHeight
//                    + "\n video.style.marginLeft: " + $("#gum-local").css("marginLeft") + " video.style.marginTop: " + $("#gum-local").css("marginTop"));

            console.log('setup canvas successful');

            // Calculate frame size
            if (height > width) {
                frameSize = video.videoWidth / 2;
                htmlFrameSize = width / 2;
            } else {
                frameSize = video.videoHeight / 2;
                htmlFrameSize = height / 2;
            }

            frameX = (video.videoWidth - frameSize) / 2;
            frameY = (video.videoHeight - frameSize) / 2;
            htmlFrameX = (width - htmlFrameSize) / 2;
            htmlFrameY = (height - htmlFrameSize) / 2;

//            alert("('gum-local').offsetWidth: " + width + " ('gum-local').offsetHeight : " + height
//                    + "\n htmlFrameSize: " + htmlFrameSize + "\n htmlFrameX: " + htmlFrameX + " htmlFrameY : " + htmlFrameY);

            frame.css({width: htmlFrameSize, height: htmlFrameSize, marginLeft: htmlFrameX, marginTop: htmlFrameY});
        }

        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        // Load the video onto the canvas
        // Load the image data from the canvas
        var imageData = context.getImageData(frameX - margin, frameY - margin, frameSize + margin, frameSize + margin);

//        // Test Frame
//        var cv = document.createElement('canvas');
//        var ctx = cv.getContext('2d');
//        cv.width = imageData.width;
//        cv.height = imageData.height;
//        ctx.putImageData(imageData, 0, 0);
//
//        picResult.width = imageData.width;
//        picResult.height = imageData.height;
//        picResult.src = cv.toDataURL('image/jpeg', 1.0);

        //    // invert colors
        //    var i;
        //    for (i = 0; i < imgData.data.length; i += 4) {
        //        imgData.data[i] = 255 - imgData.data[i];
        //        imgData.data[i+1] = 255 - imgData.data[i+1];
        //        imgData.data[i+2] = 255 - imgData.data[i+2];
        //        imgData.data[i+3] = 255;
        //    }

        var decoded = jsQR.decodeQRFromImage(imageData.data, imageData.width, imageData.height);
        if (decoded) {
            if (pubIDName !== null && pubIDName.length !== 0) {
                document.getElementById(pubIDName).value = decoded;
                KiemSoatVe(document.getElementById(pubIDName).value);

                var cv = document.createElement('canvas');
                var ctx = cv.getContext('2d');
                cv.width = imageData.width;
                cv.height = imageData.height;
                ctx.putImageData(imageData, 0, 0);

                picResult.width = imageData.width;
                picResult.height = imageData.height;
                picResult.src = cv.toDataURL('image/jpeg', 1.0);
            }
            else
                // result
                alert(decoded);
        }
    }
}

function handleSuccess(stream) {
    stream.oninactive = function ()
    {
        console.log('Stream inactive');
    };
    window.stream = stream; // make variable available to browser console
    if (window.webkitURL) {
        video.src = window.webkitURL.createObjectURL(stream);
    } else if (video.mozSrcObject !== undefined) {
        video.mozSrcObject = stream;
    } else if (video.srcObject !== undefined) {
        video.srcObject = stream;
    } else {
        video.src = stream;
    }
    //video.srcObject = stream;
    requestAnimationFrame(tick);
}

var errorCallback = function (err) {
    console.log(err.name);
}

function init(idResult) {
    if (hasGetUserMedia()) {
        pubIDName = idResult;
//         alert('getUserMedia() is supported in your browser ' + pubIDName);

        var constraints = window.constraints = {
            audio: false,
            video: {facingMode: "environment"}
        };

//        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

        // alert(navigator.getUserMedia);
        // Not showing vendor prefixes.

        var navi = navigator.mediaDevices.getUserMedia(constraints);
        navi.then(handleSuccess);
        navi.catch(errorCallback); // always check for errors at the end.
    } else {
        alert('getUserMedia() is not supported in your browser');
    }
}

function hasGetUserMedia()
{
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}