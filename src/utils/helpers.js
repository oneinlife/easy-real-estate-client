export const toNumericStringWithDivider = (value, divider = ' ') =>
  `${value}`.replace(/\s/g, '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1${divider}`);