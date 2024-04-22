// Enter Fullscreen mode
function fullscreen() {
    let fullscreen = document.getElementById("canvas");
    document.getElementById("fullscreenButton").classList.add("d-none");
    document.getElementById("leaveFullscreenButton").classList.remove("d-none");
    enterFullscreen(fullscreen);
}

// Leave Fullscreen mode
function leaveFullscreen() {
    document.getElementById("fullscreenButton").classList.remove("d-none");
    document.getElementById("leaveFullscreenButton").classList.add("d-none");
    exitFullscreen(document);
}

// Fullscreen mode
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

// Exit Fullscreen mode
function exitFullscreen(document) {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
