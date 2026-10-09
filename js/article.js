(function () {
  var article = document.getElementById("article");
  var missing = document.getElementById("missing");
  var params = new URLSearchParams(window.location.search);
  var slug = params.get("slug");
  var post = POSTS.find(function (item) {
    return item.slug === slug;
  });

  if (!post) {
    document.title = "Статтю не знайдено — Нотатки";
    missing.hidden = false;
    return;
  }

  document.title = post.title + " — Нотатки";

  var kicker = document.createElement("p");
  kicker.className = "kicker";
  kicker.textContent = post.tags.join(" · ");

  var title = document.createElement("h1");
  title.textContent = post.title;

  var meta = document.createElement("p");
  meta.className = "article-meta";
  meta.textContent = post.dateLabel + " · " + post.readingMinutes + " хв читання";

  var body = document.createElement("div");
  body.className = "article-body";
  body.innerHTML = post.body;

  article.append(kicker, title, meta, body);
  article.hidden = false;
})();
