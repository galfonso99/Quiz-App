<script>
    //import { Router, Route, Link } from 'svelte-routing';
    import { Router, Route, Link } from "svelte-routing";
    import Quiz from './components/Quiz.svelte';
    import HomePage from './components/HomePage.svelte';
    import CreateQuiz from './components/CreateQuiz.svelte';

  
    export let url = '';
  </script>
  
  <Router {url}>
    <div>
      <!-- Add new route at the top bc /:id and / are too general and high priority-->
      <Route path="/createQuiz?pageNr=:id" component={CreateQuiz}/>
      <Route path="/createQuiz" component={CreateQuiz}/>
      <Route path="/:id" component={Quiz}/>
      <Route path="/" exact component={HomePage}/>
    </div>
  </Router>