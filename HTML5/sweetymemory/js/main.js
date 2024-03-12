function CGameOver() {
    var a, c, b, d;
    this._init = function() {
        d = new createjs.Container;
        d.alpha = 0;
        d.visible = !1;
        s_oStage.addChild(d);
        var f = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        a = new createjs.Text(TEXT_GAMEOVER, "50px walibi0615bold", "#fff");
        a.x = CANVAS_WIDTH / 2;
        a.y = CANVAS_HEIGHT / 2 - 80;
        a.textBaseline = "alphabetic";
        a.textAlign = "center";
        a.shadow = new createjs.Shadow("#000000", 3, 3, 2);
        c = new createjs.Text(TEXT_TOTALSCORE + " 0", "bold 48px walibi0615bold", "Pink");
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2 + 50;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        d.addChild(f, a, c);
        b = new CTextButton(CANVAS_WIDTH / 2, 700, s_oSpriteLibrary.getSprite("but_menu_bg"), TEXT_PLAY_AGAIN, "walibi0615bold", "White", "24", d);
        b.addEventListener(ON_MOUSE_UP, this.unload, this)
    };
    this.display = function(a) {
        c.text = TEXT_TOTALSCORE + " " + a;
        d.visible = !0;
        createjs.Tween.get(d).to({
            alpha: 1
        }, 250);
        $(s_oMain).trigger("save_score", a)
    };
    this.unload = function() {
        b.unload();
        s_oStage.removeChild(d);
        s_oGame.unload()
    };
    this._init()
}

function CGame(a) {
    var c = !0,
        b = 4,
        d = 0,
        f = 0,
        e, h, l = 0,
        m, k = 0,
        n = 0,
        g = [],
        r, q, p, t, u, v;
    this._init = function() {
        var a = {
            images: [s_oSpriteLibrary.getSprite("card_spritesheet")],
            frames: {
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                regX: CARD_WIDTH / 2,
                regY: CARD_HEIGHT / 2
            },
            animations: {
                card0: [0],
                card1: [1],
                card2: [2],
                card3: [3],
                card4: [4],
                card5: [5],
                card6: [6],
                card7: [7],
                card8: [9],
                card9: [10],
                card10: [11],
                card11: [12],
                card12: [13],
                card13: [14],
                card14: [15],
                card15: [16],
                back: [17]
            }
        };
        this.spriteSheet = new createjs.SpriteSheet(a);
        r = new createjs.Container;
        s_oStage.addChild(r);
        v = new createjs.Container;
        s_oStage.addChild(v);
        q = new CInterface(formatTime(e));
        p = new CNextLevel;
        t = new CGameOver;
        u = new CVictory;
        this.nextLevel()
    };
    this.unload = function() {
        for (var a = 0; a < g.length; a++) g[a].unload();
        s_oStage.removeAllChildren();
        q.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("restart")
    };
    this.cardClicked = function(a, b) {
        !0 === a.isFolded() && !1 === c && 2 > f && a.flipCard()
    };
    this.addFlippedCard = function() {
        f++;
        2 === f && !1 === c && this.checkMatching()
    };
    this.checkMatching = function() {
        for (var a = [], e = [], n = 0; n <
            b; n++) !1 === g[n].isFolded() && (e.push(g[n].getType()), a.push(n));
        if (e[0] === e[1]) {
            if (e = 1, h < TIME_FOR_MATCH_MULT ? (h = 0, q.showMultiplier(m), e = m, m++) : (m = 2, h = 0), !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("right"), g[a[0]].eliminateCard(), g[a[1]].eliminateCard(), g.splice(a[0], 1), g.splice(a[1] - 1, 1), b -= 2, l += SCORE_MATCH_CARD * e, k += SCORE_MATCH_CARD * e, q.refreshScore(l), 0 === b && d <= s_aCardsPerLevel.length) {
                c = !0;
                var p = this;
                setTimeout(function() {
                    p.checkVictory()
                }, 1E3)
            }
        } else g[a[0]].flipCard(), g[a[0]].clickListener(),
            g[a[1]].flipCard(), g[a[1]].clickListener();
        f = 0
    };
    this.checkVictory = function() {
        c = !0;
        n = Math.round(e / 1E3 * SCORE_TIME_LEFT_MULT);
        l += n;
        q.refreshScore(l);
        d < s_aCardsPerLevel.length ? (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("next_level"), p.display(k, n, k + n, l, d)) : (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("win"), u.display(l))
    };
    this.nextLevel = function() {
        d++;
        r.removeAllChildren();
        var a = createBitmap(s_oSpriteLibrary.getSprite("bg_" + (Math.floor(Math.random() * NUM_BACKGROUNDS) +
            1)));
        r.addChild(a);
        a = CLevels(d);
        b = a.cardsNum;
        e = a.timeAllotted;
        h = TIME_FOR_MATCH_MULT;
        for (var f = [], l = 0; l < b / 2; l++) f[l] = l, f[l + b / 2] = l;
        for (l = 0; l < b; l++) {
            var p = Math.floor(Math.random() * f.length);
            g[l] = new CCard(a.cardsPos[l][0], a.cardsPos[l][1], "card" + f[p], a.cardZoomFactor, v);
            f.splice(p, 1)
        }
        _iGameOverScore = n = k = 0;
        m = 2;
        c = !1
    };
    this.suspendUpdates = function() {
        c = !0
    };
    this.restartUpdates = function() {
        0 < b && (c = !1)
    };
    this.update = function() {
        c || (e -= s_iTimeElaps, h += s_iTimeElaps, 0 > e ? (c = !0, e = 0, !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile ||
            createjs.Sound.play("game_over"), t.display(l), d = 1, l = 0) : q.update(formatTime(e)))
    };
    this.spriteSheet = {};
    s_oGame = this;
    SCORE_MATCH_CARD = a.score_match_card;
    SCORE_TIME_LEFT_MULT = a.score_time_left_mult;
    TIME_FOR_MATCH_MULT = a.time_match_mult;
    s_aCardsPerLevel = a.card_per_level;
    s_aSecsPerLevel = a.time_level;
    TIME_SHOW_CARDS = 1E3 * a.show_cards;
    this._init()
}
var s_aCardsPerLevel, s_aSecsPerLevel, s_oGame;

