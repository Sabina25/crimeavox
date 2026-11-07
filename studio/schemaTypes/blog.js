import {defineType, defineField} from 'sanity'
import {titleField, slugField, dateField, imageField, leadField, bodyField} from './shared'

export const blog = defineType({
  name: 'blog',
  title: 'Блоги',
  type: 'document',
  icon: () => '✍️',
  fields: [
    titleField,
    slugField,
    defineField({
      name: 'author',
      title: 'Автор',
      description: 'Для анонімних авторів з окупованого Криму напишіть «Анонімний автор».',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({name: 'role', title: 'Хто автор', description: 'Наприклад: історик, журналістка, з окупованого Криму', type: 'string'}),
    dateField(),
    imageField,
    leadField,
    bodyField,
  ],
  orderings: [{title: 'Спочатку нові', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', author: 'author', date: 'date', media: 'image'},
    prepare: ({title, author, date, media}) => ({title, subtitle: [author, date].filter(Boolean).join(', '), media}),
  },
})
