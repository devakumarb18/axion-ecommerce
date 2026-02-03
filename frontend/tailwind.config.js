/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'brand-red': '#D70101',
                'brand-white': '#FAFAFA',
                'brand-black': '#0C0C0C',
            },
            fontFamily: {
                'pin-sans': ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
