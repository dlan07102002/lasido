(function () {
    var DESKTOP_PATH = "/desktop-data-driven.html";
    var MOBILE_PATH = "/mobile-data-driven.html";
    var MOBILE_QUERY = "(max-width: 767.98px)";

    function selectPath() {
        return window.matchMedia(MOBILE_QUERY).matches
            ? MOBILE_PATH
            : DESKTOP_PATH;
    }

    function stripViewportRedirect(html) {
        return html.replace(
            /<script>\s*\(function\s*\(\)\s*\{[\s\S]*?window\.location\.replace\([\s\S]*?\)\s*;\s*[\s\S]*?\}\)\(\);\s*<\/script>/i,
            "",
        );
    }

    function loadVariant() {
        var targetPath = selectPath();

        fetch(targetPath, { cache: "no-store" })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Failed to load " + targetPath);
                }
                return response.text();
            })
            .then(function (html) {
                var sanitizedHtml = stripViewportRedirect(html);
                document.open();
                document.write(sanitizedHtml);
                document.close();
            })
            .catch(function (error) {
                document.body.innerHTML =
                    '<main style="font-family: sans-serif; padding: 24px;">' +
                    "<h1>Unable to load page</h1>" +
                    "<p>" +
                    error.message +
                    "</p>" +
                    "</main>";
            });
    }

    loadVariant();
})();
