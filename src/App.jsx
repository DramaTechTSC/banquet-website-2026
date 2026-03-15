import { useEffect, useRef, useState } from 'react';
import Stack from './components/Stack.jsx';
import Description from './components/Description.jsx';
import Option from './components/Option.jsx';
import Swirl from './assets/Swirl.jsx';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(gsap, TextPlugin);

function App() {
  const story = [
    {
      desc: <p>
        You just got done working overtime for the 5th day in a row. You walk back home through the bustling city all
        alone, late at night. You're exhausted. You think you know a shortcut back to your shitty studio apartment, do
        you want to try and take it, or are you sticking to your normal route?
      </p>,
      opt: ["Take the shortcut", "Don't take chances"],
      next: [1, 6],
    },
    {
      desc: <p>
        You cut through an alleyway. You've never been this way before but you think you know where you're going. You
        see a neon sign pointing out a gap in the alleyway. &ldquo;RABBIT HOLE&rdquo; it reads. Do you keep going along
        your planned route, or do you follow the sign?
      </p>,
      opt: ["Keep Going", "Follow the Sign"],
      next: [7, 2],
    },
    {
      desc: <p>
        You dip into the gap in the alley, following the direction the sign pointed you in. You are now going down a
        smaller, tighter path, lit by strange brightly colored lights. You begin to hear strange music as you go down
        the path. You feel strangely at ease, the lights are so nice, the music is calling out to you. Do you continue
        down the path, or do you turn around and keep heading home?
      </p>,
      opt: ["KEEP GOING", "TURN BACK"],
      next: [3, 8],
    },
    {
      desc: <p>
        You follow the path all the way to a strange back entrance to one of the buildings lining the alleyway. There is
        a bright light coming from the open door, and you can hear that it is the source of the music from before. What
        do you do?
      </p>,
      opt: ["APPROACH", "NoT mY bUsINeSs"],
      next: [4, 9],
    },
    {
      desc: <p>
        A white rabbit standing upright and wearing a tux appears in the doorway. You jump back a bit, startled, but the
        music puts you back at ease fairly quickly. &ldquo;Password?&rdquo; the rabbit asks. You remain bewildered for a
        moment by the talking rabbit before you are able to speak.
      </p>,
      opt: [<>&ldquo;What?&rdquo;</>, <>&ldquo;[password]&rdquo;</>],
      next: [10, 5, 12],
    },
    {
      desc: <p>The rabbit invites you to follow, and then clears the doorway, allowing you in.</p>,
      opt: ["DoWn ThE RaBbIt hOlE", "DOWN THE RABBIT HOLE"],
      next: [13, 13],
    },
    {
      desc: <p>
        You take the long way home. You're body is exhausted but you make it home safely. You spend another night doing
        the same things as always; something in you still longing for a change. This is not the end of your journey.
      </p>,
      opt: [
        "Try Again",
        <>&ldquo;If the beginning is the end, and the end is the beginning, then what's the end anyway?&rdquo;</>
      ],
      next: [0, 0],
    },
    {
      desc: <p>
        You cut all the way through the alleyway. You make it back to familiar ground, and find your way home. You're
        very pleased with yourself that you managed to pull that shortcut off. You spend the rest of the night doing
        the same things as always; something in you always longing for a change. This is not the end of your journey.
      </p>,
      opt: [
        "Try Again",
        <>&ldquo;If you don't know where you're going, any road will get you there.&rdquo;</>
      ],
      next: [0, 0],
    },
    {
      desc: <p>
        You turn back and go out the other end of the alleyway, getting you back to familiar ground. You find your way
        home safely. You spend the rest of the night doing the same things as always; something in you always longing
        for a change. You can't stop wondering what was at the end of that alley. This is not the end of your journey.
      </p>,
      opt: [
        "Try Again",
        <>&ldquo;Begin at the beginning, and go on till you come to the end; then stop.&rdquo;</>
      ],
      next: [0, 0],
    },
    {
      desc: <p>
        You decide not to enter, and go back the way you came until you exit the alleyway, getting you back to familiar
        ground. You find your way home safely. You spend the rest of the night doing the same things as always;
        something in you always longing for a change. You can't stop wondering what was at the end of that alley. This
        is not the end of your journey.
      </p>,
      opt: [
        "Try Again",
        <>&ldquo;If time is meant for living why's it killing me?&rdquo;</>
      ],
      next: [0, 0],
    },
    {
      desc: <p>
        The rabbit checks a pocket watch. "It's past public time. You cannot be here without a password." says the
        rabbit. This is all very confusing, you don't know any password... The rabbit chimes in, "It's time to go." You
        feel yourself start to black out.
      </p>,
      opt: ["WHAT'S HAPPENING", "I'M SCARED"],
      next: [11, 11],
    },
    {
      desc: <p>
        You wake up in your apartment. What a strange dream. You go about your day the same as any other; longing for
        something different for once. This is not the end of your journey.
      </p>,
      opt: [
        "Try Again",
        <>&ldquo;Was that a dream or was that a vision? Were you even asleep? Are you still asleep?&rdquo;</>
      ],
      next: [0, 0],
    },
    {
      desc: <p>
        "Wrong." says the rabbit. "It's past public time. You cannot be here without the password." For some reason you
        felt like that was it... This is all very confusing... The rabbit chimes in. "It's time to go." You feel
        yourself start to black out.
      </p>,
      opt: ["WHAT'S HAPPENING", "I'M SCARED"],
      next: [11, 11],
    }
  ];

  const [index, setIndex] = useState(0);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const swirlRef = useRef(null);
  const stackRef = useRef(null);

  const { contextSafe } = useGSAP(() => {
    gsap.from(['#description', '.option'], {x: '50vh', ease: 'expo.out', duration: 0.5, stagger: 0.1});
  });

  const handleClick = contextSafe((i) => {
    if (story[index].next[i] === 13)
      gsap.to(stackRef.current, { x: '-50vw', ease: 'power2.in', duration: 0.5 })

    gsap.to(['#description', '.option'], {
      x: '50vw', ease: 'power2.in', duration: 0.5, stagger: 0.1,
      onComplete: () => {
        setIndex(story[index].next[i]);
        if (story[index].next[i] !== 13) gsap.to(['#description', '.option'], {
          x: 0, ease: 'expo.out', duration: 0.5, stagger: 0.1
        });
      }
    });
  });

  const showModal = () => {
    setShow(true);
  }

  const hideModal = () => {
    gsap.to("#modal", { opacity: 0, duration: 0.2, onComplete: () => setShow(false) });
  }

  useEffect(() => {
    if (index === 13) {
      gsap.to(swirlRef.current, { opacity: 1, duration: 5, ease: 'sine.inOut' });
      gsap.from('#row1', { opacity: 0, duration: 1, ease: 'power1.inOut', delay: 5 });
      gsap.from('#row2', { text: "", duration: 3, delay: 6 });
      gsap.from('#row3', { opacity: 0, duration: 2, ease: 'power1.inOut', delay: 9 });
      gsap.from('#row4', { opacity: 0, duration: 1, ease: 'power1.inOut', delay: 11 });
      gsap.from('#row5', { opacity: 0, duration: 1, ease: 'power1.inOut', delay: 11.5 });
    }
  }, [index]);

  useEffect(() => {
    if (show) gsap.to("#modal", { opacity: 1, duration: 0.2 });
  }, [show])

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-stretch bg-radial from-sky-900 to-sky-950 overflow-hidden" data-theme="speakeasy">
      { (index === 13 ) && <Swirl ref={swirlRef} className="z-10" />}
      { show && <div id="modal" className="absolute opacity-0 inset-0 z-50 flex justify-center items-center bg-[rgba(0,0,0,0.5)] p-8">
        <div className="card bg-base-300 w-3xl shadow-sm">
          <div className="card-body">
            <div className="flex flex-row justify-between items-start">
              <h5 className="card-title">Event Information</h5>
              <button onClick={hideModal}>✕</button>
            </div>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">RSVP</button>
            </div>
          </div>
        </div>
      </div>}
      <nav className="z-20"><a href="/"><img src="/images/logo.png" alt="DramaTech Logo" height="813"
                                             className="h-20" /></a></nav>
      {(index >= 13) ? <main className="z-20 grow flex flex-col items-center justify-center text-center gap-2">
        <h5 id="row1" className="mb-8">You are invited to DramaTech Theatre's...</h5>
        <span className="relative w-max text-left">
          <h1 className="opacity-0">Alice In Wonderland</h1>
          <h1 id="row2" className="text-accent absolute inset-0">Alice In Wonderland</h1>
        </span>
        <h3 id="row3" className="text-primary text-shadow-lg text-shadow-primary">SPEAKEASY</h3>
        <h5 id="row4" className="mt-8 mb-6">themed Banquet</h5>
        <div id="row5" className="flex flex-row gap-4">
          <button className="btn btn-lg btn-soft btn-secondary">RSVP</button>
          <button className="btn btn-lg btn-soft btn-accent" onClick={showModal}>Info</button>
        </div>
      </main> : <main
        className="z-20 grow grid lg:grid-cols-2 place-content-start lg:place-content-center px-16 gap-x-16 w-full max-w-7xl">
        <Stack index={index} ref={stackRef} />
        <Description text={story[index].desc} />
        {
          story[index].opt.map((opt, idx) =>
            <Option
              key={idx} index={idx} text={opt} onClick={() => handleClick(idx)}
              input={idx === 1 && index === 4} state={password} setState={setPassword}
              onSubmit={() => handleClick(password === import.meta.env.VITE_PASSWORD ? 1 : 2)}
            />)
        }
      </main>}
      <footer className="z-20 w-full flex flex-row justify-between py-2 px-4">
        <span>DramaTech Banquet 2026</span>
        <a href="https://dramatech.org" target="_blank" rel="noopener noreferrer" className="text-primary underline">dramatech.org</a>
      </footer>
    </div>
  )
}

export default App;
