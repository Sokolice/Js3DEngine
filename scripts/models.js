/**
 * @author Jana Belešová 
 */

/**
 * Vytvoří nový kvádr s nízkými detaily. 
 * 
 * 
 * @extends object3D
 * @param {number} x Souřadnice pozice na ose X.
 * @param {number} y Souřadnice pozice na ose Y.
 * @param {number} z Souřadnice pozice na ose Z.
 */
cuboid_L = function(x,y,z) {  
    this.position = new vector(x,y,z);
    this.vertices = [new point3D(-120, -105, -150), new point3D(120, -105, -150), new point3D(-120, 105, -150), new point3D(120, 105, -150), 
                     new point3D(-120, -105, 150), new point3D(120, -105, 150), new point3D(-120, 105, 150), new point3D(120, 105, 150)];
    this.faces = [[0, 1, 2, 3], [1, 5, 3, 7], [5, 4, 7, 6], [4, 0, 6, 2], [4, 5, 0, 1], [7, 6, 3, 2]];
    this.levelH = 1;
    this.levelV = 1;
}
cuboid_L.prototype = new object3D();

/**
 * Vytvoří nový kvádr se středními detaily. 
 * 
 * 
 * @extends object3D 
 * @param {number} x Souřadnice pozice na ose X.
 * @param {number} y Souřadnice pozice na ose Y.
 * @param {number} z Souřadnice pozice na ose Z.
 */
cuboid_M = function(x,y,z) {   
    this.position = new vector(x,y,z);
    this.vertices = [new point3D(-120, -105, -150), new point3D(0, -105, -150), new point3D(120, -105, -150), new point3D(-120, 0, -150),
                     new point3D(0, 0, -150), new point3D(120, 0, -150), new point3D(-120, 105, -150), new point3D(0, 105, -150), 
                     new point3D(120, 105, -150), new point3D(120, -105, 0), new point3D(120, -105, 150), 
                     new point3D(120, 0, 0),  new point3D(120, 0, 150), new point3D(120, 105, 0), new point3D(120, 105, 150),
                     new point3D(0, -105, 150), new point3D(-120, -105, 150), new point3D(0, 0, 150), new point3D(-120, 0, 150), new point3D(0, 105, 150),
                     new point3D(-120, 105, 150), new point3D(-120, -105, 0), new point3D(-120, 0, 0), new point3D(-120, 105, 0), new point3D(0, -105, 0), 
                     new point3D(0, 105, 0)];
    this.faces = [[0, 1, 2, 3, 4, 5, 6, 7, 8], [2, 9, 10, 5, 11, 12, 8, 13, 14], [10, 15, 16, 12, 17, 18, 14, 19, 20], [16, 21, 0, 18, 22, 3, 20, 23, 6], 
                  [16, 15, 10, 21, 24, 9, 0, 1, 2], [14, 19, 20, 13, 25, 23, 8, 7, 6]];
    this.levelH = 2;
    this.levelV = 2;
}
cuboid_M.prototype = new object3D();

/**
 * Vytvoří nový kvádr s vysokými detaily. 
 * 
 * 
 * @extends object3D
 * @param {number} x Souřadnice pozice na ose X.
 * @param {number} y Souřadnice pozice na ose Y.
 * @param {number} z Souřadnice pozice na ose Z.
 */
cuboid_H = function(x,y,z){
this.position = new vector(x,y,z);
this.vertices = [new point3D(-120,-105,-150), new point3D(-40,-105,-150),new point3D(40,-105,-150), new point3D(120,-105,-150), new point3D(-120,-35,-150), new point3D(-40,-35,-150),
                 new point3D(40,-35,-150), new point3D(120,-35,-150), new point3D(-120,35,-150), new point3D(-40,35,-150), new point3D(40,35,-150), new point3D(120,35,-150),    
                 new point3D(-120,105,-150), new point3D(-40,105,-150), new point3D(40,105,-150), new point3D(120,105,-150), new point3D(120,-105,-50), new point3D(120,-105, 50),
                 new point3D(120,-105, 150), new point3D(120,-35,-50), new point3D(120,-35, 50), new point3D(120,-35, 150), new point3D(120,35,-50), new point3D(120,35,50),  
                 new point3D(120,35, 150), new point3D(120,105,-50), new point3D(120,105, 50), new point3D(120,105, 150), new point3D(40,-105, 150), new point3D(-40,-105, 150),
                 new point3D(-120,-105,150), new point3D(40,-35, 150), new point3D(-40,-35, 150), new point3D(-120,-35, 150), new point3D(40,35, 150), new point3D(-40,35, 150),
                 new point3D(-120,35, 150), new point3D(40,105, 150), new point3D(-40,105, 150), new point3D(-120,105, 150), new point3D(-120,-105,50), new point3D(-120,-105, -50),    
                 new point3D(-120,-35,50), new point3D(-120,-35, -50), new point3D(-120,35, 50), new point3D(-120,35, -50), new point3D(-120,105,50), new point3D(-120,105, -50),
                 new point3D(-40,-105, 50), new point3D(40,-105, 50), new point3D(-40,-105,-50), new point3D(40,-105,-50), new point3D(-40,105, 50), new point3D(40,105, 50),
                 new point3D(-40,105,-50), new point3D(40,105,-50)];
this.faces = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
              [3, 16, 17, 18, 7, 19, 20, 21, 11, 22, 23, 24, 15, 25, 26, 27],
              [18, 28, 29, 30, 21, 31, 32, 33, 24, 34, 35, 36, 27, 37, 38, 39],
              [30, 40, 41, 0, 33, 42, 43, 4, 36, 44, 45, 8, 39, 46, 47, 12],
              [30, 29, 28, 18, 40, 48, 49, 17, 41, 50, 51, 16, 0, 1, 2, 3],
              [27, 37, 38, 39, 26, 53, 52, 46, 25, 55, 54, 47, 15, 14, 13, 12]];               
