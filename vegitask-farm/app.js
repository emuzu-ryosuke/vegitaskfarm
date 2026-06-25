// --- ヘルパー関数 ---
const $ = id => document.getElementById(id);
const COLOR_CODES = { red:'#ef4444', blue:'#3b82f6', green:'#22c55e', yellow:'#eab308', purple:'#a855f7', orange:'#f97316', pink:'#ec4899', gray:'#64748b' };

// 初期ラベル名定義
let labelNames = {
    red: "🔴 赤ラベル", blue: "🔵 青ラベル", green: "🟢 緑ラベル", yellow: "🟡 黄ラベル",
    purple: "🟣 紫ラベル", orange: "🟠 橙ラベル", pink: "🌸 桃ラベル", gray: "⚫ 灰ラベル"
};

// --- マスターデータ ---
const VEGETABLE_MASTER = [
    { id: "tomato", name: "トマト", emoji: "🍅", reqTasks: 1, desc: "太陽の光をたっぷり浴びた定番のトマト。" }, 
    { id: "carrot", name: "ニンジン", emoji: "🥕", reqTasks: 1, desc: "甘くて栄養満点！色鮮やかなニンジン。" }, 
    { id: "melon", name: "メロン", emoji: "🍈", reqTasks: 7, desc: "網目が美しい高級メロン。甘い香りが漂う。" },
    { id: "eggplant", name: "ナス", emoji: "🍆", reqTasks: 5, desc: "どんな料理にも合う、ツヤツヤのナス。" }, 
    { id: "potato", name: "じゃがいも", emoji: "🥔", reqTasks: 2, desc: "ホクホク美味しいじゃがいも。" }, 
    { id: "corn", name: "トウモロコシ", emoji: "🌽", reqTasks: 4, desc: "茹でても焼いても美味しいトウモロコシ。" },
    { id: "pepper", name: "ピーマン", emoji: "🫑", reqTasks: 3, desc: "少し苦味があるけれど、栄養たっぷり。" }, 
    { id: "cucumber", name: "きゅうり", emoji: "🥒", reqTasks: 2, desc: "パリッと爽やかな食感！サラダに。" }, 
    { id: "pumpkin", name: "カボチャ", emoji: "🎃", reqTasks: 3, desc: "甘くてホクホク。煮物やスープに。" },
    { id: "onion", name: "タマネギ", emoji: "🧅", reqTasks: 3, desc: "炒めると甘みが増す料理の基本。" }, 
    { id: "garlic", name: "ニンニク", emoji: "🧄", reqTasks: 2, desc: "香りが食欲そそる。スタミナ満点！" }, 
    { id: "sweetpotato", name: "さつまいも", emoji: "🍠", reqTasks: 3, desc: "焼き芋にすると絶品！" },
    { id: "strawberry", name: "イチゴ", emoji: "🍓", reqTasks: 3, desc: "甘酸っぱくて可愛いイチゴ。" }, 
    { id: "watermelon", name: "スイカ", emoji: "🍉", reqTasks: 5, desc: "夏の風物詩！水分たっぷりのスイカ。" }, 
    { id: "grape", name: "ぶどう", emoji: "🍇", reqTasks: 6, desc: "果汁が詰まったジューシーなぶどう。" },
    { id: "apple", name: "リンゴ", emoji: "🍎", reqTasks: 6, desc: "シャキッとした歯ごたえが楽しい。" }, 
    { id: "banana", name: "バナナ", emoji: "🍌", reqTasks: 6, desc: "手軽にエネルギー補給ができる。" }, 
    { id: "pineapple", name: "パイナップル", emoji: "🍍", reqTasks: 7, desc: "酸味と甘みのバランスが良い。" },
    { id: "peach", name: "モモ", emoji: "🍑", reqTasks: 3, desc: "とろけるような甘さと香り。" }, 
    { id: "cherry", name: "さくらんぼ", emoji: "🍒", reqTasks: 5, desc: "見た目も可愛いさくらんぼ。" }, 
    { id: "mushroom", name: "キノコ", emoji: "🍄", reqTasks: 3, desc: "旨味がたっぷり詰まったキノコ。" },
    { id: "chestnut", name: "栗", emoji: "🌰", reqTasks: 3, desc: "秋の味覚。ホクホクとした食感。" }, 
    { id: "avocado", name: "アボカド", emoji: "🥑", reqTasks: 1, desc: "森のバターとも呼ばれるアボカド。" }, 
    { id: "broccoli", name: "ブロッコリー", emoji: "🥦", reqTasks: 1, desc: "栄養価が高く、食べ応えがある。" },
    { id: "cabbage", name: "キャベツ", emoji: "🥬", reqTasks: 2, desc: "シャキシャキの歯ごたえ！" }, 
    { id: "peanut", name: "ピーナッツ", emoji: "🥜", reqTasks: 3, desc: "香ばしくておつまみにもなる。" }, 
    { id: "radish", name: "大根", emoji: "🥢", reqTasks: 2, desc: "煮物にすると味が染み込む大根。" }, 
    { id: "bamboo", name: "タケノコ", emoji: "🎍", reqTasks: 3, desc: "春の訪れを感じるタケノコ。" }, 
    { id: "lemon", name: "レモン", emoji: "🍋", reqTasks: 3, desc: "爽やかな酸味が特徴のレモン。" }, 
    { id: "orange", name: "みかん", emoji: "🍊", reqTasks: 5, desc: "甘くてジューシーなみかん。" },
    
    // レア野菜
    { id: "rare_tomato", name: "黄色トマト", emoji: "🍅", isRare: true, reqTasks: 1, desc: "突然変異の黄色いトマト。フルーツのように甘い。" }, 
    { id: "rare_carrot", name: "高麗人参", emoji: "🥕", isRare: true, reqTasks: 1, desc: "大地のパワーを秘めた貴重な人参。" }, 
    { id: "rare_potato", name: "メークイン", emoji: "🥔", isRare: true, reqTasks: 2, desc: "細長い上質なジャガイモ。煮崩れしにくい。" }, 
    { id: "rare_cabbage", name: "春キャベツ", emoji: "🥬", isRare: true, reqTasks: 2, desc: "葉が柔らかく、甘みが強い特別なキャベツ。" }, 
    { id: "rare_onion", name: "新玉ねぎ", emoji: "🧅", isRare: true, reqTasks: 3, desc: "水分が多くて辛味が少ない玉ねぎ。" }, 
    { id: "rare_cucumber", name: "イボなしきゅうり", emoji: "🥒", isRare: true, reqTasks: 2, desc: "表面がツルツルしている珍しいきゅうり。" }, 
    { id: "rare_eggplant", name: "まんまるナス", emoji: "🍆", isRare: true, reqTasks: 5, desc: "丸い形をした肉厚なナス。火を通すとトロトロに。" }
];

const RARE_CROP_MAPPING = { "tomato": { rareId: "rare_tomato", recipeId: "ratatouille" }, "carrot": { rareId: "rare_carrot", recipeId: "honey_ginseng" }, "potato": { rareId: "rare_potato", recipeId: "potato_salad" }, "cabbage": { rareId: "rare_cabbage", recipeId: "coleslaw" }, "onion": { rareId: "rare_onion", recipeId: "onion_ring" }, "cucumber": { rareId: "rare_cucumber", recipeId: "pickled_cucumber" }, "eggplant": { rareId: "rare_eggplant", recipeId: "mabo_eggplant" } };

const RECIPE_MASTER = {
    napoli: { name: "昔ながらのナポリタン", emoji: "🍝", type: "regular", req: { tomato: 1 }, ingredients: [{name: "トマト", amount: "1個"}, {name: "パスタ麺", amount: "1玉"}, {name: "玉ねぎ・ピーマン", amount: "各1/4個"}, {name: "ベーコン", amount: "1枚"}, {name: "ケチャップ", amount: "大さじ3"}, {name: "バター", amount: "10g"}], steps: ["パスタ麺を表記時間通りに茹でる。", "フライパンにバターを熱し、玉ねぎ、ピーマン、ベーコンを炒める。", "トマトをざく切りにして加え、木べらで軽く潰しながら炒める。", "ケチャップを加えて水分を飛ばすようにしっかり炒める。", "パスタを加え、全体に絡めれば完成！"], desc: "喫茶店の味。" },
    glace: { name: "ニンジンのツヤツヤグラッセ", emoji: "🥕", type: "regular", req: { carrot: 1 }, ingredients: [{name: "ニンジン", amount: "1本"}, {name: "バター", amount: "15g"}, {name: "砂糖", amount: "大さじ1"}, {name: "塩", amount: "ひとつまみ"}, {name: "水", amount: "ひたひた量"}], steps: ["ニンジンを厚さ1cmの輪切りにし、面取りをする。", "小鍋にニンジン、水、砂糖、塩、バターを入れる。", "沸騰したら落とし蓋をし、弱火で15分煮る。", "落とし蓋を取り、火を強めて水分を飛ばしツヤを出す。"], desc: "お肉料理の付け合わせに。" },
    german_potato: { name: "ホクホクジャーマンポテト", emoji: "🥔", type: "regular", req: { potato: 1 }, ingredients: [{name: "じゃがいも", amount: "1個"}, {name: "ベーコン", amount: "2枚"}, {name: "玉ねぎ", amount: "1/4個"}, {name: "オリーブオイル", amount: "大さじ1"}], steps: ["じゃがいもは一口大に切り、レンジで3分加熱する。", "オリーブオイルでベーコンと玉ねぎをじっくり炒める。", "じゃがいもを加え、表面に焼き色がつくまで炒める。", "塩こしょうで味を調える。"], desc: "ビールのお供に最高。" },
    roll_cabbage: { name: "特製ロールキャベツ", emoji: "🥬", type: "regular", req: { cabbage: 1 }, ingredients: [{name: "キャベツの葉", amount: "大2枚"}, {name: "合い挽き肉", amount: "100g"}, {name: "玉ねぎ", amount: "1/4個"}, {name: "コンソメ", amount: "1個"}], steps: ["キャベツの葉を熱湯でさっと茹でてしんなりさせる。", "挽き肉と玉ねぎをこねてタネを作る。", "タネをキャベツで巻き、爪楊枝で留める。", "水とコンソメを入れた鍋で30分煮込む。"], desc: "心温まる一品。" },
    salad: { name: "栄養満点シャキシャキサラダ", emoji: "🥗", type: "regular", req: { tomato: 1, carrot: 1, cabbage: 1 }, ingredients: [{name: "トマト", amount: "1個"}, {name: "ニンジン", amount: "1/2本"}, {name: "キャベツ", amount: "1/4玉"}], steps: ["キャベツは千切りにし冷水にさらす。", "ニンジンは千切り、トマトはくし形に切る。", "オリーブオイルとお酢で特製ドレッシングを作る。", "野菜とドレッシングを和えて盛り付ける。"], desc: "健康ミックスサラダ。" },
    onion_soup: { name: "まるごとオニオンスープ", emoji: "🧅", type: "regular", req: { onion: 1 }, ingredients: [{name: "タマネギ", amount: "1個"}, {name: "バター", amount: "10g"}, {name: "コンソメ", amount: "小さじ1"}], steps: ["タマネギの上部に十字の切れ目を入れる。", "ラップで包みレンジで5分加熱する。", "小鍋で沸かしたコンソメスープにタマネギとバターを入れる。", "弱火で5分煮込んで完成！"], desc: "タマネギの甘みが溶け込む。" },
    cucumber_recipe: { name: "無限やみつききゅうり", emoji: "🥒", type: "regular", req: { cucumber: 1 }, ingredients: [{name: "きゅうり", amount: "1本"}, {name: "塩こんぶ", amount: "大さじ1"}, {name: "ごま油", amount: "小さじ1"}], steps: ["きゅうりを麺棒で軽く叩いてヒビを入れる。", "手で食べやすい大きさに割る。", "塩こんぶ、ごま油と一緒にポリ袋に入れ揉み込む。", "冷蔵庫で10分冷やして完成。"], desc: "無限に食べられるおつまみ。" },
    eggplant_recipe: { name: "とろける なすの煮びたし", emoji: "🍆", type: "regular", req: { eggplant: 1 }, ingredients: [{name: "なす", amount: "1本"}, {name: "めんつゆ", amount: "100ml"}, {name: "おろし生姜", amount: "小さじ1"}], steps: ["なすを縦半分に切り、皮に細かい切り込みを入れる。", "フライパンで皮目から焼き、しんなりさせる。", "めんつゆと生姜を混ぜた液に熱いなすを浸す。", "冷蔵庫で冷やして完成。"], desc: "ジュワッと出汁が染み出す。" },
    tutorial_salad: { name: "極上 冷やしトマト", emoji: "🍅", type: "hidden", req: { tomato: 1 }, ingredients: [{name: "完熟トマト", amount: "1個"}, {name: "塩", amount: "ひとつまみ"}, {name: "オリーブオイル", amount: "小さじ1"}], steps: ["トマトを氷水でしっかり冷やす。", "均等な厚さにスライスしてお皿に盛る。", "美味しい塩とオリーブオイルをかける。"], desc: "👑 あそびかたクリア限定レシピ" },
    ratatouille: { name: "黄金のラタトゥーユ", emoji: "🍲", type: "hidden", req: { rare_tomato: 1 }, ingredients: [{name: "黄色トマト", amount: "1個"}, {name: "ナス・玉ねぎ", amount: "各1/2個"}, {name: "コンソメ", amount: "小さじ1"}], steps: ["野菜をすべて同じ大きさの角切りにする。", "ニンニクと油で玉ねぎ、ナスを炒め、黄色トマトを加える。", "コンソメを加え、弱火で15分煮込む。"], desc: "🌟 突然変異レシピ" },
    honey_ginseng: { name: "高麗人参のはちみつ漬け", emoji: "🍯", type: "hidden", req: { rare_carrot: 1 }, ingredients: [{name: "高麗人参", amount: "1本"}, {name: "はちみつ", amount: "ひたひた量"}, {name: "レモンスライス", amount: "2枚"}], steps: ["高麗人参を薄い輪切りにする。", "瓶に高麗人参とレモンを入れ、はちみつを注ぐ。", "冷暗所で数日寝かせる。"], desc: "🌟 突然変異レシピ" },
    potato_salad: { name: "なめらかポテトサラダ", emoji: "🥗", type: "hidden", req: { rare_potato: 1 }, ingredients: [{name: "メークイン", amount: "1個"}, {name: "きゅうり・ハム", amount: "少々"}, {name: "マヨネーズ", amount: "大さじ2"}], steps: ["メークインを塩茹でし、粉ふきいもにしてマッシュする。", "きゅうりは塩もみし、ハムは切る。", "粗熱が取れたらマヨネーズ等で和える。"], desc: "🌟 突然変異レシピ" },
    coleslaw: { name: "春キャベツのコールスロー", emoji: "🥗", type: "hidden", req: { rare_cabbage: 1 }, ingredients: [{name: "春キャベツ", amount: "1/4玉"}, {name: "コーン", amount: "大さじ2"}, {name: "マヨネーズ・酢", amount: "適量"}], steps: ["春キャベツをみじん切りにし、塩を振って水分を絞る。", "コーン、調味料と合わせて混ぜる。", "冷蔵庫で冷やして味をなじませる。"], desc: "🌟 突然変異レシピ" },
    onion_ring: { name: "サクサク！オニオンリング", emoji: "🧅", type: "hidden", req: { rare_onion: 1 }, ingredients: [{name: "新玉ねぎ", amount: "1個"}, {name: "薄力粉・片栗粉", amount: "各大さじ3"}, {name: "炭酸水", amount: "大さじ5"}], steps: ["新玉ねぎを1cm幅の輪切りにしてほぐす。", "粉と冷えた炭酸水で衣を作る。", "衣をつけて170度の油でカラッと揚げる。"], desc: "🌟 突然変異レシピ" },
    pickled_cucumber: { name: "きゅうりの爽やかピクルス", emoji: "🥒", type: "hidden", req: { rare_cucumber: 1 }, ingredients: [{name: "イボなしきゅうり", amount: "1本"}, {name: "お酢・水", amount: "各50ml"}, {name: "砂糖・塩", amount: "適量"}], steps: ["きゅうりをスティック状に切る。", "調味料を煮立ててピクルス液を作る。", "きゅうりに熱いピクルス液をかけ、冷蔵庫で漬け込む。"], desc: "🌟 突然変異レシピ" },
    mabo_eggplant: { name: "ピリ辛本格 麻婆茄子", emoji: "🍆", type: "hidden", req: { rare_eggplant: 1 }, ingredients: [{name: "まんまるナス", amount: "1個"}, {name: "豚ひき肉", amount: "100g"}, {name: "豆板醤・甜麺醤", amount: "各小さじ1"}], steps: ["ナスを乱切りにして素揚げにする。", "ひき肉と調味料を炒め、ナスを戻し入れる。", "水溶き片栗粉でとろみをつける。"], desc: "🌟 突然変異レシピ" }
};

