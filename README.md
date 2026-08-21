# 三命无常 · 设计原型

给美术和 UX 用的 GitHub Pages 工作台。玩家前端来自 `sanming_v1_minimal_delivery_20260819_011317`，资源已从独立 HTML 抽出，可在浏览器里直接走大厅、三选一、战斗 HUD 和局外界面。

## 在线地址

发布后打开：

**https://cryangle0.github.io/sanming/**

## 设计同学怎么用

1. 打开工作台首页，点 **进入试玩**。
2. 底栏切换：开机 / 大厅 / 三选一 / 战斗 / 成长 / 个人 / 排行 / 设置。
3. 需要对照规范时打开 **手册**；需要对色时打开 **视觉**。
4. 按 `/` 或 `Ctrl+K` 可跳到任意页面、界面或英雄。
5. 试玩页可切 PC / 手机横屏，也可「新标签打开」单独看玩家前端。

完整玩家前端也可直达：`/prototype/play/index.html?qa=1&screen=lobby`

## 本地启动

详见 [docs/本地启动说明.md](docs/本地启动说明.md)。最短路径：

```bash
cd GamePrototype
npm start
```

浏览器打开 http://127.0.0.1:4173/

不要用 `file://` 直接打开 `index.html`：英雄数据、世界数据和手册都需要 HTTP。

## 目录

```
index.html                 工作台入口（GitHub Pages）
src/js                     工作台模块（路由、页面、组件）
src/css                    工作台样式令牌与布局
prototype/play             V1 玩家前端真源
prototype/assets           抽出的运行时贴图
prototype/audio/runtime    11 个已接线音效/音乐
prototype/data             英雄与构筑数据
docs/delivery              交付说明与美术手册
```

工作台代码按页面和组件拆分，不把 70 万字的 `game.js` 再揉进同一个文件。玩家前端保持交付真源，只增加了设计台跳转桥 `SanmingStudio`。

## 不包含

- 81MB 独立内嵌 HTML（资源已拆出）
- 484 条非运行时 WAV 源文件
- 45MB 逐字段视觉审计 JSON（验收面板按需包，不影响试玩）
