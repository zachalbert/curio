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
  import {send, receive} from '../../../crossfade.js';
  export let post
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

  .slide {
    @apply w-screen h-screen bg-gray-900 text-white text-center;
  }

  .slide img {
    @apply m-auto my-16;
  }

  .nav {
    @apply p-12 text-4xl opacity-75 transition;
  }

  .nav:hover {
    @apply opacity-100 transition;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<!-- <header out:send="{{key: 'header'}}" in:receive="{{key: 'header'}}">
  <p>{post.printDate} ~ {post.printReadingTime}</p>
  <h1>{post.title}</h1>
  <hr />
</header>
<div class="container" out:send="{{key: 'body'}}" in:receive="{{key: 'body'}}">
  <blockquote>{post.description}</blockquote>
  <article class="content">
    {@html post.html}
  </article>
  <hr />
</div> -->
<section id="slide-1" class="slide">
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
</section>
