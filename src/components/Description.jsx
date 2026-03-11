function Description({ text }) {
  return <div id="description" className="relative pb-8">
    <img src="/images/paperLg.webp" />
    <div className="description">{text}</div>
  </div>
}

export default Description;