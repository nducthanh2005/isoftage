var src;            // the audio src we are trying to play
var soundInstance;  // the soundInstance returned by Sound when we create or play a src
var displayStatus;  // the HTML element we use to display messages to the user

function loadSound() {
	// this does two things, it initializes the default plugins, and if that fails the if statement triggers and we display an error
	if (!createjs.Sound.initializeDefaultPlugins()) {
		console.log("ko ho tro am thanh")
		return;
	}


	// Create a single item to load.
	var assetsPath = "audio/";
	src = assetsPath + "M-GameBG.ogg";

	createjs.Sound.alternateExtensions = ["mp3"];	// add other extensions to try loading if the src file extension is not supported
	//createjs.Sound.onLoadComplete = playSound;  // add a callback for when load is completed
	createjs.Sound.addEventListener("fileload", playSound); // add an event listener for when load is completed
	createjs.Sound.registerSound(src);  // register sound, which preloads by default
}

function playSound(event) {
	soundInstance = createjs.Sound.play(event.src);  // start playing the sound we just loaded, storing the playing instance
}