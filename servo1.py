import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)

GPIO.setup(18, GPIO.OUT)

servo = GPIO.PWM(18, 50)

servo.start(0)
print("Waiting for 1 sec")
time.sleep(1)

print("Rotating at intervals of 12 degrees")
duty = 2
while duty <= 8:
	servo.ChangeDutyCycle(duty)
	time.sleep(0.05)
	duty = duty + 1

print("Turning back to 0 degrees")
time.sleep(2)
servo.ChangeDutyCycle(2)
time.sleep(2)
servo.ChangeDutyCycle(0)

servo.stop()
GPIO.cleanup()
print("Everything's cleaned up!");
