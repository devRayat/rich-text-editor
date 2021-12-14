export interface ToolbarOptions {
  [key: string]: {
    content: (number | string | boolean)[]
    type: 'dropdown' | 'button' | 'item'
  }
}
