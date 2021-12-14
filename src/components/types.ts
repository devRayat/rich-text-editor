import { ToolbarOptions } from '../constants/types'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: string[]
}

export interface ItemProps extends ButtonProps {}

export interface SelectProps
  extends React.ButtonHTMLAttributes<HTMLSelectElement> {
  options: (number | string | boolean)[]
}

export interface ToolsProps {
  options: ToolbarOptions
}
