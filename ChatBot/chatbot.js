const inputGiven = document.querySelector(".chat-input textarea");
const sendBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

const API_KEY = "sk-proj-BVeXmzO6XGHeU93DHDyhT3BlbkFJpseYH3tmrsdMLxT5Ktpm";

 let userInput;
const generateResponse = () => {
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const requestOptions = {
       method : "POST",
       headers:{
           "Content-Type": "application/json",
           "Authorization": `Bearer${API_KEY}`
        },
        body: JSON.stringify({
           model: "gpt-3.5-turbo",
           messages: [{role:"user",content: userInput }]
        })
  }
  fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
 console.log(data);
}).catch((error) => {
    console.log(error);
})
}

const createChatGiven = (message, className) => {
    const chatIn = document.createElement("Li");
    chatIn.classList.add("chat", className);
    let content = className === "outgiving" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatIn.innerHTML = content;
    return chatIn;
}
const handleChat = () => {
     userInput = inputGiven.value.trim();
    if(!userInput)
        return;
    chatbox.appendChild(createChatGiven(userInput,"outgiving"));

    setTimeout(()=>
    {
          chatbox.appendChild(createChatGiven("Responding...","intake"));
          generateResponse();
    },600);
}
sendBtn.addEventListener("click", handleChat);