import {entries,sources,categories} from './catalog.mjs';
export const seasons=[{name:'春',en:'SPRING',verb:'萌芽与新叶'},{name:'夏',en:'SUMMER',verb:'展叶与生长'},{name:'秋',en:'AUTUMN',verb:'变色与成熟'},{name:'冬',en:'WINTER',verb:'枝条与冬芽'}];
export const organs=[{id:'leaf',name:'叶',en:'LEAF'},{id:'twig',name:'枝 / 茎',en:'TWIG'},{id:'flower',name:'花',en:'FLOWER'},{id:'fruit',name:'果 / 种',en:'FRUIT & SEED'}];
export const plants=[
 {id:'ginkgo',name:'银杏',latin:'Ginkgo biloba',family:'银杏科 · 银杏属',tag:'一把小扇，记住一年',location:'可从中央岛的银杏景观开始找，先核对树牌，再记住一棵。',
  seasonText:['嫩叶从芽中展开，短枝上的叶常聚在一起。春天也留意雌株的胚珠。','扇形叶转绿。若找到合适的雌株，枝上能看到逐渐长大的青色种子。','绿扇变成金扇，雌株的种子外层渐黄。落叶前后，试着把叶和枝对上。','叶落后短枝更显眼。看密集的叶痕和枝端冬芽，明年还从这里认起。'],
  part:{leaf:['扇形叶，叶脉一分再分','看扇面，不只看黄。叶脉向外分叉，不织成网；叶顶有时会凹成两瓣。','扇形 · 分叉叶脉'],twig:['长枝伸展，短枝像小桩','找长枝上的短小凸枝。叶痕挤在短枝上，是落叶之后仍能保留的线索。','长短枝 · 密集叶痕'],flower:['银杏没有真正的花','它是裸子植物。图中画雌株胚珠作春季对照，不把它画成有花瓣的花。','春季胚珠 · 非花'],fruit:['看着像果，实际是种子','黄软外层包着的是种子，没有子房形成的果皮。不是每棵银杏都会结种子。','雌株种子 · 外层渐黄']},
  follow:['下次看看小扇有没有完全展开。','秋天回来，对比同一枝叶子的颜色。','落叶后再来找一找那些短枝。','春天回来，看哪一个芽先展开。'],
  clues:{leaf:'扇形轮廓和分叉叶脉，比“黄色”更稳定。',twig:'像小桩一样的短枝上，留下挤在一起的叶痕。',fruit:'黄色肉质外层包的是银杏种子，不是果实。'}},
 {id:'maple',name:'元宝枫',latin:'Acer truncatum',family:'无患子科 · 槭属',tag:'把一双翅膀，接回掌形叶',location:'园内彩叶资料列有元宝枫。见到掌状叶时，再找对生的叶柄与成对翅果。',
  seasonText:['新叶展开，颜色可带红。小小的黄绿色花聚在枝端，不像大花那样抢眼。','叶片舒展，掌状裂片清楚；青色翅果在枝上继续长大。','秋叶可由黄转橙红，成对翅果渐熟。别只凭红叶认名。','叶落后，把注意力转到成对的芽与分枝，保留下一次重认的线索。'],
  part:{leaf:['像手掌，叶柄成对相向','典型叶片掌状五裂，叶基常较平。连着枝看，两片叶的叶柄相对着生。','掌状裂叶 · 对生'],twig:['在同一个节上，找一对','对生的叶、芽和分枝是重要提示。金银木也对生，单靠冬芽仍不够，要补看叶或果。','对生芽 · 对生分枝'],flower:['黄绿色的小花，也值得看','春季枝端有直立花簇。认过秋天的叶和翅果，再回来看这些不显眼的花。','春季 · 黄绿花簇'],fruit:['两枚小翅，连着种子','这是成对的翅果。种子部分较饱满，外侧伸出薄翅；要和叶、枝一起核对。','双翅果 · 由青转褐']},
  follow:['夏天再看，嫩叶是否已经舒展。','秋天回来，同时拍一片叶和一对翅果。','冬天再认一认成对的芽。','春天回来，留意枝端小花。'],
  clues:{leaf:'掌状裂叶加上对生叶柄，是这里的关键组合。',twig:'同一节上相对的芽，提示它的对生结构。',fruit:'两枚带翅的果实成对，种子部分显得饱满。',flower:'黄绿色小花聚成枝端花簇，回看掌状叶再确认。'}},
 {id:'honeysuckle',name:'金银木',latin:'Lonicera maackii',family:'忍冬科 · 忍冬属',tag:'白花变金，秋天认红果',location:'陶然亭秋景资料列举过金银木。沿林缘观察灌木，先看对生叶，再看成对红果。',
  seasonText:['暮春到初夏，成对的花先白后黄；长尖叶对生在小枝两侧。','叶色浓绿，花后青果渐长。不同枝上的发育进度可能不一样。','红色浆果常成对靠在叶腋。认得红果以后，回看那一对对长尖叶。','落叶后看分枝和成对的芽。红果能留多久因植株、天气和鸟类取食而异。'],
  part:{leaf:['一对长尖叶，面对面','单叶对生，叶端渐尖，边缘没有明显锯齿；细看可有柔毛。','对生 · 长尖叶'],twig:['先认成对，再看细节','枝上叶、芽相对而生。元宝枫也对生，保留整枝和叶果照片，比只看芽更容易重认。','对生芽 · 灌木枝'],flower:['白与黄，可能是同一种花','花成对着生，花冠呈二唇形。初开白，随后转黄，花期通常在五月至六月。','二唇形 · 先白后黄'],fruit:['红果，常常两颗并在一起','球形浆果成熟后变红，常成对出现在叶腋。果期通常在八月至十月。','成对浆果 · 叶腋着生']},
  follow:['夏天看看花后的小青果。','秋天回来，对照青果和红果。','冬天试着从芽的位置找回它。','暮春回来，把白花和黄花连到一起。'],
  clues:{leaf:'长尖、近全缘的叶，成对着生在枝条两边。',twig:'小枝上相对的芽，与生长季的对生叶对应。',fruit:'红色浆果成对，配合对生叶判断金银木。',flower:'成对的二唇形花，一朵初白、一朵已转黄。'}},
 {id:'firmiana',name:'中华梧桐',latin:'Firmiana simplex',family:'锦葵科 · 梧桐属',tag:'凤凰栖梧，从青桐认起',identity:'“凤凰栖梧”的梧桐，又名青桐。与俗称“法国梧桐”的悬铃木，是不同的植物。',location:'把中华梧桐列为这次的重点观察对象。园内具体单株位置待树牌和现场核对；找到后，记下一处能让你再认回来的地标。',
  seasonText:['长柄上的大叶逐渐展开，叶基有心形凹口。沿枝回看叶柄，注意它们互生，不是两两对生。','绿叶像一把把小伞。枝端开出黄绿色小花，聚成圆锥花序；花没有花瓣，显眼的是萼片。','大叶渐黄，果瓣裂开如薄薄的小船，圆种子着生在果瓣边缘。把这三样和青绿色枝皮连在一起记。','落叶后，光滑的青绿色枝皮更加显眼。找近圆的叶痕和上方的芽，它们沿枝错开排列。'],
  part:{leaf:['大掌状叶，叶基像一颗心','叶通常掌状三至五裂，边缘全缘，长叶柄互生。与元宝枫对比时，别漏看叶基和叶柄的排列。','心形叶基 · 互生长柄'],twig:['青绿色枝，叶痕错开排列','小枝较粗，枝皮光滑、青绿色。落叶后的近圆叶痕与芽互相对应；芽较圆，带红褐色毛。','青绿枝皮 · 圆叶痕'],flower:['夏天的黄绿花，没有花瓣','小花聚成枝端圆锥花序。五枚狭长的萼片向外展开，图中雄花中央伸出蕊柱；这不是五片花瓣。','夏季花序 · 萼片无瓣'],fruit:['小船边上，停着圆种子','果实在种子成熟前就裂成叶状果瓣，圆种子着生在边缘。悬铃木常见悬垂球形果序，形态很不一样。','叶状果瓣 · 边缘生种子']},
  follow:['夏天回来，留意枝端的黄绿色花序。','秋天再来，找一片裂开的小船形果瓣。','冬天把黄叶的长柄，接回青绿色的枝。','春天回来，看圆芽怎样展开成一片大叶。'],
  clues:{leaf:'心形叶基、全缘的掌状裂叶，加上互生长柄，指向中华梧桐。',twig:'光滑青绿色枝皮、近圆叶痕和错开的芽，是青桐的组合线索。',flower:'枝端圆锥花序的小花没有花瓣，狭长黄绿萼片向外展开。',fruit:'叶状果瓣像小船，圆种子着生在边缘；不是悬铃木的球形果序。'}}
];
export function organContext(plant,season,organ){
  const p=plants[plant];
  if(plant>=4){
    if(p.draw[organ]==='unknown')return '未核实到种的结构，本图不补绘';
    if(p.potted&&season===3)return '设施内结构对照 · 不代表北京露地越冬';
    if(organ==='flower')return p.naked?'球花结构对照 · 无真正的花':p.bloom.includes(season)?'典型花期窗口 · 非当年实况':'跨季对照 · 当季全株不补画花';
    if(organ==='fruit')return p.naked?'成熟球果或种子对照 · 不作当季成熟判断':'成熟期结构对照 · 不保证当季挂果';
    if(organ==='leaf'&&season===3&&!p.evergreen)return '生长季叶形对照 · 冬季全株多已落叶或枯萎';
    if(organ==='twig')return ['草本','水生'].includes(p.category)?'茎与基部结构 · 不是木质冬枝':'全年枝形线索 · 局部非等比例';
    return p.group?'组级形态对照 · 到种需更多特征':'局部形态对照 · 非等比例';
  }
  if(plant===3&&organ==='flower')return season===1?'夏季花期对照 · 无花瓣，显色部分为萼片':'跨季对照 · 图示夏季花部';
  if(plant===3&&organ==='fruit'&&season<2)return '秋季果瓣对照 · 不代表当季成熟';
  if(organ==='flower')return plant===0?'春季生殖结构对照 · 银杏无真正的花':season===0?'花期形态对照':'跨季对照 · 当季整枝不补画花';
  if(organ==='leaf'&&season===3)return '叶形对照 · 冬季整枝已落叶';
  if(organ==='fruit'&&season===3)return '成熟期对照 · 冬季不保证仍挂枝';
  if(organ==='fruit'&&season===0)return plant===0?'成熟种子对照 · 春季尚未成熟':'成熟期对照 · 春季还在开花';
  return organ==='twig'?'全年线索 · 冬芽用落叶枝对照':'局部对照 · 形态非等比例';
}
export const plantSources=sources;
export const plantCategories=categories;
const flowerTitles={needle:'针叶上的生殖结构',pollen:'小球花，不是有花瓣的花',magnolia:'白色杯形花被',lilac:'四裂小花，聚成一簇',fringe:'白色细丝，簇成流苏',wisteria:'下垂花序里的蝶形花',bracts:'彩色苞片，包着真正的小花',lotus:'花托长成莲蓬',waterlily:'贴近水面的一朵花',cattail:'圆柱形穗，分清花与果',unknown:'先留一个待观察的问题'};
for(const [i,p] of plants.entries()){
 p.category=i===2?'灌木':'乔木';p.status=i===3?'历史移除记录':'公园资料';p.source=['ginkgo','maple','honeysuckle','removed'][i];p.bloom=[i===3?1:0];p.evergreen=false;p.naked=i===0;p.group=false;
}
plants[2].location='2021年人民日报游记记有金银忍冬，作为园内出现线索；当前单株与位置仍需树牌和现场核对。';
plants[3].location='2021年青桐移除许可说明园内曾有此种，但不能证明这些单株如今仍在。作为重点重认对象，现存位置请按树牌和现场核对。';
for(const d of entries){
 const herb=d.category==='草本',water=d.category==='水生',stem=herb||water?'茎、叶柄与基部':'枝上的排列与芽';
 const winter=d.potted?'冬季属于设施养护或撤展观察，图版保留结构对照，不表示在北京露地越冬。':d.id==='marigold'?'一年生植株完成生长季后枯萎；下一季可能重新布置，记住种植区的变化。':d.id==='reed'?'枯秆与部分穗仍可留存。看节、叶鞘与残穗；冬季管护会改变景观。':d.evergreen?'冬季仍有绿叶；观察新旧枝、叶的着生方式和植株轮廓，常绿并不等于不换叶。':herb||water?'地上部多衰败或枯萎，保留种植位置。地下部分或来年的重新栽植，要结合物种与管护记录。':'落叶后回看枝、芽和叶痕，再与生长季照片对上；不要只靠一枚冬芽定种。';
 const spring=d.evergreen?'观察新梢与仍在枝上的老叶，把叶的数量和排列记清楚。':d.bloom.includes(0)?d.flower:'新叶或新芽逐渐展开，先拍全株，再补一片叶与着生位置。';
 const summer=d.bloom.includes(1)?d.flower:d.evergreen?'枝叶继续生长。找叶的着生方式，再比较不同年龄的枝段。':'叶片舒展，正适合把叶形、叶缘与茎枝的排列一起记录。';
 const autumn=d.autumn||(d.bloom.includes(2)?d.flower+' 同时留意花后的结构。':d.evergreen?'把常绿的叶与成熟期球果或种子作对照；个体未必在当年结实。':d.draw.fruit==='unknown'?'对比叶色与枝形；此条的果实尚未细定，留下现场观察空位。':d.fruit+' 叶色、成熟进度与是否留果因年份和植株而异。');
 const part={leaf:['先把叶形与排列一起看',d.leaf,d.draw.leaf==='needle'?d.draw.n+'针一束':d.group?'组级叶形对照':'叶形 · 着生方式'],twig:[stem,d.twig,herb||water?'草质结构 · 非木枝':d.evergreen?'常绿枝条':'枝 · 芽 · 排列'],flower:[flowerTitles[d.draw.flower]||(d.naked?'小球花，没有花瓣':'花形之外，还要看花序'),d.flower,d.naked?'裸子植物 · 生殖结构':d.draw.flower==='unknown'?'待定种 · 不补画':'花部 · 跨季对照'],fruit:[d.naked?'球果或种子，不当作果实':d.draw.fruit==='unknown'?'果实，留待现场补认':'从花后的结构接回名字',d.fruit,d.naked?'成熟生殖结构':d.draw.fruit==='unknown'?'未细定 · 不补画':'成熟期果实对照']};
 plants.push({...d,part,tag:d.leaf,identity:d.identity||(d.group?'本条按园艺或属级类群学习，具体种与品种以树牌核对；图示是典型结构对照。':''),location:d.place||(sources[d.source].title+'记有此植物。具体植株位置、存活与展陈状态请在现场核对。'),seasonText:[spring,summer,autumn,winter],follow:['夏天回来，把这一片叶接回全株。','秋天再来，比较花后的结构与叶色。','冬天回来，看哪些结构还留在原处。','春天再来，对照同一位置的新芽与新叶。'],clues:{leaf:d.leaf,twig:d.twig,flower:d.flower,fruit:d.fruit}});
}
export const quizItems=[[2,'fruit'],[0,'leaf'],[1,'leaf'],[1,'fruit'],[2,'leaf'],[0,'twig'],[0,'fruit'],[1,'flower'],[2,'flower'],[3,'leaf'],[3,'twig'],[3,'fruit'],...[
 ['chinese-pine','leaf'],['lacebark-pine','leaf'],['armand-pine','leaf'],['cedar','fruit'],['arborvitae','leaf'],['pagoda-tree','fruit'],['wild-jujube','leaf'],['yulan','flower'],['lilac','flower'],['forsythia','flower'],['winter-jasmine','leaf'],['wisteria','flower'],['lotus','leaf'],['waterlily','leaf'],['reed','flower'],['cattail','fruit'],['fringe-tree','flower'],['bougainvillea','flower'],['dwarf-umbrella','leaf'],['bamboo','twig'],['chrysanthemum','leaf'],['marigold','leaf'],['ash','fruit'],['tuliptree','leaf'],['purple-plum','leaf'],['goldenrain','fruit'],['black-locust','fruit'],['winter-honeysuckle','flower']
].map(([id,organ])=>[plants.findIndex(p=>p.id===id),organ])];
