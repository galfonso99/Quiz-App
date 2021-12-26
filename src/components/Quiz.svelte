<script lang="ts" context="module">
  export type AnswerObject = {
    question: string
    answer: string
    correct: boolean
    correctAnswer: string
  }
</script>

<script lang="ts">
  // Components
  import QuizBox from "./QuizBox.svelte"
  import { shuffleArray } from "../utils.svelte"
  import { Link } from "svelte-routing"
  import { onMount } from "svelte";
  //Types

  type Question = {
    correct_answer: string
    incorrect_answers: string[]
    question: string
  }
  type QuestionsState = Question & { answers: string[] }

  var TOTAL_QUESTIONS

  let loading = false
  let title = ""
  let author = ""
  let questions: QuestionsState[] = []
  let number = 0
  let userAnswers: AnswerObject[] = []
  let score = 0
  let gameOver = true

  //The id of the quiz with which it was loaded
  export let id: string
  

  onMount(async () => {
  fetch(`https://rust-mongodb-backend.herokuapp.com/quiz/${id}`, 
  {
    method: "GET",
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => setData(data))
  .catch(error => {
    console.log(error);
    return [];
  });
});

  let setData = (data: any) => {
    title = data.title
    author = data.author
    questions = shuffleArray(data.questions).map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer
      ])
    }))
  }

  let startTrivia = () => {
    loading = true
    gameOver = false
    score = 0
    userAnswers = []
    number = 0
    loading = false
    TOTAL_QUESTIONS = questions.length
  }

  let fetchQuestions = (): QuestionsState[] => {
    return questions.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }))
  }

  let checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer
      // Add score if answer is correct
      if (correct) score++
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      userAnswers = [...userAnswers, answerObject]
    }
  }

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1

    if (nextQ === TOTAL_QUESTIONS) {
      gameOver = true
    } else {
      number = nextQ
    }
  }

  //Objects / Structs
  $: QuizProps = {
    questionNr: number + 1,
    totalQuestions: TOTAL_QUESTIONS,
    question: questions[number]?.question,
    answers: questions[number]?.answers,
    userAnswer: userAnswers ? userAnswers[number] : undefined,
    callback: checkAnswer,
  }
</script>

<main>
  <div class="background">
    <div>
      <Link to="/" style="text-decoration: none">
        <h1>PROP QUIZ</h1>
      </Link>
      {#if gameOver}
        <button class="start" on:click={startTrivia}> Start </button>
      {/if}
      {#if !gameOver}
        <p class="score">Score: {score}</p>
      {/if}
      {#if loading}
        <p>Loading Questions...</p>
      {/if}
      {#if !loading && !gameOver}
        <QuizBox bind:QuizProps />
      {/if}
      {#if !gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1}
        <button class="next" on:click={nextQuestion}> Next Question </button>
      {/if}
      {#if userAnswers.length === TOTAL_QUESTIONS}
        <button class="restart" on:click={startTrivia}> Restart </button>
      {/if}
      <!-- <img src="images/poster_image_background.jpg" alt="bg"/> -->
    </div>
  </div>
</main>

<style>
  * {
    font-family: "Catamaran", sans-serif;
    box-sizing: border-box;
  }

  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0 20px;
    display: flex;
    /* justify-content: center; */
  }
  div.background {
    height: 100vh;
    background-image: url("/images/poster_image_background.jpg");
    background-size: cover;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }
  h1 {
    font-family: Fascinate Inline;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    font-weight: 400;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }
  .start,
  .restart,
  .next {
    cursor: pointer;
    background: linear-gradient(180deg, #ffffff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }
  .start {
    max-width: 200px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  /* .restart {
    max-width: 200px;

    position: absolute;
    top: 85%;
    left: 50%;
    transform: translate(-50%, -50%);
  } */
</style>
