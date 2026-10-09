(function () {
  var button = document.querySelector("[data-theme-toggle]");
  if (!button) {
    return;
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function syncButton() {
    var isDark = currentTheme() === "dark";
    button.textContent = isDark ? "Світла тема" : "Темна тема";
    button.setAttribute("aria-pressed", isDark ? "true" : "false");
    button.setAttribute("aria-label", isDark ? "Увімкнути світлу тему" : "Увімкнути темну тему");
  }

  button.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (error) {
      /* Тема лишається на час цього візиту. */
    }
    syncButton();
  });

  syncButton();
})();
