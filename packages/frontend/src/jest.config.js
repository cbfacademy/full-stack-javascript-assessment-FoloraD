module.exports = {
    "moduleNameMapper": {
      '\\.(css|less|scss)$': 'identity-obj-proxy',

  },
    "transform": {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    "moduleFileExtensions": [
      "js",
      "jsx",
      "json",
      "ts",
      "tsx",
      "css",
    ],
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules/",
    ],

  };
