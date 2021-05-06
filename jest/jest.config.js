module.exports = {
    verbose: true,
    rootDir: '../',
    globals: {
      crypto: require('crypto')
    },
    transform: {
        "\\.[jt]sx?$": "babel-jest",
        "^.+\\.svg$": "jest-svg-transformer"
    },
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/jest/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/jest/__mocks__/styleMock.js"
    },
    setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.js'],
    transformIgnorePatterns: [ "/node_modules/(?!costco-common-lib)"],
    modulePathIgnorePatterns:  ['<rootDir>/cypress'],
}