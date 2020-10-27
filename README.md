# Config

Vue Project Base Config

## Installation
```bash
yarn add -D @mbvue/config
```

## Usage
1、package.json：

```json
{
  "scripts": {
    "serve": "mbvue server",
    "build": "mbvue build",
    "lint": "mbvue lint"
  },
  "eslintConfig": {
    "root": true,
    "extends": "@mbvue/eslint-config"
  },
  "stylelint": {
    "extends": "@mbvue/stylelint-config"
  },
  "prettier": "@mbvue/prettier-config"
}
```

2、babel.config.js：

```js
module.exports = {
  presets: ['@mbvue/babel-preset-config']
};
```

## Configuration
vue.config.js：

```js
module.exports = {
  mode: 'development',
  ...
};
```
