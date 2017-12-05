module.exports = {
	start: function(update, s, f, st){
		let start = s || Date.now();
		let interval = 1000 / 70;

		let frames = f || 0;
		let secondTimer = st || Date.now();

		let now = Date.now();
		if(now - start >= interval){
			if(update && typeof(update) == "function") {
				update((now - start) / 1000);
				frames++;
			}

			start = Date.now();
		}

		if(now - secondTimer > 1000) {
			console.log(frames);
			secondTimer = Date.now();
			frames = 0;
		}

		setTimeout(function() { module.exports.start(update, start, frames, secondTimer); }, 0);
		
	},
	makeContext: function(width, height){
		let a = document.createElement("canvas");
		a.innerHTML = "Your browser doesn't support the HTML5 canvas element.";
		a.width = width;
		a.height = height;
		document.body.appendChild(a);

		return a.getContext("2d");
	}
}


