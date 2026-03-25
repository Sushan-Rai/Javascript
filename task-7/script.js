// take the ids
const chatBox = document.querySelector("#chatBox");
const input = document.querySelector("#messageInput");
const sendBtn = document.querySelector("#sendBtn");
// on click event of send
sendBtn.onclick = function () {
    let text = input.value;
    // if no message return
    if (text === "") return;
    // user right and type of message
    let msg = document.createElement("div");
    msg.className = "message user";
    // add the user message
    let time = new Date();
    let currentTime = time.getHours() + ":" + time.getMinutes();

    msg.innerHTML = text + "<div class='timestamp'>" + currentTime + "</div>";

    chatBox.appendChild(msg);
    input.value = "";
    // auto scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
    // adding setTimeout for random message
    setTimeout(function () {
        // list of messages
        let replies = [
            "Nice",
            "Tell me more...",
            "Interesting",
            "Okay got it!",
            "Sounds good!"
        ];
        // select one in random
        let reply = replies[Math.floor(Math.random() * replies.length)];
        // if message contains hello then reply with custom message
        if (text.toLowerCase().includes("hello")) {
            reply = "Hey there!";
        }

        let botMsg = document.createElement("div");
        botMsg.className = "message bot";

        let time2 = new Date();
        let botTime = time2.getHours() + ":" + time2.getMinutes();

        botMsg.innerHTML = reply + "<div class='timestamp'>" + botTime + "</div>";

        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;

    }, 1000 + Math.random() * 2000);
};
// if we press enter it will click the sendbtn
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});