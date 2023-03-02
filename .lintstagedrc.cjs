module.exports = {
  '*.{js,ts,vue,jsx,tsx}': () => ['npm run lint', 'vue-tsc --noEmit --skipLibCheck'],
}
