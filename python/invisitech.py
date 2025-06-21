from ultralytics import YOLO
import cv2
import numpy as np

model = YOLO("yolov8n-seg.pt")

TARGET_CLASSES = ['cell phone', 'laptop', 'remote', 'tv']

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Webcam not found.")
    exit()

print("Capturing background in 5 seconds  ..move out of frame...")
cv2.waitKey(5000)

for i in range(30):
    ret, frame = cap.read()
    if i == 0:
        background = frame.copy().astype(float)
    else:
        cv2.accumulateWeighted(frame, background, 0.1)
background = cv2.convertScaleAbs(background)

print("InvisiTech running — press Q to quit.")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame, verbose=False)[0]

    if results.masks is not None:
        for i, mask_tensor in enumerate(results.masks.data):
            cls_id = int(results.boxes.cls[i])
            cls_name = model.names[cls_id]

            if cls_name in TARGET_CLASSES:
                # Convert mask tensor to usable NumPy mask
                mask = mask_tensor.cpu().numpy()
                mask = (mask * 255).astype(np.uint8)
                mask = cv2.resize(mask, (frame.shape[1], frame.shape[0]))

        
                mask_3ch = cv2.merge([mask, mask, mask])
    
                inv_mask = cv2.bitwise_not(mask_3ch)

                bg_part = cv2.bitwise_and(background, mask_3ch)
                fg_part = cv2.bitwise_and(frame, inv_mask)

                frame = cv2.add(bg_part, fg_part)

    cv2.imshow("InvisiTech (Segmentation)", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
