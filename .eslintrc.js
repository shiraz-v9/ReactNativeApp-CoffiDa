module.exports = {
    "extends": ["airbnb-base/legacy", "prettier", "prettier/react"],
    "parser": "babel-eslint",
    "ecmaFeatures": {
        "classes": true
    },
    "rules": {
        "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "linebreak-style": ["error", "windows"]
    }
};