
class BoxCollider {
	constructor(pos, rotation, width, height){
		this.width = width;
		this.height = height;

		this.centerOfMass = new Vector2(width / 2, height / 2);
		this.rotation = rotation;
		this.pos = pos;
	}

	calculateInertia(mass) {
		return mass * (this.width * this.width + this.height * this.height) / 12
	}

	isInContact(){
		return false;
	}
}

class CollisionManager {
	constructor(area){
		this.area = area;
		this.cellSize = Vector2.divide(area, 20);
		this.grid = {};
		this.allColliders = [];
	}

	getCell(collider){
		return new Vector2(Math.floor(Math.floor(collider.pos.x / this.cellSize) * cellSize), Math.floor(Math.floor(collider.pos.y / this.cellSize) * cellSize));
	}

	addCollider(collider){
		let cellPos = this.getCell(collider);
		
		let cellExists = false;
		let foundCell = null;
		for(var cell in this.grid){
			if(cell == cellPos.toString()){
				cellExists = true;
				foundCell = cell;
			}
		}

		if(!cellExists){
			this.grid[cellPos.toString()] = [];
			this.grid[cellPos.toString()].push(collider);
		} else {
			this.grid[cell].push(collider);
		}

		this.allColliders.push(collider);
	}

	getAllBroadCollisions(){
		let allCollisions = [];

		for(var i in this.allColliders){
			let a = this.grid[this.getCell(i).toString()]
			allCollisions.push(a);
		}

		return allCollisions;
	}

	checkCollisions(){

	}
}

CollisionManager.generateCollisionManager = function(area, colliders){
	let result = new CollisionManager(area);
	for(var c in colliders){
		result.addCollider(c);
	}
}

module.exports = BoxCollider;