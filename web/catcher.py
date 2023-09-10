import requests
import serial

# Attempt to create serial connection
ser = None
while (not ser):
  try:
    ser = serial.Serial("COM6", 9600)
  except serial.SerialException:
      print("denied")
      break
if (ser):
  prevContent = None
  print("accessing")
  # constantly monitor for presses
  while True:
    ser.flush()
    content = ser.readline().decode('utf-8').strip()
    content = int(content)
    print(f"sending: ${content}")
    # Send new input
    requests.get(url = "http://127.0.0.1:8000/api/decrement", params = {'id':content})
    