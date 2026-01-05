
import React, { useState, createContext, useContext } from 'react';
import { ComponentConfig, ComponentType, CardTheme } from '../types';
import * as UI from './UIComponents';

// Context for Form Management
const FormContext = createContext<{
  data: Record<string, any>;
  updateField: (field: string, value: any) => void;
} | null>(null);

// Context for Card Theme
export const ThemeContext = createContext<CardTheme>({
  primary: '#6366f1'
});

interface RendererProps {
  config: ComponentConfig;
}

const ComponentRenderer: React.FC<RendererProps> = ({ config }) => {
  const formCtx = useContext(FormContext);

  const renderChildren = () => {
    if (!config.children) return null;
    return config.children.map((child) => (
      <ComponentRenderer key={child.id} config={child} />
    ));
  };

  const handleFieldChange = (val: any) => {
    if (config.field && formCtx) {
      formCtx.updateField(config.field, val);
    }
  };

  const getFieldValue = () => {
    return (config.field && formCtx) ? formCtx.data[config.field] || '' : undefined;
  };

  switch (config.type) {
    case ComponentType.CONTAINER:
      return (
        <div className={config.style}>
          {renderChildren()}
        </div>
      );

    case ComponentType.COLUMNS: {
      const { cols = 2, gap = 4 } = config.props || {};
      return (
        <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-${gap} ${config.style}`}>
          {renderChildren()}
        </div>
      );
    }

    case ComponentType.FORM_CONTAINER:
      return <FormWrapper config={config}>{renderChildren()}</FormWrapper>;

    case ComponentType.TITLE:
      return <UI.Title text={config.props?.text || ''} level={config.props?.level} />;

    case ComponentType.TEXT:
      return <UI.Text content={config.props?.content || ''} style={config.style} />;

    case ComponentType.REMARK:
      return <UI.Remark label={config.props?.label || ''} content={config.props?.content || ''} color={config.props?.color} />;

    case ComponentType.DUAL_TEXT:
      return <UI.DualText label={config.props?.label || ''} value={config.props?.value || ''} />;

    case ComponentType.DIVIDER:
      return <UI.Divider className={config.style} />;

    case ComponentType.INPUT:
      return (
        <UI.Input
          label={config.props?.label || ''}
          placeholder={config.props?.placeholder}
          multiline={config.props?.multiline}
          value={getFieldValue()}
          onChange={handleFieldChange}
        />
      );

    case ComponentType.BUTTON:
      return (
        <UI.Button
          label={config.props?.label || ''}
          variant={config.props?.variant}
          onClick={config.props?.onClick}
          isSubmit={config.props?.isSubmit}
        />
      );

    case ComponentType.CHART:
      return <UI.Chart data={config.props?.data || []} />;

    case ComponentType.DATE_PICKER:
      return (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase ml-0.5">{config.props?.label}</label>
          <input
            type="date"
            className="w-full p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 outline-none transition-all bg-white"
            value={getFieldValue()}
            onChange={(e) => handleFieldChange(e.target.value)}
          />
        </div>
      );

    case ComponentType.PERSON_PICKER:
      return (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase ml-0.5">{config.props?.label}</label>
          <select
            className="w-full p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 outline-none transition-all bg-white"
            value={getFieldValue()}
            onChange={(e) => handleFieldChange(e.target.value)}
          >
            <option value="">Select a person...</option>
            <option value="user_1">Alice Freeman</option>
            <option value="user_2">Bob Robertson</option>
            <option value="user_3">Charlie Davis</option>
          </select>
        </div>
      );

    default:
      return (
        <div className="p-4 border border-dashed border-slate-300 text-xs text-slate-400 rounded">
          Unsupported component: {config.type}
        </div>
      );
  }
};

const FormWrapper: React.FC<{ config: ComponentConfig; children: React.ReactNode }> = ({ config, children }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted to:', config.props?.onSubmitUrl);
    console.log('Form Data:', formData);
    alert(`Data submitted successfully!\nCheck console for details.\nEndpoint: ${config.props?.onSubmitUrl}`);
  };

  return (
    <FormContext.Provider value={{ data: formData, updateField }}>
      <form onSubmit={handleSubmit} className={config.style}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default ComponentRenderer;
