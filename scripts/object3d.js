/**
 * @author Jana Belešová
 */

/**
 * Vytvoří instanci 3D modelu.
 *
 * @constructor
 * @this {object3D}
 * @property {Array} vertices Pole vrcholů objektu.
 * @property {Array} faces Pole stěn pokrývajících povrch tělesa.
 * @property {Array} triangles Pole trojúhelníku tvořících síť tělesa.
 * @property {matrix4} modelMatrix Matice popisující objekt v prostoru světa.
 * @property {vector} position Pozice v prostoru světa.
 * @property {vector} scale Měřítko popisující těleso.
 * @property {Object} texture Textura pro potažení povrchu tělesa.
 * @property {Number} levelH Počet bodů na výšku textury v plochách tělesa, slouží k přiřazení souřadnic textury a vytvoření trojúhelníků.
 * @property {Number} levelV Počet bodů na šířku textury v plochách tělesa, slouží k přiřazení souřadnic textury a vytvoření trojúhelníků.
 * @property {Number} angleX Úhel otočení kolem osy X.
 * @property {Number} angleY Úhel otočení kolem osy Y.
 * @property {Number} angleZ Úhel otočení kolem osy Z.
 * @property {Object} context Instance contextu pro vykreslování.
 */
object3D = function() {
    this.vertices = [];
    this.faces = [];
    this.triangles = [];
    this.modelMatrix = new matrix4();
    this.position = new vector(0, 0, 0);
    this.scale = new vector(1, 1, 1);
    this.texture = this.texture;
    this.levelH = this.levelH;
    this.levelV = this.levelV;
    this.angleX = this.angleX;
    this.angleY = this.angleY
    this.angleZ = this.angleZ
    this.context = this.context;
}
/**
 * Natavení rotace kolem osy X.
 *
 * @this {object3D}
 * @param {Number} angleX Úhel otočení kolem osy X.
 *
 */
object3D.prototype.setRotateX = function(angleX) {
    this.angleX = angleX;
    this.updateModelMatrix();
}
/**
 * Natavení rotace kolem osy Y.
 *
 * @this {object3D}
 * @param {Number} angleY Úhel otočení kolem osy Y.
 */
object3D.prototype.setRotateY = function(angleY) {
    this.angleY = angleY;
    this.updateModelMatrix();
}
/**
 * Natavení rotace kolem osy Z.
 *
 * @this {object3D}
 * @param {Number} angleZ úhel otočení kolem osy Z.
 */
object3D.prototype.setRotateZ = function(angleZ) {
    this.angleZ = angleZ;
    this.updateModelMatrix();
}
/**
 * Nastavení odpovídajícího context.
 *
 * @this {object3D}
 * @param {Object} context Instance contextu, pomocí kterého se bude vykreslovat.
 */
object3D.prototype.setContext = function(context) {
    this.context = context;
}
/**
 * Aktualizace matice modelu, na základě rotace, posunutí a měřítka modelu.
 *
 * @this {object3D}
 */
object3D.prototype.updateModelMatrix = function() {

    scaleM = new matrix4();
    rotxM = new matrix4();
    rotyM = new matrix4();
    rotzM = new matrix4();
    translateM = new matrix4();
    model = new matrix4()

    scaleM.scale(this.scale.x, this.scale.y, this.scale.z);
    rotxM.rotateX(this.angleX);
    rotyM.rotateY(this.angleY);
    rotzM.rotateZ(this.angleZ);
    translateM.translate(this.position.x, this.position.y, this.position.z);

    model.multiplyByMatrix(translateM);
    model.multiplyByMatrix(rotxM);
    model.multiplyByMatrix(rotyM);
    model.multiplyByMatrix(rotzM);
    model.multiplyByMatrix(scaleM);

    this.modelMatrix = model;
}
/**
 * Vykreslování objektů.
 *
 * @this {object3D}
 * @param {camera} camera Kamera použití při vykreslování.
 */
