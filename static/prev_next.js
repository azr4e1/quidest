let thisPage = new URL(window.location.href)

let is_filtered = thisPage.searchParams.get("collection")
let id = document.head.querySelector("[name=custom_id]").content
if (is_filtered !== null) {
  var article_tree = JSON.parse(localStorage.getItem(is_filtered))
  var prev = article_tree[id]['prev']
  var next = article_tree[id]['next']

  var content = document.getElementsByTagName('content')[0]
  if (prev !== undefined) {
    const prev_tag = document.createElement("a");
    prev_tag.setAttribute('href', prev);
    prev_tag.setAttribute('class', "prev_button");
    prev_tag.textContent = "<";
    content.appendChild(prev_tag)
  }
  if (next !== undefined) {
    const next_tag = document.createElement("a");
    next_tag.setAttribute('href', next);
    next_tag.setAttribute('class', "next_button");
    next_tag.textContent = ">";
    content.appendChild(next_tag)
  }
}
