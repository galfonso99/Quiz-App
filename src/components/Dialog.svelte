<script>
  let shown = false
  export function show() {
    shown = true
  }
  export function hide() {
    shown = false
  }
</script>

{#if shown}
  <div class="modal-wrapper">
    <div class="modal">
      <span class="close" on:click={() => hide()}>&times;</span>
      <slot />
    </div>
  </div>
{/if}

<style>
  .modal-wrapper {
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .modal {
    background-color: #ebfeff;
    border-radius: 10px;
    border: 2px solid #0085a3;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    max-width: 60vw;
    max-height: 60vh;
    padding: 1rem;
    margin: 15% auto;
  }
  .close {
    float: right;
    cursor: pointer;
  }
  .close:hover {
    font-weight: bold;
  }
</style>
