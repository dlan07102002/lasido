const COPY = window.LASIDO_CONTENT.mobile.copy;
const PROPERTIES = window.LASIDO_CONTENT.shared.properties;
const REVIEWS = window.LASIDO_CONTENT.shared.reviews;

const shared = window.LaSiDoShared;
const lightbox = shared.createLightboxController({
    overlayId: "lightbox",
    imageId: "lightbox-img",
    closeId: "lightbox-close",
    hiddenClass: "hidden",
    visibleClass: "flex",
    closedOverflow: "",
});

let currentLang = shared.getInitialLang("en");
let navSpy = null;

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    shared.persistLang(lang);
    renderPage();
}

function renderHeroCtas() {
    return PROPERTIES.map(
        (property, index) => `
        <a class="${index === 0 ? "bg-white text-on-surface" : "border border-white/30 bg-white/10 text-white"} inline-flex items-center rounded-full px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md" href="#${property.id}">
            ${property.label[currentLang]}
        </a>
    `,
    ).join("");
}

function renderProperties() {
    const container = document.getElementById("properties-container");
    container.innerHTML = PROPERTIES.map(
        (property) => `
        <article class="overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-sm" id="${property.id}">
            <div class="relative h-[280px]">
                <img alt="${property.title[currentLang]}" class="h-full w-full object-cover" src="${property.images[0]}"/>
                <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4">
                    <div class="flex flex-wrap gap-2">
                        <span class="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]" style="background-color: ${property.accent}22; color: ${property.accent}">
                            ${property.district[currentLang]}
                        </span>
                        <span class="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface">
                            <span class="material-symbols-outlined !text-xs" style="font-variation-settings: 'FILL' 1;">star</span>
                            ${property.badge[currentLang]}
                        </span>
                    </div>
                </div>
            </div>
            <div class="p-5">
                <p class="text-[11px] uppercase tracking-[0.24em]" style="color: ${property.accent}">${property.label[currentLang]}</p>
                <h2 class="mt-2 font-headline text-3xl leading-tight text-on-surface">${property.title[currentLang]}</h2>
                <p class="mt-3 text-sm leading-6 text-on-surface-variant">${property.address[currentLang]}</p>
                <div class="mt-4 grid grid-cols-1 gap-2 rounded-2xl bg-surface-container p-4 text-sm text-on-surface-variant">
                    ${property.stats
                        .map(
                            (stat) => `
                        <div class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-primary">${stat.icon}</span>
                            <span>${stat.text[currentLang]}</span>
                        </div>
                    `,
                        )
                        .join("")}
                </div>
                <p class="mt-4 text-sm leading-6 text-on-surface-variant">${property.desc[currentLang]}</p>
                <div class="mt-5 flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                    ${property.images
                        .map(
                            (image, imageIndex) => `
                        <button class="shrink-0 ${imageIndex === 0 ? "w-32" : "w-24"} h-24 overflow-hidden rounded-2xl" onclick="openLightbox('${image}')" type="button">
                            <img alt="" class="h-full w-full object-cover" src="${image}"/>
                        </button>
                    `,
                        )
                        .join("")}
                </div>
                <div class="mt-5 grid grid-cols-3 gap-3">
                    ${property.features
                        .map(
                            (feature) => `
                        <div class="rounded-2xl bg-surface-container-low px-3 py-4 text-center">
                            <span class="material-symbols-outlined" style="color: ${property.accent}">${feature.icon}</span>
                            <p class="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface">${feature.label[currentLang]}</p>
                        </div>
                    `,
                        )
                        .join("")}
                </div>
                <a class="mt-5 flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white" href="${property.ctaHref}" style="background: linear-gradient(135deg, ${property.accent}, ${property.accent}dd)">
                    <span>${property.cta[currentLang]}</span>
                    <span class="material-symbols-outlined !text-base">arrow_forward</span>
                </a>
            </div>
        </article>
    `,
    ).join("");
}

