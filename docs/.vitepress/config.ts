import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'vue-boom',
  description: 'Some funny ui components',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/Components' },
    ],

    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'EmojiPicker', link: '/components/EmojiPicker' },
          { text: 'PreviewImg', link: '/components/PreviewImg' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zyhnbyyds/vue-boom' },
    ],
  },
})
