tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#8b7355",
                "primary-container": "#a08c6d",
                surface: "#faf7f2",
                "surface-bright": "#faf7f2",
                "surface-container": "#f0e9df",
                "surface-container-low": "#f6f1e8",
                "on-primary": "#ffffff",
                "on-surface": "#1f1b16",
                "on-surface-variant": "#5c5145",
            },
            borderRadius: {
                DEFAULT: "0.125rem",
                lg: "0.25rem",
                xl: "0.5rem",
            },
            fontFamily: {
                headline: ["Noto Serif"],
                body: ["Inter"],
                label: ["Inter"],
            },
        },
    },
};
