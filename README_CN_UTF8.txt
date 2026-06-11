GoTrip 旅游 APP UI 全套统一版

说明：
1. 本文件夹内所有图片文件名均使用英文/数字命名，避免 Windows、NAS、手机解压时出现中文文件名乱码。
2. 文档内容为 UTF-8 with BOM 编码，正常用记事本、WPS、VS Code、Typora 打开都不容易乱码。
3. 这一版采用统一设计逻辑：浅白底、GoTrip 蓝为主色、暖橘为强调色、圆角卡片、线性图标、轻阴影、舒适留白。
4. 页面逻辑围绕“旅游中真正好用”设计：先规划、再看路线、再查景点/美食/拍照点、最后沉淀足迹和攻略。

页面清单：
00_overview_board.png              总览展示图
01_home.png                        首页 / 推荐页
02_ai_trip_planner.png             AI行程定制页
03_map_route_planning.png          地图路线规划页：上海→重庆
04_itinerary_detail.png            行程详情页：上海3天2晚
05_chongqing_destination.png       重庆目的地页
06_attraction_detail_hongyadong.png 洪崖洞景点详情页
07_community_discover.png          社区发现 / 攻略瀑布流页
08_profile_center.png              我的 / 个人中心页
09_side_drawer.png                 侧边栏 / 快捷工具页
10_settings.png                    设置页
11_popup_components.png            弹窗组件 / 预算与分享
12_publish_guide.png               发布攻略页

统一 UI 规范：
- 主色：GoTrip 蓝，用于主按钮、选中状态、导航高亮、路线、关键 CTA。
- 辅色：暖橘，用于价格、奖励、热门标签、预算提示。
- 背景：浅白 + 轻蓝渐变，减少视觉压迫。
- 卡片：大圆角、轻阴影、信息分组清晰。
- 图标：线性简约图标，蓝橙绿紫少量点缀。
- 导航：底部固定：首页、地图、中间发布/添加、社区、我的。
- 内容策略：减少复杂入口，优先把“行程、预算、路线、景点、美食、拍照点”放在用户最容易理解的位置。

后续如果要进入源码设计，建议按这个页面顺序开发：
1. 首页
2. AI行程定制
3. 地图路线规划
4. 行程详情
5. 目的地详情
6. 景点详情
7. 社区发现
8. 发布攻略
9. 个人中心
10. 设置与侧边栏
11. 弹窗组件
