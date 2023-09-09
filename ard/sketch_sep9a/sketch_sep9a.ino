const int buttonPin = 6; 
const int ledPin = 4;
int buttonState = 0;
int BOX_ID = 1;
String idString = String(BOX_ID);
boolean pressed = false;
String received;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  delay(10);
  buttonState = digitalRead(buttonPin);
  if ((not pressed) and buttonState == HIGH){
    pressed = true;
    Serial.println(idString);
  }
  else if (buttonState == LOW) {
    pressed = false;
  }
}