
import { Product, NavItem, ShowcaseItem } from './types';

// =================================================================
// ⚙️ 工坊状态设置 (Site Status)
// =================================================================
export const SITE_STATUS = {
  isBusy: false, // true = 爆肝中(暂停加急/涨价), false = 营业中(可加急)
};

export const CONTACT_INFO = {
  wechatId: "xiaolangSLE",
  officialAccountLink: "#", // 公众号链接
  platformLink: 'https://weidian.com/item.html?itemID=YOUR_ITEM_ID_HERE' // 微店等平台链接
};

// Updated Discount Codes for new logic
export const DISCOUNT_CODES = [
  { code: 'WOLF', type: 'percent', value: 0.9, exclusive: true, label: '萌新见面礼', tag: 'OFFER' },
  { code: 'VIP666', type: 'percent', value: 0.8, exclusive: true, label: '熟客尊享', tag: 'VIP' },
  { code: 'NEW', type: 'percent', value: 0.7, exclusive: true, label: '限时超值折扣', tag: 'NEW' },
  { code: 'MINUS5', type: 'fixed', value: 5, exclusive: false, label: '立减金', tag: 'COUPON' },
  { code: 'RICH', type: 'threshold', value: 50, threshold: 200, exclusive: false, label: '满200减50', tag: 'EVENT' }
];

export const DISCLAIMER_CONTENT = {
  copyright: {
    title: "版权·免责护盾",
    summary: "仅收工费，不背版权锅",
    content: [
      { title: "来图责任", text: "如果您提供图片进行定制，请确保您拥有该图片的合法使用权或符合合理使用范围。" },
      { title: "仅收工费", text: "工坊收取的费用仅包含材料成本与手作工艺费，不包含任何IP授权或许可费用。" },
      { title: "侵权避雷", text: "若因您提供的素材产生任何版权、商用等法律纠纷，需由定制方（您）全权承担解决。", highlight: true },
      { title: "免责声明", text: "小狼只负责施展手作魔法，不背版权的锅哦！请勿将侵权风险带入工坊。🚫" }
    ]
  },
  imperfection: {
    title: "关于“不完美”声明",
    summary: "手作痕迹，婉拒验伤",
    intro: "手工制品有温度，也有它的“小脾气”",
    content: [
      { title: "手作痕迹", text: "默认初伤，婉拒对光验伤，完美主义者慎拍，赠品、物料均不售后。它不是冰冷的工业复制品。微小的气泡、打磨边缘、偶尔闯入的小灰尘，都是手作过程的一部分。", highlight: true },
      { title: "屏幕色差", text: "在屏幕上看到的颜色，和实物在不同光线下看到的颜色，可能会有细微差别。小狼会尽力还原，但无法保证 100%无色差 。请以实物为准！" },
      { title: "合理微调", text: "提供的图片，小狼会用相纸打印并手工雕刻。对于一些过于复杂的细节（例如密集的发丝、蕾丝花边），为了最终效果和牢固度，小狼可能会进行合理的简化处理。下单即代表信任我的专业判断~" }
    ]
  },
  risks: {
    title: "⚠️ 风险提示",
    summary: "气泡/流沙量/胶泡说明",
    content: [
      { text: "因气压温度等影响，高原等地区流沙类制品易产生大气泡，不在售后范围，介意请勿购买，请勿赌。", highlight: true },
      { text: "单个放置的流沙量不可控（随缘），不算瑕疵不售后，如需自定义流沙量请标明什么闪粉需要几勺。边缘可能会有些许闪粉卡住属于正常现象。" },
      { text: "边缘偶见小气泡【胶泡】工艺贴合所致无法完全避免，不售后。" },
      { text: "关于“二次创作”：图片需要手工雕刻，这属于手作过程中的二次创作。图片尺寸也会进行合理裁剪。为了最终效果，请允许我做“亿点点”简化。" }
    ]
  },
  unboxing: {
    title: "售后·开箱铁律",
    summary: "无视频不售后 / 破损重制承诺",
    intro: "魔法物品的运输总是充满了未知的风险。为了守护你的权益，当你收到来自工坊的包裹时，请务必、务必、务必执行以下“解封仪式”：",
    steps: [
      "拿起手机，开启录像模式。",
      "从未拆封的状态开始，拍摄一段不中断、不加速、一镜到底的完整开箱视频。",
      "确保视频中能清晰看到快递单号和包裹的六个面。"
    ],
    promiseTitle: "🛡️ 小狼的“绝对防御”承诺：",
    promiseText: "如果在你的开箱视频中，清晰记录到了流麻漏油或严重破损的情况，请直接把视频丢给我！\n小狼承诺：免费、无条件为您【加急重制】并补发一块全新的！\n(无需排队，你的魔法值得被温柔对待！)"
  },
  slideText: "滑动以签署契约 (Sign Contract)",
  slideSuccessText: "契约已缔结 (Contract Sealed)"
};

