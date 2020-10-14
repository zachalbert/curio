# Help

* Posts have some front matter called `sections:`, which isn't showing. `{post.title}` is fine, but logging `{post}` does not show `sections` existing at all.
* Use a different layout when on routes `/work/present/*`. Sapper has `{segment}`, but it only returns the parent route (e.g. `/work`). The goal is to make the `/present/` routes use a different header and no footer.
* Make slides on "slide" on `/work/present/test-project`

---

# About

This is a svelte + sapper powered portfolio for designers. Create structured case studies, and easily switch to presentation mode for interviews.

This template is based on [this blog template](https://github.com/Charca/sapper-blog-template), with some added fanciness to make building a visual-focused portfolio easy:

----

# sapper-blog-template

A starter template for building markdown-powered blogs with [Sapper](https://github.com/sveltejs/sapper) and [Svelte](https://github.com/sveltejs/svelte).

### 👉 [Demo](https://sapper-blog-template.netlify.com/)

## ✨ Getting started

```bash
npx degit Charca/sapper-blog-template my-blog
cd my-blog
npm install # or yarn!
npm run dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

Consult [sapper.svelte.dev](https://sapper.svelte.dev) for help getting started.

## 🏗 Structure

The base structure of this template is the same as Sapper's [default template](https://github.com/sveltejs/sapper-template/). These are some of the new things you'll find here:

### src/routes/blog

This is the home of your blog. The most important files in here are:

- `_posts.js`: this module contains the logic for loading and parsing your markdown posts.
- `[slug].svelte`: this is the template of your blog post page.
- `index.svelte`: this is the template of your article list page.

### src/routes/blog/posts

This is where your markdown posts live in. All `.md` files in this directory are treated as blog posts and parsed automatically by the `_posts.js` module.

- The markdown file name becomes the post slug. For example `hello-world.md` becomes `http://localhost:3000/blog/hello-world`.
- Everything between the start of the post and the `<!-- more -->` tag becomes the article's "excerpt".
- Frontmatter properties supported are `title` and `date`.

## 🚀 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Charca/sapper-blog-template)


## 🐛 Bugs and feedback

Sapper is in early development, and may have the odd rough edge here and there. Please be vocal over on the [Sapper issue tracker](https://github.com/sveltejs/sapper/issues).
