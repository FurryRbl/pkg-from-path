<!-- markdownlint-disable MD033 MD041 -->

<div align="center">

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/S6S8L8OOP)
[![爱发电](https://img.shields.io/badge/%E7%88%B1%E5%8F%91%E7%94%B5_Afdian-946CE6?style=for-the-badge)](https://ifdian.net/a/SharpIce)

</div>

## Install

```bash
npm add --save-dev pkg-from-path # Npm
yarn add -D pkg-from-path # Yarn
pnpm add -D pkg-from-path # Pnpm
```

## Usage

```javascript
import resolvePackagePath from 'pkg-from-path';

const path = resolvePackagePath('/path/to/some/file.js');
console.log(path); // returns the path to the package.json file
```