export const CONSULTATION_CONTENT = {
  title: "✨ 定制 / 求推荐",
  desc: "不想做选择题？或者有张绝美的图想复刻？",
  activeStatus: "当前模式: 深度定制咨询",
  btnText: "直接召唤小狼",
  copyTemplate: "[特殊委托] 客户申请深度定制/推荐服务，请接入人工咨询。",
  modal: {
    headline: "找到我，然后开启故事。",
    intro: [
      "很高兴你选择了【深度定制】。这意味着你不仅想要一件商品，更想要一份独一无二的记忆。",
      "由于定制的特殊性，我们需要进行一对一的详细沟通。请添加我的私人微信，我们可以讨论："
    ],
    list: [
      "可行性评估 (能不能做)",
      "排版与设计预览 (好不好看)",
      "更精准的报价与工期 (多少钱/多久)"
    ],
    cta: "长按识别这枚“通讯水晶”，或者将它截图后在微信中打开。",
    ps: "P.S. 申请好友时请备注“流麻定制”，否则小狼可能会因为社恐而不敢通过哦...",
    card: {
      name: "小狼SLE",
      title: "StarrySand 主理人",
      caption: "扫码召唤工（摸）作（鱼）中的工坊主",
      id: "WeChat: xiaolangSLE",
      avatar: "https://i.pravatar.cc/150?u=wolf_avatar",
      bgImage: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop"
    }
  }
};

export const LOADING_IMAGES = [
  "https://i.postimg.cc/ZqCYbPjL/IMG_20251208_205434.jpg", // 替换为Q版小狼吃东西
  "https://i.postimg.cc/CKzMhCJN/IMG-20251208-205410.jpg", // 替换为Q版小狼睡觉
  "https://i.postimg.cc/YSh2rN8T/IMG_20251208_205540.jpg", // 替换为Q版小狼画画
  "https://i.postimg.cc/QMHN8g0L/IMG_20251208_205615.jpg", // 替换为Q版小狼发呆
];

// =================================================================
// 🧭 导航栏配置 (Navigation)
// =================================================================
export const NAV_CONTENT: NavItem[] = [
  { label: '作品档案', href: '#gallery' },
  { label: '定制契约', href: '#process' },
  { label: '星辰回响', href: '#star-echo' },
  { label: '废稿陈列室', href: '#future' },
  { label: '召唤工坊主', href: '#', isButton: true, action: 'consult' },
];

// =================================================================
// 🟢 首页 HERO 区域 (Hero Section)
// =================================================================
export const HERO_CONTENT = {
  welcomeTag: "Little Wolf's Studio",
  titleStart: "小狼的",
  titleHighlight: "手作工坊",
  titleEnd: " / StarrySand",
  description: "欢迎来到我的造梦空间。\n这里不只有流光溢彩的**流沙麻将**，最近我也开始沉迷于**烙画葫芦**的古朴质感。\n\n未来或许会有粘土，会有金工，谁知道呢？\n在这里，我只做自己喜欢的东西，定格每一份热爱。",
  buttons: [
    { label: "作品档案", href: "#gallery", style: "dark" },
    { label: "定制契约", href: "#process", style: "light" },
    { label: "召唤工坊主", href: "#", action: "consult", style: "primary" }
  ],
  heroImage: "https://picsum.photos/800/600?random=1",
  showcaseCard: {
    title: "工坊最新",
    subtitle: "New Arrival",
    icon: "sparkles"
  }
};

