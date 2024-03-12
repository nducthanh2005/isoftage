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
