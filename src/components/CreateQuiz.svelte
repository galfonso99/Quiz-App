<script lang="ts">
  import { Link } from "svelte-routing"
  import CreateQuizBox from "./CreateQuizBox.svelte"

  export let location   //Routing web address passed to the component
  let id = parseInt(location.search.split("=")[1])
  let pageNr = !isNaN(id) ? id : -1
  let settingsPage = {
    questions: ["No. of questions", "No. of multiple choices"],
    answers: new Array(2),
  }
  $: settingsPageInputs = new Array(2)

  let questionsNr = 5
  let choicesNr = 3

  let enteredAllInputs = false
  //initialize with default values
  let questions: string[] = new Array(10).fill("")
  let answerChoices: string[][] = [...new Array(5)].map(() =>
    new Array(3).fill("")
  )

  const handleSettingsNext = () => {
    pageNr++
    //Parse the settings of the quiz from string to number and destructure it into questionsNr and choicesNr
    ;[questionsNr, choicesNr] = settingsPage.answers
    //populate questions array and choices array based on settings
    questions = new Array(questionsNr).fill("")
    answerChoices = [...new Array(questionsNr)].map(() =>
      new Array(choicesNr).fill("")
    )
  }

  
  const trigger = () => {
    console.log(enteredAllInputs)
    //console.log(answerChoices[pageNr])
  }
  const handleNext = () => {
    pageNr++
    enteredAllInputs = false
  }

  const handleSubmit = () => {
    console.log(questions)
    console.log(answerChoices)
  }
</script>

<main>
  <div class="background">
    <div>
      <Link to="/" style="text-decoration: none">
        <h1>PROP QUIZ</h1>
      </Link>
      {#if pageNr < 0}
        <p>Enter the details of the Quiz</p>
        <div class="quizCreationBox">
          <form name="contact-form">
            {#each settingsPage.answers as answer, i}
              <div class="form-control">
                <div class="input-wrapper">
                  <input
                    bind:this={settingsPageInputs[i]}
                    type='number'
                    name="settings"
                    placeholder={settingsPage.questions[i]}
                    bind:value={answer}
                  />
                </div>
              </div>
            {/each}
          </form>
        </div>
      {:else}
        <CreateQuizBox
          {pageNr}
          {questionsNr}
          bind:question= {questions[pageNr]}
          bind:choices = {answerChoices[pageNr]}
          bind:enteredAllInputs
        />
      {/if}
      {#if pageNr < 0 && settingsPageInputs[0]?.value && settingsPageInputs[1]?.value}
        <button name="next" on:click={handleSettingsNext}>next</button>
      {/if}
      
        <!-- <button name="trigger" on:click={trigger}>trigger</button> -->

      {#if pageNr >= 0 && pageNr < questionsNr - 1 && enteredAllInputs}
        <button name="next" on:click={handleNext}>next</button>
      {/if}
      {#if pageNr === questionsNr -1 && enteredAllInputs}
        <button name="submit" on:click={handleSubmit}>submit</button>
      {/if}
    </div>
  </div>
</main>

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
  div.background {
    height: 100vh;
    background-image: url("https://i.imgur.com/Ahdd5N3.jpg");
    background-size: cover;
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
    margin: 0px;
    padding-top: 20px;
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
    width: 280px;
    border: 1px solid rgb(1, 52, 160);
    font-size: 18px;
    outline: none;
    color: #333;
    float: left;
  }

  p {
    font-size: 40px;
    font-weight: 400;
    color: aquamarine;
    -webkit-text-stroke-width: 0.7px;
    -webkit-text-stroke-color: rgb(14, 98, 242);
  }

  button {
    color: black;
    padding: 15px;
    border: 1px solid rgb(1, 52, 160);
    border-radius: 10px;
    background-color: #ebfeff;
    cursor: pointer;
    transition: all 0.5s;
    color: rgb(1, 52, 160);
    width: 10vw;

    position: absolute;
    left: 50%;
    bottom: 15vh;
    transform: translate(-50%, -50%);
  }

  button[name="trigger"] {
    color: black;
    padding: 15px;
    border: 1px solid rgb(1, 52, 160);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s;
    color: rgb(1, 52, 160);
    width: 10vw;

    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%, -50%);
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
