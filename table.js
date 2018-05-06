// Oldal inicializálása

$(document).ready(() => {
	menu();
});

let size;
let editedField;
let fields = [];
let colors = [];
let timer;

function menu() {
	clearInterval(timer);
	$('#content').load('menu.html');
}
//Kezdő állapot
function start(_size, difficulty) {
	size = _size;
	
	if (size == 3) {
		colors = ['red', 'green', 'yellow'];
	} else if (size == 4) {
		colors = ['red', 'blue', 'green', 'yellow'];
	}
	
	let emptyPositions = 0;
	
	if (difficulty === 'easy') {
		if (size == 3) {
			emptyPositions = 1;
		} else if (size == 4) {
			emptyPositions = 3;
		}
	} else if (difficulty === 'hard') {
		if (size == 3) {
			emptyPositions = 3;
		} else if (size == 4) {
			emptyPositions = 5;
		}
	}
	
	$('#content').load('table.html', () => {
		let tbody = document.getElementById('t');
		do {
			fields = [];
			tbody.innerHTML = '';
			for (let i = 0; i < size; i++) {
				let row = document.createElement('tr');
				for (let j = 0; j < size; j++) {
					let f = new Field(i, j);
					fields.push(f);
					console.log('asd');
					row.appendChild(f.td);
				}
				tbody.appendChild(row);
			}
		} while (isInvalid());
		
		let empties = [];
		for (let i = 0; i < emptyPositions; i++) {
			console.log('TAKE');
			let field = nonEditableFields()[Math.floor(Math.random() * size * size)];
			field.editable = true;
			field.td.addEventListener('click', e => {
				console.log('EDIT');
				editedField = fields.filter(field => field.td.id === e.target.id)[0];
				if (editedField.td.className !== '') {
					editedField.td.className = '';
				}
				$('#control').show();
			}, true);
			
			field.td.className = '';
			empties.push(field);
		}
		
		let c = document.getElementById('control');
		let cr = document.createElement('tr');
		colors.forEach(color => {
			let colorControl = document.createElement('td');
			colorControl.className = color;
			colorControl.addEventListener('click', e => {
				if (editedField.getRemainingColors().filter(remaining => e.srcElement.className === remaining).length > 0) {
					editedField.td.className = colorControl.className;
					$('#control').hide();
					if (isWin() === 0) {
						$('#content').load('win.html', () => {
							console.log('win');
							
							let count = 1;
							timer = setInterval(function() {
								$('#restart').val('Vissza a menübe (' + (15 - count) + ')');
								count++;
								if(count > 15) {
									menu();
								}
							}, 1000);
							
						});
					}
					editedField = null;
				}
			}, true);
			cr.appendChild(colorControl);
		});
		c.appendChild(cr);
		
		$('#control').hide();
	});
}

function isWin() {
	return fields.filter(field => field.td.className === '').length;
}

function nonEditableFields() {
	return fields.filter(field => field.td.className !== '');
}

function isInvalid() {
	return fields.map(field => field.td.className).filter(className => !colors.includes(className)).length > 0;
}

class Field {
	// x
	// y
	// td
	// editable
	
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.td = document.createElement('td');
		this.td.id = 'x' + this.x + 'y' + this.y;
		
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
		if (size == 4) {
			return fields.filter(field => this.x < size / 2 && this.y < size / 2 && field.x < size / 2 && field.y < size / 2
				|| this.x < size / 2 && this.y >= size / 2 && field.x < size / 2 && field.y >= size / 2
				|| this.x >= size / 2 && this.y < size / 2 && field.x >= size / 2 && field.y < size / 2
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