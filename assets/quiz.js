const startBtn = document.getElementById("startBtn");
const quizContainer = document.getElementById("quizContainer");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const endScreen = document.getElementById("endScreen");
const scoreEl = document.getElementById("score");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const initialsEl = document.getElementById("initials");

const questions = [
    {
        question: "What is JavaScript?",
        answers: ["A programming language", "A coffee type", "A design tool", "A CSS library"],
        correct: 0
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        answers: ["Number", "String", "Boolean", "Class"],
        correct: 3
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: ["msg('Hello World')", "alertBox('Hello World')", "alert('Hello World')", "msgBox('Hello World')"],
        correct: 2
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: ["onmouseclick", "onchange", "onclick", "onmouseover"],
        correct: 2
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: ["var carName", "v carName", "variable carName", "var: carName"],
        correct: 0
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        answers: ["*", "x", "=", "-"],
        correct: 2
    },
    {
        question: "What will the following code return: Boolean(10 > 9)",
        answers: ["true", "false", "NaN", "undefined"],
        correct: 0
    },
    {
        question: "Is JavaScript case-sensitive?",
        answers: ["No", "Yes", "Only for variables", "Only for functions"],
        correct: 1
    },
    {
        question: "Which method can be used to find the length of a string?",
        answers: ["getSize()", "length()", "len()", "size()"],
        correct: 1
    },
    {
        question: "Which of the following is an advantage of using JavaScript?",
        answers: ["Less server interaction", "Immediate feedback to visitors", "Increased interactivity", "All of the above"],
        correct: 3
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: ["//", "/*", "--", "##"],
        correct: 0
    },
    {
        question: "What is the correct way to create an array in JavaScript?",
        answers: ["var colors = (1:'red', 2:'blue')", "var colors = ['red', 'blue']", "var colors = {1:'red', 2:'blue'}", "var colors = 'red', 'blue'"],
        correct: 1
    },
    {
        question: "Which built-in method removes the last element from an array and returns it?",
        answers: ["last()", "remove()", "pop()", "None of the above"],
        correct: 2
    },
    {
        question: "Which of the following is not a reserved word in JavaScript?",
        answers: ["interface", "program", "throws", "short"],
        correct: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'app.js'?",
        answers: ["<script src='app.js'>", "<script ref='app.js'>", "<script name='app.js'>", "<script href='app.js'>"],
        correct: 0
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: ["function myFunction()", "function:myFunction()", "function = myFunction()", "function -> myFunction()"],
        correct: 0
    }

];

let currentQuestionIndex = 0;
let time = 90;
let interval;
let score = 0;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    startBtn.classList.add("hidden");
    quizContainer.classList.remove("hidden");

    nextQuestion();

    interval = setInterval(() => {
        time--;
        timerEl.textContent = `Time: ${time}`;
        if (time <= 0) endGame();
    }, 1000);
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        questionEl.textContent = q.question;
        answersEl.innerHTML = '';
        q.answers.forEach((answer, index) => {
            const btn = document.createElement("button");
            btn.textContent = answer;
            btn.addEventListener("click", () => checkAnswer(index));
            answersEl.appendChild(btn);
        });
    } else {
        endGame();
    }
}

function checkAnswer(index) {
    if (index !== questions[currentQuestionIndex].correct) {
        time -= 10;
    } else {
        score += 1;
    }

    currentQuestionIndex++;
    nextQuestion();
}

function endGame() {
    clearInterval(interval);
    quizContainer.classList.add("hidden");
    endScreen.classList.remove("hidden");
    scoreEl.textContent = score;
    displaySavedScores();

}

saveScoreBtn.addEventListener("click", saveScore);

function saveScore() {
    saveScoreBtn.style.visibility = "hidden"
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ initials: initialsEl.value, score: score });
    localStorage.setItem("scores", JSON.stringify(scores));
    showScore(score, initialsEl.value);
    alert("Score saved!");
    
}

function showScore(anyScore, anyInitials) {
    const scoreBox = document.createElement("div");
    scoreBox.innerHTML = "Initials: " + anyInitials + " Score: " + anyScore + "<br>";
    endScreen.appendChild(scoreBox);
}

function displaySavedScores() {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.forEach((savedScore) => {
    showScore(savedScore.score, savedScore.initials);
    })
}