function CCard(a, c, b, d, f) {
    var e = !1,
        h, l, m, k, n, g, r, q;
    this._init = function(a, c, b, d, f) {
        m = a;
        k = c;
        _bEliminated = !1;
        h = !0;
        l = b;
        q = f;
        g = createSprite(s_oGame.spriteSheet, "back", CARD_WIDTH / 2, CARD_HEIGHT / 2, CARD_WIDTH, CARD_HEIGHT);
        g.x = m < CANVAS_WIDTH / 2 ? m - CANVAS_WIDTH : CANVAS_WIDTH + m;
        g.y = k + Math.floor(0 * (Math.random() - .5));
        n = d;
        g.scaleX = g.scaleY = n;
        r = this;
        g.on("click", function() {
            this.clicked()
        }, r);
        e = !0;
        s_oGame.suspendUpdates();
        q.addChild(g);
        var x = this;
        createjs.Tween.get(g).to({
            alpha: 1,
            x: m,
            y: k
        }, 500).call(function() {
            e = !1;
            s_oGame.restartUpdates();
            0 < TIME_SHOW_CARDS && x.showCardFirstTime()
        })
    };
    this.unload = function() {
        q.removeChild(g)
    };
    this.update = function() {};
    this.clicked = function() {
        !1 === e && h && (s_oGame.cardClicked(this, l), !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("card"), this.clickListener())
    };
    this.showCardFirstTime = function() {
        e = !0;
        createjs.Tween.get(g).to({
            scaleX: .1
        }, 100).call(function() {
            q.removeChild(g);
            g = createSprite(s_oGame.spriteSheet, l, CARD_WIDTH / 2, CARD_HEIGHT / 2, CARD_WIDTH, CARD_HEIGHT);
            g.x = m;
            g.y = k;
            g.scaleX = g.scaleY = n;
            q.addChild(g);
            createjs.Tween.get(g).wait(TIME_SHOW_CARDS).to({
                scaleX: n
            }, 100).call(function() {
                h = e = !1;
                r.clickListener();
                r.flipCard()
            }, r)
        })
    };
    this.flipCard = function() {
        !0 === h ? (e = !0, createjs.Tween.get(g).to({
            scaleX: .1
        }, 100).call(function() {
            q.removeChild(g);
            g = createSprite(s_oGame.spriteSheet, l, CARD_WIDTH / 2, CARD_HEIGHT / 2, CARD_WIDTH, CARD_HEIGHT);
            g.x = m;
            g.y = k;
            g.scaleX = g.scaleY = n;
            q.addChild(g);
            createjs.Tween.get(g).to({
                scaleX: n
            }, 100).call(function() {
                h = e = !1;
                s_oGame.addFlippedCard();
                r.clickListener()
            }, r)
        })) : (!1 !==
            DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("card"), e = !0, createjs.Tween.get(g).to({
                scaleX: .1
            }, 100).call(function() {
                q.removeChild(g);
                g = createSprite(s_oGame.spriteSheet, "back", CARD_WIDTH / 2, CARD_HEIGHT / 2, CARD_WIDTH, CARD_HEIGHT);
                g.x = m;
                g.y = k;
                g.scaleX = g.scaleY = n;
                q.addChild(g);
                createjs.Tween.get(g).to({
                    scaleX: n
                }, 100).call(function() {
                    e = !1;
                    s_oGame.restartUpdates();
                    h = !0;
                    r.clickListener();
                    return !0
                }, r)
            }))
    };
    this.clickListener = function() {
        if (!1 === e) g.on("click", function() {
            this.clicked()
        }, r)
    };
    this.display =
        function() {};
    this.isFolded = function() {
        return h
    };
    this.getType = function() {
        return l
    };
    this.eliminateCard = function() {
        e = !0;
        s_oGame.suspendUpdates();
        g.alpha = 1;
        createjs.Tween.get(g).to({
            alpha: 0
        }, 400).call(function() {
            q.removeChild(g);
            e = !1;
            s_oGame.restartUpdates()
        })
    };
    this._init(a, c, b, d, f)
}

