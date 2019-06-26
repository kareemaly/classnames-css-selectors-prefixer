import cx from 'classnames';

export default (...args) => cx(...args)
  .split(' ')
  .map(className => `${WIDGET_NAME}-${className}`)
  .join(' ');
