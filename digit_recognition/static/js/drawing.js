let canvas = document.getElementById('drawing_canvas');
let ctx = canvas.getContext('2d');

let canvas_btn = document.getElementById('canvas_btn');
canvas_btn.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let prediction_result = document.getElementById('prediction_result');
    prediction_result.innerText = `Prediction: - | Accuracy: -`;

    for (let i = 0; i < 10; i++) {
        let digit = document.getElementById(`prediction_progress_${i}`);
        digit.style.width = `100%`;
        digit.style.opacity = 1;

        let digit_text = document.getElementById(`prediction_text_${i}`);
        digit_text.innerText = `100%`;

    }
});

let isDrawing = false;

canvas.addEventListener('mousedown', function(e) {
    isDrawing = true;
    draw(e);
});

canvas.addEventListener('mousemove', function(e) {
    if (isDrawing) {
        draw(e);
    }
});

canvas.addEventListener('mouseup', function() {
    isDrawing = false;
    processImage();
});

canvas.addEventListener('mouseleave', function() {
    isDrawing = false;
});

function draw(e) {
    let x = e.offsetX;
    let y = e.offsetY;


    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.fill();
}

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();


function getCookie(name) {
	const cookieValue = document.cookie.match(
		"(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
	);
	return cookieValue ? cookieValue.pop() : "";
}

function processImage() {
    let img = canvas.toDataURL('image/png'); 
    let data = {image: img};

    fetch('/predict/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        processPrediction(data.results);
    });
}

function processPrediction(prediction) {
    let max = Math.max(...prediction);
    let digit = prediction.indexOf(max);
    let accuracy = max * 100;
    accuracy = accuracy.toFixed(2);


    let prediction_result = document.getElementById('prediction_result');
    prediction_result.innerText = `Prediction: ${digit} | Accuracy: ${accuracy}%`;

    for (let i = 0; i < 10; i++) {
        let digit = document.getElementById(`prediction_progress_${i}`);
        digit.style.width = `${prediction[i] * 100}%`;
        digit.style.animation = '';
        digit.style.animation = 'progress_animation 1s';
        digit.style.opacity = 1;

        let digit_text = document.getElementById(`prediction_text_${i}`);
        let digit_value = Math.round(prediction[i] * 100);
        if (digit_value < 1) 
        {
            digit.style.opacity = 0;
            digit_text.innerText = 0;
        }
        digit_text.innerText = `${digit_value}%`;

    }
    
}