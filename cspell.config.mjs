import { defineConfig } from 'cspell';

export default defineConfig({
  version: '0.2',
  files: ['**/*.md'],
  dictionaryDefinitions: [
    {
      name: 'project-words',
      path: './project-words.txt',
      addWords: true
    }
  ],
  dictionaries: ['project-words'],
  ignorePaths: ['node_modules', '/project-words.txt']
});
