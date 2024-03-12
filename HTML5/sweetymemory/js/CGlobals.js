var s_aCardsPerLevel, s_aSecsPerLevel, s_oGame;

var CANVAS_WIDTH = 1920,
    CANVAS_HEIGHT = 1080,
    EDGEBOARD_X = 220,
    EDGEBOARD_Y = 220,
    DISABLE_SOUND_MOBILE = !1,
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    CARD_WIDTH = 160,
    CARD_HEIGHT = 252,
    MAX_CARDS = 50,
    SCORE_MATCH_CARD, SCORE_TIME_LEFT_MULT, TIME_FOR_MATCH_MULT, NUM_BACKGROUNDS = 6,
    TIME_SHOW_CARDS;



var 
    // s_bMobile, s_bAudioActive = !0,
    // s_iCntTime = 0,
    // s_iTimeElaps = 0,
    // s_iPrevTime = 0,
    // s_iCntFps = 0,
    // s_iCurFps = 0,
    // s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oGameSettings,
     CLevels = function() {
        var a = CARD_HEIGHT / 2 + .2 * CANVAS_HEIGHT,
            c = CANVAS_WIDTH / 2,
            b = (CANVAS_HEIGHT - a) / 2 + a,
            d = CANVAS_HEIGHT - a;
        return function(f) {
            var e = s_aCardsPerLevel[f - 1];
            e > MAX_CARDS && (e = MAX_CARDS);
            f = {
                cardZoomFactor: 1,
                cardsNum: e,
                cardsPos: [],
                timeAllotted: 1E3 * s_aSecsPerLevel[f - 1]
            };
            for (var h = 1;.1 <= h; h -= .01)
                for (var l = 2; 6 >= l; l += 1) {
                    var m = e / l;
                    if (m * (CARD_WIDTH *
                            h + 30 * h) <= CANVAS_WIDTH && l * (CARD_HEIGHT * h + 30 * h) <= d && 0 === e % l) {
                        for (var e = c - (m - 1) * (CARD_WIDTH * h + 30 * h) * .5, k = b - (a + .5 * ((CARD_HEIGHT * h + 30 * h) * (l - 1) + a)), n = 0; n < l; n++)
                            for (var g = 0; g < m; g++) f.cardsPos[n * m + g] = [e + (CARD_WIDTH * h + 30 * h) * g, k + a + (CARD_HEIGHT * h + 30 * h) * n];
                        f.cardZoomFactor = h;
                        return f
                    }
                }
        }
    }();

TEXT_GAMEOVER = "GAME OVER";
TEXT_PLAY = "PLAY";
TEXT_LEVEL_SCORE = "LEVEL SCORE";
TEXT_LEVELCOMPLETED = "STAGE CLEARED!";
TEXT_TIMELEFT = "Time ";
TEXT_SCORE = "Score ";
TEXT_MATCH_SCORE = "SCORE MATCHING";
TEXT_TIMEBONUS = "TIME BONUS";
TEXT_TOTALSCORE = "TOTAL SCORE";
TEXT_VICTORY = "CONGRATULATIONS!!";
TEXT_PLAY_AGAIN = "PLAY AGAIN";


var s_oInterface = null;    
var s_oMenu = null;





function trace(a) {
    console.log(a)
}

function getSize(a) {
    var c = a.toLowerCase(),
        b = window.document,
        d = b.documentElement;
    if (void 0 === window["inner" + a]) a = d["client" + a];
    else if (window["inner" + a] != d["client" + a]) {
        var f = b.createElement("body");
        f.id = "vpw-test-b";
        f.style.cssText = "overflow:scroll";
        var e = b.createElement("div");
        e.id = "vpw-test-d";
        e.style.cssText = "position:absolute;top:-1000px";
        e.innerHTML = "<style>@media(" + c + ":" + d["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + c + ":7px!important}}</style>";
        f.appendChild(e);
        d.insertBefore(f, b.head);
        a = 7 == e["offset" + a] ? d["client" + a] : window["inner" + a];
        d.removeChild(f)
    } else a = window["inner" + a];
    return a
}

$(window).ready(function() {
    sizeHandler()
});


window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}

function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}

