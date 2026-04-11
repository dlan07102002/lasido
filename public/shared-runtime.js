(function () {
    const STORAGE_KEY = "preferred-lang";

    function getInitialLang(fallback) {
        return window.localStorage.getItem(STORAGE_KEY) || fallback || "en";
    }

    function persistLang(lang) {
        window.localStorage.setItem(STORAGE_KEY, lang);
    }

    function initials(name) {
        return String(name || "")
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2);
    }

    function renderStars(className, count, attributes) {
        return Array.from({ length: count || 5 }, function () {
            return (
                '<span class="' +
                className +
                '"' +
                (attributes ? " " + attributes : "") +
                ">star</span>"
            );
        }).join("");
    }

    function createLightboxController(options) {
        const overlay = document.getElementById(options.overlayId);
        const image = document.getElementById(options.imageId);
        const closeButton = options.closeId
            ? document.getElementById(options.closeId)
            : null;
        const hiddenClass = options.hiddenClass || "hidden";
        const visibleClass = options.visibleClass || "flex";
        const closedOverflow =
            typeof options.closedOverflow === "string"
                ? options.closedOverflow
                : "auto";

        function open(src) {
            image.src = src;
            overlay.classList.remove(hiddenClass);
            overlay.classList.add(visibleClass);
            document.body.style.overflow = "hidden";
        }

        function close() {
            overlay.classList.add(hiddenClass);
            overlay.classList.remove(visibleClass);
            document.body.style.overflow = closedOverflow;
        }

        overlay.addEventListener("click", close);

        if (closeButton) {
            closeButton.addEventListener("click", function (event) {
                event.stopPropagation();
                close();
            });
        }

        return {
            open: open,
            close: close,
        };
    }

    function observeRevealElements(selector, activeClass, threshold) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(activeClass || "active");
                    }
                });
            },
            { threshold: typeof threshold === "number" ? threshold : 0.1 },
        );

        document.querySelectorAll(selector || ".reveal").forEach(function (el) {
            observer.observe(el);
        });

        return observer;
    }

    function createScrollSpy(config) {
        const links = Array.from(document.querySelectorAll(config.linkSelector));
        const sections = config.sectionIds.map(function (id) {
            return { id: id, node: document.getElementById(id) };
        });
        const activeClass = config.activeClass || "is-active";
        const defaultActiveId = config.defaultActiveId || config.sectionIds[0];
        const lockDuration = config.lockDuration || 700;
        const releaseDistance = config.releaseDistance || 8;
        const getHeaderOffset =
            config.getHeaderOffset ||
            function () {
                return 0;
            };

        let lockedActiveId = null;
        let lockedScrollTop = null;
        let unlockTimer = null;

        function setActiveLink(activeId) {
            links.forEach(function (link) {
                const isActive = link.getAttribute("href") === "#" + activeId;
                link.classList.toggle(activeClass, isActive);
                link.setAttribute("aria-current", isActive ? "page" : "false");
            });
        }

        function releaseActiveLock() {
            lockedActiveId = null;
            lockedScrollTop = null;
            if (unlockTimer) {
                window.clearTimeout(unlockTimer);
                unlockTimer = null;
            }
        }

        function lockActiveLink(activeId, scrollTop) {
            lockedActiveId = activeId;
            lockedScrollTop = scrollTop;
            setActiveLink(activeId);

            if (unlockTimer) {
                window.clearTimeout(unlockTimer);
            }

            unlockTimer = window.setTimeout(function () {
                releaseActiveLock();
                updateActiveSection();
            }, lockDuration);
        }

        function updateActiveSection() {
            if (!links.length || !sections.length) return;

            if (lockedActiveId !== null) {
                if (Math.abs(window.scrollY - lockedScrollTop) <= releaseDistance) {
                    releaseActiveLock();
                } else {
                    setActiveLink(lockedActiveId);
                    return;
                }
            }

            const scrollPosition = window.scrollY + getHeaderOffset() + 24;
            let activeId = defaultActiveId;

            sections.forEach(function (section) {
                if (!section.node) return;
                if (section.node.offsetTop <= scrollPosition) {
                    activeId = section.id;
                }
            });

            setActiveLink(activeId);
        }

        function handleNavClick(event) {
            const href = event.currentTarget.getAttribute("href");
            if (!href || href.charAt(0) !== "#") return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            const top = Math.max(target.offsetTop - getHeaderOffset(), 0);
            lockActiveLink(href.slice(1), top);
            window.scrollTo({ top: top, behavior: "smooth" });
        }

        function attach() {
            links.forEach(function (link) {
                link.addEventListener("click", handleNavClick);
            });
            window.addEventListener("scroll", updateActiveSection, {
                passive: true,
            });
            window.addEventListener("resize", updateActiveSection);
            window.addEventListener("load", updateActiveSection);
            updateActiveSection();
        }

        function detach() {
            links.forEach(function (link) {
                link.removeEventListener("click", handleNavClick);
            });
            window.removeEventListener("scroll", updateActiveSection);
            window.removeEventListener("resize", updateActiveSection);
            window.removeEventListener("load", updateActiveSection);
            if (unlockTimer) {
                window.clearTimeout(unlockTimer);
            }
        }

        attach();

        return {
            update: updateActiveSection,
            destroy: detach,
        };
    }

    window.LaSiDoShared = {
        createLightboxController: createLightboxController,
        createScrollSpy: createScrollSpy,
        getInitialLang: getInitialLang,
        initials: initials,
        observeRevealElements: observeRevealElements,
        persistLang: persistLang,
        renderStars: renderStars,
    };
})();
