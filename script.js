document.addEventListener("DOMContentLoaded", function () {
  const inp = document.querySelector("#inp");
  const inj = document.getElementById("inp");

  inp.addEventListener("input", autor, false);
  function autor() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
    if (this.scrollHeight > 150) {
      //venkateshblks

      this.style.overflow = "scroll";
    }
  }
  const int = document.getElementById("int");
  const ou = document.getElementById("out");
  const b = document.getElementById("btn");
  const chata = document.querySelector(".chat");

  b.addEventListener("click", function () {
    show();
  });

  inp.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      show();
    }
  });
  function show() {
    const inval = inp.value;

    if (inval.trim() === "") return;
    console.log(inval);
    appendMessage("int", inval + "🧑");
    runinp(inval);
    // appendMessage("out","🤖"+inval);

    inp.value = "";
  }
  function appendMessage(type, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", type);
    messageDiv.textContent = message;
    chata.appendChild(messageDiv);
    chata.scrollTop = chata.scrollHeight;
  }

  function runinp(textgen) {
    //venkateshblks
    const url = "https://api.deepai.org/api/text-generator"; // API endpoint
    const apiKey = "Your DeepAI API key"; // Replace with your actual API key

    const formData = new FormData();
    formData.append("text", textgen);

    fetch(url, {
      method: "POST",
      headers: {
        "api-key": apiKey,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }

        return response.json();
      })
      .then((data) => {
        appendMessage("out", "🤖" + data.output);
        console.log(data.output);
        // // Written by venkateshblks
      })

      .catch((error) => {
        appendMessage("out", "🤖" + error);
        console.error("API request error:", error);
      });
  }
});
