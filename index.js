function sendAnswer(response) {
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc9tiirRo24zYht6AkdelUlaptRoOI0sqZnHGUvUrXFt7Yf8g/formResponse";
  const entryID = "entry.555147384"; // Ersetze mit der korrekten Feld-ID

  // Formulardaten erstellen
  const formData = new FormData();
  formData.append(entryID, response);

  // Daten an Google Form senden
  fetch(formUrl, {
      method: "POST",
      mode: "no-cors",
      body: formData
  }).then(() => {
      document.getElementById("responseMessage").innerText = "Antwort gesendet: " + response;
  }).catch(error => console.error("Fehler beim Senden:", error));
}
