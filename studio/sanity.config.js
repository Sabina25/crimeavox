import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {projectId, dataset} from './project'

export default defineConfig({
  name: 'crimeavox',
  title: 'CrimeaVox',
  projectId,
  dataset,
  plugins: [
    structureTool({
      title: 'Матеріали',
      structure: (S) =>
        S.list()
          .title('Матеріали')
          .items([
            S.documentTypeListItem('news').title('Новини'),
            S.documentTypeListItem('event').title('Події'),
            S.documentTypeListItem('blog').title('Блоги'),
          ]),
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
})
