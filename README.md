# 陶然亭 · 四时识木

支持离线浏览的植物观察手帖。线上访问：https://taoranting.vercel.app/ 。下载后保留整个 `public/` 目录，打开 `public/index.html`；`public/index-dark.html` 为深色初始主题。照片位于 `public/photos/`，离线时请与 HTML 一起保留。无需安装依赖。

现有 58 个观察条目，按乔木、灌木、草本、藤本、水生与竹类浏览。条目包括物种、属级与园艺类群，不能等同于 58 个已核实的现存物种。

- 每个观察条目附两张真实照片，共 116 张。名录卡片直接预览实拍，点击后回到同一个观察对照台；图版、实拍和辨认线索共用植物、季节与部位选择。照片可放大，保留完整比例和摄影、许可、原图链接。
- 在观察匣下拉框选植物，或从植物名录按名称、学名、叶形与花果线索搜索。
- 名录按六类筛选；先展示 12 个代表条目，可展开全部。点击条目回到观察匣。
- 切换春夏秋冬和叶、枝茎、花、果种；按逐张核对的照片内容优先切换到当前部位的实拍，缺少该部位细节时如实提示。照片不冒充所选季节的现场实况。
- 40 道局部辨认题，每题四个名字并有补充线索，答对后返回观察匣。
- 按植物和季节独立保存观察记录，沿用旧版索引与存储键。
- 页面提供带来源、日期和四类线索的 CSV 下载：taoranting-plant-catalog.csv 。

每条附园内出现依据，保留历史调查、移除记录、盆景和季节展陈的区别。青桐、栾树、刺槐的移除记录不作现存单株导航。紫叶李与红叶李合并，园艺品种不拆成多个物种。未细定到种的竹类、睡莲等保留组级名称；未核实的花果不补成确定图示。

实拍照片来自 Wikimedia Commons，用于形态对照，非陶然亭现场照片。属级和园艺类群使用明确标注对象的代表照片，不把示例种或品种认定为园内对象。花期、拍摄地点与具体植株以原图资料及现场树牌核对。完整署名见 [照片来源与许可](photos/CREDITS.md)。

植物图版是典型结构示意，不是自动识别或当前园内物候。原有 66 部件的观察匣仅保留当前与过渡图版，避免随条目数增长而加载几百张隐藏 SVG。

构建：npm run build 。实体审计：npm run build --audit 。
图版检查页：node qa-build.mjs 。照片完整性检查：`npm run test:photos`（先运行构建）。验证详情见 QA.md。

## Vercel

Output directory: `public`. Build command: `npm run build`. No dependencies or environment variables are required. Import this repository into Vercel with the Other framework preset.

The SVG toolkit in `kit/` is from [Anatomy](https://github.com/wheresryan22/anatomy); its MIT license is preserved in `kit/LICENSE`.

GitHub main is connected to the Vercel production project. Pushes to main trigger a production build and deployment.
