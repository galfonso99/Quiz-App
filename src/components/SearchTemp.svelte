<script lang="ts">
  let flip_icon = false
  let input_selected = false
</script>



<h1>Fancy Search Box</h1>
		<h2>Try below!</h2>
		<div class="search-box">
			<div class="search-icon"><i class="fa fa-search search-icon"></i></div>
			<form action="" class="search-form">
				<input type="text" placeholder="Search" id="search" autocomplete="off">
			</form>
			<svg class="search-border" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns::a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" viewBox="0 0 671 111" style="enable-background:new 0 0 671 111;"
			 xml:space="preserve">
          <path class="border" d="M335.5,108.5h-280c-29.3,0-53-23.7-53-53v0c0-29.3,23.7-53,53-53h280"/>
          <path class="border" d="M335.5,108.5h280c29.3,0,53-23.7,53-53v0c0-29.3-23.7-53-53-53h-280"/>
        </svg>
			<div class="go-icon"><i class="fa fa-arrow-right"></i></div>
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
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    border: 3.5px solid #575756;
    transition: all 250ms ease-in-out;
  }

  .search__input {
    width: 100%;
    width: 530px;
    height: 100%;
    border: none;

    backface-visibility: hidden;
    transform-style: preserve-3d;
    background-color: transparent;
    font-family: "Montserrat Alternates", sans-serif;
    color: #170101;
    font-size: 1.75em;
    font-weight: 400;
    letter-spacing: -0.015em;
    /* background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 36px 36px;
    background-position: 5% center; */
  }

  .search__input::placeholder {
    color: color(#575756 a(0.8));
    font-family: "Montserrat Alternates", sans-serif;
    letter-spacing: -0.015em;
    font-size: 1.15em;
    outline: none;
  }

  .input_selected {
    /* padding: 12px 50px; */
    outline: 0;
    border: 2.5px solid transparent;
    border-bottom: 2.5px solid #575756;
    border-radius: 0;
    width: 47vw;
    transition: all 250ms ease-in-out;
  }

  .search-icon {
    background-color: transparent;
    color: transparent;
    padding: 0px 10px;
  }

  .flip_icon {
    transition: all 250ms ease-in-out;
    transform: scaleX(-1);
  }

  .search__input:focus {
    border: none;
    outline: none;
  }
</style>
