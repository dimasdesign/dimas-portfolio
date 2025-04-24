/** @type {import('tailwindcss').Config} */
export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}',
  './src/app/**/*.{js,ts,jsx,tsx}',
];
export const darkMode = 'class';
export const theme = {
  extend: {
    fontFamily: {
      gothic: ['var(--font-gothic)'],
      monster: ['var(--font-monsterrat)'],
    },
    colors: {
      primary: '#5603AD',
      darkBg: '#151515',
      lightBg: '#eaeaea',
    }
  },
};
export const plugins = [];
