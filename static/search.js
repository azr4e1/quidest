function getHref(article) {
  let link = article.getElementsByTagName('a')[0];
  let href = link.getAttribute('href');

  return href;
}

function setHref(article) {
  let href = getHref(article)
  let variable = "?collection=filtered_articles"
  if (!href.includes(variable)) {
    href = href + variable
  }
  let link = article.getElementsByTagName('a')[0];
  link.setAttribute('href', href)
}

let search = document.getElementById('wiki-search');
let articles = document.querySelectorAll(".article-item");
let bigList = document.querySelector('ul.blog-posts');

search.addEventListener('input', function() {
  bigList.innerHTML = '';
  var article_tree = new Object();
  for (var article of articles) {
    var search_el = search.value.toLowerCase().trim().split(/\s+/);
    var contains = true;
    var next;
    for (var el of search_el){
      if (!article.id.toLowerCase().includes(el)) {
        contains = false;
        break;
      }
    }
    if (contains) {
      setHref(article)
      if (next !== undefined) {
        if (article_tree[next.id] === undefined) {
          article_tree[next.id] = new Object();
        }
        if (article_tree[article.id] === undefined) {
          article_tree[article.id] = new Object();
        }
        article_tree[next.id]['prev'] = getHref(article);
        article_tree[article.id]['next'] = getHref(next);
      }
      bigList.appendChild(article);
      next = article;
    }
  }
  localStorage.setItem('filtered_articles', JSON.stringify(article_tree))
})


localStorage.setItem
