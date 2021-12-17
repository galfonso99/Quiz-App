<!-- <script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, session, stuff }) {
		const url = `/RecentQuizzes.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					data: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script> -->
<script lang="ts">
  // Components
  import QuizBox from "./QuizBox.svelte"
  import { Questions } from "../sample_questions"
  import { Link } from "svelte-routing"
  import Search from "./SearchBar.svelte"
  import { onMount } from "svelte"
  import RecentQuizCard from "./RecentQuizCard.svelte"

  let score = 0
  let recentQuizzes = []

  onMount(async () => {
    fetch(`http://localhost:8080/quiz/recent`, {
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
    recentQuizzes = data.map((quiz: any) => {
      return {
        id: quiz.id,
        title: quiz.title,
        author: quiz.author,
        questionsCount: quiz.questions.length,
      }
    })
    console.log(recentQuizzes)
  }
</script>

<main>
  <div class="background">
    <div style="margin-top: 20px;">
      <Link to="/" style="text-decoration: none">
        <h1>PROP QUIZ</h1>
      </Link>
      <div class="space">
        <Search />
      </div>
      <div class="space">
      <Link to="createQuiz">
        <button value={score}> Create Quiz </button>
      </Link>
      </div>
      <h2 style="margin-top: 50px; margin-bottom: 0; color: #e4e8e9;">
        Recent Quizzes
      </h2>
      <div class="column-wrapper" >
        {#each recentQuizzes as quiz}
        <Link to="quiz/{quiz.id}">
          <RecentQuizCard 
            title={quiz.title}
            author={quiz.author}
            questionsCount={quiz.questionsCount}
          />
        </Link>
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
  * {
    font-family: "Catamaran", sans-serif;
    box-sizing: border-box;
  }

  div {
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
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }

  button {
    position: relative;

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

  .space {
    margin-top: 50px;
  }

  .column-wrapper {
    display: inline-grid;
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: repeat(2, 200px);
    grid-column-gap: 20px;
    grid-row-gap: 15px;
    height: 40vh;
    place-self: center;
  }

  a:hover p {
    text-decoration: none;
}
</style>
