import '../lib/styles/globals.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    layout: 'centered',
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