object3D.prototype.render = function(camera) {

    this.generateTriangles();
    this.doPerspective(camera);
    this.backFaceCulling();
    this.trianglesToDraw = [];

    for (var i = 0; i < this.faces.length; i++) {
        var f = this.faces[i];
        this.generateUV(f);

        for (var j = 0; j < this.triangles.length; j++) {

            var triangle = this.triangles[j];
            if (triangle.parentFace == i) {

                if (!triangleVisibility(triangle))
                    this.clipping(triangle);
                else
                    this.trianglesToDraw.push(triangle);
            }
        }
    }

    for (var i = 0; i < this.faces.length; i++) {
        var f = this.faces[i];
        this.generateUV(f);

        for (var j = 0; j < this.trianglesToDraw.length; j++) {
            var triangle = this.trianglesToDraw[j];

            if (triangle.parentFace == i && !triangle.backFace) {
                this.viewPort(triangle.p0);
                this.viewPort(triangle.p1);
                this.viewPort(triangle.p2);
                this.applyTexture(triangle.p0, triangle.p1, triangle.p2, camera);

            }

        }
    }

}
/**
 * Odstranění odvrácených ploch - BackFace Culling.
 *
 * @this {object3D}
 */
object3D.prototype.backFaceCulling = function() {

    for (var i = 0; i < this.triangles.length; i++) {

        var triangle = this.triangles[i];

        var p0 = new vector(triangle.p0.x, triangle.p0.y, triangle.p0.z);
        var p1 = new vector(triangle.p1.x, triangle.p1.y, triangle.p1.z);
        var p2 = new vector(triangle.p2.x, triangle.p2.y, triangle.p2.z);

        var U = p1.subtraction(p0);
        var V = p2.subtraction(p0);
        var normal = U.crossProduct(V);

        if (normal.z < 0)
            triangle.backFace = true;
        else {
            triangle.backFace = false;
        }

    }
}
/**
 * Provede perspektivní projekci pro všechny body na tělese.
 *
 * @this {object3D}
 * @param {camera} camera
 */
object3D.prototype.doPerspective = function(camera) {

    for (var i = 0; i < this.vertices.length; i++) {

        var v = this.vertices[i];
        var projection = new matrix4();

        projection.perspective(camera.fov, camera.aspectRatio, camera.near, camera.far);
        projection.multiplyByMatrix(camera.viewMatrix);
        projection.multiplyByMatrix(this.modelMatrix);

        var mult = projection.multiplyByVector(v.vertex);

        var x = mult.x / mult.w;
        var y = mult.y / mult.w;
        var z = mult.z / mult.w;
        var w = mult.w / mult.w;

        v.x = x;
        v.y = y;
        v.z = z;
        v.w = w;
    }
}
/**
 * Generování trojúhelníků z bodů popisujících povrch tělesa. Pro správnou funkci je potřeba mít seřazeny body v jednotlivých stěnách
 * na základě jejich pořadí ve stěně, a to zleva do prava a od shora dolů.
 *
 * @this {object3D}
 */
object3D.prototype.generateTriangles = function() {

    this.triangles = [];
    if (this.levelH >= this.levelV)
        var l = this.levelH + 1;
    else
        var l = this.levelV + 1;

    for (var i = 0; i < this.faces.length; i++) {
        var f = this.faces[i];

        for (var j = 0; j < this.levelV; j++) {
            for (var k = 0; k < this.levelH; k++) {
                this.triangles.push({
                    p0 : this.vertices[f[k + j * l]],
                    p1 : this.vertices[f[k + j * l + 1]],
                    p2 : this.vertices[f[k + (j + 1) * l]],
                    parentFace : i
                });
                this.triangles.push({
                    p0 : this.vertices[f[k + j * l + 1]],
                    p1 : this.vertices[f[k + (j + 1) * l + 1]],
                    p2 : this.vertices[f[k + (j + 1) * l]],
                    parentFace : i
                });
            }
        }
    }

}
/**
 * Generování souřadnic textur.
 *
 * @this {object3D}
 * @param {Array} surface Plocha, pro kterou se budou generovat souřadnice.
 */
