<script>

  $: richestPeople = [
    "Jeff Bezos",
    "Bill Gates",
    "Warren Buffett",
    "Bernard Arnault",
    "Carlos Slim Helu",
    "Amancio Ortega",
    "Larry Ellison",
    "Mark Zuckerberg",
    "Michael Bloomberg",
    "Larry Page",
  ]


  let dragStartIndex


  // Insert list items into DOM
  

  function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest("li").getAttribute("data-index")
  }

  function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add("over")
  }

  function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove("over")
  }

  function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault()
  }

  function dragDrop() {
    
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute("data-index")
    swapItems(dragStartIndex, dragEndIndex)

    this.classList.remove("over")
  }

  // Swap list items that are drag and drop
  function swapItems(fromIndex, toIndex) {
    console.log("hi")
    let temp = richestPeople[fromIndex]
    richestPeople[fromIndex] = richestPeople[toIndex]
    richestPeople[toIndex] = temp
  }

  

  //document.onload = function(){createList()}
  //createList()
  

  //check.addEventListener("click", checkOrder)
</script>

<main>
  <body>
    <h1>10 Richest People</h1>
    <p>Drag and drop the items into their corresponding spots</p>
    <ul class="draggable-list" id="draggable-list">
    {#each richestPeople as person, index}
      <li data-index={index} on:dragover={dragOver} on:dragenter={dragEnter} on:dragleave={dragLeave} on:drop={dragDrop}>
        <span class="number">{index + 1}</span>
        <div class="draggable" draggable="true" on:dragstart={dragStart}>
          <p class="person-name">{person}</p>
          <i class="fas fa-grip-lines" />
        </div>
      </li>
    {/each}
  </ul>

  </body>
</main>

<style>


  body {
    background-image: url("/images/poster_image_background.jpg");
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    margin: 0;
    font-family: "Lato", sans-serif;
  }

  .draggable-list {
    border: 1px solid var(--border-color);
    color: var(--text-color);
    padding: 0;
    list-style-type: none;
  }

  .draggable-list li {
    background-color: #fff;
    display: flex;
    flex: 1;
  }

  .draggable-list li:not(:last-of-type) {
    border-bottom: 1px solid var(--border-color);
  }

  .draggable-list .number {
    background-color: var(--background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    height: 60px;
    width: 60px;
  }

  .draggable-list li.over .draggable {
    background-color: #eaeaea;
  }

  .draggable-list .person-name {
    margin: 0 20px 0 0;
  }

  .draggable-list li.right .person-name {
    color: #3ae374;
  }

  .draggable-list li.wrong .person-name {
    color: #ff3838;
  }

  .draggable {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    flex: 1;
  }

  .check-btn {
    background-color: var(--background-color);
    border: none;
    color: var(--text-color);
    font-size: 16px;
    padding: 10px 20px;
    cursor: pointer;
  }

  .check-btn:active {
    transform: scale(0.98);
  }

  .check-btn:focus {
    outline: none;
  }
</style>
