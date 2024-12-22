import BirthDataForm from './components/BirthDataForm'

export default function Home() {
  return (
    <main suppressHydrationWarning>
      <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-red-50 to-yellow-50">
        <div className="max-w-4xl mx-auto">
          {/* 装饰边框 */}
          <div className="relative mb-12">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-800"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-800"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-800"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-800"></div>
            
            <h1 className="text-4xl font-bold text-center text-red-800 py-8">
              AI 国学命理分析系统
            </h1>
          </div>

          {/* 副标题 */}
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 mb-2">传统智慧 · 现代解析</p>
            <div className="flex items-center justify-center space-x-4">
              <div className="h-px bg-gray-300 w-16"></div>
              <span className="text-gray-500">易经 · 八字 · 五行</span>
              <div className="h-px bg-gray-300 w-16"></div>
            </div>
          </div>

          {/* 主要内容区域 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
            <BirthDataForm />
          </div>

          {/* 页脚信息 */}
          <footer className="mt-12 text-center text-gray-600 text-sm">
            <p>注：本系统基于传统命理学说，结合现代AI技术，仅供参考</p>
          </footer>
        </div>
      </div>
    </main>
  )
}