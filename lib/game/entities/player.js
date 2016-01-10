ig.module(
	'game.entities.player'
)
.requires(
	'plugins.joncom.box2d.entity',
	'plugins.joncom.box2d.entities.circle'
)
.defines(function(){

EntityPlayer = EntityCircle.extend({
	
	size: {x: 82, y: 82},

	radius: 41,
	density: 1,
	isFixedRotation: true,

	bounciness: 0.025,

	speed: 1300,
    maxVel: {x: 200, y: 200},

	animSheet: new ig.AnimationSheet( 'media/player.png', 82, 82 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'shoot', 1, [1] );

		// Set a reference to the player on the game instance
		ig.game.player = this;

	},
	
	update: function(){

        if( ig.input.state('up') ) {

	        var force = new Box2D.Common.Math.b2Vec2( 0, -this.speed );
	        this.body.ApplyForce( force, this.body.GetPosition() );

        } else if( ig.input.state('down') ) {

	        var force = new Box2D.Common.Math.b2Vec2( 0, this.speed );
	        this.body.ApplyForce( force, this.body.GetPosition() );

        }

        // Left or right?
        if( ig.input.state('left') ) {

	        var force = new Box2D.Common.Math.b2Vec2( -this.speed, 0 );
	        this.body.ApplyForce( force, this.body.GetPosition() );

        } else if( ig.input.state('right') ) {

	        var force = new Box2D.Common.Math.b2Vec2( this.speed, 0 );
	        this.body.ApplyForce( force, this.body.GetPosition() );

        }

        if ( ig.input.state('up') ||
        	 ig.input.state('down') ||
        	 ig.input.state('left') ||
        	 ig.input.state('right')
    	){
			this.body.SetLinearDamping(0);
        }

        if ( !ig.input.state('up') &&
        	 !ig.input.state('down') &&
        	 !ig.input.state('left') &&
        	 !ig.input.state('right')
    	){
			this.body.SetLinearDamping(3);
        }

        if ( ig.input.state('shoot') ) {
        	this.currentAnim = this.anims.shoot;
        } else {
        	this.currentAnim = this.anims.idle;        	
        }


		this.parent();

	}

});


});