const COPY = window.LASIDO_CONTENT.desktop.copy;
const PROPERTIES = window.LASIDO_CONTENT.shared.properties;
const REVIEWS = window.LASIDO_CONTENT.shared.reviews;

const shared = window.LaSiDoShared;
const lightbox = shared.createLightboxController({
    overlayId: "lightbox",
    imageId: "lightbox-img",
    closeId: "lightbox-close",
    hiddenClass: "hidden",
    visibleClass: "flex",
    closedOverflow: "auto",
});

let currentLang = shared.getInitialLang("en");
let navSpy = null;

function init() {
    document.documentElement.setAttribute("lang", currentLang);
    document.getElementById("lang-btn").textContent = currentLang.toUpperCase();
    renderNav();
    renderHero();
    renderProperties();
    renderReviews();
    renderBookingLinks();
    setupHeaderNavigation();
    updateTranslations();
    shared.observeRevealElements(".reveal", "active", 0.1);
}

function toggleLang() {
    currentLang = currentLang === "en" ? "vi" : "en";
    document.documentElement.setAttribute("lang", currentLang);
    document.getElementById("lang-btn").textContent = currentLang.toUpperCase();
    shared.persistLang(currentLang);
    renderNav();
    setupHeaderNavigation();
    renderReviews();
    renderBookingLinks();
    updateTranslations();
}

function renderNav() {
    const nav = document.getElementById("nav-links");
    const copy = COPY[currentLang];
    nav.innerHTML = `
        <a class="header-nav-link text-[#8b7355] hover:text-primary transition-colors duration-500" data-header-link href="#about">${copy.navAbout}</a>
        <a class="header-nav-link text-[#8b7355] hover:text-primary transition-colors duration-500" data-header-link href="#ltt">${copy.navSpaces}</a>
        <a class="header-nav-link text-[#8b7355] hover:text-primary transition-colors duration-500" data-header-link href="#reviews">${copy.navReviews}</a>
    `;
}

function renderHero() {
    const ctaContainer = document.getElementById("hero-ctas");
    ctaContainer.innerHTML = PROPERTIES.map(
        (p, idx) => `
        <a class="${idx === 0 ? "bg-white text-on-surface" : "bg-transparent border border-white text-white"} px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase hover:opacity-90 transition-all backdrop-blur-sm" href="#${p.id}">
            <span class="prop-label" data-id="${p.id}"></span>
        </a>
    `,
    ).join("");
}

