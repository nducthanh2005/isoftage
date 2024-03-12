

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