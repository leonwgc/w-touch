import React, { useRef, useEffect } from 'react';
import { AutoCenter, Toast } from 'react-uni-comps';
import DemoBlock from './common/DemoBlock';
import { XTouchElement } from 'XTouch';

type Position = {
  x: number;
  y: number;
  angle: number;
  scale: number;
};

const update = (el, transform, statusEl) => {
  const cssTransform = `translate(${transform.x}px,${transform.y}px) rotate(${transform.angle}deg) scale(${transform.scale})`;

  el.style.transform = cssTransform;
  statusEl.innerText = cssTransform;
};

export default function App() {
  const ref = useRef<Position>({ x: 0, y: 0, angle: 0, scale: 1 });
  const elRef = useRef<HTMLDivElement>();

  const statusElRef = useRef<HTMLDivElement>();

  useEffect(() => {
    update(elRef.current, ref.current, statusElRef.current);
  }, []);

  return (
    <div>
      <DemoBlock title="当前值：">
        <div ref={statusElRef}></div>
      </DemoBlock>

      <DemoBlock title="手指/鼠标操作">
        <AutoCenter>
          <XTouchElement
            onSingleTap={() => {
              Toast.show('tap');
            }}
            onDoubleTap={() => {
              Toast.show('doubleTap');
            }}
            onLongTap={() => {
              Toast.show('longTap');
            }}
            onTouchStart={() => {
              console.log('start');
            }}
            onTouchEnd={(e) => {
              console.log('end');
            }}
            onSwipe={(e) => {
              console.log('swipe', e.direction);
            }}
            onPinch={(e) => {
              console.log('scale:', e.scale);
              ref.current.scale = e.scale;
              update(elRef.current, ref.current, statusElRef.current);
            }}
            onRotate={(e) => {
              console.log('angle:', e.angle);
              ref.current.angle += e.angle;
              update(elRef.current, ref.current, statusElRef.current);
            }}
            onPressMove={(e) => {
              console.log(e.deltaX, e.deltaY);
              ref.current.x = ref.current.x + e.deltaX;
              ref.current.y = ref.current.y + e.deltaY;

              update(elRef.current, ref.current, statusElRef.current);
            }}
            onTwoFingerPressMove={(e) => {
              console.log(e.deltaX, e.deltaY);
              ref.current.x = ref.current.x + e.deltaX;
              ref.current.y = ref.current.y + e.deltaY;
            }}
            ref={elRef}
          >
            <div
              style={{
                width: 120,
                height: 120,
                border: '1px solid red',
                position: 'relative',
              }}
            />
          </XTouchElement>
        </AutoCenter>
      </DemoBlock>
    </div>
  );
}