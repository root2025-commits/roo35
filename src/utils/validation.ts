// Validation utilities for forms and data

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class Validator {
  static validateField(value: any, rules: ValidationRule[]): ValidationResult {
    const errors: string[] = [];

    for (const rule of rules) {
      if (rule.required && (!value || value.toString().trim() === '')) {
        errors.push(rule.message || 'Este campo es requerido');
        continue;
      }

      if (value && rule.minLength && value.toString().length < rule.minLength) {
        errors.push(rule.message || `Mínimo ${rule.minLength} caracteres`);
      }

      if (value && rule.maxLength && value.toString().length > rule.maxLength) {
        errors.push(rule.message || `Máximo ${rule.maxLength} caracteres`);
      }

      if (value && rule.pattern && !rule.pattern.test(value.toString())) {
        errors.push(rule.message || 'Formato inválido');
      }

      if (value && rule.custom && !rule.custom(value)) {
        errors.push(rule.message || 'Valor inválido');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateForm(data: Record<string, any>, schema: Record<string, ValidationRule[]>): Record<string, ValidationResult> {
    const results: Record<string, ValidationResult> = {};

    for (const [field, rules] of Object.entries(schema)) {
      results[field] = this.validateField(data[field], rules);
    }

    return results;
  }

  static isFormValid(validationResults: Record<string, ValidationResult>): boolean {
    return Object.values(validationResults).every(result => result.isValid);
  }
}

// Common validation rules
export const VALIDATION_RULES = {
  REQUIRED: { required: true, message: 'Este campo es requerido' },
  
  NAME: [
    { required: true, message: 'El nombre es requerido' },
    { minLength: 2, message: 'El nombre debe tener al menos 2 caracteres' },
    { maxLength: 100, message: 'El nombre no puede exceder 100 caracteres' }
  ],
  
  PHONE: [
    { required: true, message: 'El teléfono es requerido' },
    { pattern: /^(\+53)?[5-9]\d{7}$/, message: 'Formato de teléfono cubano inválido' }
  ],
  
  ADDRESS: [
    { required: true, message: 'La dirección es requerida' },
    { minLength: 10, message: 'La dirección debe ser más específica' },
    { maxLength: 200, message: 'La dirección es demasiado larga' }
  ],
  
  PRICE: [
    { required: true, message: 'El precio es requerido' },
    { custom: (value: number) => value >= 0, message: 'El precio debe ser positivo' },
    { custom: (value: number) => value <= 10000, message: 'El precio es demasiado alto' }
  ],
  
  PERCENTAGE: [
    { required: true, message: 'El porcentaje es requerido' },
    { custom: (value: number) => value >= 0 && value <= 100, message: 'Debe ser entre 0 y 100%' }
  ],
  
  NOVEL_TITLE: [
    { required: true, message: 'El título es requerido' },
    { minLength: 2, message: 'El título debe tener al menos 2 caracteres' },
    { maxLength: 150, message: 'El título es demasiado largo' }
  ],
  
  NOVEL_CHAPTERS: [
    { required: true, message: 'El número de capítulos es requerido' },
    { custom: (value: number) => value > 0, message: 'Debe tener al menos 1 capítulo' },
    { custom: (value: number) => value <= 1000, message: 'Demasiados capítulos' }
  ],
  
  YEAR: [
    { required: true, message: 'El año es requerido' },
    { custom: (value: number) => value >= 1950, message: 'Año demasiado antiguo' },
    { custom: (value: number) => value <= new Date().getFullYear() + 5, message: 'Año demasiado futuro' }
  ]
} as const;

// Form validation schemas
export const FORM_SCHEMAS = {
  CUSTOMER_INFO: {
    fullName: VALIDATION_RULES.NAME,
    phone: VALIDATION_RULES.PHONE,
    address: VALIDATION_RULES.ADDRESS
  },
  
  PRICE_CONFIG: {
    moviePrice: VALIDATION_RULES.PRICE,
    seriesPrice: VALIDATION_RULES.PRICE,
    transferFeePercentage: VALIDATION_RULES.PERCENTAGE,
    novelPricePerChapter: VALIDATION_RULES.PRICE
  },
  
  DELIVERY_ZONE: {
    name: [
      { required: true, message: 'El nombre de la zona es requerido' },
      { minLength: 3, message: 'El nombre debe tener al menos 3 caracteres' }
    ],
    cost: VALIDATION_RULES.PRICE
  },
  
  NOVEL: {
    titulo: VALIDATION_RULES.NOVEL_TITLE,
    genero: [
      { required: true, message: 'El género es requerido' },
      { minLength: 3, message: 'El género debe tener al menos 3 caracteres' }
    ],
    capitulos: VALIDATION_RULES.NOVEL_CHAPTERS,
    año: VALIDATION_RULES.YEAR
  }
} as const;

// Utility functions
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Add +53 prefix if not present and is Cuban number
  if (digits.length === 8 && /^[5-9]/.test(digits)) {
    return `+53${digits}`;
  }
  
  if (digits.length === 10 && digits.startsWith('53')) {
    return `+${digits}`;
  }
  
  return phone;
};

export const validateCubanPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return /^(53)?[5-9]\d{7}$/.test(cleaned);
};