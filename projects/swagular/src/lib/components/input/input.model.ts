export type ValuesOf<T extends readonly any[]> = T[number];


const materialInputTypes = [
  'color',
  'date',
  'datetime-local',
  'email',
  'month',
  'password',
  'search',
  'tel',
  'text',
  'time',
  'url',
  'week'
] as const;
export declare type InputType = ValuesOf<typeof materialInputTypes> | 'textarea' | 'select' | 'multi-select';
export declare type InputModel<T = any> = {
  key: keyof T & string;
  label?: string;
  appearance?: 'legacy' | 'standard' | 'fill' | 'outline';
  hint?: string;
  type?: InputType;
  options?: { value: any; title: string }[];
};
