import cv2
import numpy as np

def comparePic(image1, image2):
   # load the input images
   img1 = cv2.imread(image1) #filename 1
   img2 = cv2.imread(image2) #filename 2

   # convert the images to grayscale
   img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
   img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

   # define the function to compute MSE between two images
   def mse(img1, img2):
      h, w = img1.shape
      diff = cv2.subtract(img1, img2)
      err = np.sum(diff**2)
      mse = err/(float(h*w))
      return mse, diff

   error, diff = mse(img1, img2)
   return error