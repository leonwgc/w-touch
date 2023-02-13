import React, { useRef, useEffect, useState, useLayoutEffect, useCallback } from 'react';
import Touch from '../src';
import pkq from './images/pkq.png';
import vconsole from 'vconsole';

new vconsole();

type Position = {
  x: number;
  y: number;
  angle: number;
  scale: number;
};

const updateStatus = (el, transform, statusEl) => {
  const cssTransform = `translate(${transform.x}px,${transform.y}px) rotate(${transform.angle}deg) scale(${transform.scale})`;

  el.style.transform = cssTransform;
  statusEl.innerText = '坐标: ' + cssTransform;
};

export default function App() {
  const ref = useRef<Position>({ x: 0, y: 0, angle: 0, scale: 1 });
  const elRef = useRef<Element>();
  const [msg, setMsg] = useState('');

  const statusElRef = useRef<Element>();

  useEffect(() => {
    updateStatus(elRef.current, ref.current, statusElRef.current);
  }, []);

  const clearMsg = useCallback(() => {
    setMsg('');
  }, []);

  useLayoutEffect(() => {
    const touch = new Touch(elRef.current as Element, {
      onDoubleTap() {
        setMsg('你双击了皮卡丘');
      },
      onLongTap() {
        setMsg('你长按了皮卡丘');
      },
      onPinch({ scale }) {
        ref.current.scale = scale;
        updateStatus(elRef.current, ref.current, statusElRef.current);
        clearMsg();
      },
      onRotate({ angle }) {
        ref.current.angle += angle;
        updateStatus(elRef.current, ref.current, statusElRef.current);
        clearMsg();
      },
      onPressMove({ deltaX, deltaY }) {
        ref.current.x = ref.current.x + deltaX;
        ref.current.y = ref.current.y + deltaY;

        updateStatus(elRef.current, ref.current, statusElRef.current);
        clearMsg();
      },
      onTwoFingerPressMove({ deltaX, deltaY }) {
        ref.current.x = ref.current.x + deltaX;
        ref.current.y = ref.current.y + deltaY;
        clearMsg();
      },
      onSwipe({ direction }) {
        setMsg('滑动方向:' + direction);
      },
    });

    return () => {
      touch.destroy();
    };
  }, []);

  return (
    <div>
      <div
        style={{ position: 'absolute', left: 0, top: 0, width: '100%', zIndex: 100, padding: 12 }}
      >
        <div style={{ color: '#005cff', fontSize: 18 }}>{msg}</div>
        <div ref={statusElRef} style={{ color: '#666', fontSize: 12 }}></div>
      </div>

      <div
        ref={elRef}
        style={{
          touchAction: 'none',
          userSelect: 'none',
          width: 200,
          height: 200,
          background: `center / contain no-repeat url(${pkq})`,
          marginLeft: 100,
          marginTop: 100,
        }}
      ></div>
    </div>
  );
}
