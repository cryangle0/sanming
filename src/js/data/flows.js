export const PLAYER_FLOW = Object.freeze([
  { id: 'boot', screen: 'boot', title: '开机', copy: '校验规则与资源，命印落下。' },
  { id: 'lobby', screen: 'lobby', title: '大厅', copy: '看见英雄与「开始对战」，再看次级入口。' },
  { id: 'queue', screen: 'lobby', title: '匹配', copy: '寻找对局浮层；可取消；席位仍有效可重连。' },
  { id: 'select', screen: 'select', title: '三选一', copy: '15 秒报价，重随消耗本局金币。' },
  { id: 'loading', screen: 'loading', title: '入场', copy: '席位锁定，英雄卡与专属主动亮相。' },
  { id: 'battle', screen: 'battle', title: '百眼迷城', copy: '三命、天劫、构筑、地面掉落与商店。' },
  { id: 'result', screen: 'lobby', title: '结算回厅', copy: '对局结束后回到大厅，可再战。' }
]);

export const REVIEW_ORDER = Object.freeze([
  '情绪：第一眼是不是这个游戏。',
  '层级：最先看到的是不是英雄和开始对战。',
  '构图：角色、场景、操作是否同一舞台。',
  '系统：同级控件是否同一家族。',
  '可读性：信息能否迅速读出。',
  '动效：是否在讲因果，而不是装饰。',
  '像素：边缘、接缝、文字安全区。'
]);
