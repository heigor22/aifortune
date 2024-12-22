"use client";
// BirthDataForm.tsx
import React, { useState } from 'react';
import { getDetailedFiveElementsAnalysis } from '../utils/lunarCalendar'
interface FormData {
  name: string;
  birthDate: string;
  birthTime: string;
}

interface Result {
  summary: string;
  details: {
    wuxing: string;
    bazi: string;
    ziwei: string;
  };
}

const BirthDataForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    birthDate: '',
    birthTime: ''
  });

  const [result, setResult] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!formData.name || !formData.birthDate || !formData.birthTime) {
      alert('请填写完整信息');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const birthDate = new Date(formData.birthDate);
      const [birthHour, birthMinute] = formData.birthTime.split(':').map(Number);
      
      const birthData = {
        year: birthDate.getFullYear(),
        month: birthDate.getMonth() + 1,
        day: birthDate.getDate(),
        hour: birthHour
      };

      const fortune = getDetailedFiveElementsAnalysis(birthData);
      const elements = fortune.elements;
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setResult({
        summary: `${formData.name}您好，您出生于${birthData.year}年${birthData.month}月${birthData.day}日${birthHour}时。
          八字：${elements.year.stem}${elements.year.branch}年 ${elements.month.stem}${elements.month.branch}月 
          ${elements.day.stem}${elements.day.branch}日 ${elements.hour.stem}${elements.hour.branch}时。`,
        details: {
          wuxing: fortune.analysis,
          bazi: `八字详解：
          \n一、基础格局分析
          \n命局组成：
          \n年柱：${elements.year.stem}${elements.year.branch}
          \n月柱：${elements.month.stem}${elements.month.branch}
          \n日柱：${elements.day.stem}${elements.day.branch}
          \n时柱：${elements.hour.stem}${elements.hour.branch}
          \n日主：${elements.day.stem}
          \n日主特征：${getDayMasterAnalysis(elements.day.stem)}
          
          \n二、五行生克关系
          \n天干五行：
          ${getHeavenlyStemElements(elements)}
          \n地支五行：
          ${getEarthlyStemElements(elements)}
          
          \n三、十神分析
          ${getTenGodsAnalysis(elements)}
          
          \n四、命局取用神
          ${getUsefulGodAnalysis(elements)}
          
          \n五、大运流年
          ${getFateAndYearlyAnalysis(birthData, elements)}
          
          \n六、格局判定
          ${getPatternAnalysis(elements)}
          
          \n七、六亲分析
          ${getSixRelativesAnalysis(elements)}
          
          \n八、吉凶断语
          ${getLuckAnalysis(elements)}
          
          \n九、化解方案
          ${getSolutionAnalysis(elements)}
          
          \n十、开运建议
          ${getLuckEnhancementAdvice(elements)}`,
    ziwei: `根据您的生辰八字，在事业方面${getCareerAdvice(fortune)}，
          在感情方面${getLoveAdvice(fortune)}，
          在财运方面${getWealthAdvice(fortune)}。`
        }
      });
    } catch (error) {
      console.error('Error:', error);
      setResult({
        summary: '抱歉，分析过程中出现错误。',
        details: {
          wuxing: '无法获取五行分析。',
          bazi: '无法获取八字分析。',
          ziwei: '无法获取命理建议。'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  function getDayMasterAnalysis(dayStem: string) {
    const dayMasterMap: { [key: string]: string } = {
      '甲': '阳木性质，喜温暖，性格坚韧，重视理想',
      '乙': '阴木性质，喜滋润，性格灵活，重视实际',
      '丙': '阳火性质，喜光明，性格开朗，重视表现',
      '丁': '阴火性质，喜温和，性格细腻，重视内涵',
      '戊': '阳土性质，喜稳重，性格厚实，重视根基',
      '己': '阴土性质，喜包容，性格温和，重视和谐',
      '庚': '阳金性质，喜刚强，性格果断，重视原则',
      '辛': '阴金性质，喜清洁，性格敏锐，重视品质',
      '壬': '阳水性质，喜流动，性格智慧，重视创新',
      '癸': '阴水性质，喜渗透，性格细密，重视内省'
    };
    return dayMasterMap[dayStem] || '未知日主特征';
  }
  
  function getHeavenlyStemElements(elements: any) {
    const stems = [
      elements.year.stem,
      elements.month.stem,
      elements.day.stem,
      elements.hour.stem
    ];
    return stems.map(stem => {
      if ('甲乙'.includes(stem)) return `${stem}属木`;
      if ('丙丁'.includes(stem)) return `${stem}属火`;
      if ('戊己'.includes(stem)) return `${stem}属土`;
      if ('庚辛'.includes(stem)) return `${stem}属金`;
      if ('壬癸'.includes(stem)) return `${stem}属水`;
    }).join('\n');
  }
  
  function getEarthlyStemElements(elements: any) {
    const branches = [
      elements.year.branch,
      elements.month.branch,
      elements.day.branch,
      elements.hour.branch
    ];
    return branches.map(branch => {
      if ('寅卯'.includes(branch)) return `${branch}属木`;
      if ('巳午'.includes(branch)) return `${branch}属火`;
      if ('辰戌丑未'.includes(branch)) return `${branch}属土`;
      if ('申酉'.includes(branch)) return `${branch}属金`;
      if ('亥子'.includes(branch)) return `${branch}属水`;
    }).join('\n');
  }
  
  function getTenGodsAnalysis(elements: any) {
    const dayStem = elements.day.stem;
    let analysis = '\n=== 印星分析 ===\n';
    
    // 正印分析
    analysis += `正印：${getGodRelation(elements, '正印')}
  代表：官运、学历、权威、母亲
  特质：正统、规范、上进、尊贵\n\n`;
  
    // 偏印分析
    analysis += `偏印：${getGodRelation(elements, '偏印')}
  代表：技术、智慧、创意、贵人
  特质：灵活、聪慧、非传统\n\n`;
  
    analysis += '=== 食伤分析 ===\n';
    // 食神分析
    analysis += `食神：${getGodRelation(elements, '食神')}
  代表：口福、文学、子女、温和
  特质：智慧、温柔、贤淑\n\n`;
  
    // 伤官分析
    analysis += `伤官：${getGodRelation(elements, '伤官')}
  代表：才华、艺术、叛逆、创新
  特质：个性、革新、不拘一格\n\n`;
  
    analysis += '=== 财星分析 ===\n';
    // 正财分析
    analysis += `正财：${getGodRelation(elements, '正财')}
  代表：正当财运、正室、正业
  特质：正统、稳健、可靠\n\n`;
  
    // 偏财分析
    analysis += `偏财：${getGodRelation(elements, '偏财')}
  代表：意外之财、副业、桃花
  特质：机动、灵活、变通\n\n`;
  
    analysis += '=== 官杀分析 ===\n';
    // 正官分析
    analysis += `正官：${getGodRelation(elements, '正官')}
  代表：权威、地位、正统、配偶
  特质：规矩、守序、威严\n\n`;
  
    // 七杀分析
    analysis += `七杀：${getGodRelation(elements, '七杀')}
  代表：竞争、权力、独断、强势
  特质：刚烈、果断、霸气\n\n`;
  
    analysis += '=== 比劫分析 ===\n';
    // 比肩分析
    analysis += `比肩：${getGodRelation(elements, '比肩')}
  代表：兄弟、平辈、竞争、助力
  特质：合作、同心、奋进\n\n`;
  
    // 劫财分析
    analysis += `劫财：${getGodRelation(elements, '劫财')}
  代表：手足、分夺、独立、进取
  特质：拼搏、争取、进取\n\n`;
  
    return analysis;
  }
  
  function getGodRelation(elements: any, god: string) {
    const dayStem = elements.day.stem;
    const stems = [
      elements.year.stem,
      elements.month.stem,
      elements.hour.stem
    ];
    
    // 定义五行生克关系
    const fiveElements = {
      '木': ['甲', '乙'],
      '火': ['丙', '丁'],
      '土': ['戊', '己'],
      '金': ['庚', '辛'],
      '水': ['壬', '癸']
    };
  
    // 获取日主五行
    const getDayElement = (stem: string) => {
      for (const [element, stems] of Object.entries(fiveElements)) {
        if (stems.includes(stem)) return element;
      }
      return '';
    };
  
    const dayElement = getDayElement(dayStem);
    let count = 0;
    let influence = '';
  
    stems.forEach(stem => {
      const stemElement = getDayElement(stem);
      if (!stemElement) return;
  
      switch(god) {
        case '正印':
          if (isZhengYin(dayStem, stem)) count++;
          break;
        case '偏印':
          if (isPianYin(dayStem, stem)) count++;
          break;
        case '食神':
          if (isShiShen(dayStem, stem)) count++;
          break;
        case '伤官':
          if (isShangGuan(dayStem, stem)) count++;
          break;
        case '正财':
          if (isZhengCai(dayStem, stem)) count++;
          break;
        case '偏财':
          if (isPianCai(dayStem, stem)) count++;
          break;
        case '正官':
          if (isZhengGuan(dayStem, stem)) count++;
          break;
        case '七杀':
          if (isQiSha(dayStem, stem)) count++;
          break;
        case '比肩':
          if (isBiJian(dayStem, stem)) count++;
          break;
        case '劫财':
          if (isJieCai(dayStem, stem)) count++;
          break;
      }
    });
  
    // 根据数量判断影响力
    if (count === 0) {
      influence = '在命局中力量较弱';
    } else if (count === 1) {
      influence = '在命局中有一定影响力';
    } else if (count === 2) {
      influence = '在命局中影响力较强';
    } else {
      influence = '在命局中影响力非常强';
    }
  
    return `出现${count}次，${influence}`;
  }
  
  function isZhengYin(dayStem: string, stem: string) {
    const relations = {
      '甲': '己', '乙': '庚', '丙': '辛', '丁': '壬', '戊': '癸',
      '己': '甲', '庚': '乙', '辛': '丙', '壬': '丁', '癸': '戊'
    };
    return relations[dayStem as keyof typeof relations] === stem;
  }
  
  function isPianYin(dayStem: string, stem: string) {
    const relations = {
      '甲': '戊', '乙': '己', '丙': '庚', '丁': '辛', '戊': '壬',
      '己': '癸', '庚': '甲', '辛': '乙', '壬': '丙', '癸': '丁'
    };
    return relations[dayStem as keyof typeof relations] === stem;
  }
  
  function isShiShen(dayStem: string, stem: string) {
    const relations = {
      '甲': '丙', '乙': '丁', '丙': '戊', '丁': '己', '戊': '庚',
      '己': '辛', '庚': '壬', '辛': '癸', '壬': '甲', '癸': '乙'
    };
    return relations[dayStem as keyof typeof relations] === stem;
  }
  
  function isShangGuan(dayStem: string, stem: string) {
    const relations = {
      '甲': '丁', '乙': '丙', '丙': '己', '丁': '戊', '戊': '辛',
      '己': '庚', '庚': '癸', '辛': '壬', '壬': '乙', '癸': '甲'
    };
    return relations[dayStem as keyof typeof relations] === stem;
  }
  
  function isZhengCai(dayStem: string, stem: string) {
    const relations = {
      '甲': '戊', '乙': '己', '丙': '庚', '丁': '辛', '戊': '壬',
      '己': '癸', '庚': '甲', '辛': '乙', '壬': '丙', '癸': '丁'
    };
    return relations[dayStem as keyof typeof relations] === stem;
  }
  
  function isPianCai(dayStem: string, stem: string) {
    const relations = {
      '甲': '己', '乙': '庚', '丙': '辛', '丁': '壬', '戊': '癸',
      '己': '甲', '庚': '乙', '辛': '丙', '壬': '丁', '癸': '戊'
    };
    return relations[dayStem as keyof typeof relations] === stem;
  }
  
  function isZhengGuan(dayStem: string, stem: string) {
    const relations = {
      '甲': '庚', '乙': '辛', '丙': '壬', '丁': '癸', '戊': '甲',
      '己': '乙', '庚': '丙', '辛': '丁', '壬': '戊', '癸': '己'
    };
    return relations[dayStem as keyof typeof relations] === stem;
  }
  
  function isQiSha(dayStem: string, stem: string) {
    const relations = {
      '甲': '辛', '乙': '庚', '丙': '癸', '丁': '壬', '戊': '乙',
      '己': '甲', '庚': '丁', '辛': '丙', '壬': '己', '癸': '戊'
    };
    return relations[dayStem as keyof typeof relations] === stem;
  }
  
  function isBiJian(dayStem: string, stem: string) {
    return dayStem === stem;
  }
  
  function isJieCai(dayStem: string, stem: string) {
    const pairs = {
      '甲': '乙', '乙': '甲', '丙': '丁', '丁': '丙', '戊': '己',
      '己': '戊', '庚': '辛', '辛': '庚', '壬': '癸', '癸': '壬'
    };
    return pairs[dayStem as keyof typeof pairs] === stem;
  }
  
  // 其他分析函数的实现...
  function getUsefulGodAnalysis(elements: any) {
    return `喜用神：根据命局特点分析
            \n配合神：相生相助的五行
            \n帮扶神：中和调节的力量
            \n忌神：需要避免的冲突`;
  }
  
  function getFateAndYearlyAnalysis(birthData: any, elements: any) {
    return `大运起始：${birthData.year + 1}年
            \n大运方向：按五行生克循环发展
            \n流年特点：需要注意的关键年份
            \n流月变化：每月运势起伏`;
  }
  
  function getPatternAnalysis(elements: any) {
    return `命局类型：根据日主强弱判定
            \n格局特征：具体格局分析
            \n吉凶判定：整体运势评估`;
  }
  
  function getSixRelativesAnalysis(elements: any) {
    return `父母宫：长辈关系和事业指引
            \n兄弟宫：人际关系和竞争情况
            \n子女宫：后代运势和创新能力
            \n财帛宫：财运状况和收入来源`;
  }
  
  function getLuckAnalysis(elements: any) {
    return `事业运：发展方向和机遇时机
            \n财运：理财方式和投资建议
            \n婚姻：配偶特征和感情走向
            \n健康：体质分析和养生建议`;
  }
  
  function getSolutionAnalysis(elements: any) {
    return `趋吉方向：把握有利时机
            \n避凶建议：预防和化解方法
            \n平衡之道：调节命局平衡`;
  }
  
  function getLuckEnhancementAdvice(elements: any) {
    return `方位：选择有利方向
            \n颜色：使用吉利色彩
            \n数字：参考吉利数字
            \n时间：把握有利时机`;
  }

  function getCareerAdvice(fortune: any) {
    const elementDetails = fortune.elementDetails;
    const strongElements = Object.values(elementDetails)
      .filter((detail: any) => detail.count >= 2)
      .map((detail: any) => detail.element);

    if (strongElements.includes('金')) {
      return '适合从事金融、珠宝、硬件等相关行业';
    } else if (strongElements.includes('木')) {
      return '适合从事教育、艺术、植物相关行业';
    } else if (strongElements.includes('水')) {
      return '适合从事传媒、营销、旅游等流动性强的行业';
    } else if (strongElements.includes('火')) {
      return '适合从事科技、餐饮、娱乐等行业';
    } else if (strongElements.includes('土')) {
      return '适合从事房地产、农业、建筑等行业';
    } else {
      return '适合多尝试不同领域，找到最适合自己的方向';
    }
  }

  function getLoveAdvice(fortune: any) {
    const elements = fortune.elements;
    if (elements.day.stem.includes('甲') || elements.day.stem.includes('乙')) {
      return '重视感情，易与善解人意的伴侣相处融洽';
    } else if (elements.day.stem.includes('丙') || elements.day.stem.includes('丁')) {
      return '感情热烈，需要一个能包容的伴侣';
    } else {
      return '感情稳定，与志同道合的伴侣最为般配';
    }
  }

  function getWealthAdvice(fortune: any) {
    const elementCounts = fortune.elementDetails;
    if (elementCounts['金'].count > 1) {
      return '财运较好，适合投资理财';
    } else if (elementCounts['木'].count > 1) {
      return '财运平稳，适合稳健理财';
    } else {
      return '财运起伏，建议多储蓄';
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">八字分析</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">姓名</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">出生日期</label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">出生时间</label>
          <input
            type="time"
            value={formData.birthTime}
            onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? '分析中...' : '开始分析'}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">基本信息</h3>
            <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">{result.summary}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">五行分析</h3>
            <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">{result.details.wuxing}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">八字详解</h3>
            <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">{result.details.bazi}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">运势分析</h3>
            <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">{result.details.ziwei}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthDataForm;