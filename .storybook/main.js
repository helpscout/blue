module.exports = {
  stories: ['../**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true },
    },
  ],
}
