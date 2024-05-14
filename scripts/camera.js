/**
 * @author Jana Belešová 
 */

/**
 * Vytvoří instanci kamery
 *
 * @constructor
 * @this {camera}
 * @param {Object} context Context canvasu, na který se bude vykreslovat.
 * @property {vector} eyePos Pozice kamery.
 * @property {vector} target Směr pohledu kamery.
 * @property {vector} upVec Směr vzhůru.
 * @property {Number} fov Zorný úhel.
 * @property {Number} near Přední rovina zorného objemu.
 * @property {Number} far Zadní rovina zorného objemu.
 * @property {Number} aspectRatio Poměr šířky a výšky výstupního zařízení.
 * @property {matrix4} viewMatrix Pohledová matice kamery.
 * @property {matrix4} cameraMatrix Matice kamery.
 */
camera = function(context) {
    this.context = context;
    this.eyePos = new vector(0, 0, 800);
    this.target = new vector(0, 0, -1);
    this.upVec = new vector(0, 1, 0);
    this.fov = degreeToRadian(90);
    this.near = -0.0001;
    this.far = -10000;
    this.aspectRatio = this.context.canvas.width / this.context.canvas.height;
    this.viewMatrix = new matrix4();
    this.cameraMatrix = new matrix4();
    this.update();
}

/**
 * Aktualizuje pohledovou matici
 * @this {camera} 
 */
camera.prototype.update = function() {
    this.cameraMatrix.translate(-this.eyePos.x, -this.eyePos.y, -this.eyePos.z);
    this.viewMatrix.view(this.eyePos, this.target, this.upVec);
    this.viewMatrix.multiplyByMatrix(this.cameraMatrix);
}

/**
 * Posune kameru po ose X doleva
 * @this{camera}
 */
camera.prototype.moveLeft = function() {
    this.eyePos.x -= 10;
    this.update();
}

/**
 * Posune kameru po ose X doprava
 * @this{camera}
 */
camera.prototype.moveRight = function() {
    this.eyePos.x += 10;
    this.update();
}

/**
 * Posune kameru po ose Y nahoru
 * @this{camera}
 */
camera.prototype.moveUp = function() {
    this.eyePos.y -= 10;
    this.update();
}

/**
 * Posune kameru po ose Y dolů
 * @this{camera}
 */
camera.prototype.moveDown = function() {
    this.eyePos.y += 10;
    this.update();
}

/**
 * Posune kameru po ose Z dopředu 
 * @this {camera}
 */
camera.prototype.zoomIn = function() {
    this.eyePos.z -= 10;
    this.update();
}

/**
 * Posune kameru po ose Z dozadu
 * @this{camera} 
 */
camera.prototype.zoomOut = function() {
    this.eyePos.z += 10;
    this.update();
}