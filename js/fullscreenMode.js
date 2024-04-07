function fullscreen() {
    let fullscreen = document.getElementById("fullscreen");
    document.getElementById("fullscreenButton").classList.add("d-none");
    document.getElementById("leaveFullscreenButton").classList.remove("d-none");
    enterFullscreen(fullscreen);
}

function leaveFullscreen() {
    document.getElementById("fullscreenButton").classList.remove("d-none");
    document.getElementById("leaveFullscreenButton").classList.add("d-none");
    exitFullscreen(document);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen(document) {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