// =================================================================
// 🎨 定制流程 (Process Section) - 价格和文案都在这里修改
// =================================================================
export const PROCESS_CONTENT = {
  sectionTitle: "流沙定制指南",
  sectionSubtitle: "/ Guide",
  intro: "每一块流麻，都是一个可以握在手心的微缩景观。",
  
  // 1. 基础尺寸与价格
  // Added priceNum for calculation and isSmallSize for logic
  sizes: [
    { name: '随身卡包级', size: '8.5×5.5cm', price: '48r', priceNum: 48, isSmallSize: true, desc: '小巧玲珑，刚好放入卡包', triggerWish: true },
    { name: '手机伴侣款', size: '7.5×13cm', price: '63r', priceNum: 63, isSmallSize: false, desc: '修长比例，适合竖构图' },
    { name: '记忆珍藏版', size: '10×15cm', price: '73r', priceNum: 73, isSmallSize: false, desc: '标准相框大小，细节最丰富' },
    { name: '艺术典藏级', size: '11×20cm', price: '83r', priceNum: 83, isSmallSize: false, desc: '巨幅画布，震撼视觉' },
    { name: '萌趣挂件系', size: '< 8cm', price: '35r', priceNum: 35, isSmallSize: true, desc: '任意形状，随身携带' },
  ],
  sizeNote: "* 最终价格会根据装饰的复杂程度有小幅浮动。小尺寸(随身/萌趣)享受装饰半价优惠。",

  // 2. 流沙与配方 (Simplified)
  fluids: {
    strategies: [
      { title: '佛系选（推荐）', icon: '🧘', desc: '丢给我 3 个喜欢的颜色，或者描述一种氛围（如“梦幻蓝”），剩下的交给小狼调配。' },
      { title: '任性玩（高玩）', icon: '🎮', desc: '自己指定混合方案！建议混搭不超过 5 种元素，以免遮挡背景美图。' },
      { title: '开奖喜（盲盒）', icon: '🎁', desc: '授权我即兴创作！你的灵感就是最好的配方，说不定会诞生绝版限定款～' },
    ],
    materials: [
      { title: "基础色粉", desc: "世界的底色，决定整体基调。", color: "bg-red-400" },
      { title: "珠光粉", desc: "朦胧又高级的光泽感，自带仙气。", color: "bg-gray-200" },
      { title: "闪粉 & 亮片", desc: "偏光、镭射、镜面，点亮夜空。", color: "bg-yellow-300" },
      { title: "特殊填充物", desc: "蝴蝶、花瓣、雪花等具体形状。", color: "bg-pink-400" },
    ]
  },

  // 3. 装饰工艺
  decor: {
    visualEffects: [
      { 
        name: "⚡ 反光工艺", 
        price: "+10r", 
        priceNum: 10,
        desc: "炸街必备！开闪光灯拍摄时效果简直“炸裂”，全壳 blingbling 反射出片。",
        note: "⚠️ 不开灯状态比普通款稍灰，它是为聚光灯而生的！",
        image: "https://picsum.photos/seed/reflec/300/200"
      },
      { 
        name: "🔮 表面工艺 (视觉膜)", 
        price: "+2r", 
        priceNum: 2,
        desc: "给流麻表面加一层神奇滤镜。",
        tags: ['镭射膜', '满天星', '碎玻璃'],
        image: "https://picsum.photos/seed/film/300/200"
      }
    ],
    collage: [
      { name: '平面拼贴', price: '+10r', priceNum: 10, desc: '装饰胶带/贴纸，封入亚克力中', image: "https://i.postimg.cc/V656bkdr/001.png" },
      { name: '立体拼贴', price: '+12r', priceNum: 12, desc: 'PVC材质，外层真实触感', image: "https://picsum.photos/seed/3d/200/200" },
      { name: '巴洛克', price: '+5r', priceNum: 5, desc: '贝壳/宝石等华丽堆叠', image: "https://picsum.photos/seed/baro/200/200" },
      { name: '立体齿轮', price: '+5r', priceNum: 5, desc: '机械/蒸汽朋克风专属', image: "https://picsum.photos/seed/gear/200/200" },
    ],
    hidden: [
      { name: "夜光效果", price: "+6r", priceNum: 6, desc: "日落后开启的限定视觉。关灯即亮，无声但惊艳。", iconType: "moon", image: "https://picsum.photos/seed/glow/400/200" },
      { name: "光变效果", price: "+3r", priceNum: 3, desc: "一晒太阳瞬间“变脸”！白变蓝紫/橙红。", iconType: "sun", image: "https://picsum.photos/seed/sunchange/400/200" }
    ],
    magicMirror: {
      title: "双面幻境·光影镜",
      desc: "开灯时：星辰闪烁的流沙画。\n关灯时：一面清晰的镜子。\n它是你的专属画作，也是你的随身魔镜。",
      tags: ["仅限 10x15cm", "含平面拼贴"],
      price: "+20r",
      priceNum: 20,
      badge: "工坊隐藏款"
    }
  },

  // 4. 进阶结构
  advanced: {
    structures: [
      { icon: '🚪', name: '翻盖款', price: '+15r', priceNum: 15, multiplier: 1, desc: '像开门一样富有仪式感。外盖装饰，内层净版。', image: "https://picsum.photos/seed/door/300/200" },
      // Multiplier 2 means Base Price x 2
      { icon: '🍔', name: '双层流麻', price: '基础价 × 2', priceNum: 0, multiplier: 2, desc: '空间折叠术。包含多层图+多层流沙，层次感极其丰富。', image: "https://picsum.photos/seed/double/300/200" },
      { icon: '🌗', name: '双色分仓', price: '+20r', priceNum: 20, multiplier: 1, desc: '将流麻分为两个仓室，左红右蓝，任你想象。', image: "https://picsum.photos/seed/split/300/200" },
    ],
    finalTouch: [
      { name: "碎钻镶嵌", price: "+5r", priceNum: 5, image: "https://picsum.photos/seed/diamond/100/100" },
      { name: "普通链条 (金/银)", price: "+2r", priceNum: 2, image: "https://picsum.photos/seed/chain/100/100" },
      { name: "背面图案定制", price: "+3r", priceNum: 3, image: "https://picsum.photos/seed/back/100/100" },
    ],
    contactButton: "看花眼了吗？联系小狼帮你推荐"
  }
};

