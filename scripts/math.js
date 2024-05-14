/**
 * @author Jana Belešová 
 * 
 * Skript pro práci s maticemi, obsahuje také zkratky pro matematické funkce.
 */

/**  
 * Funkce sinus
 * @function  
 */
var sin = Math.sin;

/**
 * Funkce cosinus
 * @function
 */
var cos = Math.cos;

/**
 * Funkce tangens
 * @function
 */
var tan = Math.tan;

/**
 * Odmocnina
 * @function 
 */
var sqrt = Math.sqrt;

/**
 * Převedení stupňů na radiány.
 * 
 * @param {number} angle Úhel ve stupních.
 * @return {number} radian Úhel v radiánech. 
 */
degreeToRadian = function(angle){
    radian = angle * Math.PI / 180;
    return radian;
}


/**
 * Vytvoří novou čtyřrozměrnou matici. 
 *
 * @constructor
 * @this {matrix4} 
 * @param {array} a Pole obsahující elementy matice.
 */
matrix4 = function(a){
    if(!a)    
    this.a = [1, 0, 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1];    
    else
    this.a = a;
}

/**
 * Převede aktuální matici na matici jednotkovou.
 * 
 * @this {matrix4} 
 */
matrix4.prototype.reset = function(){
        
     this.a = [1, 0, 0, 0,
               0, 1, 0, 0,
               0, 0, 1, 0,
               0, 0, 0, 1];
}

/**
 * Vytvoří z aktuální matice matici rotace kolem osy X.
 *  
 * @this {matrix4}
 * @param {number} radx Úhel otočení kolem osy X v radiánech.
 */
matrix4.prototype.rotateX = function(radx){    
     
     this.a = [1,            0,           0, 0,
               0,  cos(radx), sin(radx), 0,
               0, -sin(radx), cos(radx), 0,
               0,            0,           0, 1];    
}

/**
 * Vytvoří z aktuální matice matici rotace kolem osy Y.
 *  
 * @this {matrix4}
 * @param {number} rady Úhel otočení kolem osy Y v radiánech.
 */
matrix4.prototype.rotateY = function(rady){
    
     this.a = [ cos(rady), 0, -sin(rady), 0,
                        0, 1,          0, 0,
                sin(rady), 0,  cos(rady), 0,
                        0, 0,          0, 1];    
}

/**
 * Vytvoří z aktuální matice matici rotace kolem osy Z.
 *  
 * @this {matrix4}
 * @param {number} radz Úhel otočení kolem osy Z v radiánech.
 */
matrix4.prototype.rotateZ = function(radz){
                               
     this.a = [cos(radz), sin(radz), 0, 0,
              -sin(radz), cos(radz), 0, 0,
                       0,         0, 1, 0,
                       0,         0, 0, 1];    
}

/**
 * Vytvoří z aktuální matice matici měřítka.
 *  
 * @this {matrix4}
 * @param {number} x Měřítko na ose X.
 * @param {number} y Měřítko na ose Y.
 * @param {number} z Měřítko na ose Z.
 */
matrix4.prototype.scale = function(x,y,z){
    
     this.a = [x, 0, 0, 0,
               0, y, 0, 0,
               0, 0, z, 0,
               0, 0, 0, 1];
}

/**
 * Vytvoří z aktuální matice matici posunutí.
 *  
 * @this {matrix4}
 * @param {number} x posunutí na ose X
 * @param {number} y posunutí na ose Y
 * @param {number} z posunutí na ose Z
 */
matrix4.prototype.translate = function(x,y,z){
    
     this.a = [1, 0, 0, x,
               0, 1, 0, y,
               0, 0, 1, z,
               0, 0, 0, 1];
}

/**
 * Vynásobí aktuální matici vektorem.
 *  
 * @this {matrix4}
 * @param {vector} v Vektor, kterým se matice vynásobí.
 * @return {vector}  Vektor vzniklý vynásobením matice a vektoru.
 */
matrix4.prototype.multiplyByVector = function(v){  
   
    var x = this.a[0] * v.x +
            this.a[1] * v.y +
            this.a[2] * v.z +
            this.a[3] * v.w;
                   
    var y = this.a[4] * v.x +
            this.a[5] * v.y + 
            this.a[6] * v.z +
            this.a[7] * v.w;
                   
    var z = this.a[8] * v.x +
            this.a[9] * v.y +
            this.a[10] * v.z +
            this.a[11] * v.w;
    
    var w = this.a[12] * v.x +
            this.a[13] * v.y +
            this.a[14] * v.z +
            this.a[15] * v.w;  
        
    return new vector(x,y,z,w);
}

/**
 * Násobení matic.
 * 
 * @this {matrix4}
 * @param {matrix4} matrix Matice, kterou se bude násobit aktuální matice.
 */
