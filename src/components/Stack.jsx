import { useState, useRef } from 'react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Photo from './Photo.jsx';

function Stack({ index }) {
  const [ history, setHistory ] = useState([0]);
  const top = useRef(null);

  if (history.length >= 1 && history.at(-1) !== index) {
    setHistory([...history, index]);
  }

  console.log(history);
  console.log(index);

  useGSAP(() => {
    gsap.from(top.current, { x: '-50vw', ease: 'expo.out', duration: 1 })
  }, [index])

  const photos = ['/images/photo1.png', '/images/photo2.png', '/images/photo3.png', '/images/photo4.png'];
  const z = [
    'z-0', 'z-1', 'z-2', 'z-3', 'z-4', 'z-5', 'z-6', 'z-7', 'z-8', 'z-9', 'z-10', 'z-11', 'z-12','z-13', 'z-14', 'z-15',
    'z-16', 'z-17', 'z-18', 'z-19', 'z-20', 'z-21', 'z-22', 'z-23', 'z-24', 'z-25', 'z-26', 'z-27', 'z-28', 'z-29'
  ];
  const rotate = ['rotate-3', '-rotate-6', 'rotate-2', '-rotate-3', 'rotate-1', '-rotate-2'];

  return <div className="relative row-span-3 min-h-[120vw] lg:min-h-0">
    {
      history.map((item, index) => {
        const props = {
          photo: photos[item],
          z: z[index],
          rotate: rotate[index % rotate.length],
        };
        if (index < history.length - 1) {
          return <Photo key={index} {...props} />;
        } else {
          return <Photo key={index} ref={top} {...props} />
        }
      })
    }
  </div>
}

export default Stack;