function CSpriteLibrary() {
    var a, c, b, d, f, e;
    this.init = function(h, l, m) {
        b = c = 0;
        d = h;
        f = l;
        e = m;
        a = {}
    };
    this.addSprite = function(b, d) {
        a.hasOwnProperty(b) || (a[b] = {
            szPath: d,
            oSprite: new Image
        }, c++)
    };
    this.getSprite = function(c) {
        return a.hasOwnProperty(c) ? a[c].oSprite : null
    };
    this._onSpritesLoaded = function() {
        f.call(e)
    };
    this._onSpriteLoaded = function() {
        d.call(e);
        ++b === c && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var c in a) a[c].oSprite.oSpriteLibrary = this, a[c].oSprite.onload = function() {
                this.oSpriteLibrary._onSpriteLoaded()
            },
            a[c].oSprite.src = a[c].szPath
    };
    this.getNumSprites = function() {
        return c
    }
}
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

function CVictory() {
    var a, c, b, d;
    this._init = function() {
        d = new createjs.Container;
        d.alpha = 0;
        d.visible = !1;
        s_oStage.addChild(d);
        var f = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        c = new createjs.Text(TEXT_VICTORY, "bold 38px walibi0615bold", "#fff");
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2 - 80;
        c.textBaseline = "alphabetic";
        c.textAlign = "center";
        c.shadow = new createjs.Shadow("#000000", 3, 3, 2);
        b = new createjs.Text(TEXT_TOTALSCORE, "italic bold 48px walibi0615bold", "Pink");
        b.x = CANVAS_WIDTH / 2 + 2;
        b.y = CANVAS_HEIGHT /
            2 + 50;
        b.textAlign = "center";
        b.textBaseline = "alphabetic";
        b.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        d.addChild(f, c, b);
        a = new CTextButton(CANVAS_WIDTH / 2, 700, s_oSpriteLibrary.getSprite("but_menu_bg"), TEXT_PLAY_AGAIN, "walibi0615bold", "White", "24", d);
        a.addEventListener(ON_MOUSE_DOWN, this.unload, this)
    };
    this.display = function(a) {
        b.text = TEXT_TOTALSCORE + "\n" + a;
        d.visible = !0;
        createjs.Tween.get(d).to({
            alpha: 1
        }, 250);
        $(s_oMain).trigger("save_score", a)
    };
    this.unload = function() {
        a.unload();
        s_oStage.removeChild(d);
        s_oGame.unload()
    };
    this._init()
}

