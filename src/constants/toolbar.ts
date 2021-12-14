import { ToolbarOptions } from './types'

export const TOOLBAR_OPTIONS: ToolbarOptions = {
  header: {
    content: [1, 2, 3, 4, 5, 6, false],
    type: 'dropdown',
  },
  size: {
    content: ['small', false, 'large', 'huge'],
    type: 'dropdown',
  },
  font: {
    content: [],
    type: 'dropdown',
  },
  list: {
    content: ['ordered', 'bullet'],
    type: 'button',
  },
  styles: {
    content: ['bold', 'italic', 'underline', 'strike'],
    type: 'item',
  },
  color: {
    content: [],
    type: 'dropdown',
  },
  background: {
    content: [],
    type: 'dropdown',
  },
  script: {
    content: ['sub', 'super'],
    type: 'button',
  },
  align: {
    content: ['', 'center', 'right', 'justify'],
    type: 'button',
  },
  items: {
    content: ['image', 'blockquote', 'code-block'],
    type: 'item',
  },
}