let gameState = { normal: { inventory: {}, currentCrop: null, growthPoint: 0, tasks: [], harvestCount: {}, cookedCount: {}, originalRecipes: [] }, tutorial: { inventory: {}, currentCrop: null, growthPoint: 0, tasks: [] } };
let unlockedSeeds = ["tomato", "carrot"], unlockedRecipes = ["napoli", "glace"], recipeBook = {};
VEGETABLE_MASTER.forEach(veg => { gameState.normal.inventory[veg.id] = 0; gameState.tutorial.inventory[veg.id] = 0; });
Object.keys(RECIPE_MASTER).forEach(key => recipeBook[key] = false);

let debugTemporaryCart = {}, taskHistory = [], todayDoneLog = [];
let isHolidayPickingMode = false, temporaryHolidayPicks = {}, showWeekendColor = true, historyCurrentPage = 1, historySearchKeyword = "", currentTutorialStep = 0, debugGoldMedalCount = null;
const historyItemsPerPage = 10;

let hasSeenCalendarHelp = false;
let recipeBookCurrentPage = 1;
const recipeBookItemsPerPage = 6; 

// 🌟 ゲーム設定（週始まりのみに変更）
let gameSettings = { weekStart: 0 };

const realClock = new Date(); const currentYear = realClock.getFullYear(), currentMonth = realClock.getMonth() + 1, realTodayDate = realClock.getDate();
let selectedDate = realTodayDate; 
const daysInThisMonth = new Date(currentYear, currentMonth, 0).getDate(), firstDayWeekday = new Date(currentYear, currentMonth - 1, 1).getDay();
let tasksByDate = {}, holidays = {};

const SAVE_KEY = "taskFarmGameSaveData";

function saveData() {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ gameState, unlockedSeeds, unlockedRecipes, recipeBook, taskHistory, todayDoneLog, tasksByDate, holidays, currentTutorialStep, showWeekendColor, hasSeenCalendarHelp, labelNames, gameSettings }));
}

function loadData() {
    const s = localStorage.getItem(SAVE_KEY);
    if (s) {
        try {
            const p = JSON.parse(s);
            if(p.gameState) {
                gameState = p.gameState;
                if (!gameState.normal.harvestCount) gameState.normal.harvestCount = {};
                if (!gameState.normal.cookedCount) gameState.normal.cookedCount = {};
                if (!gameState.normal.originalRecipes) gameState.normal.originalRecipes = [];
            }
            if(p.unlockedSeeds) unlockedSeeds = p.unlockedSeeds; if(p.unlockedRecipes) unlockedRecipes = p.unlockedRecipes;
            if(p.recipeBook) recipeBook = p.recipeBook; if(p.taskHistory) taskHistory = p.taskHistory; if(p.todayDoneLog) todayDoneLog = p.todayDoneLog;
            if(p.tasksByDate) tasksByDate = p.tasksByDate; if(p.holidays) holidays = p.holidays; if(p.currentTutorialStep !== undefined) currentTutorialStep = p.currentTutorialStep;
            if(p.showWeekendColor !== undefined) showWeekendColor = p.showWeekendColor;
            if(p.hasSeenCalendarHelp !== undefined) hasSeenCalendarHelp = p.hasSeenCalendarHelp;
            if(p.labelNames) labelNames = p.labelNames; 
            if(p.gameSettings) gameSettings = p.gameSettings;
        } catch (e) {}
    }
    for (let i = 1; i <= 31; i++) { if (!tasksByDate[i]) tasksByDate[i] = []; if (holidays[i] === undefined) holidays[i] = false; temporaryHolidayPicks[i] = false; }
}

function renderLabelSelects() {
    let html = "";
    for (let key in labelNames) {
        let isSelected = (key === 'blue') ? 'selected' : '';
        html += `<option value="${key}" style="color:${COLOR_CODES[key]};" ${isSelected}>${labelNames[key]}</option>`;
    }
    if ($('labelSelect')) $('labelSelect').innerHTML = html;
    if ($('repeatLabelSelect')) $('repeatLabelSelect').innerHTML = html;
}

function openSettingsModal() {
    if (currentTutorialStep > 0) return;
    
    let weekStartRadio = document.querySelector(`input[name="weekStartSetting"][value="${gameSettings.weekStart || 0}"]`);
    if(weekStartRadio) weekStartRadio.checked = true;
    
    for (let key in labelNames) {
        if ($(`input-label-${key}`)) $(`input-label-${key}`).value = labelNames[key];
    }
    openModal('settings');
}

function saveSettings() {
    let weekStartRadio = document.querySelector('input[name="weekStartSetting"]:checked');
    if (weekStartRadio) {
        gameSettings.weekStart = parseInt(weekStartRadio.value, 10);
    }

    for (let key in labelNames) {
        if ($(`input-label-${key}`)) {
            let val = $(`input-label-${key}`).value.trim();
            if (val) labelNames[key] = val;
        }
    }
    renderLabelSelects();
    renderCalendar();
    saveData();
    closeModal('settings');
}

// 🌟 タイトル連続タップによるデバッグモード切り替え
let titleClickCount = 0;
let titleClickTimer = null;
function handleTitleClick() {
    titleClickCount++;
    if (titleClickTimer) clearTimeout(titleClickTimer);
    titleClickTimer = setTimeout(() => { titleClickCount = 0; }, 1000);
    if (titleClickCount >= 5) {
        const debugPanel = $('debug-menu-panel');
        if (debugPanel.style.display === 'none') {
            debugPanel.style.display = 'block';
            alert('🛠️ デバッグモードが有効になりました');
        } else {
            debugPanel.style.display = 'none';
            alert('🛠️ デバッグモードを無効にしました');
        }
        titleClickCount = 0;
    }
}

