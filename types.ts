
export enum ComponentType {
  // Containers
  CONTAINER = 'container',
  COLUMNS = 'columns',
  FORM_CONTAINER = 'formContainer',
  LOOP_CONTAINER = 'loopContainer',
  INTERACTIVE_CONTAINER = 'interactiveContainer',

  // Display
  TEXT = 'text',
  RICH_TEXT = 'richText',
  TITLE = 'title',
  DIVIDER = 'divider',
  IMAGE = 'image',
  MULTI_IMAGE = 'multiImage',
  PERSON = 'person',
  PERSON_LIST = 'personList',
  CHART = 'chart',
  TABLE = 'table',

  // Interaction
  INPUT = 'input',
  BUTTON = 'button',
  COLLAPSE_BUTTON = 'collapseButton',
  DROPDOWN = 'dropdown',
  DROPDOWN_MULTI = 'dropdownMulti',
  DATE_PICKER = 'datePicker',
  TIME_PICKER = 'timePicker',
  DATETIME_PICKER = 'datetimePicker',
  PERSON_PICKER = 'personPicker',
  PERSON_PICKER_MULTI = 'personPickerMulti',

  // Compound
  BUTTON_GROUP = 'buttonGroup',
  REMARK = 'remark',
  DUAL_TEXT = 'dualText',
  TEXT_BUTTON = 'textButton',
  TEXT_IMAGE = 'textImage',
  TEXT_DROPDOWN = 'textDropdown',
  TEXT_PERSON_PICKER = 'textPersonPicker',
  TEXT_DATETIME_PICKER = 'textDatetimePicker',
  TEXT_DATE_PICKER = 'textDatePicker',
  TEXT_TIME_PICKER = 'textTimePicker'
}

export interface CardTheme {
  primary?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export interface ComponentConfig {
  id: string;
  type: ComponentType;
  props?: Record<string, any>;
  style?: string; // Tailwind classes
  children?: ComponentConfig[];
  field?: string; // For form data mapping
}

export interface CardSchema {
  title: string;
  theme?: CardTheme;
  body: ComponentConfig[];
}

export interface PersonData {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}
