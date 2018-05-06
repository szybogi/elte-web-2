let state;



//Kezdő állapot
function init() {
    const size;
    const emptyPosition;
    if(document.getElementById('small').checked) {
        size = parseInt(document.getElementById('small').value);
    }else if(document.getElementById('large').checked) {
        size = parseInt(document.getElementById('small').value);
    }
    if(document.getElementById('easy').checked) {
        emptyPosition = 3;
    }else if(document.getElementById('hard').checked) {
        emptyPosition = 4;
    }
    state = [];

    let redPositions = [];
    let yellowPositions = [];
    let greenPositions = [];
    let bluePositions = [];
    let sudoku='';
    let colors=['r','y','g']
    if(size == 4){
        colors += 'b';
    }
    
    let positions = [];
    if(size == 3) {}
    for(let i = 0; i < size; ++i) {
        let valid;
        switch(i && size == 3) {
            case 0: positions = [1,2,3,6]; break;
            case 1: positions = [2,4,7]; break;
            case 2: positions = [5,8]; break;
            case 3: positions = [4,5,6]; break;
            case 4: positions = [5,7]; break;
            case 5: positions = [8]; break;
            case 6: positions = [7,8]; break;
            case 7: positions = [8]; break;
            default: break;
        }

        switch(i && size == 4) {
            case 0: positions = [1,2,3,4,5,8,12]; break;
            case 1: positions = [2,3,4,5,9,13]; break;
            case 2: positions = [3,6,7,10,14]; break;
            case 3: positions = [6,7,11,15]; break;
            case 4: positions = [5,6,7,8,12]; break;
            case 5: positions = [6,7,9,13]; break;
            case 6: positions = [7,10,14]; break;
            case 7: positions = [11,15]; break;
            case 8: positions = [9,10,11,12]; break;
            case 9: positions = [10,11,13]; break;
            case 10: positions = [11,14]; break;
            case 11: positions = [15]; break;
            case 12: positions = [13,14,15]; break;
            case 13: positions = [14,15]; break;
            case 14: positions = [15]; break;
            default: break;
        }
       
        do{
            valid = false;
            let color = colors[Math.floor(Math.random() * colors.length)];
            if(color == r && !redPositions.includes(i)) {
                sudoku += 'r';
                redPositions += positions;
            } else if(color == 'y' && !yellowPositions.includes(i)) {
                sudoku += 'y';
                yellowPositions += positions;
            } else if(color == 'g' && !greenPositions.includes(i)) {
                sudoku += 'g';
                greenPositions += positions;
            } else if(color == 'b' && !greenPositions.includes(i)) {
                sudoku += 'b';
                greenPositions += positions;
            } else if ((color == r && redPositions.includes(i)) ||
            (color == g && greenPositions.includes(i)) ||
            (color == y && yellowPositions.includes(i)) ||
            (color == b && bluePositions.includes(i))) {
                valid = true;
            }
        }while(valid);
    }

    for (let i = 0; i < size; ++i) {
        state[i] = [];
        for (let j = 0; j < size; ++j) {
            state[i][j] = {                    
                isColored: true
          };
        }
    }



    for (let i = 0; i < size; ++i) {
        let rx;
        let ry;
        do {
          rx = Math.trunc(Math.random() * size);
          ry = Math.trunc(Math.random() * size);
        } while (state[ry][rx].isColored);
        state[ry][rx].isColored = false;
    }

    for (let i = 0; i < emptyPosition; ++i) {
        let rx;
        let ry;
        do {
          rx = Math.trunc(Math.random() * size);
          ry = Math.trunc(Math.random() * size);
        } while (state[ry][rx].isColored);
        state[ry][rx].isColored = false;
    }
    render(state);

}
$('input[type=button]').addEventListener('click', init);