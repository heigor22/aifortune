// 农历计算相关函数
export function getChineseZodiac(year: number): string {
    const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    return zodiacAnimals[(year - 4) % 12];
  }
  
  export function getFiveElements(year: number): string {
    const elements = ['金', '木', '水', '火', '土'];
    return elements[year % 5];
  }
  
  export function getHeavenlyStem(year: number): string {
    const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    return stems[(year - 4) % 10];
  }
  
  export function getEarthlyBranch(year: number): string {
    const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    return branches[(year - 4) % 12];
  }
  
  export function generateBasicAnalysis(birthYear: number, gender: string): string {
    const zodiac = getChineseZodiac(birthYear);
    const element = getFiveElements(birthYear);
    const stem = getHeavenlyStem(birthYear);
    const branch = getEarthlyBranch(birthYear);
  
    return `您出生于${birthYear}年，属${zodiac}，五行属${element}。
  天干地支为${stem}${branch}年。根据传统命理分析，${zodiac}年出生的人${getZodiacCharacteristics(zodiac)}。
  作为${gender === 'male' ? '男' : '女'}命${element}局，${getElementCharacteristics(element)}。`;
  }
  
  function getZodiacCharacteristics(zodiac: string): string {
    const characteristics: { [key: string]: string } = {
      '鼠': '机智灵活，善于社交，具有较强的适应能力',
      '牛': '性格踏实，做事认真，具有坚韧不拔的精神',
      '虎': '性格开朗，充满勇气，领导能力强',
      '兔': '温和善良，优雅大方，具有艺术天赋',
      '龙': '充满活力，意志坚强，追求完美',
      '蛇': '智慧敏锐，心思细腻，直觉力强',
      '马': '活泼开朗，追求自由，充满热情',
      '羊': '温柔善良，富有同情心，具有艺术气质',
      '猴': '聪明机智，反应快速，创造力强',
      '鸡': '勤奋务实，注重细节，具有组织能力',
      '狗': '忠诚可靠，正直善良，具有责任心',
      '猪': '为人厚道，心地善良，享受生活'
    };
    return characteristics[zodiac] || '具有独特的个性特征';
  }
  
  function getElementCharacteristics(element: string): string {
    const characteristics: { [key: string]: string } = {
      '金': '性格坚强，意志坚定，具有领导才能',
      '木': '富有生机，善于成长，具有进取心',
      '水': '智慧灵活，适应力强，善于沟通',
      '火': '热情活力，充满动力，具有感染力',
      '土': '稳重踏实，务实可靠，具有包容心'
    };
    return characteristics[element] || '具有独特的五行特质';
  }