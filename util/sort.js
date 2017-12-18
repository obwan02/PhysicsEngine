
//Property is for sorting objects by certain property like AABB.minx instead of just integer values;
const QuickSort = function(a, property=""){

	if(a == null | a.length < 2)
		return a;

	let array = a.slice();

	let partition = function(array, li, hi, property){
		let pivot = eval("array[hi]" + property);
		let i = li - 1;

		let j = li;
		for(j; j < hi; j++){
			if(eval("array[j]" + property) < pivot){
				i++;
				let temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
		}

		if(eval("array[hi]" + property) < eval("array[i + 1]" + property)){
			let temp = array[i + 1];
			array[i + 1] = array[j];
			array[j] = temp;
		}

		return i + 1;
	}

	let quickSort = function(array, li, hi, property){
		if(li < hi){
			let p = partition(array, li, hi, property);
			quickSort(array, li, p - 1, property);
			quickSort(array, p + 1, hi, property);
		} else {
			return array;
		}
	}

	quickSort(array, 0, array.length - 1, property);

	return array;
}

const InsertionSort = function(a, property=""){

	if(a == null | a.length < 2)
		return a;

	let array = a.slice();

	for(let i = 1; i < array.length; i++){
		for(let j = i; j > 0; j--){

			if(eval("array[j - 1]" + property + " > array[j]" + property))
				break;

			let temp = array[j];
			array[j] = array[j - 1];
			array[j - 1] = temp;

		}
	}

	return array.reverse();
}

module.exports = {
	QuickSort,
	InsertionSort
};