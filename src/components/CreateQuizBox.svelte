<script lang="typescript">
  //Properly import questions ans choices arrays and use them in the creation of input fields
  //Pass a answersInputs array to bind the created inputs (pass as binding)
  //Pass a questionInputs array to bind the created inputs (pass as binding)

  type Question = {
    question: string
    correct_answer: string
    incorrect_answers: string[]
  }

  export let pageNr: number
  export let questionsNr: number
  export let choicesNr: number
  //export let questions
  //export let answerChoices: string[][]
  export let enteredAllInputs: boolean

  //export let quizQuestion: Question

  export let question: string
  export let correct_answer: string
  export let incorrect_answers: string[]
  // $: ({ question, correct_answer, incorrect_answers } = quizQuestion)
  // export let correct_answer: string
  // export let incorrect_answers: string[]

  // let question: string = ''
  // let correct_answer: string = ''
  // let incorrect_answers: string[] = new Array(choicesNr-1).fill('')

  // set the inputs for the current page/ question box
  let questionInput = document.createElement("input") //: HTMLInputElement
  let correctAnswerInput = document.createElement("input") //: HTMLInputElement
  let incorrectAnswersInputs = new Array(choicesNr - 1).fill(
    document.createElement("input")
  ) //: HTMLInputElement[]

  const validate = () => {
    enteredAllInputs =
      questionInput.value !== "" &&
      correctAnswerInput.value !== "" &&
      incorrectAnswersInputs.every((choice) => choice.value !== "")

    //Validate inputs by checking answerchoices values and question value passed from parent
  }

  const updateQuizQuestions = () => {
    // console.log("hi")
    // quizQuestions[pageNr] = {
    //   question,
    //   correct_answer,
    //   incorrect_answers,
    // } as Question
  }
</script>

<div>
  <p>Enter the information for Question #{pageNr + 1}</p>
  <p>The order of multiple choices will be random</p>

  <div class="quizCreationBox">
    <form name="contact-form" on:mouseleave={updateQuizQuestions}>
      <input
        bind:this={questionInput}
        name="question"
        placeholder={"Enter the question for this prompt"}
        on:input={validate}
        bind:value={question}
      />
      <input
        bind:this={correctAnswerInput}
        name="correct"
        placeholder={"Enter the correct answer"}
        on:input={validate}
        bind:value={correct_answer}
      />
      {#each incorrect_answers as answer, i}
        <input
          on:input={validate}
          bind:this={incorrectAnswersInputs[i]}
          name="multiple-choices"
          placeholder={"Enter an incorrect answer"}
          bind:value={answer}
        />
      {/each}
    </form>
  </div>
</div>

<style>
  div.quizCreationBox {
    background-color: white;

    max-width: 60vw;
    min-width: 40vw;
    min-height: 30vh;
    background: #ebfeff;
    border-radius: 10px;
    border: 2px solid #0085a3;
    padding: 20px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    text-align: center;
    font-size: 1rem;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    font-size: 25px;
    font-weight: 400;
    color: rgb(238, 193, 78);
    -webkit-text-stroke-width: 0.4px;
    -webkit-text-stroke-color: rgb(242, 120, 14);
  }

  p.number {
    font-size: 22px;
    font-weight: 400;
    color: aquamarine;
    -webkit-text-stroke-width: 0.3px;
    -webkit-text-stroke-color: rgb(14, 98, 242);
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  input {
    padding: 10px;
    border-radius: 5px;
    min-width: 30vw;
    max-width: 35vw;
    border: 1px solid rgb(1, 52, 160);
    font-size: 18px;
    outline: none;
    color: #333;
    float: left;
    font-size: 20px;
    margin-bottom: 10px;
  }

  button:hover {
    background-image: linear-gradient(
      to right,
      rgb(1, 52, 160) 0%,
      rgb(17, 113, 177) 100%
    );
    color: white;
  }

  form {
    padding: 40px;
  }

  body {
    font-family: "Lato", sans-serif;
    color: black;
    margin: 0;
  }
</style>