function CToggle(a, c, b) {
    var d, f, e;
    this._init = function(a, c, b) {
        d = [];
        f = [];
        var k = new createjs.SpriteSheet({
            images: [b],
            frames: {
                width: b.width / 2,
                height: b.height,
                regX: b.width / 2 / 2,
                regY: b.height / 2
            },
            animations: {
                on: [0, 1],
                off: [1, 2]
            }
        });
        e = s_bAudioActive ? createSprite(k, "on", b.width / 2 / 2, b.height / 2, b.width / 2, b.height) : createSprite(k, "off", b.width / 2 / 2, b.height / 2, b.width / 2, b.height);
        e.x = a;
        e.y = c;
        e.stop();
        s_oStage.addChild(e);
        this._initListener()
    };
    this.unload = function() {
        e.off("mousedown", this.buttonDown);
        e.off("pressup",
            this.buttonRelease);
        s_oStage.removeChild(e)
    };
    this._initListener = function() {
        e.on("mousedown", this.buttonDown);
        e.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        d[a] = b;
        f[a] = c
    };
    this.buttonRelease = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("press_but");
        e.scaleX = 1;
        e.scaleY = 1;
        (s_bAudioActive = !s_bAudioActive) ? e.gotoAndStop("on"): e.gotoAndStop("off");
        d[ON_MOUSE_UP] && d[ON_MOUSE_UP].call(f[ON_MOUSE_UP])
    };
    this.buttonDown = function() {
        e.scaleX = .9;
        e.scaleY =
            .9;
        d[ON_MOUSE_DOWN] && d[ON_MOUSE_DOWN].call(f[ON_MOUSE_DOWN])
    };
    this.setPosition = function(a, b) {
        e.x = a;
        e.y = b
    };
    this._init(a, c, b)
}
var s_iScaleFactor = 1,
    s_oCanvasLeft, s_oCanvasTop;
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,
        4))
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});

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

function CTextButton(a, c, b, d, f, e, h, l) {
    var m, k, n, g = 1,
        r, q, p, t, u, v, w;
    this._init = function(a, c, b, d, e, f, g, h) {
        m = !1;
        r = [];
        q = [];
        w = h;
        t = createBitmap(b);
        k = b.width;
        n = b.height;
        h = Math.ceil(g / 20);
        u = new createjs.Text(d, "bold " + g + "px " + e, "#000000");
        var l = u.getBounds();
        u.textAlign = "center";
        u.textBaseline = "alphabetic";
        u.x = b.width / 2 + h;
        u.y = Math.floor(b.height / 2) + l.height / 3 + h;
        v = new createjs.Text(d, "bold " + g + "px " + e, f);
        v.textAlign = "center";
        v.textBaseline = "alphabetic";
        v.x = b.width / 2;
        v.y = Math.floor(b.height / 2) + l.height / 3;
        p =
            new createjs.Container;
        p.x = a;
        p.y = c;
        p.regX = b.width / 2;
        p.regY = b.height / 2;
        p.addChild(t, u, v);
        w.addChild(p);
        this._initListener()
    };
    this.unload = function() {
        p.off("mousedown");
        p.off("pressup");
        w.removeChild(p)
    };
    this.setVisible = function(a) {
        p.visible = a
    };
    this.setScale = function(a) {
        g = p.scaleX = p.scaleY = a
    };
    this.enable = function() {
        m = !1;
        t.filters = [];
        t.cache(0, 0, k, n)
    };
    this.disable = function() {
        m = !0;
        var a = (new createjs.ColorMatrix).adjustSaturation(-100);
        t.filters = [new createjs.ColorMatrixFilter(a)];
        t.cache(0, 0, k, n)
    };
    this._initListener =
        function() {
            oParent = this;
            p.on("mousedown", this.buttonDown);
            p.on("pressup", this.buttonRelease)
        };
    this.addEventListener = function(a, b, c) {
        r[a] = b;
        q[a] = c
    };
    this.buttonRelease = function() {
        m || (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("press_but"), p.scaleX = g, p.scaleY = g, r[ON_MOUSE_UP] && r[ON_MOUSE_UP].call(q[ON_MOUSE_UP]))
    };
    this.buttonDown = function() {
        m || (p.scaleX = p.scaleY = g - .1 * g, r[ON_MOUSE_DOWN] && r[ON_MOUSE_DOWN].call(q[ON_MOUSE_DOWN]))
    };
    this.setPosition = function(a, b) {
        p.x = a;
        p.y = b
    };
    this.changeText =
        function(a) {
            v.text = a;
            u.text = a
        };
    this.setX = function(a) {
        p.x = a
    };
    this.setY = function(a) {
        p.y = a
    };
    this.getButtonImage = function() {
        return p
    };
    this.getX = function() {
        return p.x
    };
    this.getY = function() {
        return p.y
    };
    this._init(a, c, b, d, f, e, h, l);
    return this
}

