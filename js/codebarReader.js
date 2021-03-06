
// init variables
var takePicture = document.querySelector("#take-picture"),
showPicture = document.querySelector("#picture");
Result = document.querySelector("#codebar-text");
Canvas = document.createElement("canvas");
resultArray = [];
workerCount = 0;
var DecodeWorker = new Worker("js/DecoderWorker.js");
var RightWorker = new Worker("js/DecoderWorker.js");
var LeftWorker = new Worker("js/DecoderWorker.js");
var FlipWorker = new Worker("js/DecoderWorker.js");

// set canvas
Canvas.width=640;
Canvas.height=480;
ctx = Canvas.getContext("2d");

DecodeWorker.onmessage = receiveMessage;
RightWorker.onmessage = receiveMessage;
LeftWorker.onmessage = receiveMessage;
FlipWorker.onmessage = receiveMessage;

if(takePicture && showPicture) {
    takePicture.onchange = function (event) {
        var files = event.target.files;
        if (files && files.length > 0) {
            file = files[0];
            try {
                var URL = window.URL || window.webkitURL;
                var imgURL = URL.createObjectURL(file);
                showPicture.src = imgURL;
                URL.revokeObjectURL(imgURL);
                DecodeBar()
            }
            catch (e) {
                try {
                    var fileReader = new FileReader();
                    fileReader.onload = function (event) {
                        showPicture.src = event.target.result;
                    };
                    fileReader.readAsDataURL(file);
                    DecodeBar()
                }
                catch (e) {
                    Result.innerHTML = "Neither createObjectURL or FileReader are supported";
                }
            }
        }
    };
}

function DecodeBar(){
    Result.innerHTML='<i class="fa fa-spinner fa-spin"></i>';
    showPicture.onload = function(){
        ctx.drawImage(showPicture,0,0,Canvas.width,Canvas.height);
        resultArray = [];
        workerCount = 4;
        DecodeWorker.postMessage({pixels: ctx.getImageData(0,0,Canvas.width,Canvas.height).data, cmd: "normal"});
        RightWorker.postMessage({pixels: ctx.getImageData(0,0,Canvas.width,Canvas.height).data, cmd: "right"});
        LeftWorker.postMessage({pixels: ctx.getImageData(0,0,Canvas.width,Canvas.height).data, cmd: "left"});
        FlipWorker.postMessage({pixels: ctx.getImageData(0,0,Canvas.width,Canvas.height).data, cmd: "flip"});
    }
}

function receiveMessage(e) {
    if(e.data.success === "log") {
        console.log(e.data.result);
        return;
    }
    workerCount--;
    if(e.data.success){
        var tempArray = e.data.result;
        for(var i = 0; i < tempArray.length; i++) {
            if(resultArray.indexOf(tempArray[i]) == -1) {
                resultArray.push(tempArray[i]);
            }
        }
        Result.innerHTML=resultArray.join("<br />");
    }else{
        if(resultArray.length === 0 && workerCount === 0) {
            Result.innerHTML="Decoding failed.";
        }
    }
}
