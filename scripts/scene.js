/**
 * @author Jana Belešová 
 */

/**
 * Vytvoří novou instanci scény, do které jsou umisťovány objekty k vykreslení. 
 * 
 * @constructor
 * @param {camera} camera Kamera umístěná ve scéně.
 * @property {Array} objects Pole objektů zobrazovaných ve scéně.
 * @property {Number} angleX Úhel otočení kolem osy X, předávaný dále objektům.
 * @property {Number} angleY Úhel otočení kolem osy Y, předávaný dále objektům.
 * @property {Number} angleZ Úhel otočení kolem osy Z, předávaný dále objektům.
 * @property {Object} context Context pro vykreslování výsledné scény.
 */
scene = function(camera){
    this.objects = [];
    this.camera = camera;    
    this.angleX = 0;
    this.angleY = 0;
    this.angleZ = 0;
    this.context = this.context;
}

/**
 * Vykreslení scény 
 * 
 * @this {scene}
 */
scene.prototype.render = function(){
    
    this.camera.context.clearRect(0, 0, this.camera.context.canvas.width, this.camera.context.canvas.height)
    
    for (var i=0; i < this.objects.length; i++) {
      var object=this.objects[i];
      
        object.setContext(this.camera.context);
        object.setRotateX(this.angleX);
        object.setRotateY(this.angleY);
        object.setRotateZ(this.angleZ); 
        object.render(this.camera);         
    }
    
}

/**
 * Natavení rotace kolem osy X.
 * 
 * @this {scene} 
 * @param {Number} angleX Úhel otočení kolem osy X.
 */
scene.prototype.setRotX = function(angleX){
    this.angleX = angleX;
}

/**
 * Natavení rotace kolem osy Y.
 * 
 * @this {scene} 
 * @param {Number} angleY Úhel otoční kolem osy Y.
 */
scene.prototype.setRotY = function(angleY){
    this.angleY = angleY;
}

/**
 * Natavení rotace kolem osy Z.
 * 
 * @this {scene} 
 * @param {Number} angleZ Úhel otočení kolem osy Z.
 */
scene.prototype.setRotZ = function(angleZ){
    this.angleZ = angleZ;
}

/**
 * Nastavení odpovídajícího contextu.
 * @this {scene} 
 * @param {Object} context Context pro vykreslování.
 */
scene.prototype.setContext = function(context){
    this.context = context;
}