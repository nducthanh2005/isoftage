
function CSpriteLibrary() {
    var a, c, b, d, f, e;
    this.init = function(h, l, m) {
        b = c = 0;
        d = h;
        f = l;
        e = m;
        a = {}
    };
    this.addSprite = function(b, d) {
        a.hasOwnProperty(b) || (a[b] = {
            szPath: d,
            oSprite: new Image
        }, c++)
    };
    this.getSprite = function(c) {
        return a.hasOwnProperty(c) ? a[c].oSprite : null
    };
    this._onSpritesLoaded = function() {
        f.call(e)
    };
    this._onSpriteLoaded = function() {
        d.call(e);
        ++b === c && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var c in a) a[c].oSprite.oSpriteLibrary = this, a[c].oSprite.onload = function() {
                this.oSpriteLibrary._onSpriteLoaded()
            },
            a[c].oSprite.src = a[c].szPath
    };
    this.getNumSprites = function() {
        return c
    }
}