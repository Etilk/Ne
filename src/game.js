/**
 * Enum for all kind of directions. 
 * @enum {number}
 */
const Direction = Object.freeze({
	/** The entity is not moving */
	NOWHERE: 0,
	/** Direction left. */
	LEFT: 1,
	/** Direction up. */
	UP:	2,
	/** Direction right. */
	RIGHT: 3,
	/** Direction down. */
	DOWN: 4,

	/**
	 * Get inverse direction of given direction
	 *
	 * @param {Direction} direction	Direction you want to find an inverse to 
	 */
	inverse: function(direction) {
		return (direction == Direction.NOWHERE) ? Direction.NOWHERE : (direction + 2) % 4;
	}
});

const Door = Object.freeze({
	/** Length of doors in percents */
	LENGTH: 0.1,
	/** Thickness of doors in percents */
	THICKNESS: 0.01,
	/** Maximum number of doors that can be placed in one room */
	MAX_NUMBER: 4
});

/**
 * Main game object that controlls user, gameplay, rooms.
 *
 * @property {number} width       Width of canvas in percents.
 * @property {number} height      Height of canvas in percents.
 * @property {Room}   currentRoom Object of current displayed room.
 * @property {Object} canvas      Canvas where game is drawn.
 * @since 1.0.0
 */
class Game {
	
	/**
	 * Constructor for Game.
	 * 
	 * @param {Object} container Dom object where canvas should be placed. 
	 */
	constructor(container) {
		this.container = container;
		this.canvas = document.createElement("canvas");
		container.appendChild(this.canvas);
		this.context = this.canvas.getContext("2d");

		// Resize canvas to fit inside container
		this.resizeCanvas();

		// If the container is resized, resize canvas accordingly
		this.container.onresize = function() {
			this.resizeCanvas();
		}.bind(this);

		// Add main room
		this.currentRoom = new Room(0.4);
	}

	/**
	 * Resize canvas to fit inside this.container
	 */
	resizeCanvas() {
		var containerSize = this.container.getBoundingClientRect();
		this.canvas.width = containerSize.width;
		this.canvas.height = containerSize.height;
	}

	/**
	 * Change current room. This function is called when user leaves current room. 
	 *
	 * @param {Room} room New room to be shown.
	 */
	changeCurrentRoom(room) {
		this.currentRoom = room;
	}
	
	/**
	 * Updates current room and all of its objects. 
	 * Function is called on animation frame.
	 */
	update() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.currentRoom.draw(this.context, this.canvas.width, this.canvas.height);
		window.requestAnimationFrame(this.update.bind(this));
	}
}