//枫叶

var stop, staticx;
var img = new Image();
img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAvtJREFUeF7tWG1OwzAMTbv/IE7EBuIAIO4zdh8EB0DAOBGC/2uRq3pKTRJ7zReh6T9Gk9rP7z07adTCn2bh+asKQGXAwhGoElg4AaoJVglUCSwcgSqBHAT4fLlfr1aH7dnV8ybH9/VvZmHA99vte983awik69rNxc3jPhcQyQGA6rdt964nnBOE5AB8vd49KKW2tOK5QMgBQG+jew4QkgJgov/EkJp+n9oYkwKgm5/D9Hbn108gkyRPUgC+Xu+s9NezPb9+ShZXsg9x9CflFrFgNFTVNP3lXOkkA0BI/yMOLhbQTtJ4eEdWACBwHIgkbdHWQv8lAEqpowwk8pnrG8kYYDHAnWkoGtkwAGCrOmXMnwfA5AGjBD4sIOy6rt3TsdnUG4uVAFbaBgC4u80jQg1QwSQAOsWg2rZbQ/Xgbzzpuc4Aliq75DEhgs8IPRuA0Zgg6V8HG1qdw2EFyShHovDvyT6uDiHpGNIx0heAybGW+egAggEw2+/SHNRcA4QPzAYAFksdmssEEuDGZGAE7EM9wccAvQGADU6d8ExgjAAY7wk0ozSxx/tGyYsBEBE3pAi17JKBtR36Vj8IAzgpQJBggnAJ6mhpOPRMTovo7jaW+bg/MtGbAbgRJwUMFm+EKRhEBgMgDLtEJ0bOf4IBIPEDZAPOBggGrKXHWcZggyQfTAI6ypLOQIGgVeKS19/3vT0KygAMzEZzEx3xPACTIzCDM1WyhzcTogCAQUIlhfP8JBEcq8E4cS+TgfoMQMFNUCIDbZiBE+Dw6BSWjtewLkQHiOIBkrZIpaBXF6rKdZQQ/T8qAzgQXK0JK+sajUNVPxoDdA/gTosUDNS1yUi57sH1fKMJz1l0yppTOwKdBzRfmPjFKTG43o3aBagxch0hJLWlACUDQJ8R4MYIwIDf+r4ZOoLvQCNNmL6XHIC5gcZaVwGIhWwp+1YGlFKpWHFWBsRCtpR9KwNKqVSsOCsDYiFbyr6VAaVUKlaclQGxkC1l38qAUioVK87FM+AH35nTUJOi+CQAAAAASUVORK5CYII=";

function Sakura(x, y, s, r, fn) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.r = r;
    this.fn = fn;
}

Sakura.prototype.draw = function(cxt) {
    cxt.save();
    var xc = 40 * this.s / 4;
    cxt.translate(this.x, this.y);
    cxt.rotate(this.r);
    cxt.drawImage(img, 0, 0, 35 * this.s, 35 * this.s)
    //樱花大小
    cxt.restore();
}

Sakura.prototype.update = function() {
    this.x = this.fn.x(this.x, this.y);
    this.y = this.fn.y(this.y, this.y);
    this.r = this.fn.r(this.r);
    if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
        this.r = getRandom('fnr');
        if (Math.random() > 0.4) {
            this.x = getRandom('x');
            this.y = 0;
            this.s = getRandom('s');
            this.r = getRandom('r');
        } else {
            this.x = window.innerWidth;
            this.y = getRandom('y');
            this.s = getRandom('s');
            this.r = getRandom('r');
        }
    }
}

SakuraList = function() {
    this.list = [];
}
SakuraList.prototype.push = function(sakura) {
    this.list.push(sakura);
}
SakuraList.prototype.update = function() {
    for (var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].update();
    }
}
SakuraList.prototype.draw = function(cxt) {
    for (var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].draw(cxt);
    }
}
SakuraList.prototype.get = function(i) {
    return this.list[i];
}
SakuraList.prototype.size = function() {
    return this.list.length;
}

function getRandom(option) {
    var ret, random;
    switch (option) {
    case 'x':
        ret = Math.random() * window.innerWidth;
        break;
    case 'y':
        ret = Math.random() * window.innerHeight;
        break;
    case 's':
        ret = Math.random();
        break;
    case 'r':
        ret = Math.random() * 6;
        break;
    case 'fnx':
        random = -0.5 + Math.random() * 1;
        ret = function(x, y) {
            return x + 0.5 * random - 0.6;
            //x轴速度
        }
        ;
        break;
    case 'fny':
        random = 0.8 + Math.random() * 0.7
        //y轴速度
        ret = function(x, y) {
            return y + random;
        }
        ;
        break;
    case 'fnr':
        random = Math.random() * 0.03;
        ret = function(r) {
            return r + random;
        }
        ;
        break;
    }
    return ret;
}

function startSakura() {

    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
    var canvas = document.createElement('canvas'), cxt;
    staticx = true;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;');
    canvas.setAttribute('id', 'canvas_sakura');
    document.getElementsByTagName('body')[0].appendChild(canvas);
    cxt = canvas.getContext('2d');
    var sakuraList = new SakuraList();
    for (var i = 0; i < 10; i++) {
        //樱花数量
        var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny;
        randomX = getRandom('x');
        randomY = getRandom('y');
        randomR = getRandom('r');
        randomS = getRandom('s');
        randomFnx = getRandom('fnx');
        randomFny = getRandom('fny');
        randomFnR = getRandom('fnr');
        sakura = new Sakura(randomX,randomY,randomS,randomR,{
            x: randomFnx,
            y: randomFny,
            r: randomFnR
        });
        sakura.draw(cxt);
        sakuraList.push(sakura);
    }
    stop = requestAnimationFrame(function() {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        sakuraList.update();
        sakuraList.draw(cxt);
        stop = requestAnimationFrame(arguments.callee);
    })
}

window.onresize = function() {
    var canvasSnow = document.getElementById('canvas_snow');
    canvasSnow.width = window.innerWidth;
    canvasSnow.height = window.innerHeight;
}

function stopp(e) {
    if (!e && document.getElementById("canvas_sakura")) {
        var child = document.getElementById("canvas_sakura");
        child.parentNode.removeChild(child);
        window.cancelAnimationFrame(stop);
    } else if (e && !document.getElementById("canvas_sakura")) {
        startSakura();
    }
}
window.addEventListener("DOMContentLoaded",
startSakura);