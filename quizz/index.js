const questions = [{
        category: "WEB DEVELOPMENT",
        question: "what is the full form of HTML?",
        answers: [
            { text: "Hyper text markup language", correct: true },
            { text: "Hyper text makeup language", correct: false },
            { text: "Hyper text machine language", correct: false },
            { text: "Hyper text machine learning", correct: false }
        ]
    },
    {
        category: "WEB DEVELOPMENT",
        question: "full form of CSS?",
        answers: [
            { text: "c styling sheet", correct: false },
            { text: "cascading style sheets", correct: true },
            { text: "cascading stylo sheets", correct: false },
            { text: "cascading structured sheets", correct: false }
        ]
    },
    {
        category: "WEB DEVELOPMENT",
        question: "let and var are known as?",
        answers: [
            { text: "data types", correct: false },
            { text: "prototypes", correct: false },
            { text: "statements", correct: false },
            { text: "keywords", correct: true }
        ]
    },
    {
        category: "GENERAL KNOWLEDGE",
        question: "who is captain of indian cricket team?",
        answers: [
            { text: "virat kohli", correct: false },
            { text: "rohit sharma", correct: true },
            { text: "vamsi paidi", correct: false },
            { text: " vishnu", correct: false }
        ]
    },
    {
        category: "GENERAL KNOWLEDGE",
        question: "capital city of telengana?",
        answers: [
            { text: "delhi", correct: false },
            { text: "Hyderabad", correct: true },
            { text: "chennai", correct: false },
            { text: "banglore", correct: false }
        ]
    },
];

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timeLeft = 60;
let timerId;

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const previousbutton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const timeElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const highScoresList = document.getElementById('high-scores-list');

function startQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    updateScore();
    updateTimer();
    questionContainerElement.classList.remove('hide');
    previousbutton.classList.remove('hide');
    nextButton.classList.add('hide');
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    startTimer();
    updateProgressBar();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(answer) {
    if (answer.correct) {
        score++;
        updateScore();
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        endQuiz();
    }
}

function updateScore() {
    scoreElement.innerText = `Score: ${score}`;
}

function updateProgressBar() {
    const progressPercentage = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
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
}

function saveHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(score);
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function showHighScores() {
    highScoresList.innerHTML = '';
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.sort((a, b) => b - a);
    highScores.forEach(score => {
        const li = document.createElement('li');
        li.innerText = score;
        highScoresList.appendChild(li);
    });
}
previousbutton.addEventListener('click', () => {
    currentQuestionIndex--;
    previousbutton.classList.add('hide');
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    updateProgressBar();
});
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    nextButton.classList.add('hide');
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    updateProgressBar();
});

startQuiz();