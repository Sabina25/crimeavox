import {defineType, defineField} from 'sanity'
import {titleField, slugField, dateField, imageField, leadField, bodyField, preview} from './shared'

export const news = defineType({
  name: 'news',
  title: 'Новини',
  type: 'document',
  icon: () => '📰',
  fields: [
    titleField,
    defineField({
      name: 'accent',
      title: 'Виділити червоним',
      description: 'Частина заголовка, яка буде на червоній плашці. Наприклад: заголовок «270 наших людей», виділення «вдома». Можна залишити порожнім.',
      type: 'string',
    }),
    slugField,
    defineField({
      name: 'rubric',
      title: 'Рубрика',
      type: 'string',
      options: {
        list: [
          {title: 'Новини', value: 'news'},
          {title: 'Права людини', value: 'rights'},
          {title: 'Історія', value: 'history'},
          {title: 'Культура', value: 'culture'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'news',
      validation: (r) => r.required(),
    }),
    dateField(),
    imageField,
    leadField,
    bodyField,
  ],
  orderings: [{title: 'Спочатку нові', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: preview('date'),
})
