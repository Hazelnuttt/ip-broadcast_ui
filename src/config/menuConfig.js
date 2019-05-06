const menuList = [
  {
    title: '主面板',
    key: '/home/index'
  },
  {
    title: '用户管理',
    key: '/user/index'
  },
  {
    title: '终端管理',
    key: '/ter/index'
  },
  {
    title: '状态监控',
    key: '2',
    children: [
      {
        title: '会话状态',
        key: '3'
      }
    ]
  },
  {
    title: '分区管理',
    key: '4'
  },
  {
    title: '呼叫配置',
    key: '5'
  },
  {
    title: '报警配置',
    key: '6'
  },
  {
    title: '定时功能',
    key: '7',
    children: [
      {
        title: '定时打铃',
        key: '8'
      },
      {
        title: '定时任务',
        key: '9'
      },
      {
        title: '定时巡更',
        key: '10'
      }
    ]
  },
  {
    title: '遥控配置',
    key: '11',
    children: [
      {
        title: '遥控器',
        key: '12'
      },
      {
        title: '遥控话筒',
        key: '13'
      }
    ]
  },
  {
    title: '电子地图',
    key: '14'
  },
  {
    title: '媒体库',
    key: '/media/index'
  },
  {
    title: '录音设备',
    key: '15'
  },
  {
    title: '系统设置',
    key: '16'
  }
];
export default menuList;
