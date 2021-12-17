<script lang="ts">
  import { Link } from "svelte-routing"
  import Search from "./SearchBar.svelte"
  import { onMount } from "svelte"
  import SearchQuizCard from "./SearchQuizCard.svelte"

  let resultQuizzes = []
  export let query;

  onMount(async () => {
    fetch(`http://localhost:8080/quiz/search/${query}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error)
        return []
      })
  })

  let setData = (data: any[]) => {
    resultQuizzes = data.map((quiz: any) => {
      return {
        id: quiz.id,
        title: quiz.title,
        author: quiz.author,
        questionsCount: quiz.questions.length,
      }
    })
  }
</script>

<div class="background">
  <div class="header">
    <Link to="/" style="text-decoration: none">
      <h1>PROP QUIZ</h1>
    </Link>
      <Search />
  </div>
  <div class="content-holder">

  </div>
</div>

<style>
  .header {
    margin-top: 20px;
    height: 10vh;
    text-align: start;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

  }
  
  .content-holder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    background-color: #fff;
    height: 90vh;
  }


  div {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0 20px;
    display: flex;
    /* justify-content: center; */
  }
  div.background {
    height: 100vh;
    background-image: url("resources/poster_image_background.jpg");
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
    font-size: 60px;
    margin: 20px;
  }

  .space {
    margin-top: 50px;
  }

  .inline {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
