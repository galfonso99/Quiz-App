<script lang='ts'>
import {
    Router,
    Route,
    Link
} from "svelte-routing"
import Quiz from "./components/Quiz.svelte"
import HomePage from "./components/HomePage.svelte"
import CreateQuiz from "./components/CreateQuiz.svelte"
import SortableList from "./misc/List.svelte"
import Curves from "./misc/Curves.svelte"
import SearchPage from "./components/SearchPage.svelte"

export let url = ""
</script>

<Router {url}>
    <div>
        <!-- Add new route at the top bc /:id and / are too general and high priority-->
        <Route path="/createQuiz?pageNr=:id" component={CreateQuiz} />
        <Route path="/createQuiz" component={CreateQuiz} />
        <Route path="/sortableList" component={SortableList} />
        <Route path="/curves" component={Curves} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/search/:query" component={SearchPage} />
        <Route path="/" exact component={HomePage} />
    </div>
</Router>