// =================================================================
// 📜 契约的履行 (Fulfillment Section)
// =================================================================
export const FULFILLMENT_CONTENT = {
  sectionTitle: "契约的履行",
  sectionSubtitle: "—— 关于时间和旅程",
  
  production: {
    title: "⏳ 工期与取消",
    cycle: "定制作品的制作时间通常是 7-14个工作日。 魔法是急不来的，催单会让小狼变得慌张，可能会导致魔法失败哦！(つД)ノ",
    cancellation: "⚠️ 因为定制的唯一性，一旦开始制作，就无法退换了。如果中途确实需要取消订单，需要至少扣除总价的 20% 作为材料损耗费（越临近交差日期损耗费越高噢）。"
  },

  rush: {
    title: "🚀 加急通道特别说明",
    subtitle: "—— 当心意迫不及待想要送达",
    intro: "(｡•̀ᴗ-)✧ 小狼知道，有些心意是迫不及待想要送达的。为了应对这种紧急的“魔法召唤”，工坊特别开设了“时间加速通道”。",
    warning: "💡 注意：催动时间魔法需要消耗工坊主大量的精力值（和咖啡因 ☕），并且会打乱现有的制作序列，所以需要支付额外的“魔力涌动费用”哦！",
    tiers: [
      {
        id: "rush-speed",
        name: "超光速档",
        fee: "+50%",
        multiplier: 0.5,
        time: "1-2天内",
        desc: "纪念日前最后一刻的极限拯救！",
        icon: "⚡",
        color: "purple"
      },
      {
        id: "rush-priority",
        name: "优先处理档",
        fee: "+30%",
        multiplier: 0.3,
        time: "3-4天内",
        desc: "哎呀，下周就要送礼了！",
        icon: "🏎️",
        color: "red"
      },
      {
        id: "rush-stable",
        name: "稳定提速档",
        fee: "+10%",
        multiplier: 0.1,
        time: "7天内",
        desc: "不想等太久，稍微快一点就好。",
        icon: "🏃",
        color: "blue"
      }
    ],
    status: {
      idle: "🍵 悠闲模式 (订单较少)：上述加急费用将作为基准价执行。",
      busy: "🔥 爆肝模式 (订单排满)：小狼可能会上调加急费用（如超光速档调至60%或更高）。因为此时插队意味着要通宵赶工，魔力消耗成倍增加！",
      cta: "在决定是否要走加急通道前，请先带着你的需求私聊小狼进行“排期问询”"
    }
  },

  shipping: {
    confirm: {
      title: "1. 成品确认",
      desc: "完工后，小狼会为你拍摄“毕业照”（实拍图+小视频），请在 48小时内 确认。（如果超时没有回复，就默认你对作品满意啦！）"
    },
    send: {
      title: "2. 发货日",
      desc: "工坊固定的发货日是：📅 每周二、四、六。确认完毕后，你的宝贝就会在最近的一个发货日踏上旅程！"
    }
  },

  packaging: [
    {
      title: "【标准防护单元】",
      engName: "Standard Shield",
      tag: "Default / Free",
      desc: "安全第一！瓦楞纸飞机盒 + 加厚气泡缓冲层 + 硫酸纸防尘封印。确保流麻完好无损地穿越现实世界的颠簸。",
      image: "https://picsum.photos/400/300?grayscale&blur=2", // Placeholder
      isUpgrade: false,
      price: "0r",
      priceNum: 0,
      rawPrice: 0
    },
    {
      title: "【星尘礼遇单元】",
      engName: "Stardust Gift Set",
      tag: "Upgrade (+15r)",
      desc: "送给TA（或自己）的惊喜。升级为硬质天地盖礼盒，内衬深空拉菲草，附赠【工坊收藏证书】及【专用养护布】。",
      image: "https://picsum.photos/400/300?random=gift", // Placeholder
      isUpgrade: true,
      price: "+15r",
      priceNum: 15,
      rawPrice: 15
    }
  ],

  warranty: {
    title: "", 
    intro: "",
    steps: [],
    reason: "",
    promiseTitle: "",
    promiseDesc: "",
    highlight: "",
    subPromise: ""
  }
};


