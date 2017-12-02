var Maths = {
	pi : 3.141592653589793,
	PI : 3.141592653589793,

	root : function(a, b){

	},

	sqrt : function(x){
		if(x < 1)
			return null; 

		let a = x;
		let b = 0;
		while(true){
			b += 1
			if(a == b)
				return a;
			if(Maths.power(b, 2) > a){
				b = b - 1;
				break;
			}
		}

		for(let i = 0; i < 10; i++){
			let y = a / b;
			b = (y + b) / 2;
		}
		
		return b;
	},

	power : function(x, e){

		let extra = e % 1;

		let result = 1;
		
		if(e > 0){
			for(let i = 0; i < e; i++){
				result *= x;		
			}

			if(extra){
				let a = 1 / extra;
				result += Maths.root(x, a);
			}
		}

		return result;
	},

	square : function(x){
		return 
	},

	sin : function(x){
		return (16 * x * (Maths.pi - x)) / (5 * Maths.pi * Maths.pi - 4 * x * (Maths.pi - x))
	}
};
