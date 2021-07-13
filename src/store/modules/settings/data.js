import i18n from '@/lang'

export const languages = [
  {
    name: i18n.t('message.vietnamese'),
    icon: 'vi',
    locale: 'vi'
  },
  {
    name: i18n.t('message.japanese'),
    icon: 'ja',
    locale: 'ja'
  }
]

// sidebar filters
export const themeColor = [
  {
    extraClass: 'default',
    iconColor: 'text-primary',
    text: 'Default'
  },
  {
    extraClass: 'orange',
    iconColor: 'text-warning',
    text: 'Orange'
  },
  {
    extraClass: 'green',
    iconColor: 'text-success',
    text: 'Green'
  },
  {
    extraClass: 'red',
    iconColor: 'text-danger',
    text: 'Red'
  }
]

// sidebar background images
export const sidebarBackgroundImages = [
  {
    id: 1,
    url: '/static/img/sidebar-2.jpg'
  },
  {
    id: 2,
    url: '/static/img/sidebar-3.jpg'
  },
  {
    id: 3,
    url: '/static/img/sidebar-4.jpg'
  }
]