object3D.prototype.generateUV = function(surface) {
    var v = 0;

    for (var i = 0; i <= this.levelV; i++) {
        for (var j = 0; j <= this.levelH; j++) {
            var tx = (j * (1 / this.levelH));
            var ty = (i * (1 / this.levelV));

            this.vertices[surface[v]].u = tx;
            this.vertices[surface[v]].v = ty;
            v++;

        }
    }

}
/**
 * Ořezání trojúhelníka zorným objemem.
 *
 * @param {Object} triangle Trojúhelník, který se bude ořezávat.
 */
object3D.prototype.clipping = function(triangle) {

    if (triangle.backFace == true) {
        return;
    } else {

        var normals = [new vector(-1, 0, 0, -1), new vector(1, 0, 0, -1), new vector(0, -1, 0, -1), new vector(0, 1, 0, -1), new vector(0, 0, -1, 0), new vector(0, 0, 1, -1)];
        var points = [new vector(triangle.p0.x, triangle.p0.y, triangle.p0.z, triangle.p0.w), new vector(triangle.p1.x, triangle.p1.y, triangle.p1.z, triangle.p1.w), new vector(triangle.p2.x, triangle.p2.y, triangle.p2.z, triangle.p2.w)]
        var uv = [[triangle.p0.u, triangle.p0.v], [triangle.p1.u, triangle.p1.v], [triangle.p2.u, triangle.p2.v]]
        var isInside = [true, true, true];
        var outPoints;

        for (var i = 0; i < normals.length; i++) {
            var outList = [];
            var n = normals[i];
            outPoints = 0;

            for (var j = 0; j < points.length; j++) {

                if (n.dotProduct(points[j]) > 0) {
                    isInside[j] = false;
                    outPoints++;
                } else
                    isInside[j] = true;
            }

            if (outPoints > 0) {

                if (outPoints == 3) {
                    return;
                }

                for (var j = 0; j < points.length; j++) {
                    var next = (j + 1) % 3;

                    if (isInside[j] && !isInside[next]) {

                        outList.push({
                            p : points[j],
                            intersection : false,
                            u : uv[j][0],
                            v : uv[j][1]
                        });

                        var I = calculateIntersection(n, points[j], points[next]);

                        outList.push({
                            p : I,
                            intersection : true
                        });

                    }

                    if (!isInside[j] && isInside[next]) {

                        var I = calculateIntersection(n, points[next], points[j]);

                        outList.push({
                            p : I,
                            intersection : true
                        });

                        if (outPoints == 1) {
                            outList.push({
                                p : points[next],
                                intersection : false,
                                u : uv[next][0],
                                v : uv[next][1]
                            });
                        }

                    }
                }

                if (outPoints == 1) {

                    this.calculateUV(triangle, outList);

                    var triangle1 = {
                        p0 : new point3D(outList[0].p.x, outList[0].p.y, outList[0].p.z, outList[0].u, outList[0].v),
                        p1 : new point3D(outList[1].p.x, outList[1].p.y, outList[1].p.z, outList[1].u, outList[1].v),
                        p2 : new point3D(outList[2].p.x, outList[2].p.y, outList[2].p.z, outList[2].u, outList[2].v),
                        parentFace : triangle.parentFace,
                        backFace : false
                    };

                    var triangle2 = {
                        p0 : new point3D(outList[0].p.x, outList[0].p.y, outList[0].p.z, outList[0].u, outList[0].v),
                        p1 : new point3D(outList[2].p.x, outList[2].p.y, outList[2].p.z, outList[2].u, outList[2].v),
                        p2 : new point3D(outList[3].p.x, outList[3].p.y, outList[3].p.z, outList[3].u, outList[3].v),
                        parentFace : triangle.parentFace,
                        backFace : false
                    };

                    if (triangleVisibility(triangle1))
                        this.trianglesToDraw.push(triangle1);
                    else
                        this.triangles.push(triangle1);

                    if (triangleVisibility(triangle2))
                        this.trianglesToDraw.push(triangle2);
                    else
                        this.triangles.push(triangle2);

                    return;

                } else if (outPoints == 2) {

                    this.calculateUV(triangle, outList);
                    var triangle3 = {
                        p0 : new point3D(outList[0].p.x, outList[0].p.y, outList[0].p.z, outList[0].u, outList[0].v),
                        p1 : new point3D(outList[1].p.x, outList[1].p.y, outList[1].p.z, outList[1].u, outList[1].v),
                        p2 : new point3D(outList[2].p.x, outList[2].p.y, outList[2].p.z, outList[2].u, outList[2].v),
                        parentFace : triangle.parentFace,
                        backFace : false
                    }

                    if (triangleVisibility(triangle3))
                        this.trianglesToDraw.push(triangle3);
                    else
                        this.triangles.push(triangle3);
                    return;
                }

            }
        }

    }

}
/**
 * Dopočítání souřadnic textury pro body vzniklé ořezáním zorným objemem.
 *
 * @param {Object} triangle Trojúhelník, uvnitř kterého je bod, pro který je nutné dopočítat souřadnice textury.
 * @param {Object} points Nově vzniklé body v rámci ořezávání.
 */
