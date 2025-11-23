export default [
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^(React|App|Header|HeroSection|Features|HowItWorks|Testimonials|Modal|Footer|WorkAsAgent|Link|BrowserRouter|Routes|Route|HomePage|AgentsPage|BEDROOM_MIN|BEDROOM_MAX)$'
      }],
      'no-undef': 'error',
    },
  },
];
