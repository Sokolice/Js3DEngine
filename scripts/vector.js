/**
 * @author Jana Belešová 
 */

/**
 * Vytvoří nový vektor.
 * 
 * @constructor
 * 
 * @this {vector}
 * @param {number} x Souřadnice na ose X.
 * @param {number} y Souřadnice na ose Y.
 * @param {number} z Souřadnice na ose Z
 * @param {number} w Homogenní souřadnice w.
 */
vector = function(x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 0;
}

/**
 * Vypočítá skalární součin aktuálního vektoru a vektoru v.
 * 
 * @this {vector}
 * @param {vector} v 
 * @return {number} Skalární součin.
 */
vector.prototype.dotProduct = function(v) {

    var x = this.x * v.x;
    var y = this.y * v.y;
    var z = this.z * v.z;
    var w = this.w * v.w;

    return x + y + z + w;
}

/**
 * Vynásobí aktuální vektor reálným číslem a výsledek vrátí jako nový vektor.
 * 
 * @this {vector}
 * @param {number} s Reálné číslo určené k násobení vektoru. 
 * @return {vector} Nový vektor.
 */
vector.prototype.multiplyByScalar = function(s) {

    var x = this.x * s;
    var y = this.y * s;
    var z = this.z * s;
    var w = this.w * s;

    return new vector(x, y, z, w);
}

/**
 * Normalizuje tento vektor.
 * 
 * @this {vector}
 * @return {this} Normalizovaný vektor.
 */
vector.prototype.normalize = function() {

    var x = this.x, y = this.y, z = this.z;

    var length = sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

    if (length == 0) {
        this.x = 0;
        this.y = 0;
        this.z = 0;     

        return this;
    } else {        
        this.x = x / length;
        this.y = y / length;
        this.z = z / length;
        return this;
    }
}

/**
 * Vypočítá velikost vektoru.
 * 
 * @this {vector}
 * @return {number} Velikost vektoru. 
 */
vector.prototype.length=function(){
    
     var length = sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
     
     return length;
}

/**
 * Sečte tento vektor s jiným vektorem, výsledek vrátí jako nový vektor.
 * 
 * @this {vector}
 * @param {vector} v Vektor. 
 * @return {vector} Nový vektor.
 */
vector.prototype.add = function(v) {

    var x = this.x + v.x;
    var y = this.y + v.y;
    var z = this.z + v.z;
    var w = this.w + v.w;

    return new vector(x, y, z, w);
}

/**
 * Odečte od tohoto vektoru jiný vektor a výsledek vrátí jako nový vektor.
 * 
 * @this {vector} 
 * @param {vector} v Vektor, který se odečte od tohoto vektoru.
 * @return {vector} Nový vektor.
 */
vector.prototype.subtraction = function(v) {

    var x = this.x - v.x;
    var y = this.y - v.y;
    var z = this.z - v.z;
    var w = this.w - v.w;

    return new vector(x, y, z, w);
}

/**
 * Vypočítá vektorový součin tohoto vektoru a vektoru předaného jako parametr.
 * 
 * @this {vector} 
 * @param {vector} v Vektor.
 * @return {vector} Nový vektor představující vektorový součin.
 */
vector.prototype.crossProduct = function(v) {

    var x = this.y * v.z - this.z * v.y;
    var y = this.z * v.x - this.x * v.z;
    var z = this.x * v.y - this.y * v.x;

    return new vector(x, y, z);
}