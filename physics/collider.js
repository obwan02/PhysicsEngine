
class BoxCollider {
	constructor(pos, rotation, width, height){
		this.width = width;
		this.height = height;

		this.centerOfMass = new Vector2(width / 2, height / 2);
		this.rotation = rotation;
		this.pos = Vector2.add(this.centerOfMass, this.pos);
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

	getCellPositions(collider){

		var topLeft = new Vector2(Math.floor(Math.floor((collider.pos.x - collider.width / 2) / this.cellSize) * cellSize), Math.floor(Math.floor((collider.pos.y - collider.height / 2) / this.cellSize) * cellSize));
		var topRight = new Vector2(Math.floor(Math.floor((collider.pos.x + collider.width / 2) / this.cellSize) * cellSize), Math.floor(Math.floor((collider.pos.y - collider.height / 2) / this.cellSize) * cellSize));
		var bottomLeft = new Vector2(Math.floor(Math.floor((collider.pos.x - collider.width / 2) / this.cellSize) * cellSize), Math.floor(Math.floor((collider.pos.y + collider.height / 2) / this.cellSize) * cellSize));
		var bottomRight = new Vector2(Math.floor(Math.floor((collider.pos.x + collider.width / 2) / this.cellSize) * cellSize), Math.floor(Math.floor((collider.pos.y + collider.height / 2) / this.cellSize) * cellSize));

		return [topLeft.clone(), bottomRight.clone(), bottomLeft.clone(), bottomRight.clone()];
	}

	addCollider(collider){
		let cellPos = this.getCellPositions(collider);
		
		let prevCell = null;
		for(let i = 0; i < cellPos.length; i++){
			let cellExists = false;
			let foundCell = null;

			if(prevCell.eqauls(cellPos[i])){
				continue;
			}

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
				this.grid[cellPos.toString()].push(collider);
			}

			prevCell = cellPos[i];
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