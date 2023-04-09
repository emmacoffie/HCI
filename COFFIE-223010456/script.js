const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById("timer");
const score = document.getElementById("final-score");
const yourScore = document.getElementById("your-score");
const ctx = document.getElementById("myChart").getContext("2d");
const nameField = document.querySelector('#name');
const idField = document.querySelector('#id');
const inputDiv = document.getElementById("input-div");



let shuffledQuestions, currentQuestionIndex;
let timeLeft = ; 60// or any other starting value
let timerInterval,
  finalMarks,
  marks = 0,
  totalMarks = 10;



  

// startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", function() {
  

  if (nameField.value.trim() === '' || idField.value.trim() === '') {
    score.textContent='Enter Your name and id to start the quiz.'
    return;
  }

  startQuiz()
 
});
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

let timerStarted = false;

function startTimer(duration, display) {
  if (!timerStarted) {
    let timer = duration,
      minutes,
      seconds;
    let countdown = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(countdown);
        display.textContent = "Time's up!";
        startButton.disabled = true;
        yourScore.textContent = "Your final score is";
        totalMarks = marks
        finalMarks= finalMarks- totalMarks
// Create a new pie chart
new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Actual Marks", "Total Score"],
    datasets: [
      {
        label: "Marks",
        data: [finalMarks, totalMarks],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  },
});

      }
    }, 1000);

    timerStarted = true;
  }
}


function startQuiz() {

nameField.disabled=true
idField.textContent =`Id:${idField.value}`
idField.disabled=true
  startButton.textContent = "Next";
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  startTimer(timeLeft, timerElement);

  
}



function setNextQuestion() {
  resetState();
  if (shuffledQuestions.length === 0) {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    yourScore.textContent = "Your final score is " + marks;
    clearInterval(timerInterval);
  } else {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  shuffledQuestions.splice(currentQuestionIndex, 1);
}


function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}



function selectAnswer(e) {
  const selectedButton = e.target;
  let correct = selectedButton.dataset.correct;
  if (correct) {
    marks = marks + 1;
    score.textContent = marks;
    finalMarks = totalMarks - marks;
    console.log(finalMarks);
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "Corporate Social Responsibility (CSR) is usually in conflict with the objective of shareholder wealth maximization.",
    answers: [
      { text: "False", correct: true },
      { text: "True", correct: false },
    ],
  },
  {
    question: 'Which one is the first search engine in internet"?',
    answers: [
      { text: "Google", correct: false },
      { text: "Archie", correct: true },
      { text: "Altavista", correct: false },
      { text: "WAIS", correct: false },
    ],
  },
  {
    question: "Number of bit used by the IPv6 address",
    answers: [
      { text: " 32 bit", correct: false },
      { text: "64 bit", correct: false },
      { text: "128 bit.", correct: true },
      { text: "256 bit", correct: false },
    ],
  },
  {
    question: 'Who is the current president of Nigeria"?',
    answers: [
      { text: "Muhammadu Buhari", correct: false },
      { text: "Peter Obi", correct: false },
      { text: "Bola Ahmed Tinubu.", correct: true },
      { text: "Olusegun Obasanjo", correct: false },
    ],
  },
  {
    question: 'How many marriages allowed in christianity"?',
    answers: [
      { text: "One man > One Wife", correct: true },
      { text: "One man = One man", correct: false },
      { text: "One Woman = One lady", correct: false },
      { text: "One man > Multiple Wife", correct: false },
    ],
  },
  {
    question: "Who is Zahra Buhari in Nigeria?",
    answers: [
      { text: "Muhammadu Buhari's Wife", correct: false },
      { text: "Muhammadu Buhari's 2nd Wife", correct: false },
      { text: "Muhammadu Buhari's daughter.", correct: true },
      { text: "Muhammadu Buhari's daughter inlaw", correct: false },
    ],
  },
  {
    question: "Sex is considered as a stress reliever",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
  {
    question: "The Holy Bible is considered as the word of God",
    answers: [
      { text: "False", correct: false },
      { text: "True", correct: true },
    ],
  },
  {
    question: "First Computer virus is known as",
    answers: [
      { text: " Creeper Virus", correct: true },
      { text: "Elk Cloner", correct: false },
      { text: "SCA Virus", correct: false },
      { text: "Rabbit", correct: false },
    ],
  },
  {
    question: "Which of the following programming language is used to create programs like applets?",
    answers: [
      { text: "COBOL", correct: false },
      { text: "C Language", correct: false },
      { text: "BASIC", correct: false },
      { text: "Java", correct: true },
    ],
  },
];
