const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      primary: 'var(--primary)',
    },
  },
  layers: {
    components: true,
    // Other layers like utilities if needed
  },
  plugins: [
    require('@tailwindcss/forms'),
    addDynamicIconSelectors(),
    require('@tailwindcss/aspect-ratio'),
  ],
};
