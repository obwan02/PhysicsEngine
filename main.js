const {Vector2} = require("./maths/maths");
const physics = require("./physics/physics");
const draw = require("./draw");
const {start, makeContext} = draw;

const ctx = makeContext(640, 360);

let i = 0;

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

function update(delta){
	ctx.clearRect(0, 0, 640, 360);
	ctx.fillStyle = "green";
	ctx.fillText(String(draw.currentFPS), 10, 10);

	let l = Math.sqrt(5000);

	var vertices = [new Vector2(150, 150), new Vector2(250, 150), new Vector2(250, 250), new Vector2(150, 250)];
	var newVerts = rotateVertices(vertices, new Vector2(200, 200), radians(i));
	drawVertices(newVerts, true, false);

	i += 2 * delta;

}

start(update);

