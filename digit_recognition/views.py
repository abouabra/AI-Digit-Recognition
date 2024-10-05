from django.shortcuts import render
from django.http import JsonResponse
import json
import logging
import base64
from PIL import Image
from digit_recognition.utils.model import evaluate

import numpy as np
import io

logger = logging.getLogger(__name__)


# Create your views here.
def index(request):
    return render(request, 'index.html')

def predict(request):
    if request.method == 'POST':
        try: 
            # Get the image from the POST request
            data = json.loads(request.body)
            image = data['image']

            image = image.split(',')[1]
            image = base64.b64decode(image)

            image = Image.open(io.BytesIO(image)).convert('L').resize((28, 28))
            image = np.array(image)
            
            results = evaluate(image)

            return JsonResponse({
                'results': results.tolist()
            })
    
        except Exception as e:
            logger.error("Error occurred: %s", e)
            return JsonResponse({
                'error': 'An error occurred while processing the image.'
            })
    
    return JsonResponse({
        'error': 'POST request required.'
    })