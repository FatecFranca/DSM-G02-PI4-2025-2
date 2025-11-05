#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

#define DHTPIN 26
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

#define IRPIN 27   // Pino do sensor IR5
#define IR1PIN 25  // Pino do sensor UR1
#define IR2PIN 33  // Pino do sensor IR2
#define IR3PIN 35  // Pino do sensor IR3
#define IR4PIN 32  // Pino do sensor IR4

// Wi-Fi
const char* ssid = "Marcelo";
const char* password = "15409850";

// Endpoints
const char* serverUrlDHT = "https://api.smartparking.fun/parking-sensor-data";
const char* serverUrlIR = "https://api.smartparking.fun/sensors-data";

// IDs
const char* sensorHumidadeId = "35f8a6c9-5b98-4f1b-a690-578dc727bbd4";
const char* sensorTemperaturaId = "8be4719e-3daa-417a-940c-425692793f04";
const char* sensorIR5Id = "2048e4a7-b901-4647-9a2c-94698a02d37e";
const char* sensorUR1Id = "3ecf58fc-aa79-4855-86ee-41f12db629d7";
const char* sensorIR2Id = "488090b1-0ba6-4a1b-a9d6-feae82e48b52";
const char* sensorIR3Id = "9f8ef887-840d-42a4-913b-3c68a65c0f34";
const char* sensorIR4Id = "00f3141b-9c29-4b16-ad43-579a0eb7709a";

unsigned long lastSendDHT = 0;
const unsigned long sendIntervalDHT = 3000; // 3 segundos para teste

unsigned long lastSendIR5 = 0;
const unsigned long sendIntervalIR5 = 3000;

unsigned long lastSendUR1 = 0;
const unsigned long sendIntervalUR1 = 3000;

unsigned long lastSendIR2 = 0;
const unsigned long sendIntervalIR2 = 3000;

unsigned long lastSendIR3 = 0;
const unsigned long sendIntervalIR3 = 3000;

unsigned long lastSendIR4 = 0;
const unsigned long sendIntervalIR4 = 3000;

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(IRPIN, INPUT);
  pinMode(IR1PIN, INPUT);
  pinMode(IR2PIN, INPUT);
  pinMode(IR3PIN, INPUT);
  pinMode(IR4PIN, INPUT);

  Serial.println("Conectando ao Wi-Fi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ Wi-Fi conectado!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  unsigned long currentMillis = millis();

  // ---- Sensor IR5 ----
  if (currentMillis - lastSendIR5 >= sendIntervalIR5) {
    int irValue = digitalRead(IRPIN);
    String irData = (irValue == 0) ? "PRESENT" : "FREE";

    Serial.print("IR5: ");
    Serial.println(irData);

    sendIRData(sensorIR5Id, irData);
    lastSendIR5 = currentMillis;
  }

  // ---- Sensor UR1 ----
  if (currentMillis - lastSendUR1 >= sendIntervalUR1) {
    int ur1Value = digitalRead(IR1PIN);
    String ur1Data = (ur1Value == 0) ? "PRESENT" : "FREE";

    Serial.print("UR1: ");
    Serial.println(ur1Data);

    sendIRData(sensorUR1Id, ur1Data);
    lastSendUR1 = currentMillis;
  }

  // ---- Sensor IR2 ----
  if (currentMillis - lastSendIR2 >= sendIntervalIR2) {
    int ir2Value = digitalRead(IR2PIN);
    String ir2Data = (ir2Value == 0) ? "PRESENT" : "FREE";

    Serial.print("IR2: ");
    Serial.println(ir2Data);

    sendIRData(sensorIR2Id, ir2Data);
    lastSendIR2 = currentMillis;
  }

  // ---- Sensor IR3 ----
  if (currentMillis - lastSendIR3 >= sendIntervalIR3) {
    int ir3Value = digitalRead(IR3PIN);
    String ir3Data = (ir3Value == 0) ? "PRESENT" : "FREE";

    Serial.print("IR3: ");
    Serial.println(ir3Data);

    sendIRData(sensorIR3Id, ir3Data);
    lastSendIR3 = currentMillis;
  }

  // ---- Sensor IR4 ----
  if (currentMillis - lastSendIR4 >= sendIntervalIR4) {
    int ir4Value = digitalRead(IR4PIN);
    String ir4Data = (ir4Value == 0) ? "PRESENT" : "FREE";

    Serial.print("IR4: ");
    Serial.println(ir4Data);

    sendIRData(sensorIR4Id, ir4Data);
    lastSendIR4 = currentMillis;
  }

  // ---- DHT11 ----
  if (currentMillis - lastSendDHT >= sendIntervalDHT) {
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();

    if (isnan(humidity) || isnan(temperature)) {
      Serial.println("❌ Falha ao ler o DHT!");
    } else {
      Serial.println("📡 Enviando dados DHT para o servidor...");
      sendData(sensorHumidadeId, humidity, serverUrlDHT);
      sendData(sensorTemperaturaId, temperature, serverUrlDHT);
      Serial.print("🌡️ Temperatura: ");
      Serial.print(temperature);
      Serial.print(" °C  |  💧 Umidade: ");
      Serial.print(humidity);
      Serial.println(" %");
    }

    lastSendDHT = currentMillis;
  }
}

void sendData(const char* sensorId, float value, const char* url) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    String json = "{\"parkingSensorId\":\"" + String(sensorId) + "\",\"data\":\"" + String(value, 2) + "\"}";

    int httpResponseCode = http.POST(json);

    if (httpResponseCode > 0) {
      Serial.print("✅ Enviado com sucesso (");
      Serial.print(httpResponseCode);
      Serial.println(")");
    } else {
      Serial.print("⚠️ Erro ao enviar: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("🚫 Wi-Fi desconectado, tentando reconectar...");
    WiFi.reconnect();
  }
}

void sendIRData(const char* sensorId, String value) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrlIR);
    http.addHeader("Content-Type", "application/json");

    String json = "{\"sensorId\":\"" + String(sensorId) + "\",\"data\":\"" + value + "\",\"isActive\":true}";

    int httpResponseCode = http.POST(json);

    if (httpResponseCode > 0) {
      Serial.print("✅ IR enviado com sucesso (");
      Serial.print(httpResponseCode);
      Serial.println(")");
    } else {
      Serial.print("⚠️ Erro ao enviar IR: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("🚫 Wi-Fi desconectado, tentando reconectar...");
    WiFi.reconnect();
  }
}
