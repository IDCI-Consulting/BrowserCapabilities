function UserMediaManager() {
    if (!window.Modernizr) {
        alert('Modernizr is not loaded');
    }
}

UserMediaManager.launchCamera = function(video, localMediaStream) {
    if (Modernizr.getusermedia) {
        var getUserMedia = Modernizr.prefixed('getUserMedia', navigator);
        getUserMedia({video: true}, function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.onloadedmetadata = function(e) {};
            localMediaStream = stream;
        }, function(e) {
            console.log('Error with video capture', e);
        });
    } else {
        alert('This browser does not support getusermedia');
    }
}

// UserMediaManager.takeSnapshot = function(canvas, video, localMediaStream, constraints)
UserMediaManager.takeSnapshot = function(canvas, video, localMediaStream) {
    if (localMediaStream) {
        canvas.width = 320;
        canvas.height = 240;
        canvas.getContext('2d').drawImage(video, 0, 0, 320, 240);
        // 'image/webp' works in Chrome.
        // Other browsers will fall back to image/png.
        document.getElementById('snapshot-image').src = canvas.toDataURL('image/webp');
    }
}

//TODO
UserMediaManager.getSourcesInfo = function() {
    if (typeof MediaStreamTrack === 'undefined'){
        alert('This browser does not support MediaStreamTrack');
        return [];
    } else {
        MediaStreamTrack.getSources(function(sourceInfos) {
            var infos = [];
            console.log(sourceInfos);
            for (var i = 0; i != sourceInfos.length; ++i) {
                var sourceInfo = sourceInfos[i];
                console.log(sourceInfo.kind);
            }
            return infos;
        });
    }
}


