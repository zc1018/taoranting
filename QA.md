# 验证记录

2026-10-18，Asia/Shanghai。

当前版本为 58 条目扩展版；下方初版与四条目补充记录仅为历史验证。最新结果见文末。

## 内容

- 初版植物：银杏、元宝枫、金银木；现已补充中华梧桐，见下方补充验证。园内出现的依据、形态来源见 CONCEPT.md 和页面底部可展开的资料来源。
- 四季为典型形态示意，未做现场摄影或本年物候调查，不提供未经核验的单株导航。
- 银杏区分胚珠、种子与真正的花/果；图中结种子的是雌株。元宝枫和金银木都可有对生芽，页面明确不把对生芽单独当作物种结论。练习不以两种近似的对生冬枝作强制单一答案。
- 图版不在秋季整枝上添加春花，冬季整枝无叶；花部与成熟果/种的局部对照注明跨季。银杏扇面叶脉画有分叉，金银木花画为二唇形、先白后黄，果为成对红浆果。

## 初版几何与图形

- `node build.mjs --audit`：66 个实体部件、67 个真实形状，66 个排序项，267 个重叠约束。clearance、support、depth order、coverage 等所有项目为 0，`audit passed`。四个实际脚垫是地面支撑根节点，其他部件沿接触关系连通。
- 机件圆盘只绕自身轴转，所占圆柱体不变；纸面内容淡入淡出，未将二维植物插画冒充三维刚体植物的碰撞审计。
- 3 种植物 × 4 季的 12 个静止图版均通过 ISO 机件线条检查，`line ends: 0`。深色、390px 手机及减少动态效果模式也为 0。植物笔画属于独立植物插画路径，另经 4 倍近景人工读取，未声称 ISO 线条工具覆盖全部植物笔画。
- 深浅主题的图版、镜圈窗口、花部与叶脉近景均已读取。修正镜圈默认填充遮住窗口的问题；放大镜内局部图现可见，实体镜圈与纸面共享相机。
- 10 帧慢速换季联系表已读取，整枝和镜中局部渐变，圆盘随季节转动。快速切换回原部位后只保留一个镜中图层。
- 两个独立 SVG 均通过 XML 解析。HTML 的脚本与样式完全内嵌，无网络资源依赖；资料链接只在用户点击时打开。

## 初版交互与保存

- `checks-main.json`：12 个图版状态、四类观察部位、Home/End、上下方向键选择植物等断言通过。秋季整枝花组为空，冬季整枝叶组为空。浏览器控制台干净。
- `checks-quiz.json`：9 个局部题依次作答通过，反馈有对应辨认依据，答对后可返回相应植物的整枝与部位。局部 SVG 的可读名称不泄漏答案，并提供无答案名称的文字形态描述。
- `checks-notes.json`：保存位置、日期和发现，切到另一植物后返回能载入，刷新页面后仍恢复。测试只在独立 headless 浏览器资料目录中写入测试记录，未污染交付页面的用户记录。
- `checks-no-storage.json`：浏览器禁止 localStorage 时，页面如实显示“未允许保存，记录暂留本页”，没有虚报持久保存。
- `checks-offscreen.json`：390×300 视口滚离画面后 RAF 为 0、观察时钟冻结；平滑滚回视口后恢复。
- `checks-reduced.json`：减少动态效果时不轮播、不创建 RAF；静态季节/部位仍可切换。
- 减少动态效果下逐一覆盖 3 种植物 × 4 季 × 4 部位，共 48 个组合，文本无缺失、局部 SVG 存在、镜中只保留一个图层、RAF 为 0。
- `checks-tour.json`：连续轮播从秋经冬到春，RAF 探针最大待执行回调为 1，暂停并结束过渡后为 0，控制台干净。
- 手机 390px 无横向溢出，最终截图为 `shots/phone-final.png`。浅色正文的 muted/green 文字色已加深，提高在纸色背景上的对比。
- 实际 in-app browser 已打开并点按植物、季节及果/种控制，画面与文本一起更新。

## 主要交付

- `index.html`、`index-dark.html`：独立互动页面。
- `taoranting-light.svg`、`taoranting-dark.svg`：秋季银杏的静态观察匣。
- `model.mjs`、`botany.mjs`、`geometry.mjs`、`style.css`、`live.js`、`build.mjs`：构建来源。
- 最终截图：`shots/final-light.png`、`shots/final-dark.png`、`shots/final-page.png`、`shots/final-case-detail-*.png`、`shots/final-maple-*.png`、`shots/final-honey-dark.png`、`shots/phone-final.png`。
- `audit.txt`、`results-*.txt` 为验证输出；带 first、diagnostic 或无 final 前缀的早期截图保留调试过程，不作为最终效果。

## 中华梧桐补充验证

