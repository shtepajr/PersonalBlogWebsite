(function () {
  var TAG_ORDER = ["C#", "DevOps", "AI", "Cursor"];
  var search = document.getElementById("search");
  var tagFilters = document.getElementById("tag-filters");
  var cardList = document.getElementById("card-list");
  var empty = document.getElementById("empty");
  var resultMeta = document.getElementById("result-meta");
  var query = "";
  var activeTag = "Усі";

  function sortedPosts() {
    return POSTS.slice().sort(function (a, b) {
      return a.date < b.date ? 1 : -1;
    });
  }

  function matches(post) {
    var title = post.title.toLowerCase();
    var titleOk = title.indexOf(query.trim().toLowerCase()) !== -1;
    var tagOk = activeTag === "Усі" || post.tags.indexOf(activeTag) !== -1;
    return titleOk && tagOk;
  }

  function tagList() {
    var present = {};
    POSTS.forEach(function (post) {
      post.tags.forEach(function (tag) {
        present[tag] = true;
      });
    });
    return ["Усі"].concat(TAG_ORDER.filter(function (tag) {
      return present[tag];
    }));
  }

  function renderTags() {
    tagFilters.replaceChildren();
    tagList().forEach(function (tag) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "tag";
      button.textContent = tag;
      button.setAttribute("aria-pressed", tag === activeTag ? "true" : "false");
      button.addEventListener("click", function () {
        activeTag = tag;
        render();
      });
      tagFilters.appendChild(button);
    });
  }

  function renderCards(posts) {
    cardList.replaceChildren();
    posts.forEach(function (post) {
      var item = document.createElement("li");
      item.className = "card";

      var title = document.createElement("h2");
      title.className = "card-title";
      var link = document.createElement("a");
      link.href = "article.html?slug=" + encodeURIComponent(post.slug);
      link.textContent = post.title;
      title.appendChild(link);

      var meta = document.createElement("p");
      meta.className = "card-meta";
      meta.textContent = post.dateLabel + " · " + post.readingMinutes + " хв читання";

      var tags = document.createElement("div");
      tags.className = "card-tags";
      post.tags.forEach(function (tag) {
        var chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = tag;
        tags.appendChild(chip);
      });

      item.append(title, meta, tags);
      cardList.appendChild(item);
    });
  }

  function render() {
    var visible = sortedPosts().filter(matches);
    renderTags();
    renderCards(visible);
    empty.hidden = visible.length !== 0;
    cardList.hidden = visible.length === 0;
    resultMeta.textContent = countLabel(visible.length);
  }

  function countLabel(count) {
    var mod10 = count % 10;
    var mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) {
      return count + " матеріал";
    }
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
      return count + " матеріали";
    }
    return count + " матеріалів";
  }

  search.addEventListener("input", function () {
    query = search.value;
    render();
  });

  render();
})();
