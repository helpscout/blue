import { createActionTypes } from '../../../utilities/actions'

const actionTypes = [
  'CLOSE_DROPDOWN',
  'FOCUS_ITEM',
  'MENU_MOUNT',
  'MENU_UNMOUNT',
  'OPEN_DROPDOWN',
  'SELECT_ITEM',
  'SET_MENU_NODE',
  'SET_TRIGGER_NODE',
  'UPDATE_INDEX',
  'UPDATE_INPUT_VALUE',
  'UPDATE_ITEMS',
  'UPDATE_OPEN',
]

export default createActionTypes(actionTypes, '@@HSDS/DROPDOWN')
