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



