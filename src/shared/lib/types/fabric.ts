type TypeMap = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'date';

type Schema<T> = {
  [K in keyof T]-?: { type: TypeMap; optional?: boolean };
};

export const createTypeGuard = <T>(schema: Schema<T>) => {
  return (obj: any): obj is T => {
    if (typeof obj !== 'object' || obj === null) return false;

    return Object.entries(schema).every(([key, rule]) => {
      const { type, optional } = rule as { type: TypeMap; optional?: boolean };
      const value = (obj as any)[key];

      if (value === undefined || value === null) {
        return optional === true;
      }

      switch (type) {
        case 'string':
        case 'number':
        case 'boolean':
        case 'object':
          return typeof value === type;
        case 'array':
          return Array.isArray(value);
        case 'date':
          return value instanceof Date;
        default:
          return false;
      }
    });
  };
};
