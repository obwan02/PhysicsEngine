
class Collision {
	constructor(a, b, normal){
		this.colliderA = a;
		this.colliderB = b;
		this.point = point;
		this.edge = edge;
	}
}

class AABB {
	constructor(min, max){
		this.min = min;
		this.max = max;
	}
}

class BoxCollider {
	constructor(pos, width, height){
		this.width = width;
		this.height = height;

		this.centerOfMass = new Vector2(width / 2, height / 2);
		this.rotation = 0;
		this.pos = pos;

		//used for making sure properties 'vertices' and 'AABB' arent recalculated for the exact same values, as that would waste CPU power
		this.prevRotationV = Infinity;
		this.prevRotationA = Infinity;
		this.prevPosV = new Vector2(Infinity, Infinity);
		this.prevPosA = new Vector2(Infinity, Infinity);

		//set when you first use the property 'AABB';
		this.activeAABB = null;
		//set when you first use the property vertices
		this.activeVertices = null;
	}

	assignRigidbody(rb){
		this.rb = rb;
	}

	calculateInertia(mass) {
		return mass * (this.width * this.width + this.height * this.height) / 12
	}

	isInContact(){
		return false;
	}

	get vertices() {
		if(Math.abs(this.rotation - this.prevRotationV) > 0.01 | Vector2.subtract(this.pos, this.prevPosV).magnitude > 0.01){
			this.activeVertices = [ Vector2.rotate(Vector2.subtract(this.pos, -this.width / 2, -this.height / 2), this.pos, this.rotation), Vector2.rotate(Vector2.subtract(this.pos, this.width / 2, -this.height / 2), this.pos, this.rotation), Vector2.rotate(Vector2.subtract(this.pos, this.width / 2, this.height / 2), this.pos, this.rotation), Vector2.rotate(Vector2.subtract(this.pos, -this.width / 2, this.height / 2), this.pos, this.rotation) ];
			this.prevRotationV = this.rotation;
			this.prevPosV = this.pos.clone();
			return this.activeVertices;
		} else {
			return this.activeVertices;
		}
	}

	get AABB(){
		if(Math.abs(this.rotation - this.prevRotationA) > 0.1 | Vector2.subtract(this.pos, this.prevPosA).magnitude > 0.01){
			var minx =  Infinity;
			var miny =  Infinity;
			var maxx = -Infinity;
			var maxy = -Infinity;

			let verts = this.vertices;

			for(let i = 0; i < verts.length; i++){
				minx = verts[i].x < minx ? verts[i].x : minx;
				miny = verts[i].y < miny ? verts[i].y : miny;
				maxx = verts[i].x > maxx ? verts[i].x : maxx;
				maxy = verts[i].y > maxy ? verts[i].y : miny;
			}

			this.activeAABB = new AABB(new Vector2(minx, miny), new Vector2(maxx, maxy));
			this.prevRotationA = this.rotation;
			this.prevPosA = this.pos.clone();
			return this.activeAABB;
		} else {
			return this.activeAABB;
		}
	}
}

class CollisionManager {
	constructor(colliders=[]){
		this.firstSort = false;
		this.allColliders = colliders;
		this.sortedAABBs = [];
	}

	get colliders() {
		return allColliders;
	}

	addCollider(c){
		if(c instanceof BoxCollider)
			this.allColliders.push(c);
	}

	addColliders(c){
		if(c instanceof Array)
			this.allColliders += c;
	}

	getBroadCollisions(){
		if(!this.firstSort){
			this.sortedColliders = QuickSort(this.allColliders, ".AABB.min.x");
			this.firstSort = true;
		} else {

			if(this.sortedColliders.length == this.allColliders.length){
				this.sortedColliders = InsertionSort(this.sortedColliders, ".AABB.min.x");
			} else {
				this.sortedColliders = QuickSort(this.allColliders, ".AABB.min.x");
			}
		}

		let axisList = this.sortedColliders;
		let activeList = [];
		activeList.push(axisList[0]);

		let potentialCollisions = [];

		for (var i = 1; i < axisList.length; i++) {
			for (var j = 0; j < activeList.length; j++) {
				if(axisList[i].AABB.min.x > activeList[j].AABB.max.x){
					activeList.splice(j, 1)
				} else {
					potentialCollisions.push(new CollisionManager.BroadCollision(axisList[i], activeList[j]));
				}
			}

			activeList.push(axisList[i]);
		}

		return potentialCollisions;
	}

	Box_SAT(c1, c2){

	let verts1 = c1.vertices;
	let verts2 = c2.vertices;

	let axisA = Vector2.distance_raw(verts1[0], verts1[1]);
	let axisB = Vector2.distance_raw(verts1[3], verts1[0]);

	let proj1 = { a : Vector2.scalar_project(verts1[0], axisA), b : Vector2.scalar_project(verts1[1], axisA), c : Vector2.scalar_project(verts1[0], axisB), d : Vector2.scalar_project(verts1[3], axisB) }
	
	let proj2a = { v1 : Vector2.scalar_project(verts2[0], axisA), v2 : Vector2.scalar_project(verts2[1], axisA), v3 : Vector2.scalar_project(verts2[2], axisA), v4 : Vector2.scalar_project(verts2[3], axisA) }
	let proj2b = { v1 : Vector2.scalar_project(verts2[0], axisB), v2 : Vector2.scalar_project(verts2[1], axisB), v3 : Vector2.scalar_project(verts2[2], axisB), v4 : Vector2.scalar_project(verts2[3], axisB) }

	let A1Large = proj1.a > proj1.b ? proj1.a : proj1.b;
	let A1Small = proj1.a < proj1.b ? proj1.a : proj1.b;
	let B1Large = proj1.d > proj1.c ? proj1.d : proj1.c;
	let B1Small = proj1.d < proj1.c ? proj1.d : proj1.c;

	let A2Large = null;
	let A2Small = null;
	for(let i in proj2a){
		if(A2Large == null | proj2a[i] > A2Large){
			A2Large = proj2a[i];
		}

		if(A2Small == null | proj2a[i] < A2Small){
			A2Small = proj2a[i];
		}
	}

	let B2Large = null;
	let B2Small = null;
	for(let i in proj2b){
		if(B2Large == null | proj2b[i] > B2Large){
			B2Large = proj2b[i];
		}

		if(B2Small == null | proj2b[i] < B2Small){
			B2Small = proj2b[i];
		}
	}

	if(A2Small < A1Large && A2Large > A1Small){
		//check other axis
		if(B2Small < B1Large && B2Large > B1Small){

			return new Collision(c1, c2, );
		}
	}

	return false;
}

	checkCollisions(){
		let broadCollisions = this.getBroadCollisions();
		//console.log(broadCollisions);
		let collisions = [];

		for (var i = 0; i < broadCollisions.length; i++) {
			let a = this.Box_SAT(broadCollisions[i].colliderA, broadCollisions[i].colliderB); 
			if(a){
				collisions.push(a);
			}
		}

		return collisions;
	}

	resolveCollision(c){

	}
}

CollisionManager.BroadCollision = class {
	constructor(a, b){
		this.colliderA = a;
		this.colliderB = b;
	}
}

CollisionManager.generateCollisionManager = function(colliders){
	let result = new CollisionManager(area, colliders);
}

module.exports = {
	Collision,
	BoxCollider,
	CollisionManager,
	AABB
};