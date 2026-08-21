export const PLAY_SCREENS = Object.freeze([
  { id: 'boot', label: '开机校验', group: '开局', desc: '规则与资源校验，命印呼吸。' },
  { id: 'lobby', label: '大厅', group: '开局', desc: '当前英雄、开始对战、四入口。' },
  { id: 'select', label: '三选一', group: '开局', desc: '本局英雄报价、重随、锁定。' },
  { id: 'loading', label: '入场', group: '开局', desc: '席位锁定后的加载仪式。' },
  { id: 'battle', label: '战斗 HUD', group: '对局', desc: '1280×720 镜头、三命、构筑、天劫。' },
  { id: 'growth', label: '成长', group: '局外', desc: '修为与图鉴。' },
  { id: 'profile', label: '个人', group: '局外', desc: '身份与最近对局。' },
  { id: 'ranking', label: '排行榜', group: '局外', desc: '全球单人竞技布局。' },
  { id: 'settings', label: '设置', group: '局外', desc: '逐项自动保存的游戏设置。' }
]);

export const VIEWPORTS = Object.freeze([
  { id: 'pc', label: 'PC 1280×720', platform: 'pc', hint: '键鼠：WASD / 左键普攻 / 右键主动' },
  { id: 'mobile', label: '手机横屏', platform: 'mobile', hint: '摇杆、普攻、主动、交互键' }
]);