object3D.prototype.calculateUV = function(triangle, points) {

    for ( i = 0; i < points.length; i++) {
        var point = points[i];
        if (point.intersection == true) {

            var a = new vector(triangle.p0.x, triangle.p0.y, triangle.p0.z);
            var b = new vector(triangle.p1.x, triangle.p1.y, triangle.p1.z);
            var c = new vector(triangle.p2.x, triangle.p2.y, triangle.p2.z);
            var p = new vector(point.p.x, point.p.y, point.p.z);

            v1 = b.subtraction(c);
            v2 = p.subtraction(c);
            v3 = b.subtraction(a);
            v4 = p.subtraction(a);
            v5 = c.subtraction(a);

            A1 = v1.crossProduct(v2);
            BCP = A1.length() / 2;
            A2 = v3.crossProduct(v4);
            ABP = A2.length() / 2;
            A3 = v4.crossProduct(v5);
            ACP = A3.length() / 2;
            ABC = BCP + ABP + ACP;

            var alpha = BCP / ABC;

            var beta = ACP / ABC;

            var gama = 1 - alpha - beta;

            point.u = triangle.p0.u * alpha + triangle.p1.u * beta + triangle.p2.u * gama;
            point.v = triangle.p0.v * alpha + triangle.p1.v * beta + triangle.p2.v * gama;

        }

    }
}
/**
 * Transformace na výstupní zařízení.
 *
 * @param {point3D} point Bod, který se bude transformovat.
 */
object3D.prototype.viewPort = function(point) {

    var x = 50;
    var y = 50;
    var w = this.context.canvas.width - 100;
    var h = this.context.canvas.height - 100;

    point.xw = point.x * w / 2 + x + w / 2;

    point.yw = point.y * h / 2 + y + h / 2;
};

/**
 * Přiřazení textury 3D modelu.
 *
 * @this {object3D}
 * @param {Object} source Cesta k souboru s texturou.
 */
object3D.prototype.loadTexture = function(source) {
    this.texture = new Image();

    this.texture.onload = function() {
    }
    this.texture.src = source;
}
/**
 * Funkce pro vykreslení textury do canvasu. Vykresluje texturu jednoho trojúhelníka.
 *
 * @this {object3D}
 * @param {point3D} p0 První vrchol trojúhelníka.
 * @param {point3D} p1 Druhý vrchol trojúhelníka.
 * @param {point3D} p2 Třetí vrchol trojúhelníka.
 */
