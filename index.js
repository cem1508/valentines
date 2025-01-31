const phrases = [
  "Nein?!?",
  "Bist du dir sicher?",
  "Sicher sicher?",
  "Bitteeee",
  "Tu mir das nicht an :(",
  "Du brichst mir das Herz </3",
];

let noCount = 0;
let speed = 1000;
let moveInterval;

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
  }).catch(error => console.error("error", error));

  if(response == 'Ayo' && moveInterval){
    clearInterval(moveInterval);
  }
}