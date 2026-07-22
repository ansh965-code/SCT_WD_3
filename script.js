const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Hyper Tool Machine Language", correct: false }
        ]
    },
    {
        question: "Which language is used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Python", correct: false },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "Which language is used to make websites interactive?",
        answers: [
            { text: "CSS", correct: false },
            { text: "Java", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C++", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to insert an image?",
        answers: [
            { text: "&lt;img&gt;", correct: true },
            { text: "&lt;image&gt;", correct: false },
            { text: "&lt;picture&gt;", correct: false },
            { text: "&lt;src&gt;", correct: false }
        ]
    },
    {
        question: "Which CSS property changes text color?",
        answers: [
            { text: "background", correct: false },
            { text: "font-color", correct: false },
            { text: "color", correct: true },
            { text: "text-style", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "&lt;a&gt;", correct: true },
            { text: "&lt;link&gt;", correct: false },
            { text: "&lt;href&gt;", correct: false },
            { text: "&lt;url&gt;", correct: false }
        ]
    },
    {
        question: "Which CSS property is used to change the background color?",
        answers: [
            { text: "bgcolor", correct: false },
            { text: "background-color", correct: true },
            { text: "color", correct: false },
            { text: "background-image", correct: false }
        ]
    },
    {
        question: "Which JavaScript keyword is used to declare a variable?",
        answers: [
            { text: "int", correct: false },
            { text: "let", correct: true },
            { text: "string", correct: false },
            { text: "define", correct: false }
        ]
    },
    {
        question: "Which method prints output in the browser console?",
        answers: [
            { text: "console.print()", correct: false },
            { text: "console.log()", correct: true },
            { text: "print()", correct: false },
            { text: "document.write()", correct: false }
        ]
    },
    {
        question: "Which CSS layout system is one-dimensional?",
        answers: [
            { text: "Grid", correct: false },
            { text: "Flexbox", correct: true },
            { text: "Table", correct: false },
            { text: "Float", correct: false }
        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "Google", correct: false },
            { text: "Microsoft", correct: false },
            { text: "Netscape", correct: true },
            { text: "Apple", correct: false }
        ]
    },
    {
        question: "Which symbol is used for comments in CSS?",
        answers: [
            { text: "// Comment", correct: false },
            { text: "&lt;!-- --&gt;", correct: false },
            { text: "/* Comment */", correct: true },
            { text: "# Comment", correct: false }
        ]
    },
    {
        question: "Which JavaScript method selects an element by its ID?",
        answers: [
            { text: "querySelector()", correct: false },
            { text: "getElementById()", correct: true },
            { text: "getElementsByClass()", correct: false },
            { text: "selectElement()", correct: false }
        ]
    },
    {

        question: "Which HTML tag is used to create an unordered list?",
        answers: [
            { text: "&lt;ol&gt;", correct: false },
            { text: "&lt;ul&gt;", correct: true },
            { text: "&lt;li&gt;", correct: false },
            { text: "&lt;list&gt;", correct: false }
        ]
    },
    {
        question: "Which CSS property adds space inside an element?",
        answers: [
            { text: "margin", correct: false },
            { text: "padding", correct: true },
            { text: "spacing", correct: false },
            { text: "border", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const questionNumber = document.getElementById("question-number");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next Question";
    showQuestion();
}

function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionNumber.innerHTML = `Question ${questionNo} of ${questions.length}`;
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerHTML = answer.text;
        button.classList.add("btn");

        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

    });

}

function resetState() {

    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e) {

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;

    });

    nextButton.style.display = "block";

}

function showScore() {

    resetState();

    questionNumber.innerHTML = "";

    questionElement.innerHTML =
        `🎉 You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

}

function handleNextButton() {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }

}

nextButton.addEventListener("click", () => {

    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }

});

startQuiz();