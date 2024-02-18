document.addEventListener("DOMContentLoaded", function () {
  const wsUrl = "ws://192.168.1.177/ws"; 
  const ws = new WebSocket(wsUrl);
  const counterDisplay = document.getElementById("counter");
  const controlBtn = document.getElementById("controlBtn");

  let ledState = false;
  ws.onopen = function () {
    console.log("WebSocket connection opened");
  };

  ws.onerror = function (error) {
    console.log("WebSocket Error: " + error);
  };

  ws.onmessage = function (e) {
    console.log("Received: " + e.data);
    counterDisplay.innerText = e.data; //update the counter display
  };

  controlBtn.addEventListener("click", function () {
    ledState = !ledState; // switch the LED state
    ws.send(ledState.toString()); 
    console.log("Sent command: " + ledState);

    // update the button text
    controlBtn.innerText = ledState ? "Turn Off" : "Turn On";
  });
});
