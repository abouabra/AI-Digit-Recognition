# AI Digit Recognition
![Demonstration]("https://github.com/abouabra/AI-Digit-Recognition/blob/main/assets/demonstration.gif")

## Description

This project is a simple digit recognition application that uses a Convolutional Neural Network (CNN) to classify handwritten digits. The CNN was trained on the MNIST dataset, which contains 60,000 training images plus i added 40,000 images from translated and rotated images to improve the accuracy of the model. The model was trained using pytorch.
The training process was done on Google Colab. The model was then saved and loaded into a Django web application that allows users to draw a digit on a canvas and get the model's prediction.

## Installation

To run this project, you will need to have Python installed on your machine. You can download Python from the official website [here](https://www.python.org/downloads/).

1. Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/abouabra/AI-Digit-Recognition.git
```
2. Navigate to the project directory:

```bash
cd AI-Digit-Recognition
```

3. Create a virtual environment:

```bash
python -m venv venv
```

5. Activate the virtual environment:

```bash
source venv/bin/activate
```

6. Install the required packages:

```bash
pip install -r requirements.txt
```

7. Run the Django server:

```bash
python manage.py runserver
```

this will run the server on http://127.0.0.1:8000/ you can access the application by visiting this URL in your browser. 


## Final Note

If you have any suggestions or feedback, please feel free to open an issue or submit a pull request.
