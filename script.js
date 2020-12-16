let btnClear = document.querySelector('.clear');
let container = document.querySelector('#container');
let slider = document.querySelector('.slider');
let colorButtons = document.querySelectorAll('.color-choice');
let userColorPicker = document.querySelector('#input-color');
let color = 'black';
let check = () => console.log(this.style.backgroundColor)

function createGrid(gridSize){
    let gridArea = gridSize * gridSize;
    for (let i = 0; i < gridArea ; i++){
        newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'gridDivs');
        container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
        container.insertAdjacentElement('beforeend', newDiv);
        
    }
    let pixels = document.querySelectorAll('.gridDivs');
    pixels.forEach(pixel => pixel.addEventListener('mouseover', colorGrid))
}

function pixelSize(){
    let pixels = document.querySelectorAll('.gridDivs');
    pixels.forEach(pixel => pixel.remove());
    createGrid(slider.value);
}

function colorGrid() {
    switch (color) {
        case 'rainbow':
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.classList.remove('gray');
            break;  
        case 'gray':
            if (this.style.backgroundColor.match(/rgba/)) {
                let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                if (currentOpacity <= 0.9) {
                    this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                    this.classList.add('gray');
                }
            } else if (this.classList == 'gray' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
                return;
            } else {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
            }
            break;
        case 'black':
            this.style.backgroundColor = '#000000';
            this.classList.remove('gray');
            break;
        default:
            this.style.backgroundColor = color;
            this.classList.remove('gray');
            break;
    } 
}
function changeColor(event) {
    switch (event.target.dataset.color) { 
        case 'rainbow':
            color = 'rainbow';
            break;  
        case 'gray':
            color = 'gray';
            break;
        default:
            color = 'black';
            break;
    } 
}
function userColorSelection(event) {
    color = event.target.value;
}
function clearColor(){
    let pixels = document.querySelectorAll('.gridDivs');
    pixels.forEach(pixel => pixel.style.backgroundColor = "#ffffff")
}
// starts webpage with grid
createGrid(10);


btnClear.addEventListener('click', clearColor)
slider.addEventListener('mouseup', pixelSize);
colorButtons.forEach(colorButton => colorButton.addEventListener('click', changeColor));
userColorPicker.addEventListener('change', userColorSelection, false);
userColorPicker.addEventListener('input', userColorSelection, false);

