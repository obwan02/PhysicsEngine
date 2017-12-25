
class RigidBody {
	constructor(pos, mass, collider){
		this.pos = (pos instanceof Vector2) ? pos : new Vector2(0, 0);
		this.rotation = 0;
		this.mass = (typeof(mass) == "number" && mass > 0) ? mass : 0.1;
		this.collider = (collider instanceof BoxCollider) ? collider : new BoxCollider(this.pos, 1, 1);
	
		this.velocity = new Vector2(0, 0);
		
		//Radians per frame
		this.angularVelocity = 0;
		this.linearDrag = 0.02;
		this.angularDrag = 0.01;

		//(rotational) inertia (only for boxes)
		this.inertia = this.collider.calculateInertia(this.mass);
		this.centerOfMass = this.collider.centerOfMass;
	}

	setPosition(x, y){

		let dist = Vector2.distance_raw(this.pos, new Vector2(x, y));

		this.pos.x = x;
		this.pos.y = y;

		this.collider.pos.add(dist);
	}

	setRotation(r){
		this.rotation = r;
		this.collider.rotation = r;
	}

	update(){
		this.pos.add(this.velocity);
		this.collider.pos.add(this.velocity);
		this.rotation += this.angularVelocity;
		this.collider.rotation += this.angularVelocity;

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

		let angularDrag = this.angularVelocity * this.angularVelocity * this.angularDrag * 0.5;
		if(angularDrag < 0.000005) this.angularVelocity = 0;

    	let appliedResistance = 0;
    	appliedResistance = this.angularVelocity < 0 ? -angularDrag : angularDrag;

    	this.angularVelocity -= appliedResistance;

	}

	applyForceAtPosition(f, p){
		this.applyForce(f);
		this.applyTorque(f, p);
	}

	applyForce(force){
		//a = F / m
		if(force instanceof Vector2)
			this.velocity.add(Vector2.divide(force, this.mass));
	}

	applyTorque(directionalForce, position){
		let r = Vector2.distance_raw(this.pos, position);

		//(Cross product)
		let torque = r.cross(directionalForce);


		this.angularVelocity += torque / this.inertia;
	}

	clone() {
		let result = new RigidBody(this.pos, this.mass, this.collider);
		result.rotation = this.rotation;
		result.velocity = this.velocity;
		result.angularVelocity = this.angularVelocity;
		result.angularAcceleration = this.angularAcceleration;
		result.linearDrag = this.linearDrag;
		result.angularDrag = this.angularDrag;
		return result;
	}
}

module.exports = RigidBody;