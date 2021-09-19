<script lang="typescript">
  //Properly import questions ans choices arrays and use them in the creation of input fields
  //Pass a answersInputs array to bind the created inputs (pass as binding)
  //Pass a questionInputs array to bind the created inputs (pass as binding)
  export let pageNr: number
  export let questionsNr: number
  //export let questions
  //export let answerChoices: string[][]
  export let question: string
  export let choices: string[]
  export let enteredAllInputs: boolean

  // set the inputs for the current page/ question box
  let questionInput = document.createElement("input") //: HTMLInputElement
  let answersInputs = new Array(choices.length).fill(
    document.createElement("input")
  ) //: HTMLInputElement[]

  const validate = () => {
    enteredAllInputs =
      questionInput.value !== "" && answersInputs.every((choice) => choice.value !== "")
    //Validate inputs by checking answerchoices values and question value passed from parent
  }
</script>

<div>
  <p>Enter the information for Question #{pageNr + 1}</p>

  <div class="quizCreationBox">
    <form name="contact-form">
      <div class="form-control">
        <div class="input-wrapper">
          <input
            name="question"
            placeholder={"Enter the question for this prompt"}
            bind:this={questionInput}
            on:input={validate}
            bind:value={question}
          />
        </div>
      </div>
      {#each choices as choice, i}
        <div class="form-control">
          <div class="input-wrapper">
            <input
              on:input={validate}
              name="multiple-choices"
              placeholder={"Enter a possible answer"}
              bind:this={answersInputs[i]}
              bind:value={choice}
            />
          </div>
        </div>
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
    color: aquamarine;
    -webkit-text-stroke-width: 0.4px;
    -webkit-text-stroke-color: rgb(14, 98, 242);
  }

  p.number {
    font-size: 22px;
    font-weight: 400;
    color: aquamarine;
    -webkit-text-stroke-width: 0.3px;
    -webkit-text-stroke-color: rgb(14, 98, 242);
  }

  .form-control {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .input-wrapper {
    display: inline-block;
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
