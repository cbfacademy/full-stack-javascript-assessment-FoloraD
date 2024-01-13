module.exports = {
    "transform": {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
      "^.+\\.(css|less|scss)$": "react-scripts/config/jest/cssTransform.js"
    },
    "moduleFileExtensions": [
      "js",
      "jsx",
      "json",
      "ts",
      "tsx"
    ],
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules/"
    ]
  };