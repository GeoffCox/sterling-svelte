import sdk from '@stackblitz/sdk';
import { sterlingSvelteProject } from './template';

export const createProject = (exampleSvelte: string) => {
  const project = {
    ...sterlingSvelteProject
  };

  project.files['src/Example.svelte'] = exampleSvelte;

  sdk.openProject(sterlingSvelteProject, {
    openFile: 'index.js'
  });
};
