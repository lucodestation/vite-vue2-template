# 使用 Vite 搭建 Vue2.6.14 项目

Vite 具有极速的服务启动、轻量快速的热重载、对 TypeScript、JSX、CSS 等支持开箱即用等等一系列优点，但使用 Vite 创建的 Vue 项目使用的是 Vue3.x 。如果要创建 Vue2.x 项目，需要一些手动配置。

## 初始化项目

根据 [开始 | Vite中文网 (vitejs.cn)](https://vitejs.cn/guide/#总览) 创建项目。

使用 `npm init @vitejs/app` 时有如下提示：

```
$ npm init @vitejs/app

@vitejs/create-app is deprecated, use npm init vite instead
```

`@vitejs/create-app` 已弃用，请改用 `npm init vite` 。

下面使用 `npm init vite` 创建项目。

```bash
npm init vite
```

首次使用会提示

```
Need to install the following packages:
  create-vite
Ok to proceed? (y)
```

框架要选择 `vanilla` ，如果选 `vue` 默认使用的是 vue3.x

```
? Select a framework: » - Use arrow-keys. Return to submit.
>   vanilla
    vue
    react
    preact
    lit
    svelte
...
初始化完成有如下提示
Done. Now run:

  cd mytest
  npm install
  npm run dev
```

创建好后有如下文件（没有一个文件夹）

```
.gitignore  favicon.svg  index.html  main.js  package.json  style.css
```

此时的 `package.json`

```json
{
  "name": "mytest",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "devDependencies": {
    "vite": "^2.6.4"
  }
}
```

## 安装插件

[underfin/vite-plugin-vue2: Vue2 plugin for Vite (github.com)](https://github.com/underfin/vite-plugin-vue2)

```bash
npm install --save-dev vite-plugin-vue2
```

新建 Vite 配置文件 `vite.config.js`

```js
import { createVuePlugin } from 'vite-plugin-vue2'

export default {
  plugins: [
    createVuePlugin()
  ],
}
```

## 安装 Vue

```bash
npm install vue@2.6.14 vue-template-compiler
```

此时的 `package.json`

```json
{
  "name": "mytest",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "devDependencies": {
    "vite": "^2.6.4",
    "vite-plugin-vue2": "^1.9.0"
  },
  "dependencies": {
    "vue": "^2.6.14",
    "vue-template-compiler": "^2.6.14"
  }
}

```

## 修改文件及目录结构

- 删除根目录下的 `main.js` 和 `style.css` 。

- 根目录下新建 `public` 文件夹和 `src` 文件夹。

- `public` 文件夹下放入自己的 `favicon.ico` 。
- `src` 文件夹下新建 `main.js` 文件和 `App.vue` 文件。

main.js

```js
import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: h => h(App)
}).$mount('#app');

```

App.vue

```vue
<template>
  <div id="app">
    <h1>Hello Vite Vue2</h1>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

```

修改 `index.html` 中的 `link` 标签和 `script` 标签。

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

## 启动项目

```bash
npm run dev
```

## 安装 vue-router 和 vuex

```bash
npm install vue-router vuex
```

此时的 `package.json`

```json
{
  "name": "mytest",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "devDependencies": {
    "vite": "^2.6.4",
    "vite-plugin-vue2": "^1.9.0"
  },
  "dependencies": {
    "vue": "^2.6.14",
    "vue-router": "^3.5.2",
    "vue-template-compiler": "^2.6.14",
    "vuex": "^3.6.2"
  }
}

```

创建 `/src/router/index.js`

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

```

创建 `/src/store/index.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

```

修改 `main.js`

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```

修改 `/src/App.vue`

```vue
<template>
  <div id="app">
    <h1>Hello Vite Vue2</h1>
    <p>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

```

创建 `/src/views/Home.vue` 和 `/src/views/About.vue`

## 测试

经测试，启动项目和打包项目都没问题。