- 保留原有三个物种的索引和记录键，中华梧桐追加为索引 3。植物、答题选项和键盘循环现在覆盖四种植物。文化名称、学名和悬铃木的区别均写在物种说明中。
- 4 季整枝与 4 类局部均已绘制；夏季整枝有花，秋季有开裂果瓣，冬季无叶。局部花明确标注夏季，春夏查看果瓣时明确为秋季对照。
- checks-firmiana.json：四个新增整枝静止状态、上下键跨首尾循环通过，线条检查均为 0。深浅主题均检查整枝与叶、枝、花、果的 4 倍近景。
- checks-reduced.json：四种植物 × 四季 × 四部位共 64 个组合通过，无缺失文本或多余镜中图层，RAF 为 0，控制台干净。
- checks-quiz.json：12 道题逐题选择与反馈断言通过，包含中华梧桐叶、冬枝、果瓣三题；回到整枝后为中华梧桐 / 秋 / 果种。
- checks-firmiana-phone.json：390px 视口四植物按钮与四个答题按钮无裁切或横向溢出，选择中华梧桐果种后截图检查。
- checks-firmiana-notes.json：银杏与中华梧桐分别保存、切换、刷新恢复，两份记录互不覆盖。仅使用隔离的测试浏览器资料。
- 最终图片：shots/firmiana-light.png、firmiana-dark.png、firmiana-phone.png、firmiana-quiz.png，以及 firmiana-*-4x.png 和四季条带图。

- Final checks-firmiana-bounds.json samples 57,222 points on actual botanical paths and circles; all remain inside the 180 x 180 printed plate. Bounding-box corners under rotation were rejected as an invalid ink test. Final geometry audit passed with all failing categories at zero.

## 58 个观察条目扩展版 · 2026-10-18

- 名录共 58 个观察条目：乔木 28、灌木 18、草本 4、藤本 3、水生 4、竹类 1。含物种、属级对象和园艺类群，并非当前存活植株的完整普查。每条均附公开来源和时间：37 条公开出现资料、9 条历史调查、3 条历史移除、9 条季节或盆景展陈；历史移除不能作为现存树木定位。
- `checks-atlas-all` 覆盖 58 植物 × 4 季 × 4 部位，共 928 个状态；文字、图版、单层镜中局部、花期、早夏结果与冬季落叶断言通过，减少动态效果时 RAF 为 0，控制台干净。
- `checks-atlas-ui` 覆盖全部展开、名称和学名搜索、六类筛选、无结果和清除、原生选择器、首尾切换，以及 40 道题的错误反馈和正确反馈。每题四个选项，图像名称和隐藏形态描述均不泄漏答案。
- `checks-atlas-notes` 验证银杏、中华梧桐和郁香忍冬独立保存、切换与刷新恢复，旧物种索引和存储键保留。仅写入隔离测试浏览器。`checks-atlas-tour` 验证连续轮播和暂停，最大待执行 RAF 回调为 1。
- 正常动画测试确认切换完成后仅保留一个整枝图版；不再预先创建 232 张隐藏图版。桌面键盘循环、浅深主题、荷花夏花与鹅掌楸春花显示通过。
- 浅深主题各 232 个静止整枝状态的机械线端检查均为 0。植物图墨另用 `checks-atlas-bounds` 对八页全部实际路径、圆与椭圆采样，均位于 180 × 180 图版内。机械线端检查不代替植物图墨边界检查。
- `audit-atlas.txt`：66 个物理部件、67 个记录实体，267 个重叠关系；全部失败类别为 0，审计通过。
- 已逐页查看浅深主题各八页的真实 4 倍植物近景，文件为 `shots/atlas-ink-light-0.png` 至 `7.png` 和对应 `dark` 文件。使用 CSS zoom 4 与足够大的画布捕获；旧 `atlas-gallery-*` 为无效倍率的诊断图，不作为验收依据。修正了芦苇叶片着生、沙地柏匍匐枝、紫藤花梗连接、草本冬季残茎及侧柏球果结构等图示。
- `checks-atlas-phone` 在 390 × 900 视口验证观察匣、选择器、名录和水生筛选无横向溢出，点睡莲条目返回观察匣；最终芦苇、名录、睡莲截图均已查看，机械线端为 0，控制台干净。
- 实际 in-app browser 验证“青桐”搜索只返回中华梧桐，水生筛选显示 4 项、选择荷花更新观察匣；交付时恢复全部类型名录并留在 `#plants`。
- CSV 使用 UTF-8 BOM，共 58 行数据、13 列，附来源及边界说明，HTTP 200；两个静态 SVG 均通过 XML 解析。HTML 仍为内嵌脚本和样式的离线单文件。
- 最终界面截图：`shots/atlas-catalog-light.png`、`atlas-catalog-dark.png`、`atlas-lotus-light.png`、`atlas-lotus-dark.png`、`atlas-tuliptree-light.png`、`atlas-phone-reed.png`、`atlas-phone-catalog.png`、`atlas-phone-waterlily.png`。
- 图示用于典型形态对照，未替代现场照片或标牌鉴定。未细定的类群不补成确定物种；未知花果留出现场补认；设施越冬对象明确标注保护条件，历史与展陈记录不暗示全年可见。
