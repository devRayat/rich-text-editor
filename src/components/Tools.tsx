import Button from './Button'
import Item from './Item'
import Select from './Select'
import { ToolsProps } from './types'

const Tools: React.FC<ToolsProps> = ({ options }) => {
  let formats: JSX.Element[] = []

  for (const key in options) {
    let component: JSX.Element | JSX.Element[]
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      if (options[key].type === 'button') {
        component = (
          <Button
            key={key}
            className={key}
            options={options[key].content as string[]}
          />
        )
      } else if (options[key].type === 'item') {
        component = (
          <Item
            key={key}
            className={key}
            options={options[key].content as string[]}
          />
        )
      } else {
        component = (
          <Select key={key} className={key} options={options[key].content} />
        )
      }
      formats.push(component)
    }
  }

  return <>{formats}</>
}

export default Tools
