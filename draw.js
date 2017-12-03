module.exports = {
	start: function(update){
		setTimeout(function(){
			let start = new Date().getTime();
			let interval = 1000 / 60;

			let frames = 0;
			let secondTimer = new Date().getTime();

			while(true){
				let now = new Date().getTime();
				if(now - start >= interval){
					if(update && typeof(update) == "function") {
						update();
						frames++;
					}

					start = new Date().getTime();
				}

				if(now - secondTimer > 1000) {
					console.log(frames);
					secondTimer = new Date().getTime();
				}
			}

		}, 0);
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


