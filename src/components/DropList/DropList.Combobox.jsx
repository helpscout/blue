import React, { useState, useRef, useEffect } from 'react'
import { useCombobox } from 'downshift'
import { noop } from '../../utilities/other'
import { isFunction } from '../../utilities/is'
import {
  itemToString,
  isItemSelected,
  renderListContents,
} from './DropList.utils'
import {
  getA11ySelectionMessageCommon,
  onIsOpenChangeCommon,
  onStateChangeCommon,
  stateReducerCommon,
} from './DropList.downshift.common'
import {
  DropListWrapperUI,
  InputSearchHolderUI,
  MenuListUI,
} from './DropList.css'
import ListItem, { generateListItemKey } from './DropList.ListItem'

function Combobox({
  closeOnSelection = true,
  customEmptyList = null,
  initialSelectedItem,
  isOpen = false,
  items = [],
  onSelectionChange = noop,
  renderCustomListItem = null,
  toggleOpenedState = noop,
  withMultipleSelection = false,
}) {
  const initialSelectedItemsArr =
    withMultipleSelection && initialSelectedItem != null
      ? [].concat(initialSelectedItem)
      : []

  const [inputItems, setInputItems] = useState(items)
  const [selectedItems, setSelectedItems] = useState(initialSelectedItemsArr)
  const inputEl = useRef(null)

  const {
    getComboboxProps,
    getInputProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    inputValue,
    selectItem,
    selectedItem,
  } = useCombobox({
    initialInputValue: '',
    initialIsOpen: isOpen,
    initialSelectedItem,
    isOpen,
    items: inputItems,
    itemToString,

    getA11ySelectionMessage: ({ selectedItem }) => {
      return getA11ySelectionMessageCommon({
        selectedItem,
        selectedItems,
        withMultipleSelection,
      })
    },

    onInputValueChange({ inputValue }) {
      setInputItems(
        items.filter(item =>
          itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },

    onIsOpenChange(changes) {
      onIsOpenChangeCommon({
        changes,
        closeOnSelection,
        toggleOpenedState,
      })
    },

    onStateChange(changes) {
      onStateChangeCommon({
        changes,
        withMultipleSelection,
        onSelectionChange,
        selectItem,
        selectedItems,
        setSelectedItems,
      })
    },

    stateReducer(state, actionAndChanges) {
      return stateReducerCommon({
        state,
        actionAndChanges,
        withMultipleSelection,
        closeOnSelection,
        selectedItems,
      })
    },
  })

  useEffect(() => {
    isOpen && inputEl.current.focus()
  }, [isOpen])

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
    }

    if (renderCustomListItem != null && isFunction(renderCustomListItem)) {
      return renderCustomListItem({ ...itemProps, getItemProps })
    }

    return <ListItem {...itemProps} {...getItemProps({ item, index })} />
  }

  return (
    <DropListWrapperUI {...getComboboxProps()}>
      <InputSearchHolderUI
        style={{ display: items.length === 0 ? 'none' : 'block' }}
      >
        <input {...getInputProps({ ref: inputEl })} placeholder="Search" />
      </InputSearchHolderUI>
      <MenuListUI className="MenuList MenuList-Combobox" {...getMenuProps()}>
        {renderListContents({
          customEmptyList,
          emptyList: items.length === 0,
          inputValue,
          items: inputItems,
          renderListItem,
        })}
      </MenuListUI>
    </DropListWrapperUI>
  )
}

export default Combobox
