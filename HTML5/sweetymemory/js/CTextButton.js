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