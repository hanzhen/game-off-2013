
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game
    this.add;       //  used to add sprites, text, groups, etc
    this.camera;    //  a reference to the game camera
    this.cache;     //  the game cache
    this.input;     //  the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;      //  for preloading assets
    this.math;      //  lots of useful common math operations
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc
    this.stage;     //  the game stage
    this.time;      //  the clock
    this.tweens;    //  the tween manager
    this.world;     //  the game world
    this.particles; //  the particle manager
    this.physics;   //  the physics manager
    this.rnd;       //  the repeatable random number generator

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    create: function() {

        // controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // map
        var map = this.add.tilemap('map');
        var tileset = this.add.tileset('tiles');
        // console.log(tileset);
        tileset.setCollisionRange(0, tileset.total - 1, true, true, true, true);

        this.layer = this.add.tilemapLayer(0, 0, 1024, 768, tileset, map, 0);
        this.layer.resizeWorld();

        // player
        this.player = new BasicGame.Player(this);
        this.camera.follow(this.player.sprite);

    },

    update: function() {

        this.physics.collide(this.player.sprite, this.layer);

        this.player.update();

    },

    render: function() {

        // this.debug.renderSpriteCorners(this.player.sprite);
        // this.debug.renderSpriteInfo(this.player, 32, 32);
        // this.debug.renderSpriteCoords(this.player, 32, 32);

    },

    quitGame: function(pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.game.state.start('MainMenu');

    }
};
