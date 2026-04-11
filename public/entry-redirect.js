(function () {
    var isMobile = window.matchMedia("(max-width: 767.98px)").matches;
    var target = isMobile
        ? "mobile-data-driven.html"
        : "desktop-data-driven.html";

    window.location.replace(target);
})();
