## Installation
```bash
npm install --save-dev @mbvue/config
#OR
yarn add -D @mbvue/config
```

## Usage
vue2：
```bash
yarn add -D vue@^2.6.12 vue-loader@^15.9.5
```

vue3：
```bash
yarn add -D vue@next vue-loader@^16.0.0-beta.10
```

package.json：

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
  "babel": {
    "presets": [
      "@mbvue/babel-preset-config"
    ]
  },
  "browserslist": [
    "extends @mbvue/browserslist-config"
  ],
  "prettier": "@mbvue/prettier-config"
}
```

## Configuration
vue.config.js：

```js
module.exports = {
  mode: 'development',
  ...
};
```

### Special configuration
```js
html: {
  filename: 'index.html',
  template: path.resolve(__dirname, '../index.html'),
  title: 'App',
  keywords: '',
  description: ''
}
```