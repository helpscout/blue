import React, { useState } from 'react'
import { useSelect } from 'downshift'
import { noop } from '../../utilities/other'
import {
  itemToString,
  isItemSelected,
  renderListContents,
  setInitialSelection,
} from './DropList.utils'
import {
  getA11ySelectionMessageCommon,
  onIsOpenChangeCommon,
  onStateChangeCommon,
  stateReducerCommon,
} from './DropList.downshift.common'
import { A11yTogglerUI, DropListWrapperUI, MenuListUI } from './DropList.css'
import ListItem, { generateListItemKey } from './DropList.ListItem'
import { VARIANTS } from './DropList.constants'

function Select({
  closeOnSelection = true,
  'data-cy': dataCy = `DropList.${VARIANTS.SELECT}`,
  initialSelectedItem,
  customEmptyList = null,
  isOpen = false,
  items = [],
  onSelectionChange = noop,
  renderCustomListItem = null,
  toggleOpenedState = noop,
  withMultipleSelection = false,
}) {
  const initialSelectedItemsArr = setInitialSelection({
    initialSelectedItem,
    withMultipleSelection,
  })
  const [selectedItems, setSelectedItems] = useState(initialSelectedItemsArr)

  const {
    getToggleButtonProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    selectItem,
    selectedItem,
  } = useSelect({
    initialIsOpen: isOpen,
    isOpen,
    items,
    itemToString,

    getA11ySelectionMessage: ({ selectedItem }) => {
      return getA11ySelectionMessageCommon({
        selectedItem,
        selectedItems,
        withMultipleSelection,
      })
    },

    onIsOpenChange(changes) {
      onIsOpenChangeCommon({
        closeOnSelection,
        toggleOpenedState,
        type: `${VARIANTS.SELECT}.${changes.type}`,
      })
    },

    onStateChange(changes) {
      onStateChangeCommon({
        changes,
        onSelectionChange,
        selectItem,
        selectedItems,
        setSelectedItems,
        type: `${VARIANTS.SELECT}.${changes.type}`,
        withMultipleSelection,
      })
    },

    stateReducer(state, actionAndChanges) {
      const { changes, type } = actionAndChanges

      return stateReducerCommon({
        changes,
        closeOnSelection,
        selectedItems,
        state,
        type: `${VARIANTS.SELECT}.${type}`,
        withMultipleSelection,
      })
    },
  })

  function renderListItem(item, index) {
    const itemProps = {
      highlightedIndex,
      index,
      isSelected: isItemSelected({
        item,
        selectedItem,
        selectedItems,
      }),
      item,
      key: generateListItemKey(item, index),
      withMultipleSelection,
      renderCustomListItem,
      ...getItemProps({ item, index }),
    }

    return <ListItem {...itemProps} />
  }

  return (
    <DropListWrapperUI className="DropList DropList__Select" data-cy={dataCy}>
      <A11yTogglerUI {...getToggleButtonProps()}>Toggler</A11yTogglerUI>
      <MenuListUI {...getMenuProps()}>
        {renderListContents({
          customEmptyList,
          emptyList: items.length === 0,
          items,
          renderListItem,
        })}
      </MenuListUI>
    </DropListWrapperUI>
  )
}

export default Select
