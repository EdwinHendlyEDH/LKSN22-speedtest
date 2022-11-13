const scope = document.querySelector('.scope');

const scopeInitial = {}
const mouseInitial = {}
let move = false;

function getCustomProperty(el, prop){
    return parseFloat(getComputedStyle(el).getPropertyValue(prop));
}

function setCustomProperty(el, prop, val){
    el.style.setProperty(prop, val);
}

scope.addEventListener('mousedown', function(e){
    scopeInitial.x = getCustomProperty(scope, '--left');
    scopeInitial.y = getCustomProperty(scope, '--top');
    mouseInitial.x = e.clientX;
    mouseInitial.y = e.clientY;
    move = true;
});

window.addEventListener('mouseup', () => move = false)

window.addEventListener('mousemove', function(e){
    if(!move) return;
    const xDiff = e.clientX - mouseInitial.x;
    const yDiff = e.clientY - mouseInitial.y;

    setCustomProperty(scope, '--left', scopeInitial.x + xDiff);
    setCustomProperty(scope, '--top', scopeInitial.y + yDiff);
});