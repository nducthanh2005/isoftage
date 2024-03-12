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