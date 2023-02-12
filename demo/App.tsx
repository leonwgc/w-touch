import React, { useRef, useEffect } from 'react';
import TouchElement from './TouchElement';
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

  useEffect(() => {
    update(elRef.current, ref.current, statusElRef.current);
  }, []);

  return (
    <div>
      <div ref={statusElRef} style={{ color: '#666', fontSize: 12 }}></div>
      <TouchElement
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
        <div
          style={{
            touchAction: 'none',
            width: 200,
            height: 200,
            background: `center / contain no-repeat url(${pkq})`,
            marginLeft: 100,
            marginTop: 100,
          }}
        />
      </TouchElement>
    </div>
  );
}
