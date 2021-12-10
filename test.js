const description =
    'Creating a sunflower seeds arrangement from dots placed along a logarithmic spiral that is centered at the origin and follows the golden ratio.';

// Create a canvas and get its context
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Append the canvas to the body
document.body.appendChild(canvas);

// Set up the canvas dimensions
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

ctx.fillStyle = 'red';

// Set up the canvas line width
ctx.lineWidth = 1;

// function that draws a dot
function drawDot(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

// function that draws a line
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

// set up required variables
const phi = (Math.sqrt(5) - 1) / 2;
let angle = 0;
let maxBends = 500;
let numberOfBends = 0;
let clusterScale = 1;

// create a function that draws a logarithmic spiral of a given radius that bends by the golden ratio maxBends times
function drawLogarithmicSpiral(x, y, r) {
    if (numberOfBends < maxBends * 0.9) {
        // Only draw 90% of the dots to avoid size scaling issues
        // draw a dot at the starting point
        drawDot(x, y, maxBends / Math.sqrt(maxBends - numberOfBends) / 7);

        // theta = angle in radians
        const theta = toRadians(angle);

        // find the next point on the spiral
        const nextX = x + (r / maxBends - numberOfBends) * Math.cos(theta);
        const nextY = y + (r / maxBends - numberOfBends) * Math.sin(theta);

        // Enable these two lines to see the path taken to draw the dots
        // draw a line from the current point to the next point
        //ctx.strokeStyle = 'green';
        //drawLine(x, y, nextX, nextY);

        // increment the angle
        angle += phi * 360;

        // increment the number of bends
        numberOfBends++;

        drawLogarithmicSpiral(nextX, nextY, r);
        //setTimeout(() => {drawLogarithmicSpiral(nextX, nextY, r)}, 100);
    }
}

// function converts degrees to radians
function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

// draw the logarithmic spiral
drawLogarithmicSpiral(width / 2, height / 2, clusterScale);

// create a slider input element to set the maxBends
const sliderInput = document.createElement('input');
sliderInput.type = 'range';
sliderInput.min = 50;
sliderInput.max = 1000;
sliderInput.value = maxBends;
sliderInput.step = 10;
sliderInput.addEventListener('input', () => {
    maxBends = sliderInput.value;
    clearCanvas();
    resetVariables();
    drawLogarithmicSpiral(width / 2, height / 2, clusterScale);
    sliderTitle.innerText = `Max seeds: ${maxBends}`;
});

// create a title for the slider input element
const sliderTitle = document.createElement('p');
sliderTitle.innerText = `Max seeds: ${maxBends}`;

// add the input element to the body and position it in the top right corner
document.body.appendChild(sliderInput);
sliderInput.style.position = 'absolute';
sliderInput.style.top = '20px';
sliderInput.style.right = '20px';

// add the title below the slider input element
document.body.appendChild(sliderTitle);
sliderTitle.style.position = 'absolute';
sliderTitle.style.top = '40px';
sliderTitle.style.right = '40px';

// function to reset the variables
function resetVariables() {
    ctx.fillStyle = 'red';
    angle = 0;
    numberOfBends = 0;
}

// function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}

// resize event listener
window.addEventListener('resize', () => {
    width = (canvas.width = window.innerWidth);
    height = (canvas.height = window.innerHeight);
    clearCanvas();
    resetVariables();
    drawLogarithmicSpiral(width / 2, height / 2, clusterScale);
});