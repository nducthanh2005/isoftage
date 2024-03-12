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