function renderProperties() {
    const container = document.getElementById("properties-container");
    container.innerHTML = PROPERTIES.map(
        (p, idx) => `
        <section class="section-anchor-offset py-24 bg-surface px-8 md:px-16 lg:px-24" id="${p.id}">
            <div class="max-w-7xl mx-auto flex flex-col ${idx % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-16">
                <div class="lg:w-[55%] reveal">
                    <div class="grid grid-cols-4 grid-rows-2 gap-4 h-[600px]">
                        <div class="col-span-4 row-span-1 overflow-hidden rounded-md">
                            <img class="w-full h-full object-cover hover:scale-110 transition-transform duration-700 cursor-zoom-in" src="${p.images[0]}" onclick="openLightbox(this.src)"/>
                        </div>
                        ${p.images
                            .slice(1)
                            .map(
                                (img) => `
                            <div class="col-span-1 overflow-hidden rounded-md">
                                <img class="w-full h-full object-cover cursor-zoom-in" src="${img}" onclick="openLightbox(this.src)"/>
                            </div>
                        `,
                            )
                            .join("")}
                    </div>
                </div>
                <div class="lg:w-[45%] sticky top-32 h-fit reveal">
                    <div class="mb-4 flex gap-2">
                        <span class="px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full prop-district" data-id="${p.id}" style="background-color: ${p.accent}20; color: ${p.accent}">${p.district[currentLang]}</span>
                        <span class="bg-primary/10 text-primary px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full flex items-center gap-1">
                            <span class="material-symbols-outlined !text-xs" style="font-variation-settings: 'FILL' 1;">star</span>
                            <span class="prop-badge" data-id="${p.id}">${p.badge[currentLang]}</span>
                        </span>
                    </div>
                    <h2 class="font-headline text-5xl mb-1 text-on-surface leading-tight prop-title" data-id="${p.id}"></h2>
                    <p class="text-sm text-primary font-medium mb-6 prop-address" data-id="${p.id}"></p>
                    <div class="flex gap-6 mb-8 text-on-surface-variant font-medium text-sm">
                        ${p.stats
                            .map(
                                (s, statIndex) => `
                            <span class="flex items-center gap-2">
                                <span class="material-symbols-outlined">${s.icon}</span>
                                <span class="prop-stat-text" data-id="${p.id}" data-index="${statIndex}">${s.text[currentLang]}</span>
                            </span>
                        `,
                            )
                            .join("")}
                    </div>
                    <p class="text-on-surface-variant leading-relaxed mb-10 text-lg prop-desc" data-id="${p.id}"></p>
                    <div class="grid grid-cols-3 gap-6 mb-12">
                        ${p.features
                            .map(
                                (f, featureIndex) => `
                            <div class="flex flex-col items-center p-4 bg-surface-container rounded-lg">
                                <span class="material-symbols-outlined mb-2" style="color: ${p.accent}">${f.icon}</span>
                                <span class="text-[10px] uppercase tracking-tighter font-bold prop-feature-label" data-id="${p.id}" data-index="${featureIndex}">${f.label[currentLang]}</span>
                            </div>
                        `,
                            )
                            .join("")}
                    </div>
                    <a class="w-full text-white py-5 rounded-sm font-bold tracking-widest uppercase hover:shadow-xl transition-all flex justify-center items-center gap-3" href="${p.ctaHref}" style="background: linear-gradient(135deg, ${p.btnColor}, ${p.btnColor}dd)">
                        <span class="prop-cta" data-id="${p.id}"></span>
                        <span class="material-symbols-outlined">${p.ctaIcon}</span>
                    </a>
                </div>
            </div>
        </section>
    `,
    ).join("");
}

function renderBookingLinks() {
    const container = document.getElementById("booking-links");
    container.innerHTML = PROPERTIES.map(
        (p) => `
        <a class="group flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-6 py-5 backdrop-blur-sm transition-all hover:bg-white/16" href="${p.ctaHref}">
            <div>
                <p class="text-[11px] uppercase tracking-[0.22em] text-white/60">${p.label[currentLang]}</p>
                <p class="mt-1 font-headline text-2xl leading-tight text-white">${p.title[currentLang]}</p>
            </div>
            <span class="material-symbols-outlined transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
        </a>
    `,
    ).join("");
}

function renderReviews() {
    const container = document.getElementById("reviews-container");
    container.innerHTML = REVIEWS.map(
        (review, index) => `
        <article class="bg-surface p-10 rounded-sm shadow-sm reveal active">
            <div class="flex text-primary mb-4">
                ${shared.renderStars("material-symbols-outlined", 5, "style=\"font-variation-settings: 'FILL' 1;\"")}
            </div>
            <p class="italic text-on-surface-variant mb-6 leading-relaxed">${review.text[currentLang]}</p>
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full ${index % 2 === 0 ? "bg-surface-container-high" : "bg-surface-container"} flex items-center justify-center text-xs font-bold text-primary">
                    ${shared.initials(review.name)}
                </div>
                <div>
                    <p class="text-sm font-bold">${review.name}</p>
                    <p class="text-[10px] text-on-surface-variant uppercase tracking-widest">
                        ${review.place[currentLang]}
                    </p>
                </div>
            </div>
        </article>
    `,
    ).join("");
}

