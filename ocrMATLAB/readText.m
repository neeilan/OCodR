function [ readText ] = readText( imageFile )
%OCR function
%   Reads in an image, and returns the observed text in it.
I = imread(imageFile);
x = ocr(I);
readText = x.Text;
display(readText);
end

