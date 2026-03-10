function Option({ index, text, input=false, state, setState, onSubmit, onClick, ...rest }) {
  const paper = ['/images/paper1.png', '/images/paper2.png'];

  if (input) {
    return <form className="option" {...rest} onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}>
      <div className="outer size-full">
        <img src={paper[index % 2]} />
        <input
          type="text" value={state} onInput={(e) => setState(e.target.value)}
          className="size-full absolute inset-0 z-30 opacity-0"
        />
        <input type="submit" className="hidden" />
        <div className="text">
          <span>&ldquo;{state ? state : <span className="px-1 text-primary-100">type here...</span>}&rdquo;</span>
          <span className="text-sm text-sky-300 font-body">press enter to submit</span>
        </div>
      </div>
    </form>
  } else {
    return <button className="option" onClick={onClick} {...rest}>
      <div className="outer size-full">
        <img src={paper[index % 2]} />
        <div className="text">{text}</div>
      </div>
    </button>
  }
}

export default Option;