this.levelH = 3;
this.levelV = 3;
}
cuboid_H.prototype = new object3D();          


/**
 * Vytvoří novou kouli s nízkými detaily. 
 * 
 * 
 * @extends object3D
 * @param {number} x Souřadnice pozice na ose X.
 * @param {number} y Souřadnice pozice na ose Y.
 * @param {number} z Souřadnice pozice na ose Z.
 */
sphere_L = function(x, y, z){
this.position = new vector(x, y, z)
this.vertices = [new point3D(0,20,0),new point3D(0,20,0),new point3D(0,20,0),new point3D(0,20,0),new point3D(0,20,0),new point3D(0,20,0),new point3D(0,20,0),
                new point3D(0,20,0),new point3D(0,20,0),new point3D(0,20,0),new point3D(0,20,0),new point3D(0,20,0), new point3D(0,20,0),
                new point3D(-0.369,17.3205,10.369), new point3D(-5.369,17.3205,9.0293), new point3D(-9.0293,17.3205,5.369),
                new point3D(-10.369,17.3205,0.369), new point3D(-9.0293,17.3205,-4.631), new point3D(-5.369,17.3205,-8.2912), new point3D(-0.369,17.3205,-9.631),
                new point3D(4.631,17.3205,-8.2913), new point3D(8.2912,17.3205,-4.631), new point3D(9.631,17.3205,0.369), new point3D(8.2913,17.3205,5.369),
                new point3D(4.631,17.3205,9.0293), new point3D(-0.369,17.3205,10.369), new point3D(-0.369,10,17.6895), 
                new point3D(-9.0293,10,15.369), new point3D(-15.369,10,9.0293), new point3D(-17.6895,10,0.369), 
                new point3D(-15.369,10,-8.2912), new point3D(-9.0293,10,-14.631), new point3D(-0.369,10,-16.9515), 
                new point3D(8.2912,10,-14.631), new point3D(14.631,10,-8.2913), new point3D(16.9515,10,0.369), new point3D(14.631,10,9.0292), 
                new point3D(8.2913,10,15.369), new point3D(-0.369,10,17.6895), new point3D(-0.369,0,20.369), new point3D(-10.369,0,17.6895), 
                new point3D(-17.6895,0,10.369), new point3D(-20.369,0,0.369), new point3D(-17.6895,0,-9.631), new point3D(-10.369,0,-16.9515), new point3D(-0.369,0,-19.631), 
                new point3D(9.631,0,-16.9515), new point3D(16.9515,0,-9.631), new point3D(19.631,0,0.369), new point3D(16.9515,0,10.369), 
                new point3D(9.631,0,17.6895),new point3D(-0.369,0,20.369), new point3D(-0.369,-10,17.6895), new point3D(-9.0293,-10,15.369), 
                new point3D(-15.369,-10,9.0293), new point3D(-17.6895,-10,0.369), new point3D(-15.369,-10,-8.2912), new point3D(-9.0293,-10,-14.631), 
                new point3D(-0.369,-10,-16.9515), new point3D(8.2912,-10,-14.631), new point3D(14.631,-10,-8.2913), new point3D(16.9515,-10,0.369), 
                new point3D(14.631,-10,9.0292), new point3D(8.2913,-10,15.369),new point3D(-0.369,-10,17.6895), 
                new point3D(-0.369,-17.3205,10.369), new point3D(-5.369,-17.3205,9.0293), new point3D(-9.0293,-17.3205,5.369), 
                new point3D(-10.369,-17.3205,0.369), new point3D(-9.0293,-17.3205,-4.631), new point3D(-5.369,-17.3205,-8.2912),
                new point3D(-0.369,-17.3205,-9.631), new point3D(4.631,-17.3205,-8.2913), new point3D(8.2912,-17.3205,-4.631),
                new point3D(9.631,-17.3205,0.369), new point3D(8.2913,-17.3205,5.369), new point3D(4.631,-17.3205,9.0293),new point3D(-0.369,-17.3205,10.369),
                new point3D(0,-20,0), new point3D(0,-20,0), new point3D(0,-20,0), new point3D(0,-20,0), new point3D(0,-20,0), new point3D(0,-20,0), 
                new point3D(0,-20,0), new point3D(0,-20,0), new point3D(0,-20,0), new point3D(0,-20,0), new point3D(0,-20,0), new point3D(0,-20,0), new point3D(0,-20,0)];
              
this.faces = [[12,11,10,9,8,7,6,5,4,3,2,1,0,25,24,23,22,21,20,19,18,17,16,15,14,13,38,37,36,35,34,33,32,31,30,29,28,27,26,51,50,49,48,47,46,45,44,43,42,
                41,40,39,64,63,62,61,60,59,58,57,56,55,54,53,52,77,76,75,74,73,72,71,70,69,68,67,66,65,90,89,88,87,86,85,84,83,82,81,80,79,78]];
this.levelH = 12;
this.levelV = 6;
this.scale = new vector(8,8,8);
}
sphere_L.prototype = new object3D();

