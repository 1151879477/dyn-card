
import React, { useState, useEffect } from 'react';
import { SAMPLE_CARD_SCHEMA } from './constants';
import { CardSchema, ComponentType } from './types';
import { COMPONENT_DOCS } from './docs';
import ComponentRenderer, { ThemeContext } from './components/CardRenderer';

const App: React.FC = () => {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(SAMPLE_CARD_SCHEMA, null, 2));
  const [parsedSchema, setParsedSchema] = useState<CardSchema | null>(SAMPLE_CARD_SCHEMA);
  const [error, setError] = useState<string | null>(null);
  const [activeDoc, setActiveDoc] = useState<ComponentType | null>(ComponentType.CONTAINER);

  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      setParsedSchema(parsed);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  }, [jsonInput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonInput);
    alert('JSON copied to clipboard!');
  };

  const getGradientStyle = () => {
    if (!parsedSchema?.theme) return 'from-indigo-500 via-purple-500 to-pink-500';
    const { gradientFrom, gradientTo } = parsedSchema.theme;
    if (gradientFrom && gradientTo) return ''; // Handled via inline style
    return 'from-indigo-500 via-purple-500 to-pink-500';
  };

  const headerStyle = parsedSchema?.theme?.gradientFrom && parsedSchema?.theme?.gradientTo ? {
    background: `linear-gradient(to right, ${parsedSchema.theme.gradientFrom}, ${parsedSchema.theme.gradientTo})`
  } : {};

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-100 overflow-hidden">
      {/* Left Column: Docs & Editor */}
      <div className="w-full lg:w-1/2 flex flex-col border-r border-slate-200 bg-white h-full overflow-hidden">
        <header className="px-6 py-4 border-b bg-slate-900 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-black text-white italic">C</div>
            <h1 className="font-black tracking-tighter text-lg uppercase">Card Engine Pro</h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopy}
              className="text-[10px] font-bold px-2 py-1 border border-slate-700 rounded hover:bg-slate-800 transition-colors uppercase tracking-widest"
            >
              Copy
            </button>
            <div className={`w-3 h-3 rounded-full ${error ? 'bg-red-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`} title={error || 'Valid'} />
          </div>
        </header>

        {/* Documentation Section */}
        <section className="h-2/5 flex border-b border-slate-200 overflow-hidden shrink-0">
          <nav className="w-48 border-r border-slate-100 overflow-y-auto bg-slate-50/50 p-2 space-y-1">
            <h3 className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Settings</h3>
            <button
                onClick={() => setActiveDoc(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeDoc === null 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:bg-white hover:text-slate-800'
                }`}
              >
                Theme Config
            </button>
            <h3 className="px-3 py-2 mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Components</h3>
            {Object.keys(COMPONENT_DOCS).map((type) => (
              <button
                key={type}
                onClick={() => setActiveDoc(type as ComponentType)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeDoc === type 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 scale-[1.02]' 
                    : 'text-slate-500 hover:bg-white hover:text-slate-800'
                }`}
              >
                {COMPONENT_DOCS[type as ComponentType].title.split(' ')[0]}
              </button>
            ))}
          </nav>
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {activeDoc ? (
              <div className="max-w-xl animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-black text-slate-900 mb-3">{COMPONENT_DOCS[activeDoc].title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium italic">
                  {COMPONENT_DOCS[activeDoc].desc}
                </p>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Available Properties</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {COMPONENT_DOCS[activeDoc].props.map((p, i) => (
                      <li key={i} className="text-xs font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="max-w-xl">
                <h2 className="text-xl font-black text-slate-900 mb-3">主题颜色 (Card Theme)</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium italic">
                  通过在 JSON 的根节点定义 "theme" 对象，您可以控制卡片的全局视觉基调。这包括主要动作按钮的颜色、表单输入框的聚焦边框色、以及图表的主色调。同时，您可以定义渐变色作为卡片顶部的装饰条，从而使卡片更符合品牌调性。
                </p>
                <div className="space-y-4">
                   <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Theme Configuration</h4>
                   <ul className="grid grid-cols-1 gap-2">
                      <li className="text-xs font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-100">primary: 主要品牌色 (Hex)</li>
                      <li className="text-xs font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-100">gradientFrom: 渐变起始色</li>
                      <li className="text-xs font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-100">gradientTo: 渐变结束色</li>
                   </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Editor Section */}
        <section className="flex-1 flex flex-col overflow-hidden bg-slate-900">
          <div className="px-4 py-2 border-b border-slate-800 flex justify-between items-center shrink-0">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">JSON Live Configuration</label>
             {error && <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded">Syntax Error</span>}
          </div>
          <div className="flex-1 relative overflow-hidden">
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              spellCheck={false}
              className="absolute inset-0 w-full h-full p-6 font-mono text-sm bg-slate-900 text-indigo-100 focus:outline-none transition-all resize-none leading-relaxed selection:bg-indigo-500/30"
              style={{ caretColor: '#6366f1' }}
            />
          </div>
        </section>
      </div>

      {/* Right Column: Preview */}
      <div className="w-full lg:w-1/2 flex flex-col bg-slate-50 h-full overflow-y-auto border-l border-slate-200">
        <header className="px-8 py-4 border-b bg-white/80 backdrop-blur-md flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="font-black tracking-tight text-slate-800 text-sm uppercase">Renderer Preview</h1>
          </div>
          <button 
            onClick={() => setJsonInput(JSON.stringify(SAMPLE_CARD_SCHEMA, null, 2))}
            className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-full hover:bg-slate-800 transition-all uppercase tracking-widest shadow-xl shadow-slate-200"
          >
            Reset Card
          </button>
        </header>

        <main className="flex-1 p-8 lg:p-16 flex items-start justify-center">
          <div className="w-full max-w-[520px] bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] overflow-hidden border border-slate-100 transition-all hover:shadow-[0_48px_80px_-20px_rgba(0,0,0,0.16)]">
            {/* Design Ornament with Dynamic Gradient */}
            <div className={`h-3 w-full bg-gradient-to-r ${getGradientStyle()}`} style={headerStyle} />
            
            {/* Render Output with Theme Context */}
            <ThemeContext.Provider value={parsedSchema?.theme || { primary: '#6366f1' }}>
              <div className="p-1">
                {parsedSchema ? (
                  parsedSchema.body.map((item) => (
                    <ComponentRenderer key={item.id} config={item} />
                  ))
                ) : (
                  <div className="p-32 text-center">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">⚠️</div>
                    <h3 className="text-slate-800 font-black uppercase text-xs tracking-widest">Broken Schema</h3>
                    <p className="text-slate-400 text-[11px] mt-2 leading-relaxed">Please fix the JSON errors in the editor <br/> to resume live preview.</p>
                  </div>
                )}
              </div>
            </ThemeContext.Provider>
          </div>
        </main>

        <footer className="p-8 text-center">
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em]">
            Enterprise Card SDK v3.2.0 • Real-time Simulation
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