function CPreloader() {
    var a;
    this._init = function() {
        this._onAllPreloaderImagesLoaded()
    };
    this._onPreloaderImagesLoaded = function() {};
    this._onAllPreloaderImagesLoaded = function() {
        a = new createjs.Text("", "bold 22px Arial center", "#ffffff");
        a.x = CANVAS_WIDTH / 2 - 40;
        a.y = CANVAS_HEIGHT / 2;
        s_oStage.addChild(a)
    };
    this.unload = function() {
        s_oStage.removeChild(a)
    };
    this.refreshLoader = function(c) {
        a.text = c + "%"
    };
    this._init()
}

function CNextLevel() {
    var a, c, b, d, f, e;
    this._init = function() {
        e = new createjs.Container;
        e.alpha = 0;
        e.visible = !1;
        s_oStage.addChild(e);
        var h = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        h.x = 0;
        h.y = 0;
        a = new createjs.Text(TEXT_LEVELCOMPLETED, "48px walibi0615bold", "#fff");
        a.x = CANVAS_WIDTH / 2;
        a.y = CANVAS_HEIGHT / 2 - 80;
        a.textBaseline = "alphabetic";
        a.textAlign = "center";
        a.shadow = new createjs.Shadow("#000000", 3, 3, 2);
        c = new createjs.Text(TEXT_MATCH_SCORE, "30px walibi0615bold", "Pink");
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT /
            2 - 20;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        b = new createjs.Text(TEXT_TIMEBONUS, "30px walibi0615bold", "Pink");
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT / 2 + 14;
        b.textAlign = "center";
        b.textBaseline = "alphabetic";
        b.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        _oMsgLevelScore = new createjs.Text(TEXT_LEVEL_SCORE, "34px walibi0615bold", "Pink");
        _oMsgLevelScore.x = CANVAS_WIDTH / 2;
        _oMsgLevelScore.y = CANVAS_HEIGHT / 2 + 50;
        _oMsgLevelScore.textAlign = "center";
        _oMsgLevelScore.textBaseline =
            "alphabetic";
        _oMsgLevelScore.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        d = new createjs.Text(TEXT_TOTALSCORE, "48px walibi0615bold", "Pink");
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2 + 120;
        d.textAlign = "center";
        d.textBaseline = "alphabetic";
        d.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        e.addChild(h, a, c, b, _oMsgLevelScore, d);
        f = new CTextButton(CANVAS_WIDTH / 2, 700, s_oSpriteLibrary.getSprite("but_menu_bg"), "CONTINUE", "walibi0615bold", "White", "24", e);
        f.addEventListener(ON_MOUSE_UP, this.hide, this)
    };
    this.display = function(a,
        f, m, k, n) {
        c.text = TEXT_MATCH_SCORE + " = " + a;
        b.text = TEXT_TIMEBONUS + " = " + f;
        _oMsgLevelScore.text = TEXT_LEVEL_SCORE + " = " + m;
        d.text = TEXT_TOTALSCORE + " " + k;
        e.visible = !0;
        createjs.Tween.get(e).to({
            alpha: 1
        }, 250);
        $(s_oMain).trigger("end_level", [n, m, k])
    };
    this.hide = function() {
        e.alpha = 0;
        e.visible = !1;
        s_oGame.nextLevel()
    };
    this.unload = function() {
        f.unload();
        s_oStage.removeChild(e)
    };
    this._init()
}