function updateTranslations() {
    const copy = COPY[currentLang];

    document.getElementById("top-cta").textContent = copy.topCta;
    document.getElementById("hero-image").alt = copy.heroImageAlt;
    document.getElementById("hero-subtitle").textContent = copy.heroSubtitle;
    document.getElementById("about-title-leading").textContent =
        copy.aboutTitleLead;
    document.getElementById("about-title-accent").textContent =
        copy.aboutTitleAccent;
    document.getElementById("about-copy").textContent = copy.aboutCopy;
    document.getElementById("about-floors-unit").textContent =
        copy.aboutFloorsUnit;
    document.getElementById("about-floors-label").textContent =
        copy.aboutFloorsLabel;
    document.getElementById("about-rating-label").textContent =
        copy.aboutRatingLabel;
    document.getElementById("about-host-value").textContent =
        copy.aboutHostValue;
    document.getElementById("about-host-label").textContent =
        copy.aboutHostLabel;
    document.getElementById("about-image").alt = copy.aboutImageAlt;
    document.getElementById("about-highlight").textContent =
        copy.aboutHighlightQuote;
    document.getElementById("quote-text").textContent = copy.quote;
    document.getElementById("reviews-title").textContent = copy.reviewsTitle;
    document.getElementById("reviews-subtitle").textContent =
        copy.reviewsSubtitle;
    document.getElementById("reviews-link").textContent = copy.reviewsLink;
    document.getElementById("booking-kicker").textContent = copy.bookingKicker;
    document.getElementById("booking-title").textContent = copy.bookingTitle;
    document.getElementById("booking-copy").textContent = copy.bookingCopy;
    document.getElementById("footer-privacy").textContent = copy.footerPrivacy;
    document.getElementById("footer-rules").textContent = copy.footerRules;
    document.getElementById("footer-contact").textContent = copy.footerContact;
    document.getElementById("footer-follow").textContent = copy.footerFollow;
    document.getElementById("footer-copy").textContent = copy.footerCopy;

    PROPERTIES.forEach((p) => {
        document
            .querySelectorAll(`.prop-label[data-id="${p.id}"]`)
            .forEach((el) => (el.textContent = p.label[currentLang]));
        document
            .querySelectorAll(`.prop-title[data-id="${p.id}"]`)
            .forEach((el) => (el.textContent = p.title[currentLang]));
        document
            .querySelectorAll(`.prop-address[data-id="${p.id}"]`)
            .forEach((el) => (el.textContent = p.address[currentLang]));
        document
            .querySelectorAll(`.prop-district[data-id="${p.id}"]`)
            .forEach((el) => (el.textContent = p.district[currentLang]));
        document
            .querySelectorAll(`.prop-badge[data-id="${p.id}"]`)
            .forEach((el) => (el.textContent = p.badge[currentLang]));
        document
            .querySelectorAll(`.prop-desc[data-id="${p.id}"]`)
            .forEach((el) => (el.textContent = p.desc[currentLang]));
        document
            .querySelectorAll(`.prop-cta[data-id="${p.id}"]`)
            .forEach((el) => (el.textContent = p.cta[currentLang]));

        document
            .querySelectorAll(`.prop-stat-text[data-id="${p.id}"]`)
            .forEach((el) => {
                const statIndex = Number(el.dataset.index);
                if (Number.isInteger(statIndex) && p.stats[statIndex]) {
                    el.textContent = p.stats[statIndex].text[currentLang];
                }
            });

        document
            .querySelectorAll(`.prop-feature-label[data-id="${p.id}"]`)
            .forEach((el) => {
                const featureIndex = Number(el.dataset.index);
                if (Number.isInteger(featureIndex) && p.features[featureIndex]) {
                    el.textContent = p.features[featureIndex].label[currentLang];
                }
            });
    });
}

function setupHeaderNavigation() {
    if (navSpy) {
        navSpy.destroy();
    }

    const nav = document.querySelector("nav");
    navSpy = shared.createScrollSpy({
        linkSelector: "[data-header-link]",
        sectionIds: ["about", "ltt", "reviews"],
        activeClass: "is-active",
        defaultActiveId: "about",
        getHeaderOffset: function () {
            return nav ? nav.offsetHeight + 12 : 0;
        },
    });
}

window.toggleLang = toggleLang;
window.openLightbox = lightbox.open;
window.closeLightbox = lightbox.close;

init();
