// Oldal inicializálása

$(document).ready(() => {
	$('#content').load('menu.html');
});

let size;

//Kezdő állapot
function start(_size, difficulty) {
    size = _size;
	fields = [];
	if(size == 3) {
		colors = ['red', 'green', 'yellow'];
    } else if (size == 4) {
		colors = ['red', 'blue', 'green', 'yellow'];
    }
	
	let emptyPositions = 0;

    if(difficulty === 'easy') {
        if(size == 3) {
	        emptyPositions = 1;
        } else if(size == 4) {
	        emptyPositions = 3;
        }
    } else if(difficulty === 'hard') {
	    if(size == 3) {
		    emptyPositions = 3;
	    } else if(size == 4) {
		    emptyPositions = 5;
	    }
    }
    
    console.log('emptyPositions: ' + emptyPositions);
    console.log('size: ' + size);
	
	
	$('#content').load('table.html', () => {
		let tbody = document.getElementById('t');
		for (let i = 0; i < size; i++) {
			let row = document.createElement('tr');
			for(let j = 0; j < size; j++) {
				let f = new Field(i, j);
				fields.push(f);
				console.log("asd");
				row.appendChild(f.td);
			}
			tbody.appendChild(row);
		}
		
	});
	
	
}

let fields = [];
let colors = [];

class Field {
    // x
    // y
    // td
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
	    this.td = document.createElement('td');
	    this.td.innerHTML = "pos: x: " + this.x + " y: " + this.y;
	    console.log("this.td.innerHTML: " + this.td.innerHTML);
	    let remainingColors = this.getRemainingColors();
	    this.td.className = remainingColors[Math.floor(Math.random() * remainingColors.length)];
    }
    
    getRow() {
	    return fields.filter(field => field.x === this.x);
    }
    
    getColumn() {
	    return fields.filter(field => field.y === this.y);
    }
    
    getBlock() {
        console.log("block");
        if(size == 4) {
	        return fields.filter(field =>  this.x <  size / 2 && this.y <  size / 2 && field.x <  size / 2 && field.y <  size / 2
		        || this.x <  size / 2 && this.y >= size / 2 && field.x <  size / 2 && field.y >= size / 2
		        || this.x >= size / 2 && this.y <  size / 2 && field.x >= size / 2 && field.y <  size / 2
		        || this.x >= size / 2 && this.y >= size / 2 && field.x >= size / 2 && field.y >= size / 2);
        } else return [];
    }
    
    getRemainingColors() {
	    let r = this.getRow().map(field => field.td.className);
	    let c = this.getColumn().map(field => field.td.className);
	    let b = this.getBlock().map(field => field.td.className);
	    return colors.filter(color => !r.includes(color) && !c.includes(color) && !b.includes(color));
    }
}