var gameConfig = {
	width: 800,
	height: 600
},
/**
 * Game layer for canvas
 * @type {Phaser}
 **/
game = {},

/**
 * the controls of game
 * @type {Object}
 */
cursors = {},

/**
 * the snakeObject
 * @type {Object}
 */
Snake = {
	//the snake head
	head: {},
	//parts
	sections: [],
	//pints
	path: [],
	//size if sprites per snake
	size: 5,
	//space between each section
	space: 5,

	init: function(){
		this.makeHead();
		this.makeBody();
		

	},

	/**
	 * make the snake's head
	 * @return {[type]} [description]
	 */
	makeHead: function() {

		initX = gameConfig.width * 0.8;
		initY = gameConfig.height * 0.3;

		this.head = game.add.sprite(initX, initY, 'head');
    	this.head.anchor.setTo(0.5, 0.5);
    	//set the initial Angle
    	this.head.angle = 270;
    	//activate physics to the head
    	game.physics.enable(this.head, Phaser.Physics.ARCADE);
	},

	/**
	 * make body
	 * @return {[type]} [description]
	 */
	makeBody: function() {
		//  Init snakeSection array
		var x = this.head.x;
		var y = this.head.y;
		var yincrease = this.head.height + this.space;



	    for (var i = 0; i < this.size; i++)
	    {
	        this.sections[i] = game.add.sprite(x, ( y+=yincrease ), 'ball');
	        this.sections[i].anchor.setTo(0.5, 0.5);
	        yincrease = this.sections[i].height + this.space;
	        //activate physics to parts
    		game.physics.enable(this.sections[i], Phaser.Physics.ARCADE);
	    }
	    
	    //  Init snakePath array
	    for (var i = 0; i <= this.size * this.space; i++)
	    {
	        this.path[i] = new Phaser.Point(400, 300);

	    }
	},
	/**
	 * [updateHead description]
	 * @return {[type]} [description]
	 */
	stopMoving: function(){
		this.head.body.velocity.setTo(0, 0);
    	this.head.body.angularVelocity = 0;

    	for( si in this.sections ){
			this.sections[si].body.velocity.setTo(0, 0);
    		this.sections[si].body.angularVelocity = 0;
		}

	},

	/**
	 * move the head ahead in direction
	 * @return {[type]} [description]
	 */
	moveHeadAhead: function() {
		this.head.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.head.angle, 300));
	},

	/**
	 * move the parts of snake in the head direction
	 * @return {[type]} [description]
	 */
	movePartsAhead: function() {
		for( si in this.sections ){
			this.sections[si].body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.head.angle, 300));
		}
	},

	/**
	 * move the snake in ahead direction
	 * @return {[type]} [description]
	 */
	moveSnakeAhead: function(){
		this.moveHeadAhead();
		this.movePartsAhead();
	}

};

window.onload = function() {
	game = new Phaser.Game(gameConfig.width, gameConfig.height, Phaser.AUTO, '', { preload: preload, create: create, update:update });
    /**
     * before create canvas
     * @return {[type]} [description]
     */
    function preload () {
    	//preloadImage to insert as sprite, the sprite id will be named with 'ball'
        game.load.image('ball', 'pangball.png');
        game.load.image('head', 'head.png');
    }

    /**
     * create event
     * @return {[type]} [description]
     */
    function create () {

    	//starting the arcade system
    	
    	game.physics.startSystem(Phaser.Physics.ARCADE);
    	//gane world will be the entire path
    	game.world.setBounds(0, 0, gameConfig.width, gameConfig.height);

    	cursors = game.input.keyboard.createCursorKeys();

    	//create a snake
    	Snake.init();
    	

        /*var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);*/
    }

    /**
     * frame repaiting event
     * @return {[type]} [description]
     */
    function update (){
    	Snake.stopMoving();


    	if (cursors.up.isDown)
	    {
	        Snake.moveSnakeAhead();

	        // Everytime the snake head moves, insert the new location at the start of the array, 
	        // and knock the last position off the end

	        /*var part = snakePath.pop();

	        part.setTo(snakeHead.x, snakeHead.y);

	        snakePath.unshift(part);

	        for (var i = 1; i <= numSnakeSections - 1; i++)
	        {
	            snakeSection[i].x = (snakePath[i * snakeSpacer]).x;
	            snakeSection[i].y = (snakePath[i * snakeSpacer]).y;
	        }*/
	    }

    	if (cursors.left.isDown)
	    {
	        Snake.head.body.angularVelocity = -300;
	    }
	    else if (cursors.right.isDown)
	    {
	        Snake.head.body.angularVelocity = 300;
	    }
    }
};