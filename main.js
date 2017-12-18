const {Vector2} = require("./maths/maths")
const {QuickSort, InsertionSort} = require("./util/sort");
const physics = require("./physics/physics")
const pObj = physics.pObj;
const {Collision, BoxCollider, CollisionManager, Box_SAT} = physics.collisionManagement;

const draw = require("./draw");
const {start, makeContext} = draw;

const ctx = makeContext(640, 360);

const radians = function(deg){
	return deg * Math.PI / 180
}

const rotateVertices = function(vertices, center, angle){

	let result = [];

	for (let i = 0; i < vertices.length; i++) {
		let v = vertices[i];
		let dist = Vector2.distance_raw(center, v);

		let startAngle = Vector2.to_angle(dist);
		let nextAngle = startAngle + angle;

		let newPosition = Vector2.from_polar(dist.magnitude, nextAngle);
		result.push(newPosition.add(center));
	}

	return result;
}

const drawVertices = function(vertices, join, fill){
	if(vertices.length < 2)
		return

	ctx.beginPath();
	for (let i = 0; i < vertices.length - 1; i++) {
		ctx.moveTo(vertices[i].x, vertices[i].y);
		ctx.lineTo(vertices[i + 1].x, vertices[i + 1].y);
	}

	if(join == undefined | join == true){
		ctx.moveTo(vertices[vertices.length - 1].x, vertices[vertices.length - 1].y);
		ctx.lineTo(vertices[0].x, vertices[0].y);
	}

	if(fill)
		ctx.fill();
	else
		ctx.stroke();
}

var tc1 = new BoxCollider(new Vector2(100, 100), 50, 50);
var rb1 = new pObj(new Vector2(100, 100), 10, tc1);

var tc2 = new BoxCollider(new Vector2(250, 250), 50, 50);
var rb2 = new pObj(new Vector2(250, 250), 10, tc2); 

let mx = 0;
let my = 0;

var cm1 = new CollisionManager();
cm1.addCollider(tc1);
cm1.addCollider(tc2);

window.onmousemove = function(e){
	mx = e.clientX;
	my = e.clientY;
}

var points = [];
var rot = 0;

function update(delta){
	ctx.clearRect(0, 0, 640, 360);
	ctx.fillStyle = "green";
	ctx.fillText(String(draw.currentFPS), 10, 10);

	rb2.setPosition(mx, my);

	rb1.update();
	rb2.update();

	if(cm1.checkCollisions().length > 0){
		console.log("Hit");
	}

	drawVertices(tc2.vertices, true, false);
	drawVertices(tc1.vertices, true, false);



}

start(update);