function CMenu() {
    var a, c, b, d, f, e, h, l;
    this._init = function() {
        f = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(f);
        a = CANVAS_WIDTH / 2;
        c = CANVAS_HEIGHT - 70;
        var m = s_oSpriteLibrary.getSprite("but_menu_bg");
        e = new CTextButton(a, c, m, TEXT_PLAY, "walibi0615bold", "White", "24", s_oStage);
        e.setScale(2);
        e.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) m = s_oSpriteLibrary.getSprite("audio_icon"), b = CANVAS_WIDTH - m.height / 2 - 10, d = m.height / 2 + 10, h =
            new CToggle(b, d, m, s_bAudioActive), h.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        l = new createjs.Shape;
        l.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(l);
        createjs.Tween.get(l).to({
            alpha: 0
        }, 1E3).call(function() {
            l.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        e.unload();
        e = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) h.unload(), h = null;
        s_oStage.removeAllChildren()
    };
    this.refreshButtonPos = function(f, k) {
        e.setPosition(a,
            c - k);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || h.setPosition(b - f, k + d)
    };
    this._onButPlayRelease = function() {
        this.unload();
        s_oMain.gotoGame();
        s_oMenu = null
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(!s_bAudioActive)
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CMain(a) {
    var c, b = 0,
        d = 0,
        f = STATE_LOADING,
        e, h, l;
    this.initContainer = function() {
        s_oStage = new createjs.Stage("canvas");
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && s_oStage.enableMouseOver(20);
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", this._update);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        s_oSpriteLibrary = new CSpriteLibrary;
        h = new CPreloader;
        this._loadImages();
        c = !0
    };
    this.soundLoaded = function() {
        b++;
        b === d && (h.unload(), this.gotoMenu())
    };
    this._initSounds = function() {
        createjs.Sound.initializeDefaultPlugins() && (0 < navigator.userAgent.indexOf("Opera") || 0 < navigator.userAgent.indexOf("OPR") ? (createjs.Sound.alternateExtensions = ["mp3"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound("./sounds/card.ogg", "card"), createjs.Sound.registerSound("./sounds/win.ogg", "win"), createjs.Sound.registerSound("./sounds/game_over.ogg",
            "game_over"), createjs.Sound.registerSound("./sounds/next_level.ogg", "next_level"), createjs.Sound.registerSound("./sounds/right.ogg", "right")) : (createjs.Sound.alternateExtensions = ["ogg"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound("./sounds/card.mp3", "card"), createjs.Sound.registerSound("./sounds/win.mp3", "win"), createjs.Sound.registerSound("./sounds/game_over.mp3", "game_over"), createjs.Sound.registerSound("./sounds/next_level.mp3",
            "next_level"), createjs.Sound.registerSound("./sounds/right.mp3", "right")), d += 5)
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_menu_bg", "./sprites/but_menu_bg.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("bg_1", "./sprites/bg_1.jpg");
        s_oSpriteLibrary.addSprite("bg_2", "./sprites/bg_2.jpg");
        s_oSpriteLibrary.addSprite("bg_3", "./sprites/bg_3.jpg");
        s_oSpriteLibrary.addSprite("bg_4", "./sprites/bg_4.jpg");
        s_oSpriteLibrary.addSprite("bg_5", "./sprites/bg_5.jpg");
        s_oSpriteLibrary.addSprite("bg_6", "./sprites/bg_6.jpg");
        s_oSpriteLibrary.addSprite("card_spritesheet", "./sprites/card_spritesheet.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        d += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded =
        function() {
            b++;
            h.refreshLoader(Math.floor(b / d * 100));
            b === d && (h.unload(), this.gotoMenu())
        };
    this._onAllImagesLoaded = function() {};
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    };
    this.gotoMenu = function() {
        new CMenu;
        f = STATE_MENU
    };
    this.gotoGame = function() {
        l = new CGame(e);
        f = STATE_GAME;
        $(s_oMain).trigger("game_start")
    };
    this.gotoHelp = function() {
        new CHelp;
        f = STATE_HELP
    };
    this.stopUpdate = function() {
        c = !1
    };
    this.startUpdate = function() {
        c = !0
    };
    this._update = function(a) {
        if (!1 !== c) {
            var b = (new Date).getTime();
            s_iTimeElaps = b - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = b;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            f === STATE_GAME && l.update();
            s_oStage.update(a)
        }
    };
    s_oMain = this;
    e = a;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oGameSettings, CLevels = function() {
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

function CInterface(a) {
    var c, b, d, f, e, h, l, m, k, n, g, r, q;
    this._init = function(a) {
        c = 30;
        b = 75;
        r = TEXT_TIMELEFT + a;
        k = new createjs.Text(r, "36px walibi0615bold", "Pink");
        k.x = c;
        k.y = b;
        k.textBaseline = "alphabetic";
        k.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        s_oStage.addChild(k);
        d = CANVAS_WIDTH / 2;
        f = 75;
        _szScore = TEXT_SCORE + 0;
        n = new createjs.Text(_szScore, "36px walibi0615bold", "Pink");
        n.x = d;
        n.y = f;
        n.textAlign = "center";
        n.textBaseline = "alphabetic";
        n.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        s_oStage.addChild(n);
        _oScoreMultText =
            new createjs.Text("X2", "150px walibi0615bold", "#fff");
        _oScoreMultText.textAlign = "center";
        _oScoreMultText.textBaseline = "alphabetic";
        _oScoreMultText.x = CANVAS_WIDTH / 2;
        _oScoreMultText.y = CANVAS_HEIGHT / 2;
        _oScoreMultText.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        _oScoreMultText.scaleX = _oScoreMultText.scaleY = .1;
        _oScoreMultText.visible = !1;
        s_oStage.addChild(_oScoreMultText);
        a = s_oSpriteLibrary.getSprite("but_exit");
        l = CANVAS_WIDTH - a.width / 2 - 20;
        m = a.height / 2 + 30;
        var t = s_oSpriteLibrary.getSprite("audio_icon");
        e = CANVAS_WIDTH - t.width / 2 * 2 - 10;
        h = t.height / 2 + 30;
        q = new CGfxButton(l, m, a, s_oStage);
        q.addEventListener(ON_MOUSE_UP, this._onExit, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) g = new CToggle(e, h, t), g.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function(a, d) {
        n.y = f + d;
        k.x = c + a;
        k.y = b + d;
        q.setPosition(l - a, d + m);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || g.setPosition(e - a, d + h)
    };
    this.unload = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !==
            s_bMobile || g.unload();
        q.unload();
        s_oStage.removeChild(k);
        s_oStage.removeChild(n);
        s_oInterface = null
    };
    this.refreshScore = function(a) {
        n.text = TEXT_SCORE + a
    };
    this.showMultiplier = function(a) {
        _oScoreMultText.text = "X" + a;
        _oScoreMultText.visible = !0;
        createjs.Tween.get(_oScoreMultText).to({
            scaleX: 1,
            scaleY: 1
        }, 300, createjs.Ease.cubicOut).call(function() {
            createjs.Tween.get(_oScoreMultText).to({
                scaleX: .1,
                scaleY: .1
            }, 300, createjs.Ease.cubicIn).call(function() {
                _oScoreMultText.visible = !1
            })
        })
    };
    this.update = function(a) {
        k.text =
            TEXT_TIMELEFT + a
    };
    this._onExit = function() {
        s_oGame.unload()
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(!s_bAudioActive)
    };
    s_oInterface = this;
    this._init(a);
    return this
}
var s_oInterface = null;

function CGfxButton(a, c, b) {
    var d, f, e, h, l, m = [],
        k;
    this._init = function(a, b, c) {
        d = !1;
        h = [];
        l = [];
        f = c.width;
        e = c.height;
        k = createBitmap(c);
        k.x = a;
        k.y = b;
        k.regX = c.width / 2;
        k.regY = c.height / 2;
        s_oStage.addChild(k);
        this._initListener()
    };
    this.unload = function() {
        k.off("mousedown", this.buttonDown);
        k.off("pressup", this.buttonRelease);
        s_oStage.removeChild(k)
    };
    this.setVisible = function(a) {
        k.visible = a
    };
    this._initListener = function() {
        k.on("mousedown", this.buttonDown);
        k.on("pressup", this.buttonRelease)
    };
    this.addEventListener =
        function(a, b, c) {
            h[a] = b;
            l[a] = c
        };
    this.addEventListenerWithParams = function(a, b, c, d) {
        h[a] = b;
        l[a] = c;
        m = d
    };
    this.buttonRelease = function() {
        d || (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("press_but"), k.scaleX = 1, k.scaleY = 1, h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(l[ON_MOUSE_UP], m))
    };
    this.buttonDown = function() {
        d || (k.scaleX = .9, k.scaleY = .9, h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN], m))
    };
    this.setPosition = function(a, b) {
        k.x = a;
        k.y = b
    };
    this.setX = function(a) {
        k.x = a
    };
    this.setY = function(a) {
        k.y =
            a
    };
    this.enable = function() {
        d = !1;
        k.filters = [];
        k.cache(0, 0, f, e)
    };
    this.disable = function() {
        d = !0;
        var a = (new createjs.ColorMatrix).adjustSaturation(-100).adjustBrightness(40);
        k.filters = [new createjs.ColorMatrixFilter(a)];
        k.cache(0, 0, f, e)
    };
    this.getButtonImage = function() {
        return k
    };
    this.getX = function() {
        return k.x
    };
    this.getY = function() {
        return k.y
    };
    this._init(a, c, b);
    return this
};