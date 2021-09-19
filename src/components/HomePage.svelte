<script lang="ts">
  // Components
  import QuizBox from "./QuizBox.svelte"
  import { Questions } from "../sample_questions"
  import { Link } from "svelte-routing"

  let score = 0

  const redirectToCreateQuiz = () => {
    console.log("hello")
  }
</script>

<main>
  <div class="background">
    <div>
      <Link to="/" style =  "text-decoration: none">
        <h1>PROP QUIZ</h1>
      </Link>

      <Link to="createQuiz">
        <button value={score} on:click={redirectToCreateQuiz}> Create Quiz </button>
      </Link>
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
    margin: 20px;
  }

  button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    cursor: pointer;
    font-size: 0.8rem;
    height: 60px;
    width: 20vw;
    margin: 5px 0;

    border: 3px solid #ffffff;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
    background: linear-gradient(90deg, #56ccff, #6eafb4);
  }


</style>
