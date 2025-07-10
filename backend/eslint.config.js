import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
	{ ignores: ["dist", "node_modules"] },
	js.configs.recommended,
	prettier,
	{
		files: ["**/*.js"],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
		rules: {
			"no-console": "warn",
			eqeqeq: "error",
		},
	},
	{
		files: ["**/*.test.js"],
		languageOptions: {
			globals: {
				...globals.jest,
			},
		},
	},
];
