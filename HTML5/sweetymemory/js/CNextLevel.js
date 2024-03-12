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