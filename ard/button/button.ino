const int buttonPin = 6; 
const int ledPin = 4;
int buttonState = 0;
String countString;
int count = 0;
boolean pressed = false;
String received;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  buttonState = digitalRead(buttonPin);
  if ((not pressed) and buttonState == HIGH){
    pressed = true;
    count++;
  }
  else if (buttonState == LOW) {
    pressed = false;
  }
  if (Serial.available() > 0) {
    received = Serial.readString();
    if (received.equals("RQ")) {
      countString = String(count);
      Serial.println(countString);  
    }
  }
}

bool checkDigitString(String str) {
  for (int i = 0; i < str.length(); i++) {
    if (!isDigit(str.charAt(i))) return false;
  }
  return true;
}
