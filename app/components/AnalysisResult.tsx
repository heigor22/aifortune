'use client';

interface AnalysisResultProps {
  isLoading: boolean;
  result: {
    summary?: string;
    details?: {
      wuxing?: string;
      bazi?: string;
      ziwei?: string;
    };
  } | null;
}

export default function AnalysisResult({ isLoading, result }: AnalysisResultProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-lg mx-auto mt-8 p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-800"></div>
          <span className="ml-4">正在推演命理...</span>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="w-full max-w-lg mx-auto mt-8 fade-in">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-800 border-b-2 border-red-800/20 pb-4">
          命理分析结果
        </h2>
        
        {result.summary && (
          <div className="mb-8 bg-red-50/50 p-6 rounded-lg fade-in" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-semibold mb-3 text-red-800">总体分析</h3>
            <p className="text-gray-700 leading-relaxed">{result.summary}</p>
          </div>
        )}

        {result.details?.wuxing && (
          <div className="mb-8 bg-yellow-50/50 p-6 rounded-lg fade-in" style={{animationDelay: '0.4s'}}>
            <h3 className="text-xl font-semibold mb-3 text-yellow-800">五行分析</h3>
            <p className="text-gray-700 leading-relaxed">{result.details.wuxing}</p>
          </div>
        )}

        {result.details?.bazi && (
          <div className="mb-8 bg-blue-50/50 p-6 rounded-lg fade-in" style={{animationDelay: '0.6s'}}>
            <h3 className="text-xl font-semibold mb-3 text-blue-800">八字分析</h3>
            <p className="text-gray-700 leading-relaxed">{result.details.bazi}</p>
          </div>
        )}

        {result.details?.ziwei && (
          <div className="mb-8 bg-purple-50/50 p-6 rounded-lg fade-in" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold mb-3 text-purple-800">紫微斗数</h3>
            <p className="text-gray-700 leading-relaxed">{result.details.ziwei}</p>
          </div>
        )}
      </div>
    </div>
  );
}