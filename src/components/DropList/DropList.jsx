import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react/headless'
import { noop } from '../../utilities/other'
import {
  flattenGroups,
  itemToString,
  isSplitButtonAction,
  isTogglerOfType,
  useWarnings,
} from './DropList.utils'
import {
  Button,
  SelectTag,
  getTogglerPlacementProps,
} from './DropList.togglers'
import Animate from '../Animate'
import Combobox from './DropList.Combobox'
import Select from './DropList.Select'

const VARIANTS = {
  SELECT: 'select',
  COMBOBOX: 'combobox',
}

function DropListManager({
  animateOptions = {},
  autoSetComboboxAt = 0,
  closeOnSelection = true,
  customEmptyList = null,
  initialIsOpen = false,
  initialSelectedItem = null,
  items = [],
  onOpenedStateChange = noop,
  onSelect = noop,
  renderCustomListItem = null,
  tippyOptions = {},
  toggler = {},
  variant = VARIANTS.SELECT,
  withMultipleSelection = false,
}) {
  const parsedItems = flattenGroups(items)
  const [isOpen, setOpenedState] = useState(initialIsOpen)
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem)

  useWarnings({ toggler, withMultipleSelection })

  function onSelectionChange(selection) {
    onSelect(selection)
    setSelectedItem(selection)
  }

  function toggleOpenedState(isOpen) {
    setOpenedState(isOpen)
    onOpenedStateChange(isOpen)
  }

  const animateProps = {
    duration: 200,
    easing: 'ease-in-out',
    sequence: 'fade down',
    ...animateOptions,
    // These shouldn't be overriden
    animateOnMount: true,
    mountOnEnter: false,
    unmountOnExit: false,
  }
  const tippyProps = {
    interactive: true,
    placement: 'bottom-start',
    ...tippyOptions,
  }
  let Toggler

  if (React.isValidElement(toggler)) {
    const { onClick } = toggler.props
    const togglerProps = {
      onClick: () => {
        onClick && onClick()
        toggleOpenedState(!isOpen)
      },
    }

    if (toggler.type === SelectTag) {
      const { text } = toggler.props

      if (text == null) {
        togglerProps.text = itemToString(selectedItem)
      }
    }

    const { placement, offset } = getTogglerPlacementProps(toggler)
    tippyProps.placement = placement
    tippyProps.offset = offset

    Toggler = React.cloneElement(toggler, togglerProps)
  } else {
    Toggler = (
      <Button
        onClick={() => {
          toggleOpenedState(!isOpen)
        }}
        text="Fallback Toggler"
      />
    )
  }

  const DropListVariant =
    variant === VARIANTS.COMBOBOX ||
    (autoSetComboboxAt > 0 && parsedItems.length >= autoSetComboboxAt)
      ? Combobox
      : Select

  return (
    <Tippy
      {...tippyProps}
      visible={isOpen}
      onClickOutside={(instance, { target }) => {
        if (!isSplitButtonAction({ el: target, toggler })) {
          toggleOpenedState(false)
        }
      }}
      onHidden={({ reference }) => {
        reference.focus()
      }}
      render={() => (
        <Animate {...animateProps} in={isOpen}>
          <DropListVariant
            closeOnSelection={closeOnSelection}
            customEmptyList={customEmptyList}
            initialSelectedItem={initialSelectedItem}
            isOpen={isOpen}
            items={parsedItems}
            onSelectionChange={onSelectionChange}
            renderCustomListItem={renderCustomListItem}
            toggleOpenedState={toggleOpenedState}
            withMultipleSelection={
              isTogglerOfType(toggler, SelectTag)
                ? false
                : withMultipleSelection
            }
          />
        </Animate>
      )}
    >
      {Toggler}
    </Tippy>
  )
}

const ItemObjectShape = PropTypes.shape({
  label: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
})

DropListManager.propTypes = {
  /** Props to configure the DropList animation (see HSDS Animate) */
  animateOptions: PropTypes.object,
  /** When the number of items is larger than this number, set the variant to combobox (make the DropList searchable) */
  autoSetComboboxAt: PropTypes.number,
  /** Whether to close the DropList when an item is selected */
  closeOnSelection: PropTypes.bool,
  /** Pass a React Element to render a custom message or style when the List is empty */
  customEmptyList: PropTypes.element,
  /** Should the DropList be open on mount */
  initialIsOpen: PropTypes.bool,
  /** An item or array of items to be selected on initial mount */
  initialSelectedItem: PropTypes.oneOfType([
    PropTypes.string,
    ItemObjectShape,
    PropTypes.arrayOf(ItemObjectShape),
  ]),
  /** The array of items for the DropList */
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(ItemObjectShape),
  ]),
  /** Callback that fires whenever the DropList opens and closes */
  onOpenedStateChange: PropTypes.func,
  /** Callback that fires whenever the selection in the DropList changes */
  onSelect: PropTypes.func,
  /** Render prop that allows you to render a custom List Item */
  renderCustomListItem: PropTypes.func,
  /** Options to configure Tippy (https://atomiks.github.io/tippyjs/v6/all-props/)*/
  tippyOptions: PropTypes.object,
  /** A component to render as the "toggler" or "trigger", a set of built-in options are provided: Button, IconButton, Kebab, SelectTag, SplitButton */
  toggler: PropTypes.element,
  /** The type of DropList, standard ("select") or searchable ("combobox") */
  variant: PropTypes.oneOf(['select', 'Select', 'combobox', 'Combobox']),
  /** Enable multiple selection of items */
  withMultipleSelection: PropTypes.bool,
}

export default DropListManager
