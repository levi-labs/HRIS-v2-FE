import prettierPluginTailwindCSS from "prettier-plugin-tailwindcss";

/** @type {import("prettier").Config} */
export default {
  plugins: [prettierPluginTailwindCSS],
  semi: true,
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  trailingComma: "es5",
};
