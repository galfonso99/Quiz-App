<script lang="ts">
  import { Link } from "svelte-routing"
  import CreateQuizBox from "./CreateQuizBox.svelte"
  import Dialog from "./Dialog.svelte"

  export let location //Routing web address passed to the component
  let pageId = parseInt(location.search.split("=")[1])
  let pageNr = !isNaN(pageId) ? pageId : -1

  let settingsPageInputs = new Array(4)

  let title: string
  let author: string
  let questionsNr: number
  let choicesNr: number

  let allEntered = false
  let enteredAllInputs = false

  let dialog: any //Anchor element for the dialog box

  let id //The id of the created quiz

  //initialize with default values

  let questions: string[] = new Array(10).fill("")
  let correct_answers: string[] = new Array(10).fill("")
  let incorrect_answers: string[][] = [...new Array(5)].map(() =>
    new Array(2).fill("")
  )

  type Quiz = {
    title: string
    author: string
    questions: Question[]
  }

  type Question = {
    question: string
    correct_answer: string
    incorrect_answers: string[]
  }

  //let quizQuestion: Question

  const handleSettingsNext = () => {
    pageNr++
    //Parse the settings of the quiz from string to number and destructure it into questionsNr and choicesNr
    //populate questions array and choices array based on settings

    questions = new Array(questionsNr).fill("")
    correct_answers = new Array(questionsNr).fill("")
    incorrect_answers = [...new Array(questionsNr)].map(() =>
      new Array(choicesNr - 1).fill("")
    )
  }

  const copyToClipboard = (id: string) => {
    var r = document.createRange()
    r.selectNode(document.getElementById(id))
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(r)
    document.execCommand("copy")
    window.getSelection().removeAllRanges()
  }

  const handleNext = () => {
    pageNr++
    enteredAllInputs = false
  }

  const handleSubmit = () => {
    postQuiz()
    dialog.show()
  }

  const validateInputs = () => {
    allEntered = settingsPageInputs.every((input) => input.value)
  }

  const postQuiz = async () => {
    let quizQuestions = questions.map((question, i) => {
      return {
        question: question,
        correct_answer: correct_answers[i],
        incorrect_answers: incorrect_answers[i],
      }
    })

    const res = await fetch("https://rust-mongodb-backend.herokuapp.com/quiz", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        questions: quizQuestions,
        tags: ["fun"],
      } as Quiz),
    })
    const json = await res.json()
    const data = JSON.stringify(json).slice(12, 36) //The slice that contains the id of the quiz
    id = data
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
            <input
              bind:this={settingsPageInputs[0]}
              type="string"
              name="settings"
              placeholder={"Quiz title"}
              on:input={validateInputs}
              bind:value={title}
            />
            <input
              bind:this={settingsPageInputs[1]}
              type="string"
              name="settings"
              placeholder={"Author's name"}
              on:input={validateInputs}
              bind:value={author}
            />
            <input
              bind:this={settingsPageInputs[2]}
              type="number"
              name="settings"
              placeholder={"No. of questions"}
              on:input={validateInputs}
              bind:value={questionsNr}
            />
            <input
              bind:this={settingsPageInputs[3]}
              type="number"
              name="settings"
              placeholder={"No. of multiple choices"}
              on:input={validateInputs}
              bind:value={choicesNr}
            />
          </form>
        </div>
      {:else}
        <CreateQuizBox
          {pageNr}
          {questionsNr}
          {choicesNr}
          bind:question={questions[pageNr]}
          bind:correct_answer={correct_answers[pageNr]}
          bind:incorrect_answers={incorrect_answers[pageNr]}
          bind:enteredAllInputs
        />
      {/if}
      {#if pageNr < 0 && allEntered}
        <button name="next" on:click={handleSettingsNext}>next</button>
      {/if}

      {#if pageNr >= 0 && pageNr < questionsNr - 1 && enteredAllInputs}
        <button name="next" on:click={handleNext}>next</button>
      {/if}
      {#if pageNr === questionsNr - 1 && enteredAllInputs}
        <button name="submit" on:click={handleSubmit}>submit</button>
      {/if}

      <Dialog bind:this={dialog}>
        <h2>Submitted</h2>
        <p id= "dialog-text">
          Your quiz has been submitted. You can now go back to the homepage or
          go check your recently created quiz.
        </p>
        <span id="copy">
          http:localhost:5000/quiz/{id}
        </span>
        <br/>
        <button name="copy" on:click={() => copyToClipboard("copy")}>
          Copy to Clipboard
        </button>
        <div class="buttons">
          <button name="close" on:click={() => dialog.hide()}>
            Close
          </button>
          <Link to="/">
            <button name="home">Go Home</button>
          </Link>
          <Link to= {`/quiz/${id}`}>
            <button name="quiz">Go to Quiz</button>
          </Link>
        </div>

      </Dialog>
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
    background-image: url("/images/poster_image_background.jpg");
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

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    padding: 10px;
    border-radius: 5px;
    width: 280px;
    border: 1px solid rgb(1, 52, 160);
    font-size: 18px;
    outline: none;
    color: #333;
    font-size: 20px;
    margin-bottom: 10px;
    display: inline;
  }

  p {
    font-size: 40px;
    font-weight: 400;
    color: aquamarine;
    text-align: center;
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
  }

  button[name="next"], button[name="submit"] {
    position: absolute;
    left: 50%;
    bottom: 15vh;
    transform: translate(-50%, -50%);
  }

  button[name="copy"] {
    width: 15vw;
    margin: 3em 0em;
  }


  /* button[name="close"], button[name="home"], button[name="quiz"] {

  } */

  button:hover {
    background-image: linear-gradient(
      to right,
      rgb(1, 52, 160) 0%,
      rgb(17, 113, 177) 100%
    );
    color: white;
  }

  .buttons {
		display: flex;
		justify-content: space-between;
	}

  #dialog-text {
    font-size: 20px;
    font-weight: 400;
    -webkit-text-stroke-width: 0.7px;
    color: unset !important;
    -webkit-text-stroke-color: unset !important;
  }

  span {
    font-weight: bold;
    font-family: "Comic Sans MS", cursive, sans-serif;
    font-size: 20px;
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
