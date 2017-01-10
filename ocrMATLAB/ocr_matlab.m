% https://www.mathworks.com/help/vision/ref/ocr.html
I = imread('businessCard.jpg');
results = ocr(I);
display(results.Text)