matrix4.prototype.multiplyByMatrix = function(matrix){   
    
    var m11 = this.a[0] * matrix.a[0] + this.a[1] * matrix.a[4] + this.a[2] * matrix.a[8] + this.a[3] * matrix.a[12];
    var m12 = this.a[0] * matrix.a[1] + this.a[1] * matrix.a[5] + this.a[2] * matrix.a[9] + this.a[3] * matrix.a[13];
    var m13 = this.a[0] * matrix.a[2] + this.a[1] * matrix.a[6] + this.a[2] * matrix.a[10] + this.a[3] * matrix.a[14];
    var m14 = this.a[0] * matrix.a[3] + this.a[1] * matrix.a[7] + this.a[2] * matrix.a[11] + this.a[3] * matrix.a[15];
    
    var m21 = this.a[4] * matrix.a[0] + this.a[5]*matrix.a[4] + this.a[6]*matrix.a[8] + this.a[7]*matrix.a[12];
    var m22 = this.a[4] * matrix.a[1] + this.a[5]*matrix.a[5] + this.a[6]*matrix.a[9] + this.a[7]*matrix.a[13];
    var m23 = this.a[4] * matrix.a[2] + this.a[5]*matrix.a[6] + this.a[6]*matrix.a[10] + this.a[7]*matrix.a[14];
    var m24 = this.a[4] * matrix.a[3] + this.a[5]*matrix.a[7] + this.a[6]*matrix.a[11] + this.a[7]*matrix.a[15];
    
    var m31=this.a[8]*matrix.a[0] + this.a[9]*matrix.a[4] + this.a[10]*matrix.a[8] + this.a[11]*matrix.a[12];
    var m32=this.a[8]*matrix.a[1] + this.a[9]*matrix.a[5] + this.a[10]*matrix.a[9] + this.a[11]*matrix.a[13];
    var m33=this.a[8]*matrix.a[2] + this.a[9]*matrix.a[6] + this.a[10]*matrix.a[10] + this.a[11]*matrix.a[14];
    var m34=this.a[8]*matrix.a[3] + this.a[9]*matrix.a[7] + this.a[10]*matrix.a[11] + this.a[11]*matrix.a[15];
    
    var m41=this.a[12]*matrix.a[0] + this.a[13]*matrix.a[4] + this.a[14]*matrix.a[8] + this.a[15]*matrix.a[12];
    var m42=this.a[12]*matrix.a[1] + this.a[13]*matrix.a[5] + this.a[14]*matrix.a[9] + this.a[15]*matrix.a[13];
    var m43=this.a[12]*matrix.a[2] + this.a[13]*matrix.a[6] + this.a[14]*matrix.a[10] + this.a[15]*matrix.a[14];
    var m44=this.a[12]*matrix.a[3] + this.a[13]*matrix.a[7] + this.a[14]*matrix.a[11] + this.a[15]*matrix.a[15];
    
    this.a=[m11, m12, m13, m14,
            m21, m22, m23, m24,
            m31, m32, m33, m34,
            m41, m42, m43, m44];     
}

/**
 * Vytvoří z aktuální matice pohledovou matici ze zadaných parametrů.
 * 
 * @this {matrix4}
 * @param {vector} eyePos Úmístění kamery.
 * @param {vector} target Směr pohledu kamery.
 * @param {vector} upVec Směr nahoru.
 */
matrix4.prototype.view = function(eyePos, target, upVec){
    var n = target;
        n.normalize();     
    var u = upVec.crossProduct(n);
        u.normalize();
    var v = n.crossProduct(u);
        
    this.a = [u.x, u.y, u.z, 0,
              v.x, v.y, v.z, 0,
              n.x, n.y, n.z, 0,
                0,   0,   0, 1]  
}

/**
 * Vytvoří z aktuální matice matici perspektivní projekce.
 * 
 * @this{matrix4} 
 * @param {Number} fov Zorný úhel.
 * @param {Number} aspectRatio Poměr výšky a šířky výstupního zařízení.
 * @param {Number} near Vzdálenost od přední stěny zorného objemu.
 * @param {Number} far Vzdálenost od zadní stěny zorného objemu.
 */
matrix4.prototype.perspective = function(fov, aspectRatio, near, far){
        
        
        var top = near * tan(fov/2);
        var bottom = -top;
        var right = top * aspectRatio;
        var left = -right;
        
        var matrix = new matrix4();        
        matrix.frustum(left, right, bottom, top, near, far);
        
        this.a = matrix.a;
}

/**
 * Vytvoří zorný objem ze zadaných parametrů.
 * 
 * @this{matrix4} 
 * @param {Number} left
 * @param {Number} right
 * @param {Number} bottom
 * @param {Number} top
 * @param {Number} near
 * @param {Number} far
 */
matrix4.prototype.frustum = function(left, right, bottom, top, near, far){
    
    
    this.a=[2*near/(right-left),                   0, (right+left)/(right-left),                     0,
                              0, 2*near/(top-bottom), (top+bottom)/(top-bottom),                     0,
                              0,                   0,  -(far+near)/(far-near), -2*far*near/(far-near),
                              0,                   0,                        -1,                     0]
    
}

/**
 * Vytvoří novou trojrozměrnou matici ze zadaných elementů.
 * 
 * @constructor
 * @this {matrix3} 
 * @param {Number} a11
 * @param {Number} a12
 * @param {Number} a13
 * @param {Number} a21
 * @param {Number} a22
 * @param {Number} a23
 * @param {Number} a31
 * @param {Number} a32
 * @param {Number} a33
 */
matrix3=function(a11, a12, a13, a21, a22, a23, a31, a32, a33){
    
    this.a=[a11, a12, a13,
            a21, a22, a23,
            a31, a32, a33,];
}

/**
 * Převede aktuální matici na matici jednotkovou.
 * 
 * @this {matrix3}  
 */
matrix3.prototype.identity=function(){
    
     this.a=[1, 0, 0,
             0, 1, 0,
             0, 0, 1,];
}

/**
 * Vypočítá determinant z matice.
 *  
 * @this {matrix3}   
 * @return {Number} Determinant z matice.
 */
matrix3.prototype.determinant=function(){
    
        
    var m11=this.a[0], m12=this.a[1], m13=this.a[2],
        m21=this.a[3], m22=this.a[4], m23=this.a[5],
        m31=this.a[6], m32=this.a[7], m33=this.a[8];
    
    return (m11*m22*m33+
            m21*m32*m13+
            m31*m12*m23-
            m13*m22*m31-
            m23*m32*m11-
            m33*m12*m21);
}