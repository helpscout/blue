import React, { Component } from 'react'
import Heading from '../../Heading'
import Input from '../../Input'
import Button from '../../Button'
import {
  Wrapper,
  Header,
  FlexContainerForHeadings,
  FlexContainerForForms,
  IconUI,
  FlexHalf,
  FormLabelUI,
  InputWithBorder,
  FlexQuarter,
} from './commonComponents'

export default class TableCustomizer extends Component {
  render() {
    const { numberOfRows, containerWidth, skin, tableWidth } = this.props
    const {
      fontColorHeader,
      fontColorBody,
      fontColorAlternate,
      bgHeader,
      bgColor,
      bgAlternate,
      borderTableBody,
      borderTableHeader,
      borderRows,
      borderColumns,
    } = skin
    const { min, max } = tableWidth

    return (
      <Wrapper className="TableCustomizer">
        <Header style={{ marginBottom: '30px' }}>
          <FlexContainerForHeadings>
            <IconUI name="pencil-small" size="24" shade="faint" />
            <Heading size="h4">Table Options</Heading>
            <Button
              size="sm"
              kind="secondary"
              style={{ margin: '0 20px' }}
              onClick={() => {
                this.handleResetTableClick('default')
              }}
            >
              Load default skin
            </Button>
            <Button
              size="sm"
              kind="secondary"
              style={{ marginRight: '20px' }}
              onClick={() => {
                this.handleResetTableClick('alternative')
              }}
            >
              Load alternative skin
            </Button>
            <Button
              size="sm"
              kind="secondary"
              onClick={() => {
                this.handleResetTableClick('custom')
              }}
            >
              Reset Table
            </Button>
          </FlexContainerForHeadings>
        </Header>
        <FlexContainerForForms>
          <FlexHalf>
            <FormLabelUI label="Number of rows" isInline>
              <Input
                size="sm"
                type="number"
                value={numberOfRows}
                onChange={value => {
                  this.handleValueChange('numberOfRows', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
          <FlexHalf>
            <FormLabelUI
              label="Container Width"
              isInline
              helpText="Change to test the table scrolling"
            >
              <Input
                size="sm"
                value={containerWidth}
                onChange={value => {
                  this.handleValueChange('containerWidth', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
        </FlexContainerForForms>
        <Header>
          <Heading size="h5">Borders</Heading>
        </Header>
        <FlexContainerForForms>
          <FlexHalf>
            <FormLabelUI label="borderTableBody" isInline>
              <InputWithBorder
                size="sm"
                borderStyle={borderTableBody}
                value={borderTableBody}
                onChange={value => {
                  this.handleValueChange('skin.borderTableBody', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
          <FlexHalf>
            <FormLabelUI label="borderTableHeader" isInline>
              <InputWithBorder
                size="sm"
                borderStyle={borderTableHeader}
                value={borderTableHeader}
                onChange={value => {
                  this.handleValueChange('skin.borderTableHeader', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
        </FlexContainerForForms>
        <FlexContainerForForms>
          <FlexHalf>
            <FormLabelUI label="borderRows" isInline>
              <InputWithBorder
                size="sm"
                borderStyle={borderRows}
                value={borderRows}
                onChange={value => {
                  this.handleValueChange('skin.borderRows', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
          <FlexHalf>
            <FormLabelUI label="borderColumns" isInline>
              <InputWithBorder
                size="sm"
                borderStyle={borderColumns}
                value={borderColumns}
                onChange={value => {
                  this.handleValueChange('skin.borderColumns', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
        </FlexContainerForForms>
        <Header>
          <Heading size="h5">Table Width</Heading>
        </Header>
        <FlexContainerForForms>
          <FlexHalf>
            <FormLabelUI label="min" isInline>
              <Input
                size="sm"
                value={min}
                onChange={value => {
                  this.handleValueChange('tableWidth.min', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
          <FlexHalf>
            <FormLabelUI label="max" isInline>
              <Input
                size="sm"
                value={max}
                onChange={value => {
                  this.handleValueChange('tableWidth.max', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
        </FlexContainerForForms>
        <Header>
          <Heading size="h5">Colours</Heading>
        </Header>
        <FlexContainerForForms>
          <FlexQuarter>
            <FormLabelUI label="Background Color" isInline>
              <Input
                style={{ width: '60px' }}
                size="sm"
                value={bgColor}
                type="color"
                onChange={value => {
                  this.handleValueChange('skin.bgColor', value)
                }}
              />
            </FormLabelUI>
          </FlexQuarter>
          <FlexQuarter>
            <FormLabelUI label="Font Color" isInline>
              <Input
                style={{ width: '60px' }}
                size="sm"
                value={fontColorBody}
                type="color"
                onChange={value => {
                  this.handleValueChange('skin.fontColorBody', value)
                }}
              />
            </FormLabelUI>
          </FlexQuarter>
          <FlexQuarter>
            <FormLabelUI label="Background Color Alternate" isInline>
              <Input
                size="sm"
                style={{ width: '60px' }}
                value={bgAlternate}
                type="color"
                onChange={value => {
                  this.handleValueChange('skin.bgAlternate', value)
                }}
              />
            </FormLabelUI>
          </FlexQuarter>
          <FlexQuarter>
            <FormLabelUI label="Font Color Alternate" isInline>
              <Input
                size="sm"
                style={{ width: '60px' }}
                value={fontColorAlternate}
                type="color"
                onChange={value => {
                  this.handleValueChange('skin.fontColorAlternate', value)
                }}
              />
            </FormLabelUI>
          </FlexQuarter>
        </FlexContainerForForms>
        <FlexContainerForForms>
          <FlexHalf>
            <FormLabelUI label="Background Header Color" isInline>
              <Input
                size="sm"
                style={{ width: '60px' }}
                value={bgHeader}
                type="color"
                onChange={value => {
                  this.handleValueChange('skin.bgHeader', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
          <FlexHalf>
            <FormLabelUI label="Font Header Color" isInline>
              <Input
                size="sm"
                style={{ width: '60px' }}
                value={fontColorHeader}
                type="color"
                onChange={value => {
                  this.handleValueChange('skin.fontColorHeader', value)
                }}
              />
            </FormLabelUI>
          </FlexHalf>
        </FlexContainerForForms>
      </Wrapper>
    )
  }

  handleValueChange = (option, value) => {
    const { onChangeTableOption } = this.props

    onChangeTableOption(option, value)
  }

  handleResetTableClick = skin => {
    this.props.resetTable(skin)
  }
}
