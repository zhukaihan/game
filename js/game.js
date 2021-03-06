var gameLevel = 1;
var gamerPlayer;

/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0
	},

    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(640, 480, {wrapper : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
        // Load the resources.
        me.loader.preload(game.resources);
        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },



    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

		// add our player entity in the entity pool
		me.pool.register("doorEntity", game.doorEntity);
		me.pool.register("liftEntity", game.liftEntity);
		me.pool.register("liftButtonEntity", game.liftButtonEntity);
		me.pool.register("enemyEntity", game.EnemyEntity);
		me.pool.register("regenEntity", game.regenEntity);

		//gamerEntity = [game.PlayerEntity, game.PlayerEntity, game.PlayerEntity, game.PlayerEntity]
		//gamerNum = 0;
		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP,	"jump", true);
		me.input.bindKey(me.input.KEY.SPACE, "spit", true);
		me.input.registerPointerEvent("pointermove", me.game.world, mouseEventHandler);
  	me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.SPACE);
		//me.input.bindKey(me.input.KEY.R, "restartIt");

        // Start the game.
        me.state.change(me.state.MENU);
    }
};
