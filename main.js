const {Vector2} = require("./maths/maths");
const physics = require("./physics/physics");
const {start, makeContext} = require("./draw");

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
		let nextAngle = startAngle + radians(angle);

		let newPosition = Vector2.from_polar(dist.magnitude, nextAngle);
		result.push(newPosition);
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

	let l = Math.sqrt(5000);

	ctx.translate(100, 100);

	ctx.beginPath();
	// ctx.moveTo( l * Math.sin(radians(i)), -l * Math.cos(radians(i)));

	// ctx.lineTo( l * Math.cos(radians(i)),  l * Math.sin(radians(i)));
	// ctx.moveTo( l * Math.cos(radians(i)),  l * Math.sin(radians(i)));

	// ctx.lineTo(-l * Math.sin(radians(i)),  l * Math.cos(radians(i)));
	// ctx.moveTo(-l * Math.sin(radians(i)),  l * Math.cos(radians(i)));

	// ctx.lineTo(-l * Math.cos(radians(i)), -l * Math.sin(radians(i)));
	// ctx.moveTo(-l * Math.cos(radians(i)), -l * Math.sin(radians(i)));

	// ctx.lineTo( l * Math.sin(radians(i)), -l * Math.cos(radians(i)));
	// ctx.stroke();

	var vertices = [new Vector2(50, 50), new Vector2(150, 50), new Vector2(150, 150), new Vector2(50, 150)];
	drawVertices(vertices, true, true);

	ctx.translate(-100, -100);

	i += 0.2 * delta;

}

start(update);

