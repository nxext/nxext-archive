/* eslint-disable */
export default {
  displayName: "testplugin-e2e",
  preset: "../../jest.preset.js",
  transform: {
    "^.+\\.[tj]s$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }],
  },
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../coverage/e2e/testplugin-e2e",
};
