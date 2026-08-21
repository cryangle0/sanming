export const COLOR_TOKENS = Object.freeze([
  { name: '青玉深', hex: '#0d3e3b', role: '秩序、面板、可信底' },
  { name: '青玉活', hex: '#247c69', role: '主行动、生命、通过' },
  { name: '暖金', hex: '#e2bb66', role: '可操作、荣耀、命印' },
  { name: '雾纸', hex: '#eef7f2', role: '工作台底、阅读面' },
  { name: '墨青', hex: '#183c3c', role: '正文' },
  { name: '初命', hex: '#3d9a6e', role: '第一条命 · 安全' },
  { name: '续命', hex: '#d4a24a', role: '第二条命 · 代价' },
  { name: '绝命', hex: '#c75b4b', role: '第三条命 · 不可逆' }
]);

export const TYPE_TOKENS = Object.freeze([
  { role: '仪式标题', stack: 'STKaiti / KaiTi / Songti SC', use: '品牌、重大节点、命印' },
  { role: '界面正文', stack: 'Microsoft YaHei UI / PingFang SC', use: '按钮、说明、HUD' },
  { role: '编号', stack: 'ui-monospace', use: '英雄 ID、资源路径' }
]);

export const SHAPE_TOKENS = Object.freeze([
  '主形：圆、弧、云头、玉佩、匾额',
  '辅形：六边命纹、绶带、法盘',
  '主行动用横向稳定大形；状态用圆形；次级入口用窄竖牌'
]);