window.onload = () => {
    loadData();
    renderLabelSelects(); 
    
    const urlParams = new URLSearchParams(window.location.search);
    const recipeParam = urlParams.get('recipe');
    if (recipeParam) {
        try {
            const recipeJson = decodeURIComponent(atob(recipeParam));
            const importedRecipe = JSON.parse(recipeJson);
            
            if (!gameState.normal.originalRecipes) gameState.normal.originalRecipes = [];
            let exists = gameState.normal.originalRecipes.some(r => r.id === importedRecipe.id);
            
            if (!exists) {
                setTimeout(() => {
                    if(confirm(`🎁 他のシェフからオリジナルレシピ「${importedRecipe.name}」が届いています！\nレシピブックに保存しますか？\n（※最大10個まで）`)) {
                        if(gameState.normal.originalRecipes.length >= 10) {
                            alert("オリジナルレシピの保存上限（10個）に達しているため、受け取れませんでした。\nレシピブックから空きを作ってから再度URLを開いてください。");
                        } else {
                            importedRecipe.isImported = true;
                            gameState.normal.originalRecipes.push(importedRecipe);
                            saveData();
                            alert("レシピブック（オリジナルタブ）に保存しました！\nさっそく調理場で作ってみましょう！");
                            updateFarmDisplay();
                        }
                    }
                }, 500);
            } else {
                setTimeout(() => { alert("💡 この共有レシピはすでに保存済みです！"); }, 500);
            }
        } catch(e) {
            console.error("レシピインポート失敗", e);
            setTimeout(() => { alert("❌ レシピデータの読み込みに失敗しました。URLが正しくない可能性があります。"); }, 500);
        }
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    if($('current-month-label')) $('current-month-label').innerText = currentMonth; 
    if($('selected-date-label')) $('selected-date-label').innerText = selectedDate; 
    if($('modal-selected-day-label')) $('modal-selected-day-label').innerText = selectedDate;
    const toggleCheck = $('toggleWeekendColorCheck'); if(toggleCheck) toggleCheck.checked = showWeekendColor;

    if (currentTutorialStep > 0) { switchPage(currentTutorialStep === 4 ? 'kitchen' : 'farm'); openModal('tutorial'); updateTutorialGuide(); toggleAllElementsLock(true); $('tutorial-cook-box').style.display = 'flex'; $('dynamic-cook-list').style.display = 'none'; }
    refreshAllViews(); renderHistoryList(); renderTodayDoneLog();
};

function setDebugMedal(val) { debugGoldMedalCount = (val === 'normal') ? null : parseInt(val, 10); }
function addHint(arr, cond, txt) { if (cond) arr.push(txt); }

function checkUnlocks() {
    let h = gameState.normal.harvestCount, c = gameState.normal.cookedCount, updated = false;
    const unlockSeed = (id, msg) => { if(!unlockedSeeds.includes(id)) { unlockedSeeds.push(id); alert(msg); updated = true; } };
    const unlockRecipe = (id, msg) => { if(!unlockedRecipes.includes(id)) { unlockedRecipes.push(id); alert(msg); updated = true; } };

    if (h['tomato'] >= 1 && h['carrot'] >= 1) unlockSeed('potato', '🌟 【解放】新しい種「じゃがいも🥔」が畑に届きました！');
    if (h['potato'] >= 1) unlockRecipe('german_potato', '💡 【ひらめき】新しいレシピ「ジャーマンポテト🥔」を思いつきました！');
    if (Object.keys(c).length >= 3) unlockSeed('cabbage', '🌟 【解放】料理の腕が上がり、新しい種「キャベツ🥬」が届きました！');
    if (h['cabbage'] >= 1) unlockRecipe('roll_cabbage', '💡 【ひらめき】新しいレシピ「ロールキャベツ🥬」を思いつきました！');
    if (c['roll_cabbage'] >= 1) unlockRecipe('salad', '💡 【ひらめき】新しいレシピ「シャキシャキサラダ🥗」を思いつきました！');
    if (c['salad'] >= 1) unlockSeed('onion', '🌟 【解放】新しい種「タマネギ🧅」が畑に届きました！');
    if (h['onion'] >= 1) unlockRecipe('onion_soup', '💡 【ひらめき】新しいレシピ「まるごとオニオンスープ🧅」を思いつきました！');
    if (c['onion_soup'] >= 1) { unlockSeed('cucumber', '🌟 【解放】一気に2つの種！「きゅうり🥒」「ナス🍆」が届きました！'); unlockSeed('eggplant', ''); }
    if (h['cucumber'] >= 1) unlockRecipe('cucumber_recipe', '💡 【ひらめき】新しいレシピ「やみつききゅうり🥒」を思いつきました！');
    if (h['eggplant'] >= 1) unlockRecipe('eggplant_recipe', '💡 【ひらめき】新しいレシピ「なすの煮びたし🍆」を思いつきました！');
    
    if (c['eggplant_recipe'] >= 1) {
        let baseSeeds = VEGETABLE_MASTER.filter(v => !v.isRare).map(v => v.id);
        let newlyUnlocked = false;
        baseSeeds.forEach(id => {
            if (!unlockedSeeds.includes(id)) { unlockedSeeds.push(id); newlyUnlocked = true; }
        });
        if (newlyUnlocked) {
            alert('🎊 【全種解放】ここまでのミッションをすべて達成しました！\n種屋さんがあなたの料理の腕前に感動し、取り扱っている【すべての野菜の種】をプレゼントしてくれました！');
            updated = true;
        }
    }
    
    if (updated) { updateFarmDisplay(); if ($('modal-seedSelect').classList.contains('active')) renderSeedSelectMenu(); if ($('modal-recipeBook').classList.contains('active')) updateRecipeBookDisplay(); saveData(); }
}

function openModal(id) {
    if (currentTutorialStep > 0 && id !== 'tutorial' && id !== 'seedSelect') { alert('あそびかたガイド進行中です！ガイドの指示に従ってね。'); return; }
    $(`modal-${id}`).classList.add('active');
    
    if (id === 'calendar') { 
        if(typeof cancelHolidayPickingMode === 'function') cancelHolidayPickingMode(); 
        if ($('modal-selected-day-label')) $('modal-selected-day-label').innerText = selectedDate;
        if($('modal-repeat-form-panel')) $('modal-repeat-form-panel').style.display = 'none';
        renderCalendar(); renderModalTaskList(); 
        
        if (!hasSeenCalendarHelp) {
            hasSeenCalendarHelp = true;
            saveData();
            setTimeout(() => { openModal('calendarHelp'); }, 200);
        }
    }
    
    if (id === 'recipeBook') { 
        recipeBookCurrentPage = 1; 
        switchBookTab('main'); closeRecipeDetailView(); updateRecipeBookDisplay(); 
    }
    if (id === 'seedSelect') renderSeedSelectMenu();
    if (id === 'debugStock') renderDebugStockMenu();
    if (id === 'inventory') renderInventoryModalGrid(); 
}

function closeModal(id) { $(`modal-${id}`).classList.remove('active'); }

function switchPage(pageType) {
    if (currentTutorialStep > 0 && currentTutorialStep !== 4 && pageType === 'kitchen') { alert('ガイド：まだ調理場へ移るタイミングではありません！'); return; }
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active')); $(`page-${pageType}`).classList.add('active');
    document.querySelectorAll('.nav-tabs button').forEach(b => b.classList.remove('active')); $(`tab-${pageType}`).classList.add('active');
    
    const taskArea = document.querySelector('.task-area');
    if (taskArea) { taskArea.style.display = (pageType === 'kitchen') ? 'none' : 'block'; }
    
    updateFarmDisplay(); renderTaskList(); 
    if (currentTutorialStep === 4) { const btn = $('cook-tutorial-item'); if (btn) btn.disabled = (gameState.tutorial.inventory['tomato'] < 1); updateTutorialGuide(); }
}

function renderSeedSelectMenu() {
    const container = $('seed-grid-container'); container.innerHTML = '';
    let availableSeeds = VEGETABLE_MASTER.filter(veg => unlockedSeeds.includes(veg.id) && !veg.isRare); 
    
    let baseSeedsCount = VEGETABLE_MASTER.filter(v => !v.isRare).length;
    if (unlockedSeeds.length >= baseSeedsCount) { availableSeeds.sort((a, b) => a.reqTasks - b.reqTasks); }
    
    availableSeeds.forEach(veg => {
        const btn = document.createElement('button'); btn.className = 'veg-button-item';
        if (currentTutorialStep === 1) { if (veg.id === 'tomato') { btn.classList.add('guide-flash'); } else { btn.disabled = true; btn.style.opacity = "0.3"; btn.style.cursor = "not-allowed"; } }
        btn.innerHTML = `<span class="veg-button-emoji">${veg.emoji}</span><span class="veg-button-name">${veg.name}</span><span style="font-size:10px; color:#16a34a; font-weight:bold;">必要タスク:${veg.reqTasks}</span>`;
        btn.onclick = function() { plantSeed(veg.id); closeModal('seedSelect'); }; container.appendChild(btn);
    });
}

function renderDebugStockMenu() {
    const container = $('debug-stock-container'); container.innerHTML = ''; 
    VEGETABLE_MASTER.forEach(veg => { debugTemporaryCart[veg.id] = 0; });
    VEGETABLE_MASTER.forEach(veg => {
        const btn = document.createElement('button'); btn.className = 'veg-button-item';
        let rareBadge = veg.isRare ? `<span class="rare-badge">レア</span>` : "";
        btn.innerHTML = `${rareBadge}<span id="debug-badge-${veg.id}" class="veg-button-badge"></span><span class="veg-button-emoji">${veg.emoji}</span><span class="veg-button-name">${veg.name}</span>`;
        btn.onclick = function() { debugTemporaryCart[veg.id]++; const badge = $(`debug-badge-${veg.id}`); badge.innerText = `+${debugTemporaryCart[veg.id]}`; badge.style.display = 'block'; };
        container.appendChild(btn);
    });
}

function debugAdd5ToAll() {
    VEGETABLE_MASTER.forEach(veg => {
        debugTemporaryCart[veg.id] += 5;
        const badge = $(`debug-badge-${veg.id}`);
        badge.innerText = `+${debugTemporaryCart[veg.id]}`;
        badge.style.display = 'block';
    });
}

function debugResetCart() {
    VEGETABLE_MASTER.forEach(veg => { debugTemporaryCart[veg.id] = 0; });
    document.querySelectorAll('.veg-button-badge').forEach(b => b.style.display = 'none');
}

function debugApplyStock() {
    let activeData = (currentTutorialStep > 0) ? gameState.tutorial : gameState.normal;
    VEGETABLE_MASTER.forEach(veg => { if (debugTemporaryCart[veg.id] > 0) activeData.inventory[veg.id] += debugTemporaryCart[veg.id]; });
    closeModal('debugStock'); updateFarmDisplay(); saveData(); 
}

function plantSeed(type) { 
    if (currentTutorialStep > 0 && currentTutorialStep !== 1) return;
    
    let activeData = (currentTutorialStep > 0) ? gameState.tutorial : gameState.normal;
    activeData.currentCrop = type; activeData.growthPoint = 0; 
    if (currentTutorialStep === 1 && type === 'tomato') { currentTutorialStep = 2; openModal('tutorial'); updateTutorialGuide(); }
    updateFarmDisplay(); saveData(); 
}

function harvestCrop() { 
    if (currentTutorialStep > 0 && currentTutorialStep !== 3) return;

    let activeData = (currentTutorialStep > 0) ? gameState.tutorial : gameState.normal;
    let baseCrop = activeData.currentCrop, harvestedCrop = baseCrop, gotRare = false;
    
    if (currentTutorialStep === 0 && RARE_CROP_MAPPING[baseCrop]) {
        let goldCount = 0;
        if (debugGoldMedalCount !== null) { goldCount = debugGoldMedalCount; } else { goldCount = Object.values(gameState.normal.cookedCount).filter(count => count >= 20).length; }
        
        let denominator = (goldCount >= 5) ? 10 : (goldCount >= 3) ? 15 : 20;
        if (Math.floor(Math.random() * denominator) === 0) { harvestedCrop = RARE_CROP_MAPPING[baseCrop].rareId; gotRare = true; }
    }

    activeData.inventory[harvestedCrop] = (activeData.inventory[harvestedCrop] || 0) + 1; 
    activeData.currentCrop = null; activeData.growthPoint = 0; 
    
    if (currentTutorialStep === 0) {
        gameState.normal.harvestCount[baseCrop] = (gameState.normal.harvestCount[baseCrop] || 0) + 1;
        checkUnlocks();
        if (gotRare) {
            let rareData = RARE_CROP_MAPPING[baseCrop], vegData = VEGETABLE_MASTER.find(v => v.id === rareData.rareId), recipeId = rareData.recipeId;
            let alertMsg = `✨ 突然変異！！\nレア野菜「${vegData.emoji} ${vegData.name}」が収穫できました！`;
            if (!unlockedRecipes.includes(recipeId)) {
                unlockedRecipes.push(recipeId);
                let recData = RECIPE_MASTER[recipeId]; alertMsg += `\n\n💡 【ひらめき】\nこのレア野菜を使った隠しレシピ「${recData.emoji} ${recData.name}」を思いつきました！\n（調理場で作れるようになったよ！）`;
            }
            alert(alertMsg);
        }
    }
    
    updateFarmDisplay(); 
    if (currentTutorialStep === 3) { currentTutorialStep = 4; switchPage('kitchen'); openModal('tutorial'); updateTutorialGuide(); }
    saveData(); 
}

function openVegDetail(vegId) {
    const veg = VEGETABLE_MASTER.find(v => v.id === vegId); if (!veg) return;
    $('veg-detail-emoji').innerText = veg.emoji; $('veg-detail-name').innerText = veg.isRare ? `✨ ${veg.name}` : veg.name;
    $('veg-detail-desc').innerText = veg.desc || "説明がありません。"; $('modal-vegDetail').classList.add('active');
}

function renderInventoryModalGrid() {
    const container = $('modal-inventory-grid'); if (!container) return;
    let slotHtml = "", hasItem = false, activeData = (currentTutorialStep > 0) ? gameState.tutorial : gameState.normal;
    VEGETABLE_MASTER.forEach(veg => { 
        if (activeData.inventory[veg.id] > 0) { 
            let rareBadge = veg.isRare ? `<span class="rare-badge">レア</span>` : "";
            slotHtml += `<div class="inventory-slot" onclick="openVegDetail('${veg.id}')" style="cursor: pointer;">${rareBadge}<span class="inventory-slot-emoji">${veg.emoji}</span><span class="inventory-slot-count">x${activeData.inventory[veg.id]}</span></div>`;
            hasItem = true; 
        } 
    });
    if (!hasItem) { container.style.display = 'block'; container.innerHTML = `<div class="inventory-empty-box"><p class="inventory-empty-text">📦 倉庫は空っぽです</p><p class="inventory-empty-text" style="font-size:12px; color:#94a3b8; font-weight:normal; margin-top:4px;">タスクを完了して野菜をたくさん収穫しましょう！</p></div>`; } 
    else { container.style.display = 'grid'; container.innerHTML = slotHtml; }
}

function updateUnlockHintsDisplay() {
    const hintList = $('unlock-hint-list');
    const area = $('unlock-hint-area');
    if (!hintList || !area) return;
    
    hintList.innerHTML = '';

    let h = gameState.normal.harvestCount;
    let c = gameState.normal.cookedCount;
    let activeHints = [];
    let baseCount = VEGETABLE_MASTER.filter(v => !v.isRare).length;

    addHint(activeHints, !unlockedSeeds.includes('potato'), `🍅トマトと🥕ニンジンを収穫する (済: 🍅${h['tomato']||0}/1, 🥕${h['carrot']||0}/1)`);
    addHint(activeHints, unlockedSeeds.includes('potato') && !unlockedRecipes.includes('german_potato'), `🥔じゃがいもを初めて収穫する`);
    addHint(activeHints, !unlockedSeeds.includes('cabbage'), `🍳違う種類の料理を3つ作る (済: ${Object.keys(c).length}/3種類)`);
    addHint(activeHints, unlockedSeeds.includes('cabbage') && !unlockedRecipes.includes('roll_cabbage'), `🥬キャベツを初めて収穫する`);
    addHint(activeHints, unlockedRecipes.includes('roll_cabbage') && !unlockedRecipes.includes('salad'), `🥬ロールキャベツを1回作る`);
    addHint(activeHints, unlockedRecipes.includes('salad') && !unlockedSeeds.includes('onion'), `🥗シャキシャキサラダを1回作る`);
    addHint(activeHints, unlockedSeeds.includes('onion') && !unlockedRecipes.includes('onion_soup'), `🧅タマネギを初めて収穫する`);
    addHint(activeHints, unlockedRecipes.includes('onion_soup') && (!unlockedSeeds.includes('cucumber') || !unlockedSeeds.includes('eggplant')), `🧅まるごとオニオンスープを1回作る`);
    addHint(activeHints, unlockedSeeds.includes('cucumber') && !unlockedRecipes.includes('cucumber_recipe'), `🥒きゅうりを初めて収穫する`);
    addHint(activeHints, unlockedSeeds.includes('eggplant') && !unlockedRecipes.includes('eggplant_recipe'), `🍆ナスを初めて収穫する`);
    addHint(activeHints, unlockedRecipes.includes('eggplant_recipe') && unlockedSeeds.length < baseCount, `🍆なすの煮びたしを1回作る`);

    if (activeHints.length === 0) {
        area.style.display = 'none'; 
    } else {
        area.style.display = 'block';
        activeHints.forEach(txt => {
            let li = document.createElement('li');
            li.className = 'unlock-hint-item';
            li.innerText = txt;
            hintList.appendChild(li);
        });
    }
}

function updateFarmDisplay() {
    let activeData = (currentTutorialStep > 0) ? gameState.tutorial : gameState.normal;

    const cookListContainer = $('dynamic-cook-list');
    if (cookListContainer) {
        cookListContainer.innerHTML = '';
        
        unlockedRecipes.forEach(recipeId => {
            let recipe = RECIPE_MASTER[recipeId], canCook = true, reqTexts = [];
            for (let veg in recipe.req) {
                let vegData = VEGETABLE_MASTER.find(v => v.id === veg); reqTexts.push(`${vegData.name}${recipe.req[veg]}`);
                if ((activeData.inventory[veg] || 0) < recipe.req[veg]) canCook = false;
            }
            let div = document.createElement('div'); div.className = 'cook-action-item';
            
            div.innerHTML = `
                <div class="cook-action-info">
                    <span class="cook-action-emoji">${recipe.emoji}</span>
                    <div class="cook-action-text">
                        <span class="cook-action-name">${recipe.name}</span>
                        <span class="cook-action-req">(${reqTexts.join(', ')})</span>
                    </div>
                </div>
                <button class="cook-btn" style="width: auto;" onclick="cook('${recipeId}')" ${canCook ? '' : 'disabled'}>調理する</button>
            `;
            cookListContainer.appendChild(div);
        });

        if (activeData.originalRecipes) {
            activeData.originalRecipes.forEach(recipe => {
                let canCook = true, reqTexts = [];
                for (let veg in recipe.req) {
                    let vegData = VEGETABLE_MASTER.find(v => v.id === veg);
                    reqTexts.push(`${vegData.name}${recipe.req[veg]}`);
                    if ((activeData.inventory[veg] || 0) < recipe.req[veg]) canCook = false;
                }
                let div = document.createElement('div'); div.className = 'cook-action-item';
                div.innerHTML = `
                    <div class="cook-action-info">
                        <span class="cook-action-emoji">${recipe.emoji}</span>
                        <div class="cook-action-text">
                            <span class="cook-action-name" style="color:#0f766e;">${recipe.name}</span>
                            <span class="cook-action-req">(${reqTexts.join(', ')})</span>
                        </div>
                    </div>
                    <button class="cook-btn" style="background-color:#0d9488; width: auto;" onclick="cookOriginal('${recipe.id}')" ${canCook ? '' : 'disabled'}>調理する</button>
                `;
                cookListContainer.appendChild(div);
            });
        }
    }

    if (currentTutorialStep === 4) {
        $('tutorial-cook-box').style.display = 'flex';
        $('dynamic-cook-list').style.display = 'none';
    } else {
        $('tutorial-cook-box').style.display = 'none';
        $('dynamic-cook-list').style.display = 'contents';
    }

    const btnTutorialCook = $('cook-tutorial-item'); if (btnTutorialCook) btnTutorialCook.disabled = (activeData.inventory['tomato'] < 1);
    const farmSlot = $('farm-slot'), triggerBtn = document.querySelector('.plant-trigger-btn'), growthStatus = $('growth-status');
    if (farmSlot) farmSlot.classList.remove('guide-flash'); if (triggerBtn) triggerBtn.classList.remove('guide-flash');

    if (!activeData.currentCrop) { 
        if (farmSlot) { farmSlot.innerText = "🟫"; farmSlot.onclick = null; farmSlot.style.cursor = "default"; }
        if (growthStatus) growthStatus.innerText = "種を蒔こう"; 
        if (triggerBtn) { triggerBtn.innerText = "🌱 種を蒔く"; triggerBtn.disabled = false; triggerBtn.classList.remove('disabled-lock'); if (currentTutorialStep === 1) triggerBtn.classList.add('guide-flash'); }
    } else {
        if (triggerBtn) { triggerBtn.innerText = "🌱 種を植えなおす"; if (currentTutorialStep >= 2) { triggerBtn.disabled = true; triggerBtn.classList.add('disabled-lock'); } else { triggerBtn.disabled = false; triggerBtn.classList.remove('disabled-lock'); } }
        
        const veg = VEGETABLE_MASTER.find(v => v.id === activeData.currentCrop);
        
        if (activeData.growthPoint === 0) { 
            if (farmSlot) farmSlot.innerText = '🌱'; 
            if (growthStatus) growthStatus.innerText = `${veg.name}の種が植えられた！(あと${veg.reqTasks}回)`; 
        } else if (activeData.growthPoint < veg.reqTasks) { 
            if (farmSlot) farmSlot.innerText = '🌿'; 
            if (growthStatus) growthStatus.innerText = `${veg.name}がすくすく成長中...(あと${veg.reqTasks - activeData.growthPoint}回)`; 
        } else { 
            if (farmSlot) { farmSlot.innerText = veg.emoji; farmSlot.onclick = harvestCrop; farmSlot.style.cursor = "pointer"; if (currentTutorialStep === 3) farmSlot.classList.add('guide-flash'); } 
            if (growthStatus) growthStatus.innerText = `🎉 ${veg.name}が実った！クリックして【収穫】！`; 
        }
    }

    let baseCount = VEGETABLE_MASTER.filter(v => !v.isRare).length;
    if (unlockedSeeds.length >= baseCount) {
        $('btn-open-aichef').disabled = false;
        $('btn-open-aichef').classList.remove('disabled-lock');
        $('btn-open-aichef').innerText = "👨‍🍳 AIシェフにオリジナルレシピを考案してもらう";
    } else {
        $('btn-open-aichef').disabled = true;
        $('btn-open-aichef').classList.add('disabled-lock');
        $('btn-open-aichef').innerText = "🔒 AIシェフ (全種解放でオープン)";
    }
    
    if ($('modal-inventory').classList.contains('active')) { renderInventoryModalGrid(); } updateUnlockHintsDisplay();
}

function switchBookTab(tab) {
    recipeBookCurrentPage = 1; 
    $('book-view-main').style.display = 'none'; $('book-view-original').style.display = 'none';
    $('tab-book-main').classList.remove('active'); $('tab-book-original').classList.remove('active');
    $(`book-view-${tab}`).style.display = 'block'; $(`tab-book-${tab}`).classList.add('active'); 
    updateRecipeBookDisplay();
}

let currentCalMode = 'month';
function switchCalMode(mode) { currentCalMode = mode; $('btn-cal-month').classList.remove('active'); $('btn-cal-week').classList.remove('active'); $(`btn-cal-${mode}`).classList.add('active'); renderCalendar(); }
function toggleWeekendColor() { showWeekendColor = $('toggleWeekendColorCheck').checked; renderCalendar(); saveData(); }

function handleDayClick(dayNum) { 
    if (dayNum <= 0 || dayNum > daysInThisMonth) return; 
    if (isHolidayPickingMode) { temporaryHolidayPicks[dayNum] = !temporaryHolidayPicks[dayNum]; renderCalendar(); } 
    else { selectedDate = dayNum; $('selected-date-label').innerText = selectedDate; if ($('modal-selected-day-label')) $('modal-selected-day-label').innerText = selectedDate; renderCalendar(); renderTaskList(); renderModalTaskList(); } 
}

function renderCalendar() {
    const cont = $('calendar-days-container'); if (!cont) return; cont.innerHTML = ""; const modeName = currentCalMode === 'month' ? "月表示" : "週表示"; 
    const titleLabel = $('calendar-month-year-label'); if (titleLabel) { titleLabel.innerText = `📅 ${currentYear}年 ${currentMonth}月 (${modeName})`; }
    
    const headerRow = $('calendar-header-row');
    if (headerRow) {
        if (gameSettings.weekStart === 1) {
            headerRow.innerHTML = `<div class="day-header">月</div><div class="day-header">火</div><div class="day-header">水</div><div class="day-header">木</div><div class="day-header">金</div><div class="day-header" style="color:#1d4ed8;">土</div><div class="day-header" style="color:#be123c;">日</div>`;
        } else {
            headerRow.innerHTML = `<div class="day-header" style="color:#be123c;">日</div><div class="day-header">月</div><div class="day-header">火</div><div class="day-header">水</div><div class="day-header">木</div><div class="day-header">金</div><div class="day-header" style="color:#1d4ed8;">土</div>`;
        }
    }

    let shift = gameSettings.weekStart === 1 ? 1 : 0;
    let startCellIdx = (firstDayWeekday - shift + 7) % 7; 

    if (currentCalMode === 'month') {
        for (let e = 0; e < startCellIdx; e++) { 
            let emptyDiv = document.createElement('div'); emptyDiv.className = 'calendar-day empty-day'; cont.appendChild(emptyDiv); 
        }
        for (let i = 1; i <= daysInThisMonth; i++) { 
            let realWeekday = (firstDayWeekday + i - 1) % 7;
            createDayCell(i, realWeekday, cont); 
        }
    } else {
        let selectedDayWeekday = (firstDayWeekday + selectedDate - 1) % 7;
        let offset = selectedDayWeekday - shift;
        if (offset < 0) offset += 7;
        let startGridDate = selectedDate - offset;
        
        for (let idx = 0; idx < 7; idx++) { 
            let targetDate = startGridDate + idx; 
            let realWeekday = (shift + idx) % 7;
            createDayCell(targetDate, realWeekday, cont); 
        }
    }
    updateCalendarBadges();
}

function createDayCell(dateNum, weekdayIdx, container) {
    let d = document.createElement('div'); d.className = 'calendar-day'; if (dateNum <= 0 || dateNum > daysInThisMonth) { d.className = 'calendar-day empty-day'; container.appendChild(d); return; }
    if (showWeekendColor) { if (weekdayIdx === 5) d.classList.add('sat-color'); if (weekdayIdx === 6 && gameSettings.weekStart === 1) d.classList.add('sun-color'); if (weekdayIdx === 0 && gameSettings.weekStart === 0) d.classList.add('sun-color'); if (weekdayIdx === 6 && gameSettings.weekStart === 0) d.classList.add('sat-color'); }
    if (dateNum === selectedDate && !isHolidayPickingMode) d.classList.add('selected'); if (holidays[dateNum]) d.classList.add('holiday'); if (isHolidayPickingMode && temporaryHolidayPicks[dateNum]) d.classList.add('holiday-picking');
    if (dateNum === realTodayDate) { d.classList.add('today-highlight'); d.innerHTML = `<span>${dateNum}</span><span class="today-text">TODAY</span><div id="badge-box-${dateNum}" class="badge-container"></div>`; } else { d.innerHTML = `<span>${dateNum}</span><div id="badge-box-${dateNum}" class="badge-container"></div>`; }
    d.onclick = () => handleDayClick(dateNum); container.appendChild(d);
}

function addRepeatedTasks(type) {
    let val = $('repeatTaskInput').value.trim(); if(!val) { alert('タスク名を入力してください'); return; }
    let selectedColor = $('repeatLabelSelect').value;
    if (taskHistory.some(h => h.text === val)) { if (!confirm(`「${val}」は過去の履歴に登録済みです！\nこのまま生成しますか？`)) return; }
    
    if (type === 'weekly') {
        let selectedWeekday = (firstDayWeekday + selectedDate - 1) % 7;
        for(let i = 1; i <= daysInThisMonth; i++) { let loopWeekday = (firstDayWeekday + i - 1) % 7; if(loopWeekday === selectedWeekday) { let isDuplicate = tasksByDate[i].some(t => t.text === val); if (!isDuplicate) { tasksByDate[i].push({ text: "🔄 " + val, label: selectedColor }); } } }
        alert(`一括登録しました！`);
    } else if (type === 'monthly') { 
        if (tasksByDate[selectedDate].some(t => t.text === val)) { alert('すでに同じタスクが存在します！'); return; } 
        tasksByDate[selectedDate].push({ text: "📆 [毎月定例] " + val, label: selectedColor }); alert(`定例登録しました！`); 
    }
    $('repeatTaskInput').value = ""; renderCalendar(); renderTaskList(); renderModalTaskList(); saveData(); 
}

function addTask() {
    if (currentTutorialStep > 0 && currentTutorialStep !== 2) return;

    let val = $('taskInput').value.trim(); if(!val) return;
    let label = $('labelSelect').value; let currentActiveTasks = (currentTutorialStep > 0) ? gameState.tutorial.tasks : (tasksByDate[selectedDate] || []);
    if (currentActiveTasks.some(t => t.text === val)) { alert('すでに本日のタスクに同じ内容が登録されています！'); return; }
    if (taskHistory.some(h => h.text === val) && currentTutorialStep === 0) { if (!confirm(`「${val}」は過去の履歴に登録済みです！\nこのまま追加しますか？`)) return; }
    currentActiveTasks.push({ text: val, label: label }); $('taskInput').value = ""; refreshAllViews();
    if (currentTutorialStep === 2) { currentTutorialStep = 3; openModal('tutorial'); updateTutorialGuide(); } saveData(); 
}

function addTaskFromHistory(taskText, taskLabel) {
    if (currentTutorialStep > 0) return; 
    if (tasksByDate[selectedDate].some(t => t.text === taskText)) { alert('すでに同じ内容が登録されています！'); return; }
    tasksByDate[selectedDate].push({ text: taskText, label: taskLabel }); renderTaskList(); renderCalendar(); alert(`追加しました！`); saveData(); 
}

function deleteHistoryItem(indexInFiltered, event) {
    if(event && typeof event.stopPropagation === "function") event.stopPropagation(); 
    if(!confirm('この履歴を完全に削除しますか？')) return;
    let filtered = getFilteredAndSortedHistory(); let targetItem = filtered[indexInFiltered];
    let realIdx = taskHistory.findIndex(h => h.text === targetItem.text && h.label === targetItem.label);
    if(realIdx !== -1) { taskHistory.splice(realIdx, 1); } renderHistoryList(); saveData(); 
}

function switchHistoryTab(tabName) {
    $('history-tab-view-recall').style.display = 'none'; $('history-tab-view-done').style.display = 'none';
    $('tab-history-recall').classList.remove('active'); $('tab-history-done').classList.remove('active');
    $(`history-tab-view-${tabName}`).style.display = 'flex'; $(`tab-history-${tabName}`).classList.add('active');
}
function handleHistorySearch() { historySearchKeyword = $('historySearchInput').value.trim().toLowerCase(); historyCurrentPage = 1; renderHistoryList(); }
function changeHistoryPage(direction) { historyCurrentPage += direction; renderHistoryList(); }

function toggleFavorite(indexInFiltered, event) {
    if(event && typeof event.stopPropagation === "function") event.stopPropagation();
    let filtered = getFilteredAndSortedHistory(); let targetItem = filtered[indexInFiltered];
    let realItem = taskHistory.find(h => h.text === targetItem.text && h.label === targetItem.label);
    if(realItem) { realItem.isFavorite = !realItem.isFavorite; } renderHistoryList(); saveData(); 
}

function getFilteredAndSortedHistory() {
    let result = taskHistory.filter(item => item.text.toLowerCase().includes(historySearchKeyword));
    result.sort((a, b) => { let aFav = a.isFavorite ? 1 : 0; let bFav = b.isFavorite ? 1 : 0; return bFav - aFav; }); return result;
}

function renderHistoryList() {
    const container = $('history-items-list-box'); if(!container) return; container.innerHTML = ''; 
    if (currentTutorialStep > 0) { container.innerHTML = '<div style="color:#94a3b8; font-size:11px; padding:10px; text-align:center;">⚠️ チュートリアル中は利用できません</div>'; return; }
    let filteredList = getFilteredAndSortedHistory(); let totalItems = filteredList.length; let totalPages = Math.ceil(totalItems / historyItemsPerPage) || 1;
    if(historyCurrentPage > totalPages) historyCurrentPage = totalPages;
    if($('history-page-indicator')) $('history-page-indicator').innerText = `${historyCurrentPage} / ${totalPages}`;
    if($('btn-history-prev')) $('btn-history-prev').disabled = (historyCurrentPage <= 1); 
    if($('btn-history-next')) $('btn-history-next').disabled = (historyCurrentPage >= totalPages);
    if (totalItems === 0) { container.innerHTML = '<div style="color:#94a3b8; font-size:11px; padding:10px; text-align:center;">該当する履歴はありません</div>'; return; }
    
    let startIdx = (historyCurrentPage - 1) * historyItemsPerPage; let endIdx = startIdx + historyItemsPerPage;
    let pageItems = filteredList.slice(startIdx, endIdx); 
    
    pageItems.forEach((hist, displayIdx) => {
        let realFilteredIdx = startIdx + displayIdx; const div = document.createElement('div'); div.className = 'history-item';
        let starClass = hist.isFavorite ? 'history-star-btn fav-active' : 'history-star-btn'; let starChar = hist.isFavorite ? '★' : '☆';
        div.innerHTML = `<button class="${starClass}" onclick="toggleFavorite(${realFilteredIdx}, event)">${starChar}</button><div class="history-click-area" onclick="addTaskFromHistory('${hist.text.replace(/'/g, "\\\\'")}', '${hist.label}')"><span class="dot-indicator" style="background:${COLOR_CODES[hist.label] || '#cbd5e1'};"></span><span class="task-item-text" style="font-size:12px;">${hist.text}</span></div><button class="history-del-btn" onclick="deleteHistoryItem(${realFilteredIdx}, event)">🗑️</button>`;
        container.appendChild(div);
    });
}

function renderTodayDoneLog() {
    const container = $('done-items-list-box'); if(!container) return; container.innerHTML = '';
    if (todayDoneLog.length === 0) { container.innerHTML = '<div style="color:#94a3b8; font-size:11px; padding:10px; text-align:center;">本日完了したタスクはまだありません</div>'; return; }
    todayDoneLog.forEach((item) => {
        const div = document.createElement('div'); div.className = 'history-item';
        div.innerHTML = `<div class="history-click-area" style="cursor: default;"><span class="dot-indicator" style="background:${COLOR_CODES[item.label] || '#cbd5e1'};"></span><span class="task-item-text" style="color: #64748b; text-decoration: line-through; font-size:12px;">${item.text}</span></div><span class="done-timestamp">⏱️ ${item.time}</span>`;
        container.appendChild(div);
    });
}

function deleteTask(index, isFromModal) { 
    if (currentTutorialStep > 0) return;

    let targetDay = isFromModal ? selectedDate : selectedDate; 
    tasksByDate[targetDay].splice(index, 1);
    refreshAllViews(); saveData(); 
}

function renderTaskList() {
    let ul = $('taskList'); if (!ul) return; ul.innerHTML = ""; 
    let activeTasks = (currentTutorialStep > 0) ? gameState.tutorial.tasks : (tasksByDate[selectedDate] || []);
    activeTasks.forEach((t, i) => {
        let li = document.createElement('li'); li.className = `label-${t.label}`;
        let flashClass = (currentTutorialStep === 3) ? "done-btn guide-flash" : "done-btn";
        
        let delBtnHtml = (currentTutorialStep > 0) ? "" : `<button class="task-del-btn" onclick="deleteTask(${i}, false)">🗑️</button>`;
        
        li.innerHTML = `<span class="task-item-text">${t.text}</span><div class="task-btn-group"><button class="${flashClass}" onclick="completeMainTask(${i})">完了</button>${delBtnHtml}</div>`;
        ul.appendChild(li);
    });
}

function renderModalTaskList() {
    let ul = $('modalTaskList'); if (!ul) return; ul.innerHTML = "";
    let currentTasks = tasksByDate[selectedDate] || []; if (currentTasks.length === 0) { ul.innerHTML = '<div style="color:#94a3b8; font-size:12px; text-align:center; padding:10px;">この日のタスクはありません</div>'; return; }
    let isTodaySelected = (selectedDate === realTodayDate);
    currentTasks.forEach((t, i) => {
        let li = document.createElement('li'); li.className = `label-${t.label}`;
        let doneBtnHtml = isTodaySelected ? `<button class="done-btn" onclick="completeModalTask(${i})">完了</button>` : `<button class="done-btn" disabled>完了不可</button>`;
        li.innerHTML = `<span class="task-item-text">${t.text}</span><div class="task-btn-group">${doneBtnHtml}<button class="task-del-btn" onclick="deleteTask(${i}, true)">🗑️</button></div>`;
        ul.appendChild(li);
    });
}

function completeTaskCore(taskArr, idx) {
    if (currentTutorialStep > 0 && currentTutorialStep !== 3) return;

    let act = currentTutorialStep > 0 ? gameState.tutorial : gameState.normal;
    if (!act.currentCrop && !confirm('種が植えられていません。完了しますか？')) return;
    let t = taskArr[idx]; if (!taskHistory.some(h => h.text === t.text)) taskHistory.unshift({ text: t.text, label: t.label, isFavorite: false });
    const n = new Date(); todayDoneLog.unshift({ text: t.text, label: t.label, time: `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}` });
    taskArr.splice(idx, 1); growCrop(); renderHistoryList(); renderTodayDoneLog(); refreshAllViews(); saveData(); 
}
function completeMainTask(i) { completeTaskCore(currentTutorialStep > 0 ? gameState.tutorial.tasks : tasksByDate[selectedDate], i); }
function completeModalTask(i) { completeTaskCore(tasksByDate[selectedDate], i); }

function startHolidayPickingMode() {
    isHolidayPickingMode = true;
    for (let i = 1; i <= 31; i++) { temporaryHolidayPicks[i] = holidays[i]; }
    
    closeModal('calendarSettings');
    $('holiday-picking-bar').style.display = 'block';
    
    $('modal-day-task-area').style.display = 'none';
    $('calendar-grid-box').classList.add('holiday-mode');
    
    switchCalMode('month');
    $('btn-cal-month').disabled = true;
    $('btn-cal-week').disabled = true;
    $('btn-cal-week').classList.add('disabled-lock');

    renderCalendar();
}

function cancelHolidayPickingMode() {
    isHolidayPickingMode = false;
    $('holiday-picking-bar').style.display = 'none';
    
    $('modal-day-task-area').style.display = 'block';
    $('calendar-grid-box').classList.remove('holiday-mode');
    
    $('btn-cal-month').disabled = false;
    $('btn-cal-week').disabled = false;
    $('btn-cal-week').classList.remove('disabled-lock');

    renderCalendar();
}

function applySelectedHolidays() {
    for (let i = 1; i <= 31; i++) { holidays[i] = temporaryHolidayPicks[i]; }
    cancelHolidayPickingMode(); saveData(); 
}

function toggleRegisterPanel() {
    const panel = $('modal-repeat-form-panel');
    if(panel) { panel.style.display = (panel.style.display === 'none' || panel.style.display === '') ? 'block' : 'none'; }
}

function growCrop() { 
    let act = (currentTutorialStep > 0) ? gameState.tutorial : gameState.normal;
    if (act.currentCrop) {
        let veg = VEGETABLE_MASTER.find(v => v.id === act.currentCrop);
        if (act.growthPoint < veg.reqTasks) { act.growthPoint = (currentTutorialStep === 3) ? veg.reqTasks : act.growthPoint + 1; }
    } 
}

function refreshAllViews() { renderTaskList(); renderModalTaskList(); updateCalendarBadges(); updateFarmDisplay(); }

function updateCalendarBadges() {
    for (let i = 1; i <= daysInThisMonth; i++) {
        let box = $(`badge-box-${i}`); if (!box) continue; box.innerHTML = ""; let dayTasks = tasksByDate[i] || [];
        if (dayTasks.length > 0) {
            let uniqueColors = new Set(); dayTasks.forEach(task => uniqueColors.add(task.label));
            uniqueColors.forEach(colorName => { 
                let dotSpan = document.createElement('span'); 
                dotSpan.className = `badge-dot dot-${colorName}`; 
                dotSpan.style.display = "inline-block"; dotSpan.style.width = "6px"; dotSpan.style.height = "6px"; dotSpan.style.borderRadius = "50%";
                dotSpan.style.backgroundColor = COLOR_CODES[colorName] || "#cbd5e1"; dotSpan.style.margin = "1px";
                box.appendChild(dotSpan); 
            });
        }
    }
}

function changeRecipePage(direction) {
    recipeBookCurrentPage += direction;
    updateRecipeBookDisplay();
}

function updateRecipeBookDisplay() {
    const mainBook = $('book-view-main');
    const originalBook = $('book-view-original-list'); 

    if ($('tab-book-main').classList.contains('active')) {
        let allRecipes = Object.keys(RECIPE_MASTER);
        let totalItems = allRecipes.length;
        let totalPages = Math.ceil(totalItems / recipeBookItemsPerPage) || 1;
        if (recipeBookCurrentPage > totalPages) recipeBookCurrentPage = totalPages;
        
        if($('recipe-page-indicator')) $('recipe-page-indicator').innerText = `${recipeBookCurrentPage} / ${totalPages}`;
        if($('btn-recipe-prev')) $('btn-recipe-prev').disabled = (recipeBookCurrentPage <= 1);
        if($('btn-recipe-next')) $('btn-recipe-next').disabled = (recipeBookCurrentPage >= totalPages);

        if(mainBook) mainBook.innerHTML = '';
        
        let startIdx = (recipeBookCurrentPage - 1) * recipeBookItemsPerPage;
        let pageRecipes = allRecipes.slice(startIdx, startIdx + recipeBookItemsPerPage);

        pageRecipes.forEach(id => {
            let recipe = RECIPE_MASTER[id];
            let isDiscovered = recipeBook[id];
            let isUnlocked = unlockedRecipes.includes(id); 
            
            let div = document.createElement('div');
            div.className = `book-item ${isDiscovered ? 'discovered' : ''}`;
            div.onclick = () => clickRecipeItem(id);
            
            if (isDiscovered) {
                div.innerHTML = `<div class="book-icon">${recipe.emoji}</div><div class="book-info"><h4>${recipe.name}</h4><p>${recipe.desc}</p></div>`;
            } else if (recipe.type === 'regular' || isUnlocked) {
                div.innerHTML = `<div class="book-icon">${recipe.emoji}</div><div class="book-info"><h4>${recipe.name}</h4><p>未作成（調理場で作成すると詳細解放）</p></div>`;
            } else {
                div.innerHTML = `<div class="book-icon">❓</div><div class="book-info"><h4>？？？</h4><p>秘密の隠しレシピ</p></div>`;
            }
            if(mainBook) mainBook.appendChild(div);
        });
    } 
    else if ($('tab-book-original').classList.contains('active')) {
        let allRecipes = gameState.normal.originalRecipes || [];
        let totalItems = allRecipes.length;
        let totalPages = Math.ceil(totalItems / recipeBookItemsPerPage) || 1;
        if (recipeBookCurrentPage > totalPages) recipeBookCurrentPage = totalPages;

        if($('recipe-page-indicator')) $('recipe-page-indicator').innerText = `${recipeBookCurrentPage} / ${totalPages}`;
        if($('btn-recipe-prev')) $('btn-recipe-prev').disabled = (recipeBookCurrentPage <= 1);
        if($('btn-recipe-next')) $('btn-recipe-next').disabled = (recipeBookCurrentPage >= totalPages);

        if(originalBook) originalBook.innerHTML = '';

        if (totalItems > 0) {
            let startIdx = (recipeBookCurrentPage - 1) * recipeBookItemsPerPage;
            let pageRecipes = allRecipes.slice(startIdx, startIdx + recipeBookItemsPerPage);

            pageRecipes.forEach(recipe => {
                let div = document.createElement('div');
                div.className = `book-item discovered ${recipe.isImported ? 'imported-recipe' : ''}`;
                
                div.innerHTML = `
                    ${recipe.isImported ? '<span class="imported-badge">🎁 もらいもの</span>' : ''}
                    <button class="history-del-btn" style="position:absolute; bottom:5px; right:5px; background:white; border-radius:4px; box-shadow:0 1px 2px rgba(0,0,0,0.1);" onclick="deleteOriginalRecipe('${recipe.id}', event)">🗑️</button>
                    <div class="book-icon" onclick="clickOriginalRecipeItem('${recipe.id}')">${recipe.emoji}</div>
                    <div class="book-info" onclick="clickOriginalRecipeItem('${recipe.id}')">
                        <h4>${recipe.name}</h4>
                        <p>${recipe.desc}</p>
                    </div>
                `;
                if(originalBook) originalBook.appendChild(div);
            });
        } else {
            if(originalBook) originalBook.innerHTML = '<div style="grid-column: span 2; color: #94a3b8; padding: 20px; font-weight: bold;">保存されたオリジナルレシピはありません。<br>調理場の「👨‍🍳 AIシェフ」から考案してみましょう！</div>';
        }
    }
}

function cook(recipeId) {
    let activeData = (currentTutorialStep > 0) ? gameState.tutorial : gameState.normal;
    let recipe = RECIPE_MASTER[recipeId];

    if (recipeId === 'tutorial_salad') {
        if (activeData.inventory['tomato'] >= 1) {
            activeData.inventory['tomato'] -= 1;
            gameState.normal.cookedCount['tutorial_salad'] = (gameState.normal.cookedCount['tutorial_salad'] || 0) + 1;
            alert('🥗 冷やしトマト完成！冷たくて美味しそう！'); finishTutorialMode();
        } else { alert('あそびかたガイド：トマトが足りません！'); }
        return;
    }
    
    for (let veg in recipe.req) { gameState.normal.inventory[veg] -= recipe.req[veg]; }
    
    recipeBook[recipeId] = true;
    gameState.normal.cookedCount[recipeId] = (gameState.normal.cookedCount[recipeId] || 0) + 1;
    alert(`${recipe.emoji} ${recipe.name}完成！`);
    
    checkUnlocks(); updateFarmDisplay();
    if ($('modal-recipeBook').classList.contains('active')) { updateRecipeBookDisplay(); } saveData(); 
}

function cookOriginal(id) {
    let activeData = (currentTutorialStep > 0) ? gameState.tutorial : gameState.normal;
    let recipe = activeData.originalRecipes.find(r => r.id === id);
    if(!recipe) return;
    
    for (let veg in recipe.req) { gameState.normal.inventory[veg] -= recipe.req[veg]; }
    
    gameState.normal.cookedCount[id] = (gameState.normal.cookedCount[id] || 0) + 1;
    alert(`${recipe.emoji} ${recipe.name}完成！`);
    
    updateFarmDisplay();
    saveData(); 
}

function debugCompleteAllConditions() {
    let h = gameState.normal.harvestCount;
    let c = gameState.normal.cookedCount;

    h['tomato'] = Math.max(h['tomato']||0, 1);
    h['carrot'] = Math.max(h['carrot']||0, 1);
    h['potato'] = Math.max(h['potato']||0, 1);
    h['cabbage'] = Math.max(h['cabbage']||0, 1);
    c['roll_cabbage'] = Math.max(c['roll_cabbage']||0, 1);
    c['salad'] = Math.max(c['salad']||0, 1);
    h['onion'] = Math.max(h['onion']||0, 1);
    c['onion_soup'] = Math.max(c['onion_soup']||0, 1);
    h['cucumber'] = Math.max(h['cucumber']||0, 1);
    h['eggplant'] = Math.max(h['eggplant']||0, 1);
    c['eggplant_recipe'] = Math.max(c['eggplant_recipe']||0, 1);
    c['napoli'] = Math.max(c['napoli']||0, 1);
    c['glace'] = Math.max(c['glace']||0, 1);

    unlockedSeeds = VEGETABLE_MASTER.filter(veg => !veg.isRare).map(veg => veg.id);
    unlockedRecipes = Object.keys(RECIPE_MASTER).filter(k => RECIPE_MASTER[k].type === 'regular');
    if (!unlockedRecipes.includes('tutorial_salad')) { unlockedRecipes.push('tutorial_salad'); }
    
    alert('🛠️ デバッグ：すべてのミッション条件をクリアし、通常要素を解放しました！');
    updateFarmDisplay();
    if ($('modal-seedSelect').classList.contains('active')) renderSeedSelectMenu();
    if ($('modal-recipeBook').classList.contains('active')) updateRecipeBookDisplay();
    saveData(); 
}

function debugCompleteAllRecipes() {
    unlockedRecipes = Object.keys(RECIPE_MASTER);
    unlockedRecipes.forEach(id => {
        recipeBook[id] = true;
        if (!gameState.normal.cookedCount[id]) { gameState.normal.cookedCount[id] = 1; }
    });
    alert('🛠️ デバッグ：すべてのレシピを図鑑に登録しました！\n詳細をチェックできます！');
    if ($('modal-recipeBook').classList.contains('active')) { updateRecipeBookDisplay(); } saveData();
}

function debugClearAllData() { 
    if(!confirm('データを完全に初期状態にリセットしますか？')) return; 
    localStorage.removeItem(SAVE_KEY); 
    alert('リセットしました。画面を再読み込みします！'); 
    location.reload(); 
}

function debugGrowCropMax() {
    let act = (currentTutorialStep > 0) ? gameState.tutorial : gameState.normal;
    if (!act.currentCrop) {
        alert('畑に種が植えられていません！');
        return;
    }
    let veg = VEGETABLE_MASTER.find(v => v.id === act.currentCrop);
    act.growthPoint = veg.reqTasks; 
    updateFarmDisplay();
    saveData();
    alert('🌱 デバッグ：野菜が一気に成長しました！');
}

function toggleAllElementsLock(isL) { 
    ['top-btn-calendar','top-btn-inventory','top-btn-recipe','top-btn-settings','tab-history-recall','tab-history-done','debug-menu-panel'].forEach(id => { 
        if($(id)) $(id).classList.toggle('disabled-lock', isL); 
    }); 
    const settingsBtn = document.querySelector('.top-settings-btn');
    if (settingsBtn) settingsBtn.classList.toggle('disabled-lock', isL);
}

function clearAllTutorialGlow() { 
    ['task-input-row', 'tab-kitchen', 'cook-tutorial-item', 'farm-slot', '.plant-trigger-btn'].forEach(id => { 
        let el = id.includes('.') ? document.querySelector(id) : $(id); 
        if(el) el.classList.remove('guide-flash'); 
    }); 
}

function clickTutorialButton() { if(currentTutorialStep > 0) { openModal('tutorial'); updateTutorialGuide(); } else startTutorialMode(); }

function startTutorialMode() {
    currentTutorialStep = 1; switchPage('farm'); toggleAllElementsLock(true); 
    gameState.tutorial.currentCrop = null; gameState.tutorial.growthPoint = 0;
    VEGETABLE_MASTER.forEach(veg => { gameState.tutorial.inventory[veg.id] = 0; }); gameState.tutorial.tasks = []; 
    $('tutorial-cook-box').style.display = 'flex'; $('dynamic-cook-list').style.display = 'none';
    renderHistoryList(); 
    renderTodayDoneLog(); 
    refreshAllViews(); openModal('tutorial'); updateTutorialGuide(); saveData(); 
}

function updateTutorialGuide() {
    if(!$('tutorial-step-label')) return; $('tutorial-step-label').innerText = `ステップ ${currentTutorialStep} / 4`; clearAllTutorialGlow();
    
    $('tab-kitchen').classList.toggle('disabled-lock', currentTutorialStep !== 4);
    $('taskInput').disabled = true;
    $('btn-task-add-trigger').disabled = true;
    const triggerBtn = document.querySelector('.plant-trigger-btn');
    if(triggerBtn) { triggerBtn.disabled = true; triggerBtn.classList.add('disabled-lock'); }
    const farmSlot = $('farm-slot');
    if(farmSlot) farmSlot.style.pointerEvents = 'none';

    const txt = $('tutorial-step-text');
    if (currentTutorialStep===1) { 
        txt.innerHTML="点滅している「🌱 種を蒔く」ボタンを押し、「トマト🍅」を選択してください。"; 
        if(triggerBtn) { triggerBtn.disabled = false; triggerBtn.classList.remove('disabled-lock'); triggerBtn.classList.add('guide-flash'); }
        updateFarmDisplay(); 
    }
    else if(currentTutorialStep===2) { 
        txt.innerHTML="点滅している入力欄に任意の予定を入力し、「追加」ボタンを押してください。"; 
        $('taskInput').disabled = false;
        $('btn-task-add-trigger').disabled = false;
        $('task-input-row').classList.add('guide-flash'); 
    }
    else if(currentTutorialStep===3) { 
        txt.innerHTML="追加したタスクの「完了」ボタンを押してください。<br>トマトが実ったら、タップして収穫してください。"; 
        if(farmSlot) farmSlot.style.pointerEvents = 'auto'; 
        refreshAllViews(); 
    }
    else if(currentTutorialStep===4) { 
        if($('page-kitchen').classList.contains('active')) { 
            txt.innerHTML="冷やしトマトの「調理する」ボタンを押してください。"; 
            $('cook-tutorial-item').disabled=false; 
            $('cook-tutorial-item').classList.add('guide-flash'); 
        } else { 
            txt.innerHTML="上部の「🍳 調理場」タブを押して、画面を切り替えてください。"; 
            $('tab-kitchen').classList.add('guide-flash'); 
        } 
    }
}

function abortTutorial() { 
    currentTutorialStep=0; toggleAllElementsLock(false); clearAllTutorialGlow(); 
    $('tutorial-cook-box').style.display='none'; $('dynamic-cook-list').style.display='contents'; 
    const farmSlot = $('farm-slot'); if(farmSlot) farmSlot.style.pointerEvents = 'auto';
    closeModal('tutorial'); switchPage('farm'); 
    renderHistoryList(); 
    renderTodayDoneLog(); 
    alert('チュートリアルを中断し、通常モードに戻ります。'); saveData(); 
}

function finishTutorialMode() { 
    currentTutorialStep=0; toggleAllElementsLock(false); clearAllTutorialGlow(); 
    $('tutorial-cook-box').style.display='none'; $('dynamic-cook-list').style.display='contents'; 
    const farmSlot = $('farm-slot'); if(farmSlot) farmSlot.style.pointerEvents = 'auto';
    recipeBook.tutorial_salad = true; 
    if(!unlockedRecipes.includes('tutorial_salad')) unlockedRecipes.push('tutorial_salad'); 
    gameState.normal.inventory['tomato']++; 
    closeModal('tutorial'); switchPage('farm'); 
    renderHistoryList(); 
    renderTodayDoneLog(); 
    alert('🎉 合格おめでとうございます！\nあそびかたの基本サイクルを完全マスターしました！\n\n🎁 隠しレシピ【🥗 冷やしトマト】が解放されました。'); saveData(); 
}

function closeRecipeDetailView() { $('recipe-book-index-view').style.display = 'block'; $('recipe-book-detail-view').style.display = 'none'; }

function clickRecipeItem(id) {
    if (!recipeBook[id]) {
        if (RECIPE_MASTER[id] && RECIPE_MASTER[id].type === 'hidden' && !unlockedRecipes.includes(id)) { alert("🔒 このレシピは隠しレシピです！\n特定の条件を満たすことで解放されます。"); } 
        else { alert("🔒 まだ作成していない料理です！\n調理場で実際に料理を作るとレシピ詳細が公開されるよ！"); }
        return;
    }
    const recipe = RECIPE_MASTER[id]; if (!recipe) return;
    
    const copyBtn = $('btn-copy-original-url');
    if(copyBtn) copyBtn.style.display = 'none';

    let count = gameState.normal.cookedCount[id] || 0, medal = "";
    if (count >= 20) medal = "🥇"; else if (count >= 10) medal = "🥈"; else if (count >= 5) medal = "🥉";

    $('cookpad-header-emoji').innerText = recipe.emoji; 
    $('cookpad-header-name').innerText = recipe.name; 
    $('cookpad-header-medal').innerText = medal; 
    $('cookpad-header-count').innerText = `作ってみた: ${count}回`;
    
    const ingContainer = $('cookpad-ingredients-container'); ingContainer.innerHTML = "";
    recipe.ingredients.forEach(ing => {
        const row = document.createElement('div'); row.className = 'cookpad-ingredient-row';
        row.innerHTML = `<span class="cookpad-ingredient-name">${ing.name}</span><div class="cookpad-ingredient-dots"></div><span class="cookpad-ingredient-amount">${ing.amount}</span>`;
        ingContainer.appendChild(row);
    });
    const stepContainer = $('cookpad-steps-container'); stepContainer.innerHTML = "";
    recipe.steps.forEach((text, index) => {
        const card = document.createElement('div'); card.className = 'cookpad-step-card';
        card.innerHTML = `<div class="cookpad-step-number">${index + 1}</div><p class="cookpad-step-text">${text}</p>`;
        stepContainer.appendChild(card);
    });
    
    $('recipe-book-index-view').style.display = 'none'; $('recipe-book-detail-view').style.display = 'block';
}

function clickOriginalRecipeItem(id) {
    let recipe = gameState.normal.originalRecipes.find(r => r.id === id);
    if (!recipe) return;
    
    const copyBtn = $('btn-copy-original-url');
    if (copyBtn) {
        if (!recipe.isImported) {
            copyBtn.style.display = 'block';
            copyBtn.onclick = () => copyRecipeUrlFromData(recipe);
        } else {
            copyBtn.style.display = 'none';
        }
    }

    let count = gameState.normal.cookedCount[id] || 0, medal = "";
    if (count >= 20) medal = "🥇"; else if (count >= 10) medal = "🥈"; else if (count >= 5) medal = "🥉";

    $('cookpad-header-emoji').innerText = recipe.emoji; 
    $('cookpad-header-name').innerText = recipe.name; 
    $('cookpad-header-medal').innerText = medal; 
    $('cookpad-header-count').innerText = `作ってみた: ${count}回`;
    
    const ingContainer = $('cookpad-ingredients-container'); ingContainer.innerHTML = "";
    recipe.ingredients.forEach(ing => {
        const row = document.createElement('div'); row.className = 'cookpad-ingredient-row';
        row.innerHTML = `<span class="cookpad-ingredient-name">${ing.name}</span><div class="cookpad-ingredient-dots"></div><span class="cookpad-ingredient-amount">${ing.amount}</span>`;
        ingContainer.appendChild(row);
    });
    const stepContainer = $('cookpad-steps-container'); stepContainer.innerHTML = "";
    recipe.steps.forEach((text, index) => {
        const card = document.createElement('div'); card.className = 'cookpad-step-card';
        card.innerHTML = `<div class="cookpad-step-number">${index + 1}</div><p class="cookpad-step-text">${text}</p>`;
        stepContainer.appendChild(card);
    });
    
    $('recipe-book-index-view').style.display = 'none'; $('recipe-book-detail-view').style.display = 'block';
}

let aiChefSelectedVegs = [];

function openAiChefModal() {
    let baseCount = VEGETABLE_MASTER.filter(v => !v.isRare).length;
    if (unlockedSeeds.length < baseCount) {
        alert("🔒 まだAIシェフは利用できません！\nすべての通常野菜を解放すると、機能がオープンします。");
        return;
    }
    aiChefSelectedVegs = [];
    renderAiChefSelected();
    renderAiChefVegGrid();
    openModal('aiChef');
}

function renderAiChefSelected() {
    let cont = $('aichef-selected-container');
    cont.innerHTML = "";
    for(let i=0; i<3; i++) {
        let div = document.createElement('div');
        if (aiChefSelectedVegs[i]) {
            div.className = "aichef-selected-slot filled";
            div.innerText = VEGETABLE_MASTER.find(v=>v.id===aiChefSelectedVegs[i]).emoji;
            div.onclick = () => { aiChefSelectedVegs.splice(i, 1); renderAiChefSelected(); };
        } else {
            div.className = "aichef-selected-slot";
            div.innerText = "";
        }
        cont.appendChild(div);
    }
}

function renderAiChefVegGrid() {
    const cont = $('aichef-veg-grid');
    cont.innerHTML = "";
    let availableSeeds = VEGETABLE_MASTER.filter(veg => unlockedSeeds.includes(veg.id) && !veg.isRare); 
    availableSeeds.forEach(veg => {
        const btn = document.createElement('button'); btn.className = 'veg-button-item';
        btn.innerHTML = `<span class="veg-button-emoji">${veg.emoji}</span><span class="veg-button-name">${veg.name}</span>`;
        btn.onclick = () => {
            if (aiChefSelectedVegs.includes(veg.id)) {
                alert("同じ野菜は1つしか選べません！");
                return;
            }
            if (aiChefSelectedVegs.length < 3) {
                aiChefSelectedVegs.push(veg.id);
                renderAiChefSelected();
            } else {
                alert("選べる野菜は最大3つまでです！");
            }
        };
        cont.appendChild(btn);
    });
}

function generateAiRecipe() {
    if (aiChefSelectedVegs.length === 0) {
        alert("野菜を1つ以上選んでください！"); return;
    }
    const genre = $('aichef-genre-select').value;
    
    let vegNames = aiChefSelectedVegs.map(id => VEGETABLE_MASTER.find(v=>v.id===id).name).join("と");
    let reqDict = {};
    let ingredients = [];
    aiChefSelectedVegs.forEach(id => { reqDict[id] = (reqDict[id] || 0) + 1; });
    for(let id in reqDict) {
        ingredients.push({ name: VEGETABLE_MASTER.find(v=>v.id===id).name, amount: reqDict[id] + "個" });
    }
    
    let recipeName = ""; let steps = []; let emoji = "🍽️";
    const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    if (genre === "japanese") {
        emoji = "🍱";
        recipeName = vegNames + "の" + randomPick([
            "和風煮込み", "特製おひたし", "醤油炒め", "だし浸し", "白和え", "天ぷら", "炊き込みご飯", "味噌炒め", "甘辛煮", "きんぴら", "茶碗蒸し", "梅肉和え", "塩昆布和え", "照り焼き", "揚げ出し",
            "網焼き", "そぼろ和え", "みぞれ和え", "柚子こしょう炒め", "竜田揚げ", "治部煮", "南蛮漬け", "磯辺揚げ", "松前焼き", "粕漬け", "味噌田楽", "筑前煮風", "炊き合わせ", "酢の物", "昆布締め", "土瓶蒸し風", "胡麻和え", "しぐれ煮", "そばつゆ仕立て", "焼き浸し"
        ]);
        ingredients.push({name: "醤油・みりん", amount: "各適量"});
        steps.push(randomPick([
            "野菜を丁寧に水洗いし、食べやすい大きさに乱切りにする。",
            "素材の味を生かすため、野菜は皮ごと大きめにカットする。",
            "野菜を千切りにし、軽く塩もみして余分な水分を抜いておく。",
            "野菜を一口大に切り、和風だしで下茹でして柔らかくする。"
        ]));
        steps.push(randomPick([
            "鍋にだし汁を張り、野菜を入れて弱火でじっくりと煮込む。",
            "フライパンに少量の油を熱し、野菜の表面に軽く焼き色がつくまで炒める。",
            "ボウルに醤油とみりんを合わせ、野菜を入れてしっかりと和える。",
            "高温の油でサッと素揚げにし、旨味を内側に閉じ込める。"
        ]));
        steps.push(randomPick([
            "器に盛り付け、最後にかつお節と白ごまをふりかける。",
            "粗熱を取ってから冷蔵庫で冷やし、味を中まで染み込ませて完成！",
            "仕上げに柚子の皮を添えて、香りを引き立たせれば出来上がり。",
            "アツアツのうちに器に盛り、小ネギを散らして完成！"
        ]));
    } else if (genre === "western") {
        emoji = "🍝";
        recipeName = vegNames + "の" + randomPick([
            "香草焼き", "ペペロンチーノ風", "とろとろチーズグラタン", "特製マリネ", "アヒージョ", "クリームシチュー", "ポタージュ", "カルパッチョ", "バターソテー", "トマト煮込み", "ガーリックシュリンプ風", "キッシュ", "ムニエル", "フリット", "コンフィ",
            "ジェノベーゼ", "アラビアータ風", "パプリカソース添え", "チーズフォンデュ風", "プロヴァンス風", "カルボナーラ仕立て", "エスカベッシュ", "ガレット", "パテ・ド・カンパーニュ風", "フリカッセ", "カツレツ", "トマトクリーム風", "マスタードソテー", "ロースト", "ラザニア風", "バルサミコ和え", "ビスク", "マリネサラダ", "テリーヌ風", "ポアレ"
        ]);
        ingredients.push({name: "オリーブオイル・塩", amount: "少々"});
        steps.push(randomPick([
            "野菜を綺麗に水洗いし、均等な厚さのスライスにする。",
            "野菜をゴロゴロとした大きめの角切りにする。",
            "野菜をみじん切りにして、風味が出やすいように準備する。",
            "野菜をオリーブオイルと塩コショウでマリネし、10分ほど置く。"
        ]));
        steps.push(randomPick([
            "フライパンでニンニクの香りを引き出し、野菜をじっくりソテーする。",
            "耐熱皿に並べてチーズを乗せ、オーブンで香ばしく焼き上げる。",
            "白ワインとコンソメを加え、フタをして蒸し焼きにする。",
            "たっぷりのトマトソースと一緒に、野菜が柔らかくなるまで煮込む。"
        ]));
        steps.push(randomPick([
            "お皿に美しく盛り付け、パセリやバジルを散らす。",
            "仕上げにブラックペッパーと粉チーズを振りかけて完成！",
            "レモンをひと搾りして、さっぱりとした風味をプラスする。",
            "エキストラバージンオリーブオイルを回しかけてツヤを出せば完成！"
        ]));
    } else if (genre === "chinese") {
        emoji = "🥟";
        recipeName = vegNames + "の" + randomPick([
            "ピリ辛炒め", "オイスターソース炒め", "中華風あんかけ", "麻婆風", "エビチリ風", "青椒肉絲風", "黒酢炒め", "香味だれ和え", "甘酢あん", "中華スープ", "春巻き", "油淋風", "八角煮", "ネギ塩炒め", "ホイコーロー風",
            "バンバンジー風", "豆板醤炒め", "甜麺醤炒め", "坦々風", "雲白肉（ウンパイロウ）風", "シュウマイ風", "小籠包風", "四川風炒め", "広東風煮込み", "北京風あんかけ", "五目あんかけ", "辣子鶏（ラーズーチー）風", "チャーハン風", "ＸＯ醤炒め", "鶏ガラ塩炒め", "花椒（ホアジャオ）炒め", "よだれ鶏風", "中華風おこげ", "湯引き", "豆鼓（トウチ）炒め"
        ]);
        ingredients.push({name: "ごま油・中華だし", amount: "適量"});
        steps.push(randomPick([
            "野菜は火が通りやすいように、すべて細切りに揃える。",
            "野菜を大きめの乱切りにし、サッと熱湯をくぐらせて油通しする。",
            "野菜を一口大に切り、片栗粉を薄くまぶしておく。",
            "包丁の腹で野菜を軽く叩き潰し、味が染み込みやすい状態にする。"
        ]));
        steps.push(randomPick([
            "中華鍋をしっかり熱し、ごま油で野菜を強火で一気に炒める。",
            "豆板醤と甜麺醤を炒めて香りを出し、野菜を加えて絡める。",
            "鶏ガラスープを注ぎ、野菜を入れて中火でサッと煮立てる。",
            "たっぷりの油で野菜を揚げ焼きにし、香ばしさを引き出す。"
        ]));
        steps.push(randomPick([
            "水溶き片栗粉でとろみをつけ、最後にラー油を数滴たらす。",
            "お皿にこんもりと盛り付け、糸唐辛子やネギを飾って完成！",
            "花椒（ホアジャオ）をふりかけて、シビれる辛さをアクセントにする。",
            "仕上げに黒酢を回しいれ、コクと酸味を加えて出来上がり。"
        ]));
    } else {
        emoji = "✨";
        recipeName = vegNames + "の" + randomPick([
            "奇跡のハーモニー", "ギャラクシーソテー", "謎の包み焼き", "びっくりスムージー", "虚無への誘い", "四次元パエリア", "未知との遭遇", "レインボー爆発", "魔法のステッキ焼き", "時空超越スープ", "天使の気まぐれ", "カオス・フリット", "幻のディナー", "宇宙の深淵ドロップ", "ファンタジーパイ",
            "錬金術ロースト", "ダークマター煮込み", "星屑のミルフィーユ", "メテオストライク揚げ", "時空のゆがみマリネ", "神々の悪戯（いたずら）", "封印されし秘伝スープ", "アトランティス風ソテー", "ドラゴンブレス炒め", "エルフの微笑みサラダ", "漆黒のレクイエム", "異世界からの贈り物", "サイバーパンク・シチュー", "禁断の果実パイ", "オーロラフラッシュ", "ネオ・トーキョー風", "ミラクル・イリュージョン", "妖精のささやき和え", "黄金郷のポタージュ", "インフィニティ・ボウル"
        ]);
        ingredients.push({name: "AIシェフの隠し味", amount: "ひとつまみ"});
        steps.push(randomPick([
            "野菜に話しかけながら、潜在能力を引き出すように愛情を込めてカットする。",
            "野菜を空中に放り投げ、落ちてくる間に目にも止まらぬ速さで斬る。",
            "野菜をAIの計算に基づいた黄金比率（1:1.618）で精密に切り分ける。",
            "野菜を謎の魔方一阵の中心に置き、マナを注入して活性化させる。"
        ]));
        steps.push(randomPick([
            "フライパンの中で野菜を竜巻のように回転させながら炒める。",
            "未知のエネルギーを放射し、野菜を分子レベルで融合させる。",
            "AIシェフのひらめきに従い、大胆かつ情熱的に鍋を振るう。",
            "低温と高温を1秒ごとに切り替え、野菜の時空を歪めながら調理する。"
        ]));
        steps.push(randomPick([
            "お皿に盛り付けた後、指先から星屑（エディブルスター）を振りかける。",
            "仕上げにAIシェフのウインクを添えて、奇跡の一皿が完成！",
            "光り輝くオーラをまとった状態でテーブルにサーブする。",
            "「美味しくなーれ」とAIが電子音声で唱え、料理に魂を宿らせて完成！"
        ]));
    }
    
    let tempRecipe = {
        id: "ori_" + Date.now() + Math.floor(Math.random()*1000),
        name: recipeName, emoji: emoji, type: "original",
        req: reqDict, ingredients: ingredients, steps: steps,
        desc: "AIシェフが考案したオリジナルレシピ",
        isImported: false
    };
    showAiRecipeResult(tempRecipe);
}

let pendingOriginalRecipe = null;

function showAiRecipeResult(recipe) {
    pendingOriginalRecipe = recipe;
    closeModal('aiChef');
    $('ai-result-name').innerText = recipe.name;
    $('ai-result-emoji').innerText = recipe.emoji;
    
    let ingHtml = recipe.ingredients.map(i => `${i.name}(${i.amount})`).join("、");
    $('ai-result-ing').innerText = ingHtml;
    
    openModal('aiChefResult');
}

function saveOriginalRecipe() {
    if (!gameState.normal.originalRecipes) gameState.normal.originalRecipes = [];
    if (gameState.normal.originalRecipes.length >= 10) {
        alert("オリジナルレシピの保存上限（10個）に達しています！\nレシピブックから不要なものを削除してください。");
        return;
    }
    gameState.normal.originalRecipes.push(pendingOriginalRecipe);
    saveData();
    updateFarmDisplay();
    alert("レシピブックに保存しました！");
    closeModal('aiChefResult');
}

function copyRecipeUrlFromData(recipe) {
    const base64str = btoa(encodeURIComponent(JSON.stringify(recipe)));
    const url = window.location.origin + window.location.pathname + "?recipe=" + base64str;
    
    navigator.clipboard.writeText(url).then(() => {
        alert("🔗 共有URLをコピーしました！\nこのURLを友達に送ると、レシピをプレゼントできます。");
    }).catch(err => {
        prompt("以下のURLをコピーしてください", url);
    });
}

function copyRecipeUrl() {
    copyRecipeUrlFromData(pendingOriginalRecipe);
}

function deleteOriginalRecipe(id, event) {
    if (event) event.stopPropagation();
    if (!confirm("このオリジナルレシピを削除しますか？")) return;
    gameState.normal.originalRecipes = gameState.normal.originalRecipes.filter(r => r.id !== id);
    saveData();
    updateRecipeBookDisplay();
    updateFarmDisplay();
}

function debugMassGenerateTasks() { let c = parseInt($('debugHistoryCountInput').value, 10), cols = ['red','blue','green','yellow','purple','orange','pink','gray']; for(let i=0;i<c;i++) tasksByDate[selectedDate].push({text:`ダミータスク ${tasksByDate[selectedDate].length+1}`, label:cols[Math.floor(Math.random()*cols.length)]}); refreshAllViews(); alert(`生成しました！`); saveData(); }

const monthLabel = $('current-month-label'), dateLabel = $('selected-date-label'), modalDateLabel = $('modal-selected-day-label');
if (monthLabel) monthLabel.innerText = currentMonth; 
if (dateLabel) dateLabel.innerText = selectedDate; 
if (modalDateLabel) modalDateLabel.innerText = selectedDate;