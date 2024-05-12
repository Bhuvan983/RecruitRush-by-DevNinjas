const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 10;

const questions = [
    {
        question: "What is 7 squared?",
        options: ["49", "64", "81", "36"],
        correct_answer: "49"
    },
    {
        question: "If a car travels at a speed of 60 miles per hour, how far will it travel in 3 hours?",
        options: ["120 miles", "180 miles", "200 miles", "160 miles"],
        correct_answer: "180 miles"
    },
    {
        question: "If 3x + 5 = 20, what is the value of x?",
        options: ["5", "7", "8", "6"],
        correct_answer: "5"
    },
    {
        question: "What is the smallest prime number?",
        options: ["1", "2", "3", "4"],
        correct_answer: "2"
    },
    {
        question: "If a train travels at a speed of 50 kilometers per hour, how far will it travel in 4 hours?",
        options: ["150 kilometers", "200 kilometers", "250 kilometers", "180 kilometers"],
        correct_answer: "200 kilometers"
    },
    {
        question: "What is the value of pi (π) to two decimal places?",
        options: ["3.14", "3.12", "3.16", "3.18"],
        correct_answer: "3.14"
    },
    {
        question: "If a rectangle has a length of 10 meters and a width of 5 meters, what is its area?",
        options: ["20 square meters", "30 square meters", "40 square meters", "50 square meters"],
        correct_answer: "50 square meters"
    },
    {
        question: "What is the next number in the sequence: 2, 4, 6, 8, ...?",
        options: ["10", "11", "12", "9"],
        correct_answer: "10"
    },
    {
        question: "What is the sum of the interior angles of a triangle?",
        options: ["90 degrees", "180 degrees", "270 degrees", "360 degrees"],
        correct_answer: "180 degrees"
    },
    {
        question: "What is the square root of 144?",
        options: ["11", "12", "13", "14"],
        correct_answer: "12"
    },
    {
        question: "How many sides does a hexagon have?",
        options: ["4", "5", "6", "7"],
        correct_answer: "6"
    },
    {
        question: "If 4x - 3 = 9, what is the value of x?",
        options: ["2", "3", "4", "5"],
        correct_answer: "3"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Ag", "Au", "Hg"],
        correct_answer: "Au"
    },
    {
        question: "What is the freezing point of water in Celsius?",
        options: ["0°C", "-10°C", "10°C", "20°C"],
        correct_answer: "0°C"
    },
    {
        question: "How many centimeters are in a meter?",
        options: ["10", "50", "100", "1000"],
        correct_answer: "100"
    }
];


// load question manually
function loadQuestion(){
    if (askedCount < questions.length) {
        const currentQuestion = questions[askedCount];
        _result.innerHTML = "";
        showQuestion(currentQuestion);
    }
}

// display question and options
function showQuestion(question){
    _checkBtn.disabled = false;
    correctAnswer = question.correct_answer;
    let optionsList = question.options;
    
    _question.innerHTML = `${question.question}`;
    _options.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;
    selectOption();
}



// event listeners
function eventListeners(){
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgainBtn.addEventListener('click', restartQuiz);
}

document.addEventListener('DOMContentLoaded', function(){
    loadQuestion();
    eventListeners();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
});



// options selection
function selectOption(){
    _options.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(_options.querySelector('.selected')){
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

// answer checking
function checkAnswer(){
    _checkBtn.disabled = true;
    if(_options.querySelector('.selected')){
        let selectedAnswer = _options.querySelector('.selected span').textContent;
        if(selectedAnswer == HTMLDecode(correctAnswer)){
            correctScore++;
            _result.innerHTML = `<p><i class = "fas fa-check"></i>Correct Answer!</p>`;
        } else {
            _result.innerHTML = `<p><i class = "fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
        }
        checkCount();
    } else {
        _result.innerHTML = `<p><i class = "fas fa-question"></i>Please select an option!</p>`;
        _checkBtn.disabled = false;
    }
}

// to convert html entities into normal text of correct answer if there is any
function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}


function checkCount(){
    askedCount++;
    setCount();
    if(askedCount == totalQuestion){
        setTimeout(function(){
            console.log("");
        }, 5000);


        _result.innerHTML += `<p>Your score is ${correctScore}.</p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        setTimeout(function(){
            loadQuestion();
        }, 300);
    }
}

function setCount(){
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}


function restartQuiz(){
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount();
    loadQuestion();
}