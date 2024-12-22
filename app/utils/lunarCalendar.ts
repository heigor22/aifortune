export interface LunarDate {
    year: number;
    month: number;
    day: number;
    leap: boolean;
  }
  
  interface FiveElementsDetail {
    element: string;
    count: number;
    nature: string;
    direction: string;
    season: string;
    color: string;
    characteristics: string[];
  }
  
  interface BirthData {
    year: number;
    month: number;
    day: number;
    hour: number;
  }
  
  interface ElementTime {
    stem: string;
    branch: string;
  }
  
  // 天干
  const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  // 地支
  const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  // 生肖
  const ZODIAC_ANIMALS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  
  // 五行属性对应
  const FIVE_ELEMENTS_MAP: { [key: string]: string } = {
    '子': '水', '丑': '土', '寅': '木', '卯': '木',
    '辰': '土', '巳': '火', '午': '火', '未': '土',
    '申': '金', '酉': '金', '戌': '土', '亥': '水'
  };
  
  const ELEMENT_DETAILS: { [key: string]: FiveElementsDetail } = {
    '金': {
      element: '金',
      count: 0,
      nature: '收敛、沉降',
      direction: '西方',
      season: '秋季',
      color: '白色',
      characteristics: ['果断', '坚毅', '公正', '严谨']
    },
    '木': {
      element: '木',
      count: 0,
      nature: '生长、上升',
      direction: '东方',
      season: '春季',
      color: '青绿',
      characteristics: ['仁德', '创新', '灵活', '进取']
    },
    '水': {
      element: '水',
      count: 0,
      nature: '流动、下降',
      direction: '北方',
      season: '冬季',
      color: '黑色',
      characteristics: ['智慧', '适应', '沟通', '灵活']
    },
    '火': {
      element: '火',
      count: 0,
      nature: '旺盛、向上',
      direction: '南方',
      season: '夏季',
      color: '红色',
      characteristics: ['热情', '活力', '表现', '领导']
    },
    '土': {
      element: '土',
      count: 0,
      nature: '稳重、中正',
      direction: '中央',
      season: '季夏',
      color: '黄色',
      characteristics: ['稳重', '包容', '务实', '中庸']
    }
  };
  
  export function getElementsAnalysis(
    birthYear: number,
    birthMonth: number,
    birthDay: number,
    birthHour: number
  ): {
    year: ElementTime;
    month: ElementTime;
    day: ElementTime;
    hour: ElementTime;
  } {
    const yearStem = HEAVENLY_STEMS[birthYear % 10];
    const yearBranch = EARTHLY_BRANCHES[birthYear % 12];
    const monthStem = HEAVENLY_STEMS[(birthYear % 5 * 2 + birthMonth) % 10];
    const monthBranch = EARTHLY_BRANCHES[(birthMonth + 2) % 12];
    const dayStem = HEAVENLY_STEMS[Math.floor(birthDay % 10)];
    const dayBranch = EARTHLY_BRANCHES[birthDay % 12];
    const hourStem = HEAVENLY_STEMS[Math.floor(birthHour / 2) % 10];
    const hourBranch = EARTHLY_BRANCHES[Math.floor(birthHour / 2) % 12];
  
    return {
      year: { stem: yearStem, branch: yearBranch },
      month: { stem: monthStem, branch: monthBranch },
      day: { stem: dayStem, branch: dayBranch },
      hour: { stem: hourStem, branch: hourBranch }
    };
  }
  
  export function getDetailedFiveElementsAnalysis(birthData: BirthData) {
    const elements = getElementsAnalysis(
      birthData.year,
      birthData.month,
      birthData.day,
      birthData.hour
    );
  
    // 复制元素详情对象
    const elementDetails: { [key: string]: FiveElementsDetail } = JSON.parse(JSON.stringify(ELEMENT_DETAILS));
    
    // 计算各个五行的出现次数
    [elements.year, elements.month, elements.day, elements.hour].forEach(time => {
      const branchElement = FIVE_ELEMENTS_MAP[time.branch];
      if (branchElement && elementDetails[branchElement]) {
        elementDetails[branchElement].count++;
      }
    });
  
    // 分析日主五行
    const dayElement = FIVE_ELEMENTS_MAP[elements.day.branch];
    
    let analysisText = `一、基础五行分析\n\n`;
    
    // 1. 五行分布
    analysisText += `五行分布情况：\n`;
    (Object.values(elementDetails) as FiveElementsDetail[]).forEach(detail => {
      if (detail.count > 0) {
        analysisText += `${detail.element}：${detail.count}个，属${detail.nature}，旺于${detail.season}${detail.direction}。\n`;
      }
    });
  
    // 2. 日主分析
    analysisText += `\n二、日主分析\n\n`;
    if (dayElement && elementDetails[dayElement]) {
      analysisText += `您的日主五行属${dayElement}，${elementDetails[dayElement].characteristics.join('、')}。\n`;
    }
  
    // 3. 相生相克分析
    analysisText += `\n三、五行关系分析\n\n`;
    const strongElements = (Object.values(elementDetails) as FiveElementsDetail[])
      .filter(detail => detail.count >= 2)
      .map(detail => detail.element);
    
    const weakElements = (Object.values(elementDetails) as FiveElementsDetail[])
      .filter(detail => detail.count === 0)
      .map(detail => detail.element);
  
    if (strongElements.length > 0) {
      analysisText += `强势五行：${strongElements.join('、')}，特别旺盛。\n`;
    }
    if (weakElements.length > 0) {
      analysisText += `薄弱五行：${weakElements.join('、')}，需要补充。\n`;
    }
  
    // 4. 调节建议
    analysisText += `\n四、平衡调节建议\n\n`;
    
    weakElements.forEach(element => {
      analysisText += `可通过以下方式补充${element}：\n`;
      switch(element) {
        case '金':
          analysisText += `- 佩戴金属饰品\n- 居住环境多用白色调\n- 多去西方位置活动\n`;
          break;
        case '木':
          analysisText += `- 多亲近自然植物\n- 居住环境使用青绿色调\n- 多去东方位置活动\n`;
          break;
        case '水':
          analysisText += `- 多亲近水源\n- 居住环境使用黑色调\n- 多去北方位置活动\n`;
          break;
        case '火':
          analysisText += `- 多晒太阳\n- 居住环境使用红色调\n- 多去南方位置活动\n`;
          break;
        case '土':
          analysisText += `- 多接触陶瓷、石材\n- 居住环境使用黄色调\n- 注意中正平和\n`;
          break;
      }
    });
  
    // 5. 运势发展
    analysisText += `\n五、运势发展建议\n\n`;
    if (dayElement && elementDetails[dayElement]) {
      analysisText += `- 有利方位：${elementDetails[dayElement].direction}\n`;
      analysisText += `- 有利季节：${elementDetails[dayElement].season}\n`;
      analysisText += `- 有利色彩：${elementDetails[dayElement].color}\n`;
    }
    
    return {
      elements,
      elementDetails,
      analysis: analysisText
    };
  }