
const AI_API_URL = "https://api.openai.com/v1/completions";
const API_KEY = "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"; 


const showLoading = (isVisible) => {
  document.getElementById("loadingIndicator").hidden = !isVisible;
};


document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
    alert(`Welcome back, ${username}!`);
  } else {
    alert("Please fill in all fields.");
  }
});


document.getElementById("getDiagnosis").addEventListener("click", async () => {
  const symptoms = document.getElementById("symptoms").value;
  const resultDiv = document.getElementById("diagnosisResult");
  const feedbackSection = document.getElementById("feedbackSection");

  if (!symptoms) {
    alert("Please describe your symptoms.");
    return;
  }

  showLoading(true);
  resultDiv.textContent = "";
  feedbackSection.hidden = true;

  try {
    const response = await fetch(AI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Patient symptoms: ${symptoms}. Provide a possible diagnosis.`,
        max_tokens: 150,
      }),
    });

    const data = await response.json();
    const diagnosis = data.choices[0].text.trim();
    resultDiv.textContent = diagnosis;

    feedbackSection.hidden = false;

    
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(diagnosis);
    synth.speak(utterThis);
  } catch (error) {
    resultDiv.textContent = "Error fetching diagnosis. Please try again.";
  } finally {
    showLoading(false);
  }
});


document.getElementById("startVoiceInput").addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    document.getElementById("symptoms").value = event.results[0][0].transcript;
  };

  recognition.onerror = () => {
    alert("Voice recognition failed. Try again.");
  };

  recognition.start();
});


document.getElementById("feedbackYes").addEventListener("click", () => {
  alert("Thank you for your feedback!");
  document.getElementById("feedbackSection").hidden = true;
});

document.getElementById("feedbackNo").addEventListener("click", () => {
  alert("Thank you! We'll work to improve.");
  document.getElementById("feedbackSection").hidden = true;
});


setInterval(() => {
  const stepsToday = Math.floor(Math.random() * 10000 + 5000);
  const heartRate = Math.floor(Math.random() * 20 + 60);

  document.getElementById("stepsToday").textContent = `${stepsToday} steps`;
  document.getElementById("heartRate").textContent = `${heartRate} bpm`;
}, 5000);


