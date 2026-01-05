
import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ThemeContext } from './CardRenderer';

export const Title: React.FC<{ text: string; level?: number }> = ({ text, level = 1 }) => {
  const levels: Record<number, string> = {
    1: "text-2xl font-bold text-slate-900 mb-2",
    2: "text-xl font-bold text-slate-800 mb-2",
    3: "text-lg font-semibold text-slate-700 mb-1",
    4: "text-sm font-bold text-slate-600 uppercase tracking-wide mb-1",
  };
  return <h2 className={levels[level] || levels[1]}>{text}</h2>;
};

export const Text: React.FC<{ content: string; style?: string }> = ({ content, style }) => (
  <p className={`text-sm text-slate-600 leading-relaxed ${style}`}>{content}</p>
);

export const RichText: React.FC<{ html: string }> = ({ html }) => (
  <div className="text-sm text-slate-600 prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
);

export const Remark: React.FC<{ label: string; content: string; color?: string }> = ({ label, content, color = 'blue' }) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    red: 'bg-red-50 text-red-700 border-red-100',
    green: 'bg-green-50 text-green-700 border-green-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-100',
    gray: 'bg-slate-50 text-slate-600 border-slate-100',
  };
  return (
    <div className="flex items-center gap-2 py-0.5">
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</span>
      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${colorMap[color] || colorMap.blue}`}>
        {content}
      </span>
    </div>
  );
};

export const DualText: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col py-1.5">
    <span className="text-[11px] text-slate-400 font-medium uppercase tracking-tight">{label}</span>
    <span className="text-sm font-semibold text-slate-700">{value}</span>
  </div>
);

export const Divider: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`h-px bg-slate-200 w-full my-4 ${className}`} />
);

export const Button: React.FC<{
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  onClick?: () => void;
  isSubmit?: boolean;
}> = ({ label, variant = 'primary', onClick, isSubmit }) => {
  const theme = useContext(ThemeContext);
  const primaryColor = theme.primary || '#6366f1';
  
  const base = "px-5 py-2.5 rounded-xl font-semibold transition-all active:scale-[0.97] text-sm flex items-center justify-center gap-2";
  
  const getStyle = () => {
    switch(variant) {
      case 'primary': 
        return { 
          backgroundColor: primaryColor, 
          color: '#fff',
          boxShadow: `0 10px 15px -3px ${primaryColor}20`
        };
      case 'secondary':
        return {
          backgroundColor: '#fff',
          color: '#334155',
          border: '1px solid #e2e8f0'
        };
      case 'danger':
        return {
          backgroundColor: '#fef2f2',
          color: '#dc2626',
          border: '1px solid #fee2e2'
        };
      default:
        return { color: '#64748b' };
    }
  };

  return (
    <button
      type={isSubmit ? "submit" : "button"}
      onClick={onClick}
      className={base}
      style={getStyle()}
    >
      {label}
    </button>
  );
};

export const Input: React.FC<{
  label: string;
  placeholder?: string;
  multiline?: boolean;
  value?: string;
  onChange?: (val: string) => void;
}> = ({ label, placeholder, multiline, value, onChange }) => {
  const theme = useContext(ThemeContext);
  const primaryColor = theme.primary || '#6366f1';

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-slate-500 uppercase ml-1">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 text-sm bg-white border border-slate-200 rounded-xl outline-none transition-all min-h-[120px] shadow-sm focus:border-opacity-100"
          style={{ border: `1px solid #e2e8f0` }}
          onFocus={(e) => e.target.style.borderColor = primaryColor}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 text-sm bg-white border border-slate-200 rounded-xl outline-none transition-all shadow-sm"
          style={{ border: `1px solid #e2e8f0` }}
          onFocus={(e) => e.target.style.borderColor = primaryColor}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />
      )}
    </div>
  );
};

export const Chart: React.FC<{ data: any[], type?: 'bar' | 'line' }> = ({ data, type = 'bar' }) => {
  const theme = useContext(ThemeContext);
  const primaryColor = theme.primary || '#6366f1';

  return (
    <div className="h-[240px] w-full mt-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            <Bar dataKey="value" fill={primaryColor} radius={[6, 6, 0, 0]} barSize={32} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            <Line type="monotone" dataKey="value" stroke={primaryColor} strokeWidth={3} dot={{ r: 4, fill: primaryColor }} activeDot={{ r: 6 }} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export const Person: React.FC<{ name: string; avatar?: string; role?: string }> = ({ name, avatar, role }) => (
  <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-100 shadow-sm">
    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold overflow-hidden border border-white">
      {avatar ? <img src={avatar} className="w-full h-full object-cover" /> : name.charAt(0)}
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-bold text-slate-800 leading-none">{name}</span>
      {role && <span className="text-[11px] text-slate-400 font-medium mt-1">{role}</span>}
    </div>
  </div>
);

export const Image: React.FC<{ src: string; aspectRatio?: string; style?: string }> = ({ src, aspectRatio = "16/9", style }) => (
  <div className={`overflow-hidden rounded-2xl ${style}`} style={{ aspectRatio }}>
    <img src={src} className="w-full h-full object-cover" />
  </div>
);
