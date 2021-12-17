<script lang="ts">
  import { navigate } from "svelte-routing"

  let flip_icon = false
  let input_selected = false
  let input_entered = false

  let search_input

  //If some text is entered, set input_entered flag to true, which triggers the go-in class that shows the go-in button
  let showSearchSubmit = (e: any) => {
    if (e.target.value.length > 0) {
      input_entered = true
    } else {
      input_entered = false
    }
  }

  let search = () => {
    let query = search_input.value
    navigate("/search/" + query)
  }

  let enterSearchQuery = (e: any) => {
    if (e.keyCode === 13) {
      search()
    }
  }
</script>

<link
  rel="stylesheet"
  href="https://maxcdn.icons8.com/fonts/line-awesome/1.1/css/line-awesome-font-awesome.min.css"
/>

<div class="body_wrapper">
  <div class="search__container" class:input_selected>
    <!-- Put here the search icon -->
    <div class="icon-wrapper" style="left: 0">
      <img
        src="/images/search-icon.svg"
        alt="search icon"
        class="search__icon"
        class:flip_icon
      />
    </div>
    <input
      class="search__input"
      type="text"
      placeholder="Search"
      on:focus={() => {
        ;(flip_icon = true), (input_selected = true)
      }}
      on:blur={() => {
        ;(flip_icon = false), (input_selected = false)
      }}
      on:input={showSearchSubmit}
      on:keydown={enterSearchQuery}
      bind:this={search_input}
    />
    <div class="icon-wrapper" style="right: 0px">
      <i
        class="fa fa-arrow-right go-icon"
        class:go-in={input_entered}
        on:click={search}
      />
    </div>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css?family=Raleway:400,700,900");

  /* Base styling */

  .body_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* transition: transform 250ms ease-in-out; */
  .search__container {
    width: 50vw;
    height: 70px;
    border-radius: 50px;
    border: 3.5px solid rgb(255, 255, 255);
    transition: all 250ms ease-in;
    position: relative;
  }

  .input_selected {
    padding: 2px 0px;
    outline: 0;
    border: none;
    border-bottom: 3.5px solid rgb(255, 255, 255);
    border-radius: 0px;
    width: 50vw;
    transition: all 250ms ease-in;
  }

  .search__input {
    width: 80%;
    height: inherit;
    border: none;
    padding-left: 10%;
    padding-right: 10%;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    color: rgb(255, 255, 255);
    background-color: transparent;
    /* Styles for font */
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 1.75em;
    font-weight: 400;
    letter-spacing: -0.015em;
  }

  .icon-wrapper {
    width: 10%;
    height: inherit;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    pointer-events: none;
  }

  .search__input::placeholder {
    color: rgb(255, 255, 255);
    font-family: "Montserrat Alternates", sans-serif;
    letter-spacing: -0.015em;
    font-size: 1.15em;
    outline: none;
  }

  .search__icon {
    padding: 0px 10px;
    fill: rgb(255, 255, 255) !important;
    color: rgb(255, 255, 255);
    transition: transform 400ms 220ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  .flip_icon {
    transition: transform 400ms 220ms cubic-bezier(0.19, 1, 0.22, 1);
    transform: scaleX(-1);
  }

  .search__input:focus {
    border: none;
    outline: none;
  }

  .go-icon {
    color: rgb(255, 255, 255);
    right: 0;
    pointer-events: none;
    font-size: 250%;
    will-change: opacity;
    opacity: 0;
    transform: rotate(45deg);
    transition: opacity 190ms ease-out,
      transform 260ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  .go-in {
    opacity: 1;
    pointer-events: all;
    cursor: pointer;
    transform: rotate(0);
    transition: opacity 190ms ease-out,
      transform 260ms 20ms cubic-bezier(0.19, 1, 0.22, 1);
  }
</style>