function renderReviews() {
    const container = document.getElementById("reviews-container");
    container.innerHTML = REVIEWS.map(
        (review, index) => `
        <article class="rounded-[2rem] border border-primary/10 bg-white px-5 py-5 shadow-sm">
            <div class="flex items-center gap-1 text-primary">
                ${shared.renderStars("material-symbols-outlined !text-base", 5, "style=\"font-variation-settings: 'FILL' 1;\"")}
            </div>
            <p class="mt-4 font-headline text-lg italic leading-7 text-on-surface-variant">${review.text[currentLang]}</p>
            <div class="mt-5 flex items-center gap-3">
                <div class="flex h-11 w-11 items-center justify-center rounded-full ${index % 2 === 0 ? "bg-surface-container" : "bg-surface-container-high"} font-semibold text-primary">
                    ${shared.initials(review.name)}
                </div>
                <div>
                    <p class="text-sm font-semibold text-on-surface">${review.name}</p>
                    <p class="text-[11px] uppercase tracking-[0.18em] text-on-surface-variant">${review.place[currentLang]}</p>
                </div>
            </div>
        </article>
    `,
    ).join("");
}

function renderBookingLinks() {
    const container = document.getElementById("booking-links");
    container.innerHTML = PROPERTIES.map(
        (property) => `
        <a class="flex items-center justify-between rounded-2xl bg-white/12 px-4 py-4 backdrop-blur-sm" href="${property.ctaHref}">
            <div>
                <p class="text-[11px] uppercase tracking-[0.22em] text-white/60">${property.label[currentLang]}</p>
                <p class="mt-1 font-headline text-xl">${property.title[currentLang]}</p>
            </div>
            <span class="material-symbols-outlined">arrow_forward</span>
        </a>
    `,
    ).join("");
}

function renderStaticCopy() {
    const copy = COPY[currentLang];
    document.getElementById("lang-btn").textContent = currentLang.toUpperCase();
    document.getElementById("top-cta").textContent = copy.topCta;
    document.getElementById("hero-image").alt = copy.heroImageAlt;
    document.getElementById("hero-kicker").textContent = copy.heroKicker;
    document.getElementById("hero-subtitle").textContent = copy.heroSubtitle;
    document.getElementById("about-floors-unit").textContent = copy.aboutFloorsUnit;
    document.getElementById("about-rating-label").textContent = copy.aboutRatingLabel;
    document.getElementById("about-host-value").textContent = copy.aboutHostValue;
    document.getElementById("about-host-label").textContent = copy.aboutHostLabel;
    document.getElementById("about-title").textContent = copy.aboutTitle;
    document.getElementById("about-copy").textContent = copy.aboutCopy;
    document.getElementById("hero-ctas").innerHTML = renderHeroCtas();
    document.getElementById("quote-text").textContent = copy.quote;
    document.getElementById("reviews-kicker").textContent = copy.reviewsKicker;
    document.getElementById("reviews-title").textContent = copy.reviewsTitle;
    document.getElementById("reviews-subtitle").textContent = copy.reviewsSubtitle;
    document.getElementById("reviews-link").textContent = copy.reviewsLink;
    document.getElementById("booking-kicker").textContent = copy.bookingKicker;
    document.getElementById("booking-title").textContent = copy.bookingTitle;
    document.getElementById("booking-copy").textContent = copy.bookingCopy;
    document.getElementById("footer-follow").textContent = copy.footerFollow;
    document.getElementById("social-facebook-subtitle").textContent =
        copy.socialFacebookSubtitle;
    document.getElementById("social-instagram-subtitle").textContent =
        copy.socialInstagramSubtitle;
    document.getElementById("footer-privacy").textContent = copy.footerPrivacy;
    document.getElementById("footer-terms").textContent = copy.footerTerms;
    document.getElementById("footer-contact").textContent = copy.footerContact;
    document.getElementById("footer-copy").textContent = copy.footerCopy;
    document.getElementById("nav-stays").textContent = copy.navStays;
    document.getElementById("nav-reviews").textContent = copy.navReviews;
    document.getElementById("nav-booking").textContent = copy.navBooking;
}

function renderPage() {
    renderStaticCopy();
    renderProperties();
    renderReviews();
    renderBookingLinks();
    setupBottomNav();
}

function setupBottomNav() {
    if (navSpy) {
        navSpy.destroy();
    }

    navSpy = shared.createScrollSpy({
        linkSelector: "[data-nav-link]",
        sectionIds: ["properties-container", "reviews", "booking"],
        activeClass: "bottom-nav-link-active",
        defaultActiveId: "properties-container",
        getHeaderOffset: function () {
            return 88;
        },
    });
}

document.getElementById("lang-btn").addEventListener("click", function () {
    setLanguage(currentLang === "en" ? "vi" : "en");
});

window.openLightbox = lightbox.open;
window.closeLightbox = lightbox.close;

renderPage();
