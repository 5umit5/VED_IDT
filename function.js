const showLoading = (isVisible) => {
  const loadingIndicator = document.getElementById("loadingIndicator");
  if (isVisible) {
    loadingIndicator.hidden = false;
  } else {
    loadingIndicator.hidden = true;
  }
};

const showDiagnosisResult = (diagnosis) => {
  const resultDiv = document.getElementById("diagnosisResult");
  resultDiv.innerHTML = `
    <h3>Diagnosis Result:</h3>
    <p>${diagnosis}</p>
  `;
  document.getElementById("feedbackSection").hidden = false;
};

const showError = () => {
  const resultDiv = document.getElementById("diagnosisResult");
  resultDiv.innerHTML = `
    <p>We encountered an issue while processing your symptoms. Please try again.</p>
  `;
  document.getElementById("feedbackSection").hidden = true;
};


const diagnose = (symptoms) => {
  if (symptoms.includes("fever") && symptoms.includes("cough") && symptoms.includes("fatigue")) {
    return "You may have the flu. Please consult with a healthcare provider for a proper diagnosis.";
  }

  if (symptoms.includes("headache") && symptoms.includes("nausea") && symptoms.includes("sensitivity to light")) {
    return "You may be experiencing a migraine. It's recommended to rest in a dark room and hydrate.";
  }

  if (symptoms.includes("chest pain") && symptoms.includes("shortness of breath")) {
    return "This could be a sign of a heart condition. Please seek emergency medical help immediately.";
  }

  if (symptoms.includes("sore throat") && symptoms.includes("runny nose") && symptoms.includes("cough")) {
    return "You may have a cold. Drink plenty of fluids and get rest.";
  }

  if (symptoms.includes("stomach pain") && symptoms.includes("vomiting") && symptoms.includes("diarrhea")) {
    return "You could have food poisoning or a stomach virus. Stay hydrated and rest.";
  }
  if (symptoms.includes("fever") && symptoms.includes("cough") && symptoms.includes("fatigue")) {
    return "You may have the flu. Please consult with a healthcare provider for a proper diagnosis.";
  }

  return "You may have migraine.Your Body needs rest and good diet along with plenty of water.Please consult a healthcare provider.";
};

document.getElementById("getDiagnosis").addEventListener("click", () => {
  const symptoms = document.getElementById("symptoms").value.split(",").map(symptom => symptom.trim().toLowerCase());
  const resultDiv = document.getElementById("diagnosisResult");
  const feedbackSection = document.getElementById("feedbackSection");

  if (symptoms.length === 0 || symptoms[0] === "") {
    alert("Please enter some symptoms.");
    return;
  }

  showLoading(true);
  resultDiv.textContent = "";
  feedbackSection.hidden = true;

  try {
    const diagnosis = diagnose(symptoms);
    showDiagnosisResult(diagnosis);

    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(diagnosis);
    synth.speak(utterThis);
  } catch (error) {
    showError();
  } finally {
    showLoading(false);
  }
});

document.getElementById("startVoiceInput").addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.onstart = () => {
    console.log("Voice recognition started");
    alert("Listening for symptoms...");
  };

  recognition.onend = () => {
    console.log("Voice recognition ended");
    alert("Voice recognition ended.");
  };

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
