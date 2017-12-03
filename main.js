const maths = require("./maths/maths");
const physics = require("./physics/physics");
const {start, makeContext} = require("./draw");

const ctx = makeContext(640, 360);

function update(){
	ctx.clearRect(0, 0, 640, 360);
	ctx.fillRect(10, 10, 100, 100);
}

start(update);

