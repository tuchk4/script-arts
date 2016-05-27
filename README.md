# Script arts
---
[![Build Status](https://travis-ci.org/tuchk4/script-arts.svg?branch=master)](https://travis-ci.org/tuchk4/script-arts)

Another one npm package :) Encode any text files into images and decode them back.

## If you ask "Why"?

"Code like no one's watching." [@noopkat](https://twitter.com/noopkat)
From [#jsconf Budapest](http://jsconfbp.com/) ["Formulartic Spectrum"](http://jsconfbp.com/speakers/suz-hinton.html).

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

* **linear** *(default)* `script-arts encode source output -i linear`. Iterate by symbols

* **lines** `script-arts encode source output -i lines`. Iterate by lines

## Themes

* **char code** *(default)* `script-arts encode source output -t char-code`. Translate symbol code to hex. `-d <number>` code offset. If delta was used for encode - same value should be used for decode.

* **spaces and semicolons** `script-arts encode source output -t spaces-and-semicolons`. Highlite spaces and semicolons. Other symbols will be encoded with char-code theme.

* **js** `script-arts encode source output  -t js`. Highlite js keywords.

* **md** `script-arts encode source output  -t md`. Highlite md keywords.

## Custom theme

Existing themes:

- [char-code-theme](https://github.com/tuchk4/script-arts/blob/master/src/themes/char-code-theme.js)
- [js-theme](https://github.com/tuchk4/script-arts/blob/master/src/themes/js-theme.js)
- [md-theme](https://github.com/tuchk4/script-arts/blob/master/src/themes/md-theme.js)
- [spaces-and-semicolons](https://github.com/tuchk4/script-arts/blob/master/src/themes/spaces-and-semicolons-theme.js)

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

- [Linear iterator](https://github.com/tuchk4/script-arts/blob/master/src/iterators/linear-iterator.js)
- [Lines iterator](https://github.com/tuchk4/script-arts/blob/master/src/iterators/lines-iterator.js)
- [How to Add iterator](https://github.com/tuchk4/script-arts/blob/master/src/iterators/index.js)

## Contribute

You are welcome to this useless app better :)

Use `npm run dev` to start watchers and convert ES6 code from */src/* dir.
Use `npm run test` - to run tests.
Use `npm run test-dev` - to start tests with watchers.

## Encode examples: parts of lodash source with different options

<img alt="lodash encode example" src="http://image.prntscr.com/image/ccbe9a9b5ce349bbb81dc09993acf65a.png" width="300">

<img alt="lodash encode example" src="http://image.prntscr.com/image/6dc174171ff54c5785d97f87d5467dd6.png" width="300">

<img alt="lodash encode example" src="http://image.prntscr.com/image/91c13624df1240349a60428ca380cd94.png" width="300">

<img alt="lodash encode example" src="http://image.prntscr.com/image/89c5b31f90d14ed1aae3a457489792ac.png" width="300">

<img alt="lodash encode example" src="http://image.prntscr.com/image/ecb30acba8484cbbb0269d6806b648a2.png" width="300">

## Encode examples of this README file

<img alt="README encode example" src="http://image.prntscr.com/image/5bdb76a324e54f22b99cd3865aec8fe7.png" width="300">

<img alt="README encode example" src="http://image.prntscr.com/image/24e7b4189d2b4d9e804ee903def3792c.png" width="300">

<img alt="README encode example" src="http://image.prntscr.com/image/283709d672aa40609a85819447aa4b99.png" width="300">
