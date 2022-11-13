const draggable = document.querySelector('.draggable');
const image = document.querySelector('.image');
const imageWidth = parseFloat(getComputedStyle(image).getPropertyValue('width').slice(0,-2));

const mouseInitial = {};
let imageLeftInitial = 0;
let move = false;

draggable.addEventListener('mousedown', function(e){
    move = true;
    mouseInitial.x = e.clientX;
    imageLeftInitial = parseFloat(getComputedStyle(image).getPropertyValue('--left')); 
});

image.addEventListener('mouseup', () => move = false);

image.addEventListener('mousemove', function(e){
    if(!move) return;
    const xDiffInPercent = (e.clientX - mouseInitial.x) / imageWidth * 100;
    image.style.setProperty('--left', imageLeftInitial + xDiffInPercent);
});


