#import tensorflow as tf
from tensorflow.keras.models import load_model


import cv2
import numpy as np
import sys

IMG_SHAPE = 50

model = load_model('e:\\Keras\\plantdisease.h5')
img_pre = cv2.imread(sys.argv[1],cv2.IMREAD_UNCHANGED)
img_pre = cv2.resize(img_pre,(IMG_SHAPE,IMG_SHAPE))
result = model.predict_classes(np.reshape(img_pre,(-1,IMG_SHAPE,IMG_SHAPE,3)))
#print(result)
if result[0] == 1:
    print('Disease')
    sys.stdout.flush()
else:
    print('Healthy')
    sys.stdout.flush()
