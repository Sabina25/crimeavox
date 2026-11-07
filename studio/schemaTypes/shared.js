import {defineField, defineArrayMember} from 'sanity'

// Українська транслітерація для адрес сторінок: «Повінь у Криму» → povin-u-krymu
const TR = {а:'a',б:'b',в:'v',г:'h',ґ:'g',д:'d',е:'e',є:'ie',ж:'zh',з:'z',и:'y',і:'i',ї:'i',й:'i',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'shch',ь:'',ю:'iu',я:'ia',ы:'y',э:'e',ё:'io',ъ:''}
export const slugify = (input) =>
  input.toLowerCase().split('').map((c) => TR[c] ?? c).join('')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').split('-').slice(0, 8).join('-')

export const titleField = defineField({
  name: 'title',
  title: 'Заголовок',
  type: 'string',
  validation: (r) => r.required().max(160),
})

export const slugField = defineField({
  name: 'slug',
  title: 'Адреса сторінки',
  description: 'Натисніть «Generate», щоб створити з заголовка.',
  type: 'slug',
  options: {source: 'title', slugify, maxLength: 96},
  validation: (r) => r.required(),
})

export const dateField = (title = 'Дата публікації') => defineField({
  name: 'date',
  title,
  type: 'date',
  initialValue: () => new Date().toISOString().slice(0, 10),
  validation: (r) => r.required(),
})

export const imageField = defineField({
  name: 'image',
  title: 'Фото',
  type: 'image',
  options: {hotspot: true},
  fields: [defineField({name: 'alt', title: 'Опис фото (для незрячих)', type: 'string'})],
})

export const leadField = defineField({
  name: 'lead',
  title: 'Короткий опис',
  description: 'Одне-два речення під заголовком. Показується в картці.',
  type: 'text',
  rows: 3,
  validation: (r) => r.max(300),
})

export const bodyField = defineField({
  name: 'body',
  title: 'Текст',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Звичайний', value: 'normal'},
        {title: 'Підзаголовок', value: 'h2'},
        {title: 'Малий підзаголовок', value: 'h3'},
        {title: 'Цитата', value: 'blockquote'},
      ],
      lists: [
        {title: 'Список', value: 'bullet'},
        {title: 'Нумерований', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Жирний', value: 'strong'},
          {title: 'Курсив', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            title: 'Посилання',
            type: 'object',
            fields: [{name: 'href', title: 'URL', type: 'url', validation: (r) => r.uri({scheme: ['http', 'https', 'mailto']})}],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'Фото',
      options: {hotspot: true},
      fields: [
        {name: 'alt', title: 'Опис фото', type: 'string'},
        {name: 'caption', title: 'Підпис', type: 'string'},
      ],
    }),
  ],
})

// Мініатюра в списку документів: заголовок, дата, фото
export const preview = (subtitleField = 'date') => ({
  select: {title: 'title', subtitle: subtitleField, media: 'image'},
})
