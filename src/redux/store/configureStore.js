//核心的状态管理

/**
 * 引入createStore创建store
 */

//store 创建数据源的时候，把业务逻辑丢入 ，引用的是reducer，action触发reducer

import { createStore } from 'redux';
import reducer from '../reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

//创建数据源的第一个参数就是reducer
export default () => createStore(reducer, composeWithDevTools());
