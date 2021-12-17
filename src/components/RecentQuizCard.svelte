<script lang="ts">
  export let title
  export let author
  export let questionsCount
</script>

<div class="quiz-box">
  <p class="title"> { title }</p>
  <img  class="quiz-image" src="/images/Quiz.png" alt="Quiz" />
  <div class="inline">
    <p>Author: { author }</p>
    <p>Qs: { questionsCount }</p>
  </div>
</div>

<style>
  .quiz-box {
    background: linear-gradient(90deg, #77cdf2, #27888f);
    border: 2px solid #ffffff;
    text-align: center;
    background-size: cover;
    border-radius: 15px;
    max-height: 200px;
  }
  .inline {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  p {
    font-size: 12px;
    color: rgb(232, 231, 237);
    padding: 0px 10px;
    overflow:hidden; 
    white-space: nowrap;
  }
  .title {
    font-size: 20px;
    color: #e4e8e9;
    margin: 0;
    overflow:hidden; 
    white-space: nowrap;
  }
  .quiz-image {
    width: 50%;
  }

  
</style>
