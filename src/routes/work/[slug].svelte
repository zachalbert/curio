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
  }
</script>

<script>
  import {send, receive} from '../../crossfade.js';
  import Bio from '../../components/Bio.svelte'
  export let post
  console.log(post)
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
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<header out:send="{{key: 'header'}}" in:receive="{{key: 'header'}}">
  <p>{post.printDate} ~ {post.printReadingTime}</p>
  <h1>{post.title}</h1>
  <a rel='prefetch' href='work/present/{post.slug}' class="bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold py-3 px-6 rounded">▶ Presentation Mode</a>
  <hr />
</header>
<div class="container" out:send="{{key: 'body'}}" in:receive="{{key: 'body'}}">
  <blockquote>{post.description}</blockquote>
  <article class="content">
    {@html post.html}
  </article>
  <hr />
  <Bio />
</div>
