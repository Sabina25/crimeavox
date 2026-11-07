import {defineType, defineField} from 'sanity'
import {titleField, slugField, dateField, imageField, leadField, bodyField} from './shared'

export const event = defineType({
  name: 'event',
  title: 'Події',
  type: 'document',
  icon: () => '📅',
  fields: [
    titleField,
    slugField,
    defineField({
      name: 'type',
      title: 'Тип події',
      type: 'string',
      options: {list: ['Вистава', 'Кінопоказ', 'Запис подкасту', 'Лекція', 'Дискусія', 'Презентація', 'Концерт', 'Виставка', 'Акція', 'Зустріч']},
      initialValue: 'Зустріч',
    }),
    dateField('Дата події'),
    defineField({
      name: 'time',
      title: 'Час',
      description: 'Наприклад: 19:00',
      type: 'string',
      validation: (r) => r.regex(/^([01]?\d|2[0-3]):[0-5]\d$/, {name: 'час', invert: false}).warning('Формат: 19:00'),
    }),
    defineField({name: 'city', title: 'Місто', type: 'string', initialValue: 'Київ'}),
    defineField({name: 'place', title: 'Місце', description: 'Наприклад: Театр Лесі Українки', type: 'string'}),
    defineField({name: 'link', title: 'Посилання на реєстрацію або квитки', type: 'url'}),
    imageField,
    leadField,
    bodyField,
  ],
  orderings: [{title: 'За датою події', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', date: 'date', city: 'city', media: 'image'},
    prepare: ({title, date, city, media}) => ({title, subtitle: [date, city].filter(Boolean).join(', '), media}),
  },
})
