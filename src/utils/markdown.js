import path from 'path'

import formatDate from 'date-fns/format'
import matter from 'gray-matter'
import _replace from 'lodash/replace'
import _split from 'lodash/split'
import _startsWith from 'lodash/startsWith'
import marked from 'marked'
import prism from 'prismjs'
import readingTime from 'reading-time'

import 'prismjs/components/prism-jsx.min'

const EXCERPT_SEPARATOR = '<!-- more -->'
const renderer = new marked.Renderer()
const linkRenderer = renderer.link
renderer.link = (href, title, text) => {
  const html = linkRenderer.call(renderer, href, title, text)

  if (_startsWith(href, '/')) {
    // Do not open internal links on new tab
    return html
  }

  if (_startsWith(href, '#')) {
    // Handle hash links to internal elements
    const html = linkRenderer.call(renderer, 'javascript:;', title, text)

    return _replace(
      html,
      /^<a /,
      `<a onclick="document.location.hash='${href.substr(1)}';" `,
    )
  }

  return _replace(html, /^<a /, '<a target="_blank" rel="nofollow" ')
}

renderer.code = (code, language) => {
  const parser = prism.languages[language] || prism.languages.html
  const highlighted = prism.highlight(code, parser, language)

  return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`
}

marked.setOptions({ renderer })

export default () => ({
  transform(md, id) {
    if (!/\.md$/.test(id)) return null

    const fileName = path.basename(id)
    const { data, content: rawContent } = matter(md)
    const { title, date } = data
    const slug = _split(fileName, '.')[0]
    const [content, excerpt = ''] = _split(rawContent, EXCERPT_SEPARATOR)

    const html = marked(content)
    const readingStats = readingTime(content)
    const printReadingTime = readingStats.text
    const printDate = formatDate(new Date(date), 'MMMM d, yyyy')

    const exportFromModule = JSON.stringify({
      title: title || slug,
      slug,
      html,
      date,
      excerpt,
      printDate,
      printReadingTime,
      ...data,
    })

    return {
      code: `export default ${exportFromModule}`,
      map: { mappings: '' },
    }
  },
})
