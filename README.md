# @lumine-code/jasmine-focused

Adds priority-based focused specs to the legacy Jasmine runner used by Lumine.

## Features

- **Focused suites**: adds `fdescribe`, `ffdescribe`, and `fffdescribe` with increasing priority.
- **Focused specs**: adds `fit`, `ffit`, and `fffit` with the same priority model.
- **Runner integration**: wraps the Lumine Jasmine 1 runner without changing existing spec files.
- **Focus cleanup**: includes `nof` to remove focused prefixes from JavaScript and CoffeeScript specs.

## Installation

```sh
npm install @lumine-code/jasmine-focused
```

## Usage

```js
require('@lumine-code/jasmine-focused')

fit('runs before ordinary specs', () => {})
```

Run `nof spec` to turn focused `it` and `describe` calls back into their ordinary forms.

## Building

```sh
npm install
npm test
```

## Contributing

Got ideas to make this package better, found a bug, or want to help add new features? Just drop your thoughts on GitHub. Any feedback is welcome!
