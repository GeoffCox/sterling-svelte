export const neutralColors: Record<string, string> = {
  neutral0: 'hsl(0, 0%, 0%)',
  neutral10: 'hsl(0, 0%, 12%)',
  neutral15: 'hsl(0, 0%, 15%)',
  neutral20: 'hsl(0, 0%, 20%)',
  neutral30: 'hsl(0, 0%, 30%)',
  neutral45: 'hsl(0, 0%, 45%)',
  neutral60: 'hsl(0, 0%, 60%)',
  neutral75: 'hsl(0, 0%, 75%)',
  neutral85: 'hsl(0, 0%, 85%)',
  neutral92: 'hsl(0, 0%, 92%)',
  neutral96: 'hsl(0, 0%, 96%)',
  neutral98: 'hsl(0, 0%, 98%)',
  neutral100: 'hsl(0, 0%, 100%)'
};

/**
 * Status colors for a light theme.
 * These are carefully chosen colors to meet the minimum 4.5:1 accessibility contrast ratio.
 */
export const lightStatusColors = {
  info: {
    backgroundColor: 'hsl(198, 100%, 90%)',
    borderColor: 'hsl(198, 100%, 40%)',
    color: 'hsl(198, 100%, 40%)'
  },
  success: {
    backgroundColor: 'hsl(146, 100%, 90%)',
    borderColor: 'hsl(146, 100%, 30%)',
    color: 'hsl(146, 80%, 25%)'
  },
  warning: {
    backgroundColor: 'hsl(39, 100%, 80%)',
    borderColor: 'hsl(39, 100%, 45%)',
    color: 'hsl(39, 100%, 25%)'
  },
  error: {
    backgroundColor: 'hsl(5, 100%, 90%)',
    borderColor: 'hsl(5, 100%, 40%)',
    color: 'hsl(5, 80%, 40%)'
  }
};

/**
 * Status colors for a dark theme.
 * These are carefully chosen colors to meet the minimum 4.5:1 accessibility contrast ratio.
 */

export const darkStatusColors = {
  info: {
    backgroundColor: 'hsl(198, 100%, 10%)',
    borderColor: 'hsl(198, 100%, 40%)',
    color: 'hsl(198, 80%, 50%)'
  },
  success: {
    backgroundColor: 'hsl(146, 100%, 10%)',
    borderColor: 'hsl(146, 100%, 30%)',
    color: 'hsl(146, 100%, 40%)'
  },
  warning: {
    backgroundColor: 'hsl(39, 100%, 10%)',
    borderColor: 'hsl(39, 100%, 45%)',
    color: 'hsl(39, 100%, 50%)'
  },
  error: {
    backgroundColor: 'hsl(5, 100%, 10%)',
    borderColor: 'hsl(5, 100%, 40%)',
    color: 'hsl(5, 100%, 50%)'
  }
};
