const quizData = [
    {
        question: "How many seas are there?",
        a: "5",
        b: "6",
        c: "7",
        d: "none of the above",
        correct: "c",
    },
  
    {
        question: "How many hearts do octopuses have? ",
        a: "1",
        b: "8",
        c: "2",
        d: "3",
        correct: "d",
    },
  
    {
        question: "what is the largest sea turtle in the world??",
        a: "Loggerhead",
        b: "Kemps ridley",
        c: "Leatherback",
        d: "Hawksbill",
        correct: "c",
    },
  
    {
        question: "What is the fastest fish in the ocean? ",
        a: "Bonita",
        b: "Wahoo",
        c: "Sailfish",
        d: "Swordfish",
        correct: "c",
    },
  
    {
        question: "What is the largest fish in the ocean?",
        a: "Whale shark",
        b: "Mola mola",
        c: "Giant manta ray",
        d: "Basking shark",
        correct: "a",
    },
  
    {
        question: "What is the largest ocean in the world?",
        a: "Indian",
        b: "Pacific",
        c: "Atlantic",
        d: "Arctic",
        correct: "b",
    },
  
    {
        question: "Which is the deepest ocean in the world?",
        a: "Atlantic",
        b: "Pacific",
        c: "Indian",
        d: "Arctic",
        correct: "b",
    },
  
    {
        question: "Which ocean lies between Europe and North America?",
        a: "Atlantic",
        b: "Arctic",
        c: "Pacific",
        d: "Indian",
        correct: "a",
    },
  
    {
        question: "Which ocean is frozen for much of the year?",
        a: "Pacific",
        b: "Atlantic",
        c: "Arctic",
        d: "Indian",
        correct: "c",
    },
  
    {
        question: "Which ocean is Hawaii in??",
        a: "Arctic",
        b: "Atlantic",
        c: "Pacific",
        d: "Indian",
        correct: "c",
    }
];
  

const quiz = document.getElementById('quiz')
const counter = document.getElementById('questionCounter')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBin = document.getElementById('submit')
var timerInSeconds = 60;

var timerDisplay = document.getElementById("timer");

// Create a variable to hold the setInterval ID
var timerIntervalId;

// Function to update the timer display
function updateTimerDisplay() {
  timerDisplay.textContent = countDownSeconds + " seconds remaining";
  countDownSeconds--;
  
  // If the countdown reaches 0, clear the interval
  if (countDownSeconds = 0) {
    clearInterval(timerIntervalId);
    timerDisplay.textContent = "Time's up!";
  }
}

// Call the updateTimerDisplay function every second
timerIntervalId = setInterval(updateTimerDisplay, 1000);

let currentQuiz = 0
let score = 0


loadQuiz()




function feedback() {
    if(((score/quizData.length) *100) > 80) {
        quiz.innerHTML = `
        <p> Excellent Mark, Keep up the good work. </p>
        `
    } else if(((score/quizData.length) *100) > 60) {
        quiz.innerHTML = `
        <p> Good Mark, You can do better though! </p>
        `
    } else if(((score/quizData.length) *100) > 40) {
        quiz.innerHTML = `
        <p> Average Mark, Definitely can do better. </p>
        `
    } else {
        quiz.innerHTML = `
        <p> Bad Mark, Please improve and Try again! </p>
        `
    }
}

function loadQuiz()  {
    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d

}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

submitBin.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++

        if(currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
            <h2> Congratulations, Quiz Completed! </h2>

            <p> Questions: ${quizData.length} </p>
            <p> Wrong Answers: ${quizData.length-score} </p>
            <p> Score: ${score * 2} </p>
            <p> Grade: ${(score/quizData.length) *100} %</p>
            <p> You took 20 seconds </p>

            <button onclick="location.reload()"> Start Again </button>
            `
        }
 
    }
})