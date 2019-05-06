import { type } from '../action';

//处理业务

/**
 * Reducer 数据处理
 */

//初始化状态

const initialState = {
  menuName: '主面板'
};

//声明一个方法
//state 第一次默认为空，于是给他一个默认的值
//action 是接收过来的方法
// type 从外部导入进来
//每个Reducer都会返回一个新的状态
// 状态的改变：保持原有的状态不变，添加新的状态
export default (state = initialState, action) => {
  //对action做一个判断
  switch (action.type) {
    case type.SWITCH_MENU:
      return {
        ...state,
        menuName: action.menuName
      };

    default:
      return { ...state };
  }
};
