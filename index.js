const phrases = [
  "no?!?",
  "are you sure?",
  "sure sure?",
  "pleaseeee",
  "don't do this to me :(",
  "mah heart mah soul </3",
];

let noCount = 0;
let speed = 1000;
let moveInterval;

//const noButton = document.getElementById('noButton');
//noButton.style.position = 'absolute';

function handleNoClick(){
  const noButton = document.getElementById('noButton');
  const responseMessage = document.getElementById('responseMessage');

  noButton.textContent = phrases[Math.min(noCount, phrases.length - 1)];



  // const buttonWidth = noButton.offsetWidth;
  // const buttonHeight = noButton.offsetHeight;

  // const maxX = window.innerWidth - buttonWidth;
  // const maxY = window.innerHeight - buttonHeight;

  // const randomX = Math.random() * maxX;
  // const randomY = Math.random() * maxY;

  // noButton.style.position = 'absolute';
  // noButton.style.left = randomX + 'px';
  // noButton.style.top = randomY + "px";


  // responseMessage.textContent = phrases[Math.min(noCount, phrases.length - 1)];
  
  sendAnswer("Nein");

  noCount++;

  speed = Math.max(100, speed - 100); //mindest geschwindigkeit 100ms

 

  startMovingButton();

  if(noCount >= phrase.length){
    noCount = 0;
  }

}

function startMovingButton(){
  const noButton = document.getElementById('noButton');

   // sanfte Animation
   noButton.style.transition = `left ${speed / 1000}s ease-in-out, top ${speed / 1000}s ease-in-out`;

  // vorheriges Intervall stoppen
  if(moveInterval){
    clearInterval(moveInterval);
  }

  // neues Intervall starten
  moveInterval = setInterval(() => {
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    

    noButton.style.position = 'absolute';
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + "px";
  }, speed);

}


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
      document.getElementById("responseMessage").innerText = "";
  }).catch(error => console.error("Fehler beim Senden:", error));

  // Confetti-Animation auslösen, wenn "Ayo!" geklickt wird
  if (response === 'Ayo') {
    confetti({
      particleCount: 500, // Viel mehr Partikel
      spread: 120, // Größere Streuung
      origin: { y: 0.6 },
      colors: ['#ff3b30', '#007aff', '#34c759', '#ffcc00', '#5856d6', '#af52de', '#ff2d55'], // Mehr Farben
      shapes: ['circle', 'square'], // Beide Formen
      gravity: 0.4, // Langsamere Partikel
      ticks: 300 // Längere Lebensdauer
    });

    // Pause einbauen und letzte Seite anzeigen
    setTimeout(() => {
      // Hauptseite ausblenden
      document.querySelector('.container').style.display = 'none';

      // Letzte Seite einblenden
      document.getElementById('finalPage').style.display = 'block';

       // Karte einblenden
       document.getElementById('mapContainer').style.display = 'block';
    }, 3000); // 3 Sekunden Pause
  }

  // Bewegung stoppen, wenn "Ayo!" geklickt wird
  if (response === 'Ayo' && moveInterval) {
    clearInterval(moveInterval);
  }
}