/**
 * Vytvoří novou kouli s vysokými detaily. 
 * 
 * 
 * @extends object3D
 * @param {number} x Souřadnice pozice na ose X.
 * @param {number} y Souřadnice pozice na ose Y.
 * @param {number} z Souřadnice pozice na ose Z.
 */
sphere_H = function(x, y, z) {
    
    this.vertices = [new point3D(0, 20, 0), new point3D(0, 20, 0), new point3D(0, 20, 0), new point3D(0, 20, 0),
                     new point3D(0, 20, 0), new point3D(0, 20, 0), new point3D(0, 20, 0), new point3D(0, 20, 0),
                     new point3D(0, 20, 0), new point3D(0, 20, 0), new point3D(0, 20, 0), new point3D(0, 20, 0),
                     new point3D(0, 20, 0), new point3D(0, 20, 0), new point3D(0, 20, 0), new point3D(0, 20, 0),
                     new point3D(0, 20, 0), new point3D(2.5599,18.4776,7.4401), new point3D(5.043,18.4776,5.781), new point3D(6.7021,18.4776,3.2979), 
                     new point3D(7.2847,18.4776,0.369), new point3D(6.7021,18.4776,-2.5599), new point3D(5.043,18.4776,-5.043), 
                     new point3D(2.5599,18.4776,-6.7021), new point3D(-0.369,18.4776,-7.2847), new point3D(-3.2979,18.4776,-6.7021), 
                     new point3D(-5.781,18.4776,-5.043), new point3D(-7.4401,18.4776,-2.5599), new point3D(-8.0227,18.4776,0.369), 
                     new point3D(-7.4401,18.4776,3.2979), new point3D(-5.781,18.4776,5.781), new point3D(-3.2979,18.4776,7.4401), 
                     new point3D(-0.369,18.4776,8.0227), new point3D(2.5599,18.4776,7.4401), new point3D(5.0429,14.1421,13.4346), 
                     new point3D(9.631,14.1421,10.369), new point3D(12.6966,14.1421,5.781), new point3D(13.7731,14.1421,0.369), 
                     new point3D(12.6966,14.1421,-5.043), new point3D(9.631,14.1421,-9.631), new point3D(5.043,14.1421,-12.6966), 
                     new point3D(-0.369,14.1421,-13.7731), new point3D(-5.781,14.1421,-12.6966), new point3D(-10.369,14.1421,-9.631),
                     new point3D(-13.4346,14.1421,-5.043), new point3D(-14.5111,14.1421,0.369), new point3D(-13.4346,14.1421,5.781), 
                     new point3D(-10.369,14.1421,10.369), new point3D(-5.781,14.1421,13.4346), new point3D(-0.369,14.1421,14.5111), 
                     new point3D(5.0429,14.1421,13.4346), new point3D(6.702,7.6537,17.4401), new point3D(12.6966,7.6537,13.4346), 
                     new point3D(16.7021,7.6537,7.4401), new point3D(18.1086,7.6537,0.369), new point3D(16.7021,7.6537,-6.7021),
                     new point3D(12.6966,7.6537,-12.6966), new point3D(6.7021,7.6537,-16.7021), new point3D(-0.369,7.6537,-18.1086), 
                     new point3D(-7.4401,7.6537,-16.7021), new point3D(-13.4346,7.6537,-12.6966), new point3D(-17.4401,7.6537,-6.7021), 
                     new point3D(-18.8466,7.6537,0.369), new point3D(-17.4401,7.6537,7.4401), new point3D(-13.4346,7.6537,13.4346), 
                     new point3D(-7.4401,7.6537,17.4401), new point3D(-0.369,7.6537,18.8466), new point3D(6.702,7.6537,17.4401),
                     new point3D(7.2846,-0,18.8466), new point3D(13.7731,-0,14.5112), new point3D(18.1086,-0,8.0227), new point3D(19.631,-0,0.369), 
                     new point3D(18.1086,-0,-7.2847), new point3D(13.7731,-0,-13.7731), new point3D(7.2847,-0,-18.1086), 
                     new point3D(-0.369,-0,-19.631), new point3D(-8.0227,-0,-18.1086), new point3D(-14.5111,-0,-13.7731), 
                     new point3D(-18.8466,-0,-7.2847), new point3D(-20.369,-0,0.369), new point3D(-18.8466,-0,8.0227), new point3D(-14.5111,-0,14.5111), 
                     new point3D(-8.0227,-0,18.8466), new point3D(-0.369,-0,20.369), new point3D(7.2846,-0,18.8466),  
                     new point3D(6.702,-7.6537,17.4401), new point3D(12.6966,-7.6537,13.4346), new point3D(16.7021,-7.6537,7.4401), 
                     new point3D(18.1086,-7.6537,0.369), new point3D(16.7021,-7.6537,-6.7021), new point3D(12.6966,-7.6537,-12.6966), 
                     new point3D(6.7021,-7.6537,-16.7021), new point3D(-0.369,-7.6537,-18.1086), new point3D(-7.4401,-7.6537,-16.7021), 
                     new point3D(-13.4346,-7.6537,-12.6966), new point3D(-17.4401,-7.6537,-6.7021), new point3D(-18.8466,-7.6537,0.369), 
                     new point3D(-17.4401,-7.6537,7.4401), new point3D(-13.4346,-7.6537,13.4346), new point3D(-7.4401,-7.6537,17.4401), 
                     new point3D(-0.369,-7.6537,18.8466), new point3D(6.702,-7.6537,17.4401), new point3D(5.0429,-14.1421,13.4346), 
                     new point3D(9.631,-14.1421,10.369), new point3D(12.6966,-14.1421,5.781), new point3D(13.7731,-14.1421,0.369), 
                     new point3D(12.6966,-14.1421,-5.043), new point3D(9.631,-14.1421,-9.631), new point3D(5.043,-14.1421,-12.6966), 
                     new point3D(-0.369,-14.1421,-13.7731), new point3D(-5.781,-14.1421,-12.6966), new point3D(-10.369,-14.1421,-9.631), 
                     new point3D(-13.4346,-14.1421,-5.043), new point3D(-14.5111,-14.1421,0.369), new point3D(-13.4346,-14.1421,5.781), 
                     new point3D(-10.369,-14.1421,10.369), new point3D(-5.781,-14.1421,13.4346), new point3D(-0.369,-14.1421,14.5111), 
                     new point3D(5.0429,-14.1421,13.4346), new point3D(2.5599,-18.4776,7.4401), new point3D(5.043,-18.4776,5.781), 
                     new point3D(6.7021,-18.4776,3.2979), new point3D(7.2847,-18.4776,0.369), new point3D(6.7021,-18.4776,-2.5599), 
                     new point3D(5.043,-18.4776,-5.043), new point3D(2.5599,-18.4776,-6.7021), new point3D(-0.369,-18.4776,-7.2847), 
                     new point3D(-3.2979,-18.4776,-6.7021), new point3D(-5.781,-18.4776,-5.043), new point3D(-7.4401,-18.4776,-2.5599), 
                     new point3D(-8.0227,-18.4776,0.369), new point3D(-7.4401,-18.4776,3.2979), new point3D(-5.781,-18.4776,5.781), 
                     new point3D(-3.2979,-18.4776,7.4401), new point3D(-0.369,-18.4776,8.0227), new point3D(2.5599,-18.4776,7.4401), 
                     new point3D(0, -20, 0), new point3D(0, -20, 0), new point3D(0, -20, 0), new point3D(0, -20, 0), new point3D(0, -20, 0),
                     new point3D(0, -20, 0), new point3D(0, -20, 0), new point3D(0, -20, 0), new point3D(0, -20, 0), new point3D(0, -20, 0),
                     new point3D(0, -20, 0), new point3D(0, -20, 0), new point3D(0, -20, 0), new point3D(0, -20, 0), new point3D(0, -20, 0),
                     new point3D(0, -20, 0), new point3D(0, -20, 0)];
                     
    this.faces=[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
                35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
                69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101,
                102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127,
                128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152]]
    this.levelH = 16;
    this.levelV = 8;
    this.position = new vector(x,y,z);
    this.scale = new vector(8,8,8);
}
sphere_H.prototype = new object3D();