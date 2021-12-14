import { ItemProps } from './types'

const Item: React.FC<ItemProps> = ({ className, options, ...rest }) => {
  if (options.length === 0) {
    return <button {...rest} className={`ql-${className}`} />
  }
  return (
    <>
      {options.map(option => (
        <button key={option} {...rest} className={`ql-${option}`} />
      ))}
    </>
  )
}

export default Item
