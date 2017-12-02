
class BoxCollider {
	constructor(pos, rotation, width, height){
		this.width = width;
		this.height = height;

		this.centerOfMass = new Vector2(width / 2, height / 2);
		this.rotation = 0;
		this.pos = 0;
	}

	calculateInertia(mass) {
		return mass * (this.width * this.width + this.height * this.height) / 12
	}

	isInContact(){
		return false;
	}
}