// =================================================================
// 🎁 专属福利 (Benefits Section)
// =================================================================
export const BENEFITS_CONTENT = {
  sectionTitle: "专属福利",
  sectionSubtitle: "/ Benefits",
  intro: "为了感谢每一份信任与喜爱，小狼准备了一些小小的心意。希望这些福利能为你的定制之旅增添一份快乐。",
  badge: "全场包邮 · 惊喜掉落",
  
  global: [
    {
      title: "“首次委托”优惠券",
      discount: "9折",
      subDiscount: "/ 10% OFF",
      desc: "每一位第一次在工坊下单的客人，都可以享受一次9折的体验优惠！在最终报价时，小狼会主动为你扣除~",
      iconType: "gift",
      badge: "New"
    },
    {
      title: "“熟客回馈”计划",
      discount: "8.5折",
      subDiscount: "/ VIP",
      desc: "从你的第二笔订单开始，自动升级为工坊“VIP客人”，享受永久8.5折优惠，并获得新材料优先体验资格！",
      iconType: "heart",
      badge: null
    },
    {
      title: "“灵感碰撞”折扣",
      discount: "Max 7折",
      subDiscount: "/ Surprise",
      desc: "如果你的设计方案让小狼眼前一亮，或者委托图非常独特，会根据“心动指数”掉落随机折扣！最高可达7折！",
      iconType: "zap",
      badge: null
    }
  ],

  special: {
    badge: "工坊主小狼的特别福利",
    title: "免费的“星辰点缀”",
    desc: "( ´▽` )ﾉ 等一下！在进入复杂的选材环节前，小狼为你准备了一个专属的小礼物！\n针对 “随身卡包级(48r)” 和 “萌趣挂件系(35r)” 的客人，提供一次免费的装饰体验！",
    mode1: {
      tag: "完全免费",
      title: "模式一：许愿模式",
      desc: "你来许愿，我来点亮！不需要费心挑选，只需要告诉我你想要的【风格】和【避雷】元素。",
      points: [
        "化身“专属搭配师”，为你挑选 2-3种 最合适的装饰",
        "收获开盲盒般的惊喜，可能包含隐藏款材料！"
      ]
    },
    mode2: {
      tag: "半价指定",
      title: "模式二：半价指定模式",
      desc: "“不行！我就是有非常想用的特定装饰！”没问题，满足你的强迫症！",
      points: [
        "指定使用特定装饰，所有指定装饰享受 半价优惠",
        "精准满足需求，同时享受实实在在的折扣"
      ]
    },
    reasonTitle: "为什么要推出这个福利？",
    reasonDesc: "“因为小狼相信，最好的创作往往源于信任和一点点小小的即兴发挥。这个福利，是我邀请你与我一同‘共创’的邀请函。希望它能让你在定制的过程中，感受到更多的乐趣和惊喜！”"
  }
};

