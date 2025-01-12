document.getElementById("translate-button").addEventListener("click", async () => {
    const sourceLanguage = document.getElementById("source-language").value;
    const targetLanguage = document.getElementById("target-language").value;
    const inputText = document.getElementById("input-text").value.trim();
  
    if (!inputText) {
      alert("Please enter some text to translate.");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/translate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          src_lang: sourceLanguage,
          tgt_lang: targetLanguage,
          text: inputText,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch translation. Please try again.");
      }
  
      const data = await response.json();
      document.getElementById("output-container").classList.remove("hidden");
      document.getElementById("translated-text").innerText = data.translated_text;
    } catch (error) {
      alert(error.message);
    }
  });
  