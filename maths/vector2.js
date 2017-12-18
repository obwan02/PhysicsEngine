class Vector2 {
	constructor(x, y){
		this.x = typeof(x) == "number" ? x : 0;
    	this.y = typeof(y) == "number" ? y : 0;
	}

	set(x, y){
		if(typeof(x) == "number") this.x = x;
		if(typeof(y) == "number") this.y = y;

		if(x instanceof Vector2){
			this.x = x.x;
			this.y = x.y;
		}
	}

	add(x, y){
		if(x instanceof Vector2) {
			this.x += x.x;
			this.y += x.y;
		} else {
			if(typeof(x) == "number") {
				this.x += x;
				if(typeof(y) != "number") {
					this.y += x;
				}
			}
			if(typeof(y) == "number") this.y += y;
		}

		return this;
	}

	subtract(x, y){
		if(x instanceof Vector2) {
			this.x -= x.x;
			this.y -= x.y;
		} else {
			if(typeof(x) == "number") {
				this.x -= x;
				if(typeof(y) != "number") {
					this.y -= x;
				}
			}
			if(typeof(y) == "number") this.y -= y;
		}

		return this;
	}

	cross(x, y){
		if(x instanceof Vector2) {
			return this.x * x.y - this.y * x.x;
		} else {
			if(typeof(x) == "number") {
				if(typeof(y) != "number") {
					return this.x * x - this.y * x;
				} else {
					return this.x * y - this.y * x;
				}
			}
		}

		return null;
	}

	dot(x, y){
		if(x instanceof Vector2) {
			return this.x * x.x + this.y * x.y;
		} else {
			if(typeof(x) == "number") {
				if(typeof(y) != "number") {
					return this.x * x + this.y * x;
				} else {
					return this.x * x + this.y * y;
				}
			}
		}

		return null;
	}

	multiply(x, y){
		if(x instanceof Vector2) {
			this.x *= x.x;
			this.y *= x.y;
		} else {
			if(typeof(x) == "number") {
				this.x *= x;
				if(typeof(y) != "number") {
					this.y *= x;
				}
			}
			if(typeof(y) == "number") this.y *= y;
		}

		return this;
	}

	divide(x, y){
		if(x instanceof Vector2) {
			this.x /= x.x;
			this.y /= x.y;
		} else {
			if(typeof(x) == "number") {
				this.x /= x;
				if(typeof(y) != "number") {
					this.y /= x;
				}
			}
			if(typeof(y) == "number") this.y /= y;
		}

		return this;
	}

	equals(other){
		if(!(other instanceof Vector2))
			return false

		if(this.x == other.x && this.y == other.y)
			return true; 
	}

	clone(){
		return new Vector2(this.x, this.y);
	}

	toString(){
		return `${this.x},${this.y}`
	}

	normalise(){
		let scale = 1 / this.magnitude;
		return this.multiply(scale);
	}

	rotate(center, angle){
		let mag = Vector2.distance_raw(center, this);
		let sa = Vector2.to_angle(mag);
		sa += angle;

		let result = Vector2.from_polar(mag.magnitude, sa).add(center);
		this.set(result);

		return this;
	}

	get magnitude(){
		return Math.sqrt(this.squareMagnitude); 
	}

	get squareMagnitude(){
		return this.x * this.x + this.y * this.y;
	}

	get normalised(){
		return this.clone().normalise();
	}

	get absolute(){
		let abs = this.clone();
		abs.x = abs.x < 0 ? -abs.x : abs.x;
		abs.y = abs.y < 0 ? -abs.y : abs.y;
		return abs;
	}
}

Vector2.get_normal_of_line = function(a, b){
	return Vector2.subtract(b, a).rotate(Math.PI / 2);
}

Vector2.rotate = function(a, c, t){
	let mag = Vector2.distance_raw(c, a);
	let sa = Vector2.to_angle(mag);
	sa += t;

	return Vector2.from_polar(mag.magnitude, sa).add(c);
}

Vector2.normalised = function(vector){
	return vector.clone().normalise();
}

Vector2.project = function(a, b){
	return b.normalised.multiply(Vector2.scalar_project(a, b));
}

Vector2.scalar_project = function(a, b){
	return a.magnitude * Math.cos(Vector2.angle_between(a, b));
}

//Angle in radians
Vector2.from_polar = function(radius, angle){
	return new Vector2(radius * Math.cos(angle), radius * Math.sin(angle));
}

Vector2.angle_between = function(a, b){
	return Math.acos(a.dot(b) / (a.magnitude * b.magnitude));
}

Vector2.distance_raw = function(a, b){
	return Vector2.subtract(b, a);
}

Vector2.to_angle = function(vector){
	return Math.atan2(vector.y, vector.x);
}

Vector2.distance = function(a, b){
	return Vector2.distance_raw(a, b).absolute.magnitude;
}

Vector2.add = function(a, b, c){
	return a.clone().add(b, c);
}

Vector2.subtract = function(a, b, c){
	return a.clone().subtract(b, c);
}

Vector2.multiply = function(a, b, c){
	return a.clone().multiply(b, c);
}

Vector2.divide = function(a, b, c){
	return a.clone().divide(b, c);
}

Vector2.cross = function(a, b){
	return a.cross(b);
}

Vector2.dot = function(a, b){
	return a.dot(b);
}

module.exports = Vector2;
