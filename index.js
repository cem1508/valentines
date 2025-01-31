function answer(response) {
    document.getElementById("responseMessage").innerText =
      "Du hast geantwortet: " + response;
  
    // Google Formular URL + korrekte Feld-ID
    fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSckJhPA7GEw4R0E6ZhKs46g7STafkQW87yJ3AMY9UHnxeczZg/formResponse",
      {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `entry.1490941661=${encodeURIComponent(response)}`,
      }
    ).then(() => console.log("Antwort gesendet:", response));
  }
  