function getHeightOfIOSToolbars() {
    var a = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < a ? a : 0
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a;
        a = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? getIOSWindowHeight() : getSize("Height");
        var c = getSize("Width"),
            b = Math.min(a / CANVAS_HEIGHT, c / CANVAS_WIDTH),
            d = CANVAS_WIDTH * b,
            b = CANVAS_HEIGHT * b,
            f = 0;
        b < a ? (f = a - b, b += f, d += CANVAS_WIDTH / CANVAS_HEIGHT * f) : d < c && (f = c - d, d += f, b += CANVAS_HEIGHT / CANVAS_WIDTH * f);
        var f = a / 2 - b / 2,
            e = c / 2 - d / 2,
            h = CANVAS_WIDTH / d;
        if (e * h < -EDGEBOARD_X || f * h < -EDGEBOARD_Y) b = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), c / (CANVAS_WIDTH - 2 *
            EDGEBOARD_X)), d = CANVAS_WIDTH * b, b *= CANVAS_HEIGHT, f = (a - b) / 2, e = (c - d) / 2, h = CANVAS_WIDTH / d;
        s_iOffsetX = -1 * e * h;
        s_iOffsetY = -1 * f * h;
        0 <= f && (s_iOffsetY = 0);
        0 <= e && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        $("#canvas").css("width", d + "px");
        $("#canvas").css("height", b + "px");
        0 > f ? $("#canvas").css("top", f + "px") : $("#canvas").css("top", "0px");
        $("#canvas").css("left", e + "px")
    }
}

function createBitmap(a, c, b) {
    var d = new createjs.Bitmap(a),
        f = new createjs.Shape;
    c && b ? f.graphics.beginFill("#fff").drawRect(0, 0, c, b) : f.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    d.hitArea = f;
    return d
}

function createSprite(a, c, b, d, f, e) {
    a = null !== c ? new createjs.Sprite(a, c) : new createjs.Sprite(a);
    c = new createjs.Shape;
    c.graphics.beginFill("#000000").drawRect(-b, -d, f, e);
    a.hitArea = c;
    return a
}

function randomFloatBetween(a, c, b) {
    "undefined" === typeof b && (b = 2);
    return parseFloat(Math.min(a + Math.random() * (c - a), c).toFixed(b))
}

function shuffle(a) {
    for (var c = a.length, b, d; 0 !== c;) d = Math.floor(Math.random() * c), --c, b = a[c], a[c] = a[d], a[d] = b;
    return a
}

function bubbleSort(a) {
    var c;
    do {
        c = !1;
        for (var b = 0; b < a.length - 1; b++) a[b] > a[b + 1] && (c = a[b], a[b] = a[b + 1], a[b + 1] = c, c = !0)
    } while (c)
}

function compare(a, c) {
    return a.index > c.index ? -1 : a.index < c.index ? 1 : 0
}

function formatTime(a) {
    a /= 1E3;
    var c = Math.floor(a / 60);
    a = Math.floor(a - 60 * c);
    var b = "",
        b = 10 > c ? b + ("0" + c + ":") : b + (c + ":");
    return 10 > a ? b + ("0" + a) : b + a
}

function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}

function shuffle(a) {
    for (var c = a.length, b, d; 0 < c;) d = Math.floor(Math.random() * c), c--, b = a[c], a[c] = a[d], a[d] = b;
    return a
}

NoClickDelay.prototype = {
    handleEvent: function(a) {
        switch (a.type) {
            case "touchstart":
                this.onTouchStart(a);
                break;
            case "touchmove":
                this.onTouchMove(a);
                break;
            case "touchend":
                this.onTouchEnd(a)
        }
    },
    onTouchStart: function(a) {
        a.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(a) {
        this.moved = !0
    },
    onTouchEnd: function(a) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend",
            this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(a.changedTouches[0].clientX, a.changedTouches[0].clientY);
            3 == a.nodeType && (a = a.parentNode);
            var c = document.createEvent("MouseEvents");
            c.initEvent("click", !0, !0);
            a.dispatchEvent(c)
        }
    }
};

(function() {
    function a(a) {
        var d = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        a = a || window.event;
        a.type in d ? document.body.className = d[a.type] : (document.body.className = this[c] ? "hidden" : "visible", "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var c = "hidden";
    c in document ? document.addEventListener("visibilitychange", a) : (c = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", a) : (c = "webkitHidden") in
        document ? document.addEventListener("webkitvisibilitychange", a) : (c = "msHidden") in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin" in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
})();

