import React, { useRef, useEffect } from 'react';
import { Toast, useMount } from 'react-uni-comps';
import { TouchElement } from 'w-touch';
import pkq from './images/pkq.png';

type Position = {
  x: number;
  y: number;
  angle: number;
  scale: number;
};

const update = (el, transform, statusEl) => {
  const cssTransform = `translate(${transform.x}px,${transform.y}px) rotate(${transform.angle}deg) scale(${transform.scale})`;

  el.style.transform = cssTransform;
  statusEl.innerText = '坐标: ' + cssTransform;
};

export default function App() {
  const ref = useRef<Position>({ x: 0, y: 0, angle: 0, scale: 1 });
  const elRef = useRef<HTMLDivElement>();

  const statusElRef = useRef<HTMLDivElement>();

  useMount(() => {
    document.title = 'w-touch: 操作皮卡丘';
  });

  useEffect(() => {
    update(elRef.current, ref.current, statusElRef.current);
  }, []);

  return (
    <div>
      <div ref={statusElRef} style={{ color: '#666', fontSize: 12 }}></div>
      <TouchElement
        onSingleTap={() => {
          Toast.show({
            modal: false,
            duration: 400,
            content: '你点击了皮卡丘',
          });
        }}
        onDoubleTap={() => {
          Toast.show({
            modal: false,
            duration: 400,
            content: '你双击了皮卡丘',
          });
        }}
        onLongTap={() => {
          Toast.show({
            modal: false,
            duration: 400,
            content: '你长按了皮卡丘',
          });
        }}
        onSwipe={(e) => {
          Toast.show({
            modal: false,
            duration: 400,
            content: '拖动方向' + e.direction,
          });
        }}
        onPinch={(e) => {
          ref.current.scale = e.scale;
          update(elRef.current, ref.current, statusElRef.current);
        }}
        onRotate={(e) => {
          ref.current.angle += e.angle;
          update(elRef.current, ref.current, statusElRef.current);
        }}
        onPressMove={(e) => {
          ref.current.x = ref.current.x + e.deltaX;
          ref.current.y = ref.current.y + e.deltaY;

          update(elRef.current, ref.current, statusElRef.current);
        }}
        onTwoFingerPressMove={(e) => {
          ref.current.x = ref.current.x + e.deltaX;
          ref.current.y = ref.current.y + e.deltaY;
        }}
        ref={elRef}
      >
        <img src={pkq} style={{ touchAction: 'none' }} />
      </TouchElement>
    </div>
  );
}
