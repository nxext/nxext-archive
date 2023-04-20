import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from "@nrwl/nx-plugin/testing";

describe("testplugin e2e", () => {
  // Setting up individual workspaces per
  // test can cause e2e runs to take a long time.
  // For this reason, we recommend each suite only
  // consumes 1 workspace. The tests should each operate
  // on a unique project in the workspace, such that they
  // are not dependant on one another.
  beforeAll(() => {
    ensureNxProject("@nxext-archive/testplugin", "dist/packages/testplugin");
  });

  afterAll(() => {
    // `nx reset` kills the daemon, and performs
    // some work which can help clean up e2e leftovers
    runNxCommandAsync("reset");
  });

  it("should create testplugin", async () => {
    const project = uniq("testplugin");
    await runNxCommandAsync(
      `generate @nxext-archive/testplugin:testplugin ${project}`
    );
    const result = await runNxCommandAsync(`build ${project}`);
    expect(result.stdout).toContain("Executor ran");
  }, 120000);

  describe("--directory", () => {
    it("should create src in the specified directory", async () => {
      const project = uniq("testplugin");
      await runNxCommandAsync(
        `generate @nxext-archive/testplugin:testplugin ${project} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${project}/src/index.ts`)
      ).not.toThrow();
    }, 120000);
  });

  describe("--tags", () => {
    it("should add tags to the project", async () => {
      const projectName = uniq("testplugin");
      ensureNxProject("@nxext-archive/testplugin", "dist/packages/testplugin");
      await runNxCommandAsync(
        `generate @nxext-archive/testplugin:testplugin ${projectName} --tags e2etag,e2ePackage`
      );
      const project = readJson(`libs/${projectName}/project.json`);
      expect(project.tags).toEqual(["e2etag", "e2ePackage"]);
    }, 120000);
  });
});
