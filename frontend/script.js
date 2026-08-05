/* ==========================================
            CONFIGURATION
========================================== */

const API = "https://resume-intelligence-api-3zg1.onrender.com";


/* ==========================================
            APPLICATION STATE
========================================== */

let resumeId = null;
let candidateName = "";


/* ==========================================
            DOM ELEMENTS
========================================== */

const uploadBtn = document.getElementById("uploadBtn");
const resumeFile = document.getElementById("resumeFile");
const uploadStatus = document.getElementById("uploadStatus");

const chatBox = document.getElementById("chatBox");

const questionInput = document.getElementById("question");
const sendBtn = document.getElementById("sendBtn");

const typingIndicator = document.getElementById("typingIndicator");

const actionButtons = document.querySelectorAll(".action-btn");


/* ==========================================
            EVENT LISTENERS
========================================== */

uploadBtn.addEventListener("click", uploadResume);

sendBtn.addEventListener("click", sendQuestion);


/* ==========================================
        UPLOAD RESUME
========================================== */

async function uploadResume() {

    const file = resumeFile.files[0];

    if (!file) {

        alert("Please choose a PDF file.");

        return;
    }

    uploadBtn.disabled = true;

    uploadBtn.innerHTML =
        `<i class="fa-solid fa-spinner fa-spin"></i> Uploading...`;

    uploadStatus.className = "status";

    uploadStatus.innerHTML =
        `<i class="fa-solid fa-spinner fa-spin"></i> Uploading Resume...`;

    const formData = new FormData();

    formData.append("file", file);

    try {

        const response = await fetch(`${API}/upload`, {

            method: "POST",

            body: formData

        });

        if (!response.ok) {

            throw new Error("Upload failed.");

        }

        const data = await response.json();

        resumeId = data.resume_id;

        candidateName = data.name;

        uploadStatus.className = "status success";

        uploadStatus.innerHTML =
            `✅ Resume Uploaded : <strong>${candidateName}</strong>`;

        uploadBtn.innerHTML =
            `<i class="fa-solid fa-check"></i> Uploaded`;

        questionInput.disabled = false;

        sendBtn.disabled = false;

        questionInput.focus();

        showWelcomeMessage();

    }

    catch (error) {

        uploadStatus.className = "status error";

        uploadStatus.innerHTML =
            `❌ ${error.message}`;

        uploadBtn.disabled = false;

        uploadBtn.innerHTML =
            `<i class="fa-solid fa-upload"></i> Upload Resume`;

        console.error(error);

    }

}


/* ==========================================
        SHOW READY MESSAGE
========================================== */

function showWelcomeMessage() {

    chatBox.innerHTML = `

        <div class="message bot">

            <div class="sender">

                🤖 Resume AI

            </div>

            <p>

                Resume uploaded successfully.

            </p>

            <p>

                <strong>Candidate:</strong> ${candidateName}

            </p>

            <hr>

            <p>

                Ask anything about the resume or use the quick action buttons above.

            </p>

        </div>

    `;

}
/* ==========================================
            SEND QUESTION
========================================== */

async function sendQuestion(customQuestion = null) {

    if (!resumeId) {

        alert("Please upload a resume first.");

        return;
    }

    const question = customQuestion || questionInput.value.trim();

    if (question === "") return;

    addUserMessage(question);

    questionInput.value = "";

    showTyping();

    try {

        const response = await fetch(`${API}/chat`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                resume_id: resumeId,

                question: question

            })

        });

        if (!response.ok) {

            throw new Error("Failed to get AI response.");

        }

        const data = await response.json();

        hideTyping();

        addBotMessage(data.answer);

    }

    catch (error) {

        hideTyping();

        addBotMessage(`
# ❌ Error

Something went wrong while generating the response.

Please try again.
`);

        console.error(error);

    }

}


/* ==========================================
        USER MESSAGE
========================================== */

function addUserMessage(message) {

    chatBox.innerHTML += `

    <div class="message user">

        <div class="sender">

            👤 You

        </div>

        ${message}

    </div>

    `;

    scrollChat();

}


/* ==========================================
        BOT MESSAGE
========================================== */

function addBotMessage(markdown) {

    chatBox.innerHTML += `

    <div class="message bot">

        <div class="sender">

            🤖 Resume AI

        </div>

        ${marked.parse(markdown)}

    </div>

    `;

    scrollChat();

}


/* ==========================================
        TYPING INDICATOR
========================================== */

function showTyping() {

    typingIndicator.style.display = "flex";

    scrollChat();

}

function hideTyping() {

    typingIndicator.style.display = "none";

}


/* ==========================================
        QUICK ACTION BUTTONS
========================================== */

actionButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (!resumeId) {

            alert("Upload a resume first.");

            return;

        }

        const question = button.dataset.question;

        sendQuestion(question);

    });

});


/* ==========================================
        ENTER TO SEND
========================================== */

questionInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendQuestion();

    }

});
/* ==========================================
        AUTO SCROLL
========================================== */

function scrollChat() {

    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: "smooth"
    });

}


/* ==========================================
        BUTTON LOADING STATES
========================================== */

function setUploadLoading(isLoading) {

    uploadBtn.disabled = isLoading;

    if (isLoading) {

        uploadBtn.innerHTML =
            `<i class="fa-solid fa-spinner fa-spin"></i> Uploading...`;

    } else {

        uploadBtn.innerHTML =
            `<i class="fa-solid fa-upload"></i> Upload Resume`;

    }

}

function setSendLoading(isLoading) {

    sendBtn.disabled = isLoading;

    questionInput.disabled = isLoading;

    if (isLoading) {

        sendBtn.innerHTML =
            `<i class="fa-solid fa-spinner fa-spin"></i>`;

    } else {

        sendBtn.innerHTML =
            `<i class="fa-solid fa-paper-plane"></i>`;

    }

}


/* ==========================================
        CLEAR CHAT
========================================== */

function clearChat() {

    chatBox.innerHTML = "";

}


/* ==========================================
        RESET APPLICATION
========================================== */

function resetApplication() {

    resumeId = null;

    candidateName = "";

    questionInput.value = "";

    questionInput.disabled = true;

    sendBtn.disabled = true;

    uploadStatus.className = "status";

    uploadStatus.innerHTML =
        `<i class="fa-regular fa-circle"></i> Waiting for Resume`;

    uploadBtn.innerHTML =
        `<i class="fa-solid fa-upload"></i> Upload Resume`;

    clearChat();

}


/* ==========================================
        COPY AI RESPONSE
========================================== */

document.addEventListener("click", async function (event) {

    const copyBtn = event.target.closest(".copy-btn");

    if (!copyBtn) return;

    const message = copyBtn.closest(".message");

    if (!message) return;

    const text = message.innerText;

    try {

        await navigator.clipboard.writeText(text);

        copyBtn.innerHTML =
            `<i class="fa-solid fa-check"></i> Copied`;

        setTimeout(() => {

            copyBtn.innerHTML =
                `<i class="fa-regular fa-copy"></i> Copy`;

        }, 2000);

    }

    catch (error) {

        console.error(error);

    }

});


/* ==========================================
        NETWORK STATUS
========================================== */

window.addEventListener("offline", () => {

    addBotMessage(`
# ⚠️ Offline

Your internet connection appears to be unavailable.
`);

});

window.addEventListener("online", () => {

    addBotMessage(`
✅ Connection restored.
`);

});


/* ==========================================
        INITIALIZE APP
========================================== */

function initialize() {

    questionInput.disabled = true;

    sendBtn.disabled = true;

    typingIndicator.style.display = "none";

}

initialize();