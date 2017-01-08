import sys, urllib, urllib2
import cv2 as cv
import numpy as np
from matplotlib import pyplot as plt

url = 'http://www.ocodr.com'
#filename = urllib2.urlopen(url).read()

filename = sys.argv[1]
img = cv.imread(filename)

rows,cols,_ = img.shape
while rows > 1600 or cols > 1600:
    img = cv.resize(img, (0,0), fx=0.5, fy=0.5)
    rows,cols,_ = img.shape

img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
img = cv.fastNlMeansDenoising(img, None, 10, 7, 21)
thresh = cv.adaptiveThreshold(img, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C,\
                                cv.THRESH_BINARY, 11, 2)

xvals = []
yvals = []

for i in range(rows):
    for j in range(cols):
        if thresh[i][j] == 0:
            xvals.append(i)
            yvals.append(j)

cv.imshow('thresh_image', thresh)

cv.waitKey(0)
cv.destroyAllWindows()

print len(xvals)
print len(yvals)