// =================================================================
// 🖼️ 作品展示 (Gallery Section) - 在这里添加或修改作品
// =================================================================
export const GALLERY_CATEGORIES = [
  { id: 'all', label: '全部档案' },
  { id: 'luxury', label: '极致华丽' },
  { id: 'atmosphere', label: '意境氛围' },
  { id: 'minimalist', label: '极简设计' },
  { id: 'special', label: '特殊工艺' },
  { id: 'future', label: '未完待续' },
];

export const GALLERY_PRODUCTS: Product[] = [
  {
    id: '001',
    archiveId: 'N°001',
    category: 'luxury',
    codeName: '苍蓝视界·无下限',
    title: '角色印象·极致华丽款',
    description: '采用多层蓝紫色系叠加，还原“赫”与“苍”碰撞的瞬间。',
    fullDescription: '这是为“诞生祭”特别定制的礼物。灵感来源于最强咒术师的无下限术式。\n\n我们在流沙层中使用了极其稀有的进口变色龙粉，在不同角度下呈现出从苍蓝到紫红的渐变，模拟咒力流动的轨迹。背景采用了复杂的教堂窗花镭射工艺，象征着神性与人性的交织。',
    imageUrl: 'https://picsum.photos/600/800?random=1',
    galleryImages: ['https://picsum.photos/600/600?random=101', 'https://picsum.photos/600/600?random=102'],
    tags: ['高难定制', '角色印象', '华丽风'],
    craftParams: {
      size: '10x15cm (记忆珍藏版)',
      time: '14天',
      techniques: ['多层悬浮滴胶', '进口变色龙粉', '镭射雕刻', '手工打磨']
    },
    isNew: true
  },
  {
  "id": "002",
  "archiveId": "N°002",
  "category": "atmosphere",
  "codeName": "森之语·鹿遇星光",
  "title": "角色印象·绮梦幻想",
  "description": "灵感源于森之少女与星辰的邂逅，将鹿灵的纯真与夜光的梦幻凝于一方天地。",
  "fullDescription": "本作核心创作理念源自知名IP联名角色‘瑶’的‘森’之主题。为呈现其穿梭于梦境与现实的飘逸感，作品采用了双层独立流沙腔体设计。\n\n主体视觉由两层动态景观构成：后景为注入了高亮夜光材质的星尘流沙，在暗处能散发柔和的辉光，宛若静谧的星夜；前景则是封装了花瓣的透明层，每一次晃动，都模拟着少女走过时，花瓣随风飞舞的灵动景象。作品运用了复杂的平面与立体多层拼贴技术，巴洛克风格的雕花、晶莹的碎钻与立体的蝶翼共同构建出华丽而富有纵深感的画框，将少女的形象环绕其中。一条镶嵌锆石的金色链条横贯其上，是幻想与现实的边界，也是连接两个世界的通路。",
  "imageUrl": "https://i.postimg.cc/V656bkdr/001.png",
  "galleryImages": [
    "https://i.postimg.cc/bYRPj2Lr/ezgif-1e8507e0015c5ff7.gif",
    "https://picsum.photos/600/600?random=105"
  ],
  "tags": ["IP联名", "绮丽幻想", "立体工艺"],
  "craftParams": {
    "size": "7.5x13cm",
    "time": "约12天",
    "techniques": ["双层流沙腔体", "夜光材质注入", "多层立体拼贴", "巴洛克风格雕花", "锆石金链镶嵌"]
    }
  },
  {
    id: '003',
    archiveId: 'N°003',
    category: 'minimalist',
    codeName: '晨露·白茶',
    title: '极简设计款',
    description: '去繁就简，只留最纯粹的透亮与一抹清雅的绿。',
    fullDescription: '谁说流沙麻将一定要花哨？\n\n这款作品挑战了极简主义。通体使用高透亚克力，流沙选择了极细的哑光白沙，点缀少许翠绿亮片。就像清晨第一杯白茶，清冽、干净。非常适合放在办公桌上，作为解压神器。',
    imageUrl: 'https://picsum.photos/600/800?random=3',
    galleryImages: ['https://picsum.photos/600/600?random=301'],
    tags: ['极简主义', '日常百搭', '治愈'],
    craftParams: {
      size: '6x9cm (便携版)',
      time: '5天',
      techniques: ['极简填充', '高透抛光', '哑光质感']
    }
  },
  {
    id: '004',
    archiveId: 'N°004',
    category: 'special',
    codeName: '星轨·夜行',
    title: '特殊工艺款',
    description: '异形切割边框，内置夜光星图，熄灯后的另一个世界。',
    fullDescription: '这是对技术的一次挑战。\n\n外框不再是传统的长方形，而是根据星轨走向进行了不规则的异形切割。流沙中混合了长效夜光沙，吸光30分钟后，能在黑暗中持续发光2小时。仿佛将一片星空装进了口袋。',
    imageUrl: 'https://picsum.photos/600/800?random=4',
    galleryImages: ['https://picsum.photos/600/600?random=401', 'https://picsum.photos/600/600?random=402'],
    tags: ['特殊工艺', '异形定制', '夜光效果'],
    craftParams: {
      size: '12x12cm (异形)',
      time: '20天',
      techniques: ['异形激光切割', '夜光沙填充', '双面观赏']
    }
  }
];

