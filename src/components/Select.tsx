import { SelectProps } from './types'

const Select: React.FC<SelectProps> = ({ className, options, ...rest }) => {
  return (
    <select
      name={`ql-${className}`}
      className={`ql-${className}`}
      defaultValue=""
    >
      {options.length !== 0 &&
        options.map(option => {
          if (typeof option === 'boolean') {
            return <option key={'selected'} value=""></option>
          }
          return <option key={option} value={option}></option>
        })}
    </select>
  )
}

export default Select
