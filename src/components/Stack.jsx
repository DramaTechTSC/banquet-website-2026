import { useState, useRef } from 'react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Photo from './Photo.jsx';
import classNames from 'classnames';

function Stack({ index, ref }) {
  const [ history, setHistory ] = useState([0]);

  const top = useRef(null);
  const password = useRef(null);

  if (history.length >= 1 && history.at(-1) !== index) {
    setHistory([...history, index]);
  }

  useGSAP(() => {
    gsap.from(top.current, { x: '-50vw', ease: 'expo.out', duration: 1 });

    if (index === 4) {
      gsap.to(password.current, {rotate: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'bounce.out', delay: 0.5});
    }
    if (index !== 4 && index !== 5 && index !== 10 && index !== 12) {
      gsap.set(password.current, { rotate: -90, scale: 0.75, opacity: 0 });
    }
  }, [index]);

  const photos = [
    '/images/photo1.webp', '/images/photo2.webp', '/images/photo3.webp', '/images/photo4.webp', '/images/rabbit.webp', '',
    '/images/photo5.webp', '/images/photo5.webp', '/images/photo5.webp', '/images/photo5.webp', '', '/images/photo5.webp',
    ''
  ];
  const z = [
    'z-0', 'z-1', 'z-2', 'z-3', 'z-4', 'z-5', 'z-6', 'z-7', 'z-8', 'z-9', 'z-10', 'z-11', 'z-12','z-13', 'z-14', 'z-15',
    'z-16', 'z-17', 'z-18', 'z-19', 'z-20', 'z-21', 'z-22', 'z-23', 'z-24', 'z-25', 'z-26', 'z-27', 'z-28', 'z-29'
  ];
  const rotate = ['rotate-3', '-rotate-6', 'rotate-2', '-rotate-3', 'rotate-1', '-rotate-2'];

  return <div ref={ref} className="relative row-span-3 min-h-[120vw] lg:min-h-0">
    <img className={classNames(
      'absolute w-1/3 top-[40%] left-[10%] origin-bottom-right', z[history.lastIndexOf(4)]
    )} src="/images/password.webp" alt="Password?" ref={password} />
    {
      history.map((item, idx) => {
        const props = {
          photo: photos[item],
          z: z[idx],
          rotate: rotate[idx % rotate.length],
        };

        if (props.photo === '') return <></>

        if (item === 4) props.rotate = rotate[(idx - 1) % rotate.length];

        if (idx < history.length - 1) {
          return <Photo key={idx} {...props} />;
        } else {
          return <Photo key={idx} ref={top} {...props} />
        }
      })
    }
  </div>
}

export default Stack;