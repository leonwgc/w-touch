import * as React from 'react';
import Touch, { Options } from './XTouch';

type Props = {
  /** 手势操作元素,如果是组件，需要forwardRef到dom */
  children: React.ReactElement;
} & Options;

const throwCheckError = () => {
  throw new Error('XTouchElement: 子元素必须是dom/forwardRef到dom的组件');
};

/** 给子元素添加手势操作 */
const XTouchElement = React.forwardRef<HTMLElement, Props>((props, ref) => {
  const { children, ...rest } = props;
  const elRef = React.useRef<HTMLElement>();

  React.useImperativeHandle(ref, () => elRef.current);

  React.useLayoutEffect(() => {
    const el = elRef.current;
    if (!(el instanceof HTMLElement)) {
      throwCheckError();
    }

    const fg = new Touch(el, rest as Options);

    return () => {
      fg.destroy?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!React.isValidElement(children)) {
    throwCheckError();
  }

  return React.cloneElement(children, { ref: elRef });
});

XTouchElement.displayName = 'XTouchElement';

export default XTouchElement;
