const questions = [{
        category: "WEB DEVELOPMENT",
        question: "What is the full form of HTML?",
        answers: [
            { text: "Hyper text markup language", correct: true },
            { text: "Hyper text makeup language", correct: false },
            { text: "Hyper text machine language", correct: false },
            { text: "Hyper text machine learning", correct: false },
        ],
    },
    {
        category: "WEB DEVELOPMENT",
        question: "Full form of CSS?",
        answers: [
            { text: "C styling sheet", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Cascading Stylo Sheets", correct: false },
            { text: "Cascading Structured Sheets", correct: false },
        ],
    },
    {
        category: "WEB DEVELOPMENT",
        question: "let and var are known as?",
        answers: [
            { text: "data types", correct: false },
            { text: "prototypes", correct: false },
            { text: "statements", correct: false },
            { text: "keywords", correct: true },
        ],
    },
    {
        category: "GENERAL KNOWLEDGE",
        question: "Who is the captain of the Indian cricket team?",
        answers: [
            { text: "Virat Kohli", correct: false },
            { text: "Rohit Sharma", correct: true },
            { text: "Vamsi Paidi", correct: false },
            { text: "Vishnu", correct: false },
        ],
    },
    {
        category: "GENERAL KNOWLEDGE",
        question: "Capital city of Telangana?",
        answers: [
            { text: "Delhi", correct: false },
            { text: "Hyderabad", correct: true },
            { text: "Chennai", correct: false },
            { text: "Bangalore", correct: false },
        ],
    },
];

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timeLeft = 60;
let timerId;

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const previousButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const timeElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const highScoresList = document.getElementById("high-scores-list");

function startQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    updateScore();
    updateTimer();
    questionContainerElement.classList.remove("hide");
    previousButton.classList.add("hide");
    nextButton.classList.add("hide");
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    startTimer();
    updateProgressBar();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = "";
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer));
        answerButtonsElement.appendChild(button);
    });
}


function selectAnswer(answer) {
    if (answer.correct) {
        score++;
        updateScore();
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        endQuiz();
    }
}

function updateScore() {
    scoreElement.innerText = `Score: ${score}`;
}

function updateProgressBar() {
    const progressPercentage =
        ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function updateTimer() {
    timeElement.innerText = timeLeft;
}

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timerId);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerId);
    saveHighScore(score);
    showHighScores();
    questionContainerElement.classList.add("hide");
    previousButton.classList.add("hide");
    nextButton.classList.add("hide");
}

function saveHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function showHighScores() {
    highScoresList.innerHTML = "";
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.sort((a, b) => b - a);
    highScores.forEach((score) => {
        const li = document.createElement("li");
        li.innerText = score;
        highScoresList.appendChild(li);
    });
}

previousButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        updateProgressBar();
        nextButton.classList.add("hide");
        if (currentQuestionIndex === 0) {
            previousButton.classList.add("hide");
        }
    }
});

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        updateProgressBar();
        previousButton.classList.remove("hide");
        if (currentQuestionIndex === shuffledQuestions.length - 1) {
            nextButton.classList.add("hide");
        }
    }
});

startQuiz();