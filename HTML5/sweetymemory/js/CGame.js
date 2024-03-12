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