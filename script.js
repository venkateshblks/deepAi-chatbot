function promptForApiKey() {
  let apiKey = prompt("Please enter your DeepAI API key. It will be stored locally and safely.");
  if (apiKey) {
    sessionStorage.setItem("deepAiApiKey", apiKey);
    console.info("API Key stored successfully.");
  } else {
    console.warn("API Key is required for proper functionality.");
  }
}


function appendMessage(type, message, chatArea) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", type);
  messageDiv.textContent = message;
  chatArea.appendChild(messageDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function runinp(textgen, apiKey, appendMessageCallback, chatArea) {
  const url = "https://api.deepai.org/api/text-generator";
  const formData = new FormData();
  formData.append("text", textgen);

  fetch(url, {
    method: "POST",
    headers: {
      "api-key": apiKey,
    },
    body: formData,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    return response.json();
  })
  .then(data => appendMessageCallback("out", "🤖" + data.output, chatArea))
  .catch(error => appendMessageCallback("out", "🤖" + error, chatArea));
}

// DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", function () {
  promptForApiKey();
  const inp = document.querySelector("#inp");
  const btn = document.getElementById("btn");
  const chata = document.querySelector(".chat");

  inp.addEventListener("input", function autor() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
    if (this.scrollHeight > 150) {
      this.style.overflow = "scroll";
    }
  }, false);

  btn.addEventListener("click", function () {
    show();
  });

  inp.addEventListener("keyup", function (e) {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      show();
    }
  });

  function show() {
  const inval = inp.value;
  if (inval.trim() === "") return;

  appendMessage("int", inval + "🧑", chata);

  // let apiKey = sessionStorage.getItem("deepAiApiKey");
  let apiKey=process.env.ApiK
  if (!apiKey) {
    apiKey = window.prompt("API Key is missing. Please enter your DeepAI API key.");
    if (apiKey) {
      sessionStorage.setItem("deepAiApiKey", apiKey);
    } else {
      alert("API Key is required for functionality.");
      return;
    }
  }

  runinp(inval, apiKey, appendMessage, chata);
  inp.value = "";
  }
});
