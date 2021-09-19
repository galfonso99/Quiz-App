<script lang="typescript">
  // Types
  import type { AnswerObject } from "./Quiz.svelte"

  type Props = {
    question: string
    answers: string[]
    callback: (e: any) => void
    userAnswer: AnswerObject | undefined
    questionNr: number
    totalQuestions: number
  }

  export let QuizProps: Props
  //Destructure the Props while keeping a reactive watch with $: tag
  $: ({ question, answers, callback, userAnswer, questionNr, totalQuestions } =
    QuizProps)
  $: correct = userAnswer?.correctAnswer === ""
  $: userClicked = userAnswer?.correctAnswer === ""

  $: green = userClicked && correct
  $: red = userClicked && !correct

  const colorChange = (e: any) => {
    let chosenAnswer = e.currentTarget.value
    correct = userAnswer?.correctAnswer === chosenAnswer
    userClicked = userAnswer?.answer === chosenAnswer
  }
</script>

<div>
  <p class="number">
    Question: {questionNr} / {totalQuestions}
  </p>
  <p>{question}</p>
  <div>
    {#each answers as answer}
      <div class="Button">
        <button
          class:green
          class:red
          disabled={userAnswer ? true : false}
          value={answer}
          on:click={callback}
          on:click={colorChange}
        >
          <!-- callback is to update score and userAnswers
            colorChange is go change the color of the button based on the accuracy of the answers -->
          <span>{answer}</span>
        </button>
      </div>
    {/each}
  </div>
</div>

<style>
  div {
    max-width: 1100px;
    min-width: 40vw;
    background: #ebfeff;
    border-radius: 10px;
    border: 2px solid #0085a3;
    padding: 20px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    text-align: center;
    font-size: 1rem;
  }

  div.Button {
    transition: all 0.3s ease;
  }

  button {
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width: 100%;
    height: 40px;
    margin: 5px 0;

    border: 3px solid #ffffff;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
    background: linear-gradient(90deg, #56ccff, #6eafb4);
  }
  button.green {
    background: linear-gradient(90deg, #56ffa4, #59bc86);
  }
  button.red {
    background: linear-gradient(90deg, #ff5656, #c16868);
  }
  button:hover {
    opacity: 0.8;
  }
</style>
