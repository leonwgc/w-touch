
# simple-redux-store

基于react hooks/redux的简单存储方案

## 特点
1. 简单，一共4个对象，2个用于配置全局状态，2个用于读取和更新状态
2. 支持web,node(ssr环境)，Taro微信等小程序状态管理
3. 支持redux devtool追踪状态

## 安装

用 npm [npm](https://npmjs.org/) / [yarn](https://yarnpkg.com) 安装:

    $ npm install --save simple-redux-store
    $ yarn add simple-redux-store

#### 使用

##### 1. 创建store, 通过Provider提供全局store
```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, configureStore } from 'simple-redux-store';
import App from './App';

// 初始状态
const initialState = { name: 'name', age: 1 };

// 创建store
// 第一个参数传入应用初始状态（如果有）
// 第二个参数开发时传true 可以在redux-devtool追踪状态, 传false禁止redux-devtool
const store = configureStore(initialState, true);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

```
此时可以通过redux devtool 查看到初始状态


![c1.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0016aad1ff7d46fabc88eb6730bc6fff~tplv-k3u1fbpfcp-watermark.image)

##### 2 .读取状态，更新store 
-  通过 useSelector 选择需要的状态
-  通过 useUpdateStore 更新全局状态

```js
import React from 'react';
import { useSelector, useUpdateStore } from 'simple-redux-store';

export default function App() {
  return (
    <div>
      <NameComp />
      <AgeComp />
    </div>
  );
}

// 名字组件
function NameComp() {
  // 获取状态更新函数
  const updateStore = useUpdateStore();
  // 获取状态
  const { name } = useSelector((s) => s.app);

  return <div onClick={() => updateStore({ name: 'name' + Math.random() })}>hello {name} </div>;
}

// 年龄组件
function AgeComp() {
  const updateStore = useUpdateStore();
  const { age } = useSelector((s) => s.app);

  return <div onClick={() => updateStore({ age: age + 1 })}>you are {age} years old </div>;
}


```
点击名字组件 ，可以看到状态变化， 组件更新

![c2.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/912e76ab109948d483380bf369649561~tplv-k3u1fbpfcp-watermark.image)
