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