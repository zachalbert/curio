<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const res = await this.fetch(`work/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }

    console.log(data)
  }
</script>

<script>
  import { hslide } from '../../../slider.js'
  export let post

  let slides = [
    {
      content: '1',
      bg: 'red'
    },
    {
      content: '2',
      bg: 'yellow'
    },
    {
      content: '3',
      bg: 'orange'
    },
    {
      content: '4',
      bg: 'green'
    },
  ]

  let cur = 0

  function changeSlide(slide) {
    cur = slide
  }

  const clamp = ( number, min, max ) => Math.min(Math.max(number, min), max)
  const transition_args = {
    duration: 200,
  }

  function prev(e) {
    cur = clamp( --cur, 0, slides.length-1 )
  }

  function next(e) {
    cur = clamp( ++cur, 0, slides.length-1 )
  }

  const ARROW_LEFT = 37
  const ARROW_RIGHT = 39
  function handleShortcut(e) {
    if( e.keyCode === ARROW_LEFT ) {
      prev()
    }
    if( e.keyCode === ARROW_RIGHT ) {
      next()
    }
  }
</script>

<style>
  header {
    text-align: center;
  }

  header h1 {
    margin-bottom: 0.7em;
  }

  header p {
    color: #AAA;
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-weight: 600;
  }

  header hr {
    min-width: 100px;
    width: 30%;
  }

  .nav {
    @apply p-12 text-4xl opacity-75 transition;
  }

  .nav:hover {
    @apply opacity-100 transition;
  }

  /* .slide {
    @apply w-screen h-screen bg-gray-900 text-white text-center;
  }

  .slide img {
    @apply m-auto my-16;
  } */

  button {
    background: transparent;
    color: #fff;
    border-color: transparent;
    width: 3.2rem;
    height: 3.2rem;
  }

  button:hover,
  button:focus {
    background: rgba(0,0,0,0.5);
  }

  .dots {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
  }

  .dot {
    width: 8px;
    height: 8px;
    background: #000;
    border-radius: 100%;
    font-size: 0;
    margin: 0.3rem;
    opacity: 0.3;
  }

  .dot.selected {
    opacity: 1;
  }

  .extra-outer-wrapper {
    width: 80%;
    margin: 0 auto;
  }

  .outer-wrapper {
   width: 100%;
   padding: 0 0 56.25%;
   position: relative; 
  }

  .inner-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    position: absolute;
  }

  .controls button:first-child {
    position: absolute;
    left: 0;
    top: calc(50% - 1.2rem);
  }

  .controls button:last-child {
    position: absolute;
    right: 0;
    top: calc(50% - 1.2rem);
  }

  .slide {
    flex: 1 0 auto;
    width: 100%;
    height: 100%;
    background: red;
    align-items: center;
    justify-content: center;
    display: flex;
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
    color: white;
  }

  .controls {
    text-align: center;
    width: 100%;
    display: block;
  }
</style>

<svelte:window on:keyup={handleShortcut} />

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<div class="extra-outer-wrapper">
  <div class="outer-wrapper">
    <div class="inner-wrapper">
      {#each slides as slide, id}
        {#if id === cur}
        <div
          style="background: {slide.bg}"
          class="slide"
          in:hslide={transition_args}
          out:hslide={transition_args}
        >
          {slide.content}
        </div>
        {/if}
      {/each}
      <div class="controls">
        <button on:click="{()=>prev()}">
          👈
        </button>
        <button on:click="{()=>next()}">
          👉
        </button>
      </div>
    </div>
  </div>
</div>

<div class="dots">
  {#each slides as slide, i}
    <button on:click={()=>changeSlide(i)} class="dot" class:selected={cur == i}>{i+1}</button>
  {/each}
</div>

<!-- <section id="slide-1" class="slide">
  <div class="flex items-center">
    <a href="#" class="nav">👈</a>
    <img src="http://www.fillmurray.com/800/600"/>
    <a href="#" class="nav">👉</a>
  </div>
  <h1>This is a title</h1>
  <p>These are pretty good words</p>
</section>
<section id="slide-2" class="slide">
  <div class="flex items-center">
    <a href="#" class="nav">👈</a>
    <img src="http://www.fillmurray.com/900/650"/>
    <a href="#" class="nav">👉</a>
  </div>
  <h1>This is a different title</h1>
  <p>These are other good words</p>
</section> -->
