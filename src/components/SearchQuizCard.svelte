<script lang="ts">
  import { Link } from "svelte-routing"
  export let id
  export let title
  export let author
  export let questionsCount
</script>

<div class="quiz_view_wrapper">
  <Link to="quiz/{id}">
    <div class="quiz-box">
      <img class="quiz-image" src="/images/Quiz.png" alt="Quiz" />
    </div>
  </Link>
  <div class="quiz-details">
    <Link to="quiz/{id}">
      <p class="title">{title}</p>
    </Link>
    <p>Author: {author}</p>
    <p>Qs: {questionsCount}</p>
  </div>
</div>

<style>
  .quiz_view_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
    height: fit-content;
    background-color: #e1e5f062;
    border-radius: 10px;
  }
  .quiz-box {
    background: linear-gradient(90deg, #77cdf2, #27888f);
    border: 2px solid #ffffff;
    text-align: center;
    background-size: cover;
    border-radius: 15px;
    max-height: 200px;
  }

  .quiz-details {
    width: 40vw;
    /* margin: 0 160px; */
  }

  .inline {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  p {
    font-size: 20px;
    color: rgb(9, 3, 40);
    padding: 0px 10px;
    overflow: hidden;
    white-space: nowrap;
  }
  .title {
    font-size: 26px;
    font-weight: 450;
    color: rgb(9, 3, 40);
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .quiz-image {
    width: 60%;
    height: 80%;
  }
</style>
