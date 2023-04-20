import { jestInitGenerator } from '@nrwl/jest';
import {
  GeneratorCallback,
  Tree,
  addDependenciesToPackageJson,
} from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { hasNxPackage, readNxVersion } from './util';

export async function addJestPlugin(tree: Tree): Promise<GeneratorCallback> {
  const tasks: GeneratorCallback[] = [];
  const hasNrwlJestDependency: boolean = hasNxPackage(tree, '@nrwl/jest');

  if (!hasNrwlJestDependency) {
    const nxVersion = readNxVersion(tree);

    const installTask = addDependenciesToPackageJson(
      tree,
      {},
      { '@nrwl/jest': nxVersion }
    );
    tasks.push(installTask);
  }

  const jestTask = await jestInitGenerator(tree, {});
  tasks.push(jestTask);

  return runTasksInSerial(...tasks);
}