// =================================================================
// ⚖️ 定制与修改法则 (Modification Policy)
// =================================================================
export const MODIFICATION_POLICY_CONTENT = {
  sectionTitle: "定制与修改法则",
  sectionSubtitle: "/ Modification Policy",
  stages: [
    {
      step: "Stage 1",
      title: "设计图确认",
      engTitle: "The Blueprint",
      desc: "在封胶前，小狼会提供平面布局预览。这是修改贴纸位置的唯一机会！确认后即视为定稿，进入不可逆制作流程。",
      warning: "一旦封胶，平面层无法移动/修改。",
      icon: "blueprint"
    },
    {
      step: "Stage 2",
      title: "流沙的随机性",
      engTitle: "Chaos Theory",
      desc: "流沙层为液体艺术，纹理随缘生成。我们会严格按照约定配色制作，但无法精确控制每一颗闪粉的落点。请享受这份独一无二的随机美。",
      icon: "chaos"
    },
    {
      step: "Stage 3",
      title: "成品微调",
      engTitle: "Final Touches",
      desc: "成品产出后，仅支持对表面立体装饰（如外贴的钻、金属件）进行微调。",
      list: [
        "1次免费微调机会。请一次性整理好修改意见哦~",
        "若需额外修改或大改（如拆除重做），需支付 30%~50% 的重置工费。"
      ],
      icon: "wrench"
    }
  ],
  emptiness: {
    title: "关于“留白”的艺术",
    desc: "为了给立体装饰留出呼吸感和层次感，平面拼贴层会适当留白。这不是偷工减料，而是为了让最终成品看起来不拥挤、更透气。请相信小狼的审美构图！"
  }
};


// =================================================================
// ✨ 社区返图 (Showcase Section)
// =================================================================
export const SHOWCASE_CONTENT = {
  sectionTitle: "星辰回响",
  sectionSubtitle: "/ Star-Echo",
  intro: "每一份返图，都是一颗被点亮的星星。感谢你们，让这个小小的工坊充满了光芒。",
  ticker: {
    prefix: "🏆 年度锦鲤池正在蓄能…",
    separator: "|",
    suffix: "下次开奖：工坊纪念日"
  },
  cta: {
    headline: "📡 信号接收中…",
    subhead: "在社媒带话题 #小狼工坊 发布返图，解锁 星尘金 与 全额免单资格。",
    buttonText: "Copy Hashtag #小狼工坊",
    copiedText: "已复制!"
  }
};

