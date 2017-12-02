
class pObj {
	constructor(pos, mass, collider){
		this.pos = (pos instanceof Vector2) ? pos : new Vector2(0, 0);
		this.rotation = 0;
		this.mass = (typeof(mass) == "number" && mass > 0) ? mass : 0.1;
		this.collider = (collider instanceof BoxCollider) ? collider : new Collider(1, 1);
	
		this.velocity = new Vector2(0, 0);
		
		//Radians per frame
		this.angularVelocity = 0;
		this.angularAcceleration = 0;

		this.linearDrag = 0.01;
		this.angularDrag = 0.01;

		//(rotational) inertia (only for boxes)
		this.inertia = this.collider.calculateInertia(this.mass);
		this.centerOfMass = this.collider.centerOfMass;
	}

	update(){
		this.pos.add(this.velocity);
		this.rotation += this.angularVelocity;

		this.inertia = this.collider.calculateInertia(this.mass);

		//Determine the drag on the object
		//Rules out some factors like air density, so you can have different drag effects on different objects
		let linearDrag = Vector2.multiply(Vector2.multiply(this.velocity, this.velocity), this.linearDrag).multiply(0.5);
    	if(linearDrag.x < 0.00005) this.velocity.x = 0;
    	if(linearDrag.y < 0.00005) this.velocity.y = 0;
    	//Make it always opposing velocity
    	let appliedForce = new Vector2();
    	appliedForce.x = this.velocity.x < 0 ? -linearDrag.x : linearDrag.x;
    	appliedForce.y = this.velocity.y < 0 ? -linearDrag.y : linearDrag.y;
    
    	//Apply drag
		this.velocity.subtract(linearDrag);

		//Angular forces
		this.angularVelocity += this.angularAcceleration;
		this.rotation += this.angularVelocity;
		
	}

	addForce(force){
		//a = F / m
		if(force instanceof Vector2)
			this.velocity.add(Vector2.divide(force, this.mass));
	}

	applyTorque(directionalForce, position){
		let r = Vector2.distance_raw(this.pos, position);

		//(Cross product)
		let torque = r.x * directionalForce.y - r.y * directionalForce.x;
		//Alternative:
		//let torque = r.cross(y); 
		this.angularAcceleration = torque / this.collider.inertia;
	}
}

module.exports = p_physics;