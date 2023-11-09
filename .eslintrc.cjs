module.exports = {
    "env": {
        "browser": true,
        "es2022": true,
        "jest": true
    },
    "extends": [
        "airbnb-typescript",
        "airbnb/hooks",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:import/recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [ "react", "@typescript-eslint", "jest" ],
    "rules": {
        "import/extensions": "off",
        "@typescript-eslint/no-explicit-any":"off",
    }
}
