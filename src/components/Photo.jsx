import classNames from 'classnames';

function Photo({ photo, z, rotate, ...rest }) {
  return <div className={classNames('stack', z)} {...rest}><img src={photo} className={rotate} /></div>
}

export default Photo;