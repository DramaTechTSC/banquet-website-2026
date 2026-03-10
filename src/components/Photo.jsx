import classNames from 'classnames';

function Photo({ photo, z, rotate, ...rest }) {
  return <div className="stack" {...rest}><img src={photo} className={classNames(z, rotate)} /></div>
}

export default Photo;