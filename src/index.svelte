<script>
    import { Router, Route } from 'svelte-routing';
    import HomePage from './components/HomePage.svelte';
  
    export let url = '';
  </script>
  
  <Router {url}>
    <div>
        <Route path="/">
          <HomePage/>
        </Route>
        <!-- <Route path="about" component={About} /> -->
    </div>
  </Router>