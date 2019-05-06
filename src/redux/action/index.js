//事件的触发行为

/**
 * Action类型
 */
export const type = {
  SWITCH_MENU: 'SWITCH_MENU'
};

// 触发一个方法
// 当点击菜单的时候，调用switchMenu方法，传入参数menuName
export function switchMenu(menuName) {
  return {
    type: type.SWITCH_MENU, //事件的类型
    menuName
  };
}
