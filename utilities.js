//Zajištění animace
window.requestAnimation = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback, element) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

//Zjistí pozici kurzoru v canvasu.
getMousePos = function(canvas, evt) {
    rect = canvas.getBoundingClientRect();
    x = evt.clientX - rect.left;
    y = evt.clientY - rect.top;

}

//Nastavení reakcí na jednotlivé klávesy
function keyPress(evt) {

    switch(evt.keyCode) {
        case 107:
            camera.zoomIn();
            break;

        case 109:
            camera.zoomOut();
            break;

        case 65:
            camera.moveLeft();
            break;

        case 68:
            camera.moveRight();
            break;

        case 83:
            camera.moveUp();
            break;

        case 87:
            camera.moveDown();
            break;
    }
}

