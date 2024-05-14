/**
 * @author Jana Belešová 
 */

/**
 * Vytvoří nový 3D bod.
 * 
 * @constructor 
 * @param {Object} x Souřadnice na ose X.
 * @param {Object} y Souřadnice na ose Y.
 * @param {Object} z Souřadnice na ose Z.
 * @param {Object} u Souřadnice textury.
 * @param {Object} v Souřadnice textury.
 * @property {vector} vertex Vektor vytvořený ze souřadnic bodu.
 */
point3D=function(x, y, z, u, v){
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = 1;   
    this.u = u || 0;
    this.v = v || 0;
    this.vertex = new vector(this.x, this.y, this.z, this.w);
}

