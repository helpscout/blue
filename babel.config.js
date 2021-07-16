module.exports = api => {
  const isTest = api.env('test')
  const plugins = [
    [
      'prismjs',
      {
        languages: ['c', 'java', 'javascript', 'objectivec', 'swift'],
        theme: 'twilight',
        css: true,
      },
    ],
    [
      'inline-react-svg',
      {
        svgo: {
          plugins: [
            {
              removeViewBox: false,
              cleanupIDs: false,
            },
          ],
        },
      },
    ],
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
        fileName: true,
      },
    ],
  ]

  if (isTest) {
    plugins.push('@babel/plugin-transform-runtime')
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            ie: '11',
            edge: '16',
            firefox: '85',
            chrome: '86',
            safari: '12',
            node: '12.16.3',
          },
          loose: true,
          shippedProposals: true,
        },
      ],
      '@babel/react',
    ],
    plugins: plugins,
    exclude: ['node_modules'],
  }
}