object3D.prototype.applyTexture = function(p0, p1, p2) {

    this.context.strokeStyle = "#000000"
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(p0.xw, p0.yw);
    this.context.lineTo(p1.xw, p1.yw);
    this.context.lineTo(p2.xw, p2.yw);
    this.context.closePath();
    //this.context.stroke();
    this.context.clip();

    var m = this.calculateTransformation(p0, p1, p2);

    this.context.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
    this.context.drawImage(this.texture, 0, 0);
    this.context.restore();
}
/**
 * Výpočet transformace textury trojúhelníka.
 *
 * @this {object3D}
 * @param {Object} p0 První vrchol trojúhelníka.
 * @param {Object} p1 Druhý vrchol trojúhelníka.
 * @param {Object} p2 Třetí vrchol trojúhelníka.
 */
object3D.prototype.calculateTransformation = function(p0, p1, p2) {

    var u0 = p0.u * this.texture.width;
    var u1 = p1.u * this.texture.width;
    var u2 = p2.u * this.texture.width;

    var v0 = p0.v * this.texture.height;
    var v1 = p1.v * this.texture.height;
    var v2 = p2.v * this.texture.height;

    var A = new matrix3(u0, v0, 1, u1, v1, 1, u2, v2, 1);
    var detA = A.determinant();

    var A1 = new matrix3(p0.xw, v0, 1, p1.xw, v1, 1, p2.xw, v2, 1);
    var detA1 = A1.determinant();

    var A2 = new matrix3(p0.yw, v0, 1, p1.yw, v1, 1, p2.yw, v2, 1);
    var detA2 = A2.determinant();

    var A3 = new matrix3(u0, p0.xw, 1, u1, p1.xw, 1, u2, p2.xw, 1);
    var detA3 = A3.determinant();

    var A4 = new matrix3(u0, p0.yw, 1, u1, p1.yw, 1, u2, p2.yw, 1);
    var detA4 = A4.determinant();

    var A5 = new matrix3(u0, v0, p0.xw, u1, v1, p1.xw, u2, v2, p2.xw);
    var detA5 = A5.determinant();

    var A6 = new matrix3(u0, v0, p0.yw, u1, v1, p1.yw, u2, v2, p2.yw);
    var detA6 = A6.determinant();

    var transformation = [ m11 = detA1 / detA, m12 = detA2 / detA, m13 = detA3 / detA, m21 = detA4 / detA, m22 = detA5 / detA, m23 = detA6 / detA];

    return transformation;
}
/**
 * Výpočet průsečíku úsečky s rovinou.
 *
 * @function
 * @param {Object} n Normálový vektor roviny.
 * @param {Object} p0 Krajní bod úsečky.
 * @param {Object} p1 Krajní bod úsečky.
 * @return {vector} p Průsečík úsečky s rovinou.
 */
calculateIntersection = function(n, p0, p1) {

    var lambda = n.dotProduct(p0) / n.dotProduct(p0.subtraction(p1));

    if (lambda >= 0 && lambda <= 1) {
        return p0.multiplyByScalar(1 - lambda).add(p1.multiplyByScalar(lambda));
    }
}
/**
 * Zjistí zda se bod nachází uvnitř zorného objemu.
 *
 * @function
 * @param {point3D} point
 * @return {Boolean} True, jestliže je bod uvnitř objemu, v opačném případě false.
 */
pointVisibility = function(point) {

    if ((point.x >= -1 && point.x <= 1) && (point.y >= -1 && point.y <= 1) && (point.z >= 0 && point.z <= 1))
        return true;
    else
        return false;
}
/**
 * Zjistí viditelnost trojúhelníka na základě viditelnosti jeho vrcholů.
 *
 * @function
 * @param {Object} triangle
 * @return {Boolean} True, jestliže je trojúhelník celý uvnitř zorného objemu, v opačném případě vrátí false.
 */
triangleVisibility = function(triangle) {

    if (!pointVisibility(triangle.p0) || !pointVisibility(triangle.p1) || !pointVisibility(triangle.p2))
        return false
    else
        return true;
}