export const SHOWCASE_DATA: ShowcaseItem[] = [
  { id: 1, img: 'https://picsum.photos/seed/showcase1/500/700', author: '@月下独酌', comment: '实物比照片还美！这个镭射效果绝了！', tag: 'STARFIRE' },
  { id: 2, img: 'https://picsum.photos/seed/showcase2/500/500', author: '@StarrySand', comment: '工坊的第一份官方样品展示。', tag: 'OFFICIAL', avatar: 'https://i.pravatar.cc/40?u=official' },
  { id: 3, img: 'https://picsum.photos/seed/showcase3/500/800', author: '@咕咕鸟', comment: '给自家OC定制的，孩子很喜欢，下次还来！', tag: 'STARFIRE', avatar: 'https://i.pravatar.cc/40?u=gugu' },
  { id: 4, img: 'https://picsum.photos/seed/showcase4/500/600', author: '@匿名希望', comment: '拍不出它的万分之一好看...流沙真的像星河！', tag: 'STARFIRE' },
  { id: 5, img: 'https://picsum.photos/seed/showcase5/500/750', author: '@StarrySand', comment: '特殊工艺「双面幻境」样品。', tag: 'OFFICIAL', avatar: 'https://i.pravatar.cc/40?u=official' },
  { id: 6, img: 'https://picsum.photos/seed/showcase6/500/550', author: '@吃不饱的狼', comment: '随手一拍都这么有氛围感，爱了爱了。', tag: 'STARFIRE', avatar: 'https://i.pravatar.cc/40?u=wolf' },
  { id: 7, img: 'https://picsum.photos/seed/showcase7/500/650', author: '@猫猫拳', comment: '阳光下太好看了！', tag: 'STARFIRE', avatar: 'https://i.pravatar.cc/40?u=cat' },
  { id: 8, img: 'https://picsum.photos/seed/showcase8/500/720', author: '@芝士就是力量', comment: '选择困难症的福音，许愿模式yyds！', tag: 'STARFIRE', avatar: 'https://i.pravatar.cc/40?u=cheese' },
];

// =================================================================
// 🛒 结算台配置 (Checkout Content)
// =================================================================
export const CHECKOUT_CONTENT = {
  header: {
    title: "✨ 定制结算台",
    subtitle: "Checkout & Estimate",
    consultationTitle: "咨询需求单",
    consultationSubtitle: "Consultation Request",
    consultationBanner: {
      title: "已进入深度定制模式",
      desc: "此模式下不显示具体金额。请复制需求单后，直接联系小狼进行一对一沟通。"
    }
  },
  labels: {
    orderDetails: "Order Details",
    noSize: "暂未选择尺寸",
    addons: "装饰与加购",
    rush: "加急服务",
    packaging: "包装方案",
    formula: "计价公式",
    baseCraft: "基础与工艺",
    addonTotal: "装饰合计",
    smallSizeDiscount: "(小尺寸半价)",
    rushFee: "加急费",
    packFee: "包装费",
    discount: "优惠折扣",
    total: "预估总价",
    inputPlaceholder: "输入优惠码 (如: WOLF)",
    redeem: "兑换",
    disclaimerTitle: "定制契约书",
    readSign: "需阅读并签署"
  },
  schedule: {
    title: "作息提示：",
    items: [
      { icon: "📅", label: "工作日：", text: "小狼通常在北京时间10:00 - 22:00出没于工坊。" },
      { icon: "🌙", label: "夜晚：", text: "22:00后工坊会进入“休眠模式”，讯息会在次日醒来后第一时间处理。" },
      { icon: "🏖️", label: "周末：", text: "小狼会随机掉落，进行“精神光合作用”，回复可能变慢，敬请谅解。" }
    ],
    footer: "(你的耐心等待，是让魔法顺利诞生的最佳咒语。)"
  },
  copyTemplate: {
    intro: "Hi小狼，我想定制流沙麻将：\n",
    separator: "----------------\n",
    size: "🖼️ 尺寸：",
    craft: "🛠️ 工艺：",
    addons: "✨ 装饰/其他：\n",
    rush: "🚀 加急：",
    pack: "🎁 包装：",
    coupon: "🎟️ 优惠券：\n",
    systemTitle: "[系统计价明细]\n",
    base: "1. 基础: ",
    decor: "2. 装饰: ",
    discount: "3. 折扣: ",
    subtotal: "4. 小计: ",
    rushFee: "5. 加急费: ",
    packFee: "6. 包装费: ",
    final: "\n💰 最终报价：",
    disclaimer: "(此为系统预估，最终价格以沟通为准)"
  },
  actions: {
    copy: {
      label: "复制订单",
      success: "已复制"
    },
    wechat: {
      label: "微信直连",
      sub: "信任通道 · 熟客推荐",
      success: "已复制"
    },
    platform: {
      label: "平台支付",
      sub: "保障通道 · 萌新首选",
      lockedHint: "为了保障权益，请先滑动上方滑块签署契约"
    }
  }
};
