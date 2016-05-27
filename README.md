# Script arts
---
[![Build Status](https://travis-ci.org/tuchk4/script-arts.svg?branch=master)](https://travis-ci.org/tuchk4/script-arts)

Another one npm package :) Encode any text files into images and decode them back.

## If you ask "Why"?}

"Code like no one's watching." (https://twitter.com/noopkat)[@noopkat]
From (http://jsconfbp.com/)[#jsconf Budapest] (http://jsconfbp.com/speakers/suz-hinton.html)["Formulartic Spectrum"].

## Just imagine

- transform your code into images
- apply instagram filters
- BOOM! Your code is refactored now :)

## Usage

```bash
npm install -g script-arts

script-arts --help
script-arts encode --help
script-arts decode --help
```

## Glossary

* Theme - is a symbol encode (symbol to rgb) / decode (rgb to symbol) rule.
  ```js
  {
   encode: function(symbol),
   decode: function(rgb)
  }
  ```

* Iterator - is how we will iterate image and source file. Could be linear, or by lines or even radial. Also responsible on image size and form.
  ```js
  {
    iterateSource: function(source, encode),
    iterateImage: function(image, decode)
  }
  ```

## Iterators

* linear *(default)* `-i linear`. Iterate by symbols

* lines `-i lines`. Iterate by lines

## Themes

* char code *(default)* - `-t char-code`. Translate symbol code to hex. `-d <number>` code offset. If delta was used for encode - same value should be used for decode.

* spaces and semicolons - `-t spaces-and-semicolons`. Highlite spaces and semicolons. Other symbols will be encoded with char-code theme.

* js - `-t js`. Highlite js keywords.

* md - `-t md`. Highlite md keywords.

## Custom theme

Existing themes:

- (https://github.com/tuchk4/script-arts/blob/master/src/themes/char-code-theme.js)[char-code-theme]

- (https://github.com/tuchk4/script-arts/blob/master/src/themes/js-theme.js)[js-theme]
- (https://github.com/tuchk4/script-arts/blob/master/src/themes/md-theme.js)[md-theme]
- (https://github.com/tuchk4/script-arts/blob/master/src/themes/spaces-and-semicolons.js)[spaces-and-semicolons]

```js
import chartCodeTheme from 'script-arts/themes/char-code-theme';
import { add as addTheme } from 'script-arts/src/themes';
import encode from 'script-arts/encode';

const myTheme = options => {
  return chartCodeTheme({
    ...options,
    matches: {
      // encode whole words with specific colors
      'constructor': '#ffcc33',
      'var': '#cc0000',
      'const': '#54DE43',
      'new': '#54DE43',
      // encode each symbol of "decode" word with specific color
      'for': ['#E74C3C', '#ECF0F1', '#ECF0F1']
    }
  }),
}

addTheme('my-theme', {
  create: myTheme,
  // bottom left image corner will be marked with this color
  // will be used for decode() - automatically detect encoded theme.
  color: '#47D0DB'
});

encode('path/to/source-file', 'path/to/output-image', {
  theme: 'my-theme',
  iterator: 'lines',
  delta: 2512 // if you want to make char code offset
}).then(() => {
  console.log('done');
})
```

## Custom iterator

Sames as custom themes. Default iterators example:

- (https://github.com/tuchk4/script-arts/blob/master/src/iterators/linear-iterator.js)[Linear iterator]
- (https://github.com/tuchk4/script-arts/blob/master/src/iterators/lines-iterator.js)[Lines iterator]
- (https://github.com/tuchk4/script-arts/blob/master/src/iterators/index.js)[How to Add iterator]

## Contribute

You are welcome to this useless app better :)

Use `npm run dev` to start watchers and convert ES6 code from */src/* dir.
Use `npm run test` - to run tests.
Use `npm run test-dev` - to start tests with watchers.
