/**
 * Enum for moving type. 
 * @enum {number}
 */
const Moving = Object.freeze({
	/** Moving is changed by user request */
	FREE: 0,
	/** Random direction. */
	RANDOM:	1,
	/** Moving in vertical direction */
	VERTICAL: 2,
	/** Moving from in horizontal direction. */
	HORIZONTAL: 3,
	/** Following the user. */
	FOLLOWING: 4,
	/** Hiding from user, to be hard to catch. */
	HIDING: 5
});

/**
 * Interface for items that are placed in room. 
 *
 * @property {number} width  Width of item in percents.
 * @property {number} height Height of item in percents.
 * @property {number} x      X coordinate of item in percents.
 * @property {number} y      Y coordinate of item in percents.
 * @property {Moving} moving Moving type of item.
 * @since 1.0.0
 */
class Item {
	
	/**
	 * Constructor of class Item
	 *
	 * @param {number} width  Width of item in percents.
	 * @param {number} height Height of item in percents. 
	 */
	constructor(width, height) {
		this.moving = Moving.RANDOM;
		this.width = width;
		this.height = height;
		this.x = 0;
		this.y = 0;
	}
	
	/**
	 * Places item in room.  It is called when we place
	 * item in room before first update call.
	 *
	 * @param {Room} room Room where item is located.
	 */
	place(room) {
		this.x = Math.random() * (room.size - this.width);
		this.y = Math.random() * (room.size - this.width);
	}
	
	/**
	 * Updates location and other properties of item.
	 * It is called on animation frame.
	 *
	 * @param {Room} room Room where item is located.
	 */
	update(room) {
	}
	
	/**
	 * Draws object on canvas.
	 * 
	 * @param {Object} context	2D context of Canvas
	 * @param {number} size		Size of canvas in pixels
	 */
	draw(context, size) {
		context.beginPath();
		context.fillRect(this.x * size, this.y * size, this.width * size, this.height * size)
		context.fill();
	}
}