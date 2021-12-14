import { ButtonProps } from './types'

const Button: React.FC<ButtonProps> = ({ className, options, ...rest }) => {
  if (options.length === 0) {
    return <button {...rest} className={`ql-${className}`} />
  }
  return (
    <>
      {options.map(option => (
        <button
          key={option}
          {...rest}
          className={`ql-${className}`}
          value={option}
        />
      ))}
    </>
  )
}

export default Button
