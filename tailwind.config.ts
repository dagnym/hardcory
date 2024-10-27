import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        darkshire: "url('/images/darkshire.jpg')",
        gnome: "url('/images/gnom.png')",
        tavern:
          "url('https://live.staticflickr.com/1095/1361791150_2dcd86f2b1_b.jpg')",
        ironforge:
          "url('https://64.media.tumblr.com/1e9d53a2c76ccdd588e0441eb5abf0a6/tumblr_poxutqitVS1xnzat4o1_r1_1280.jpg')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
