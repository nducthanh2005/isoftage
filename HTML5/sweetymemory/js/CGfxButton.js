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