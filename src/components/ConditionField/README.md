# ConditionField

A ConditionField is a single item that renders within a [Condition](../Condition). It's values are represented by a collection of Form elements such as [Inputs](../Input) and [Selects](../Select).

## Example

```jsx
<Condition>
  <ConditionField>
    <ConditionField.Item>
      <ConditionField.Static>
        Show After
      </ConditionField.Static>
    </ConditionField.Item>
    <ConditionField.Block>
      <Input inputType="number" width={70} value={...} />
    </ConditionField.Block>
  </ConditionField>
  ...
  <ConditionField>...</ConditionField>
</Condition>
```

## Props

| Prop            | Type       | Default    | Description                                                                           |
| --------------- | ---------- | ---------- | ------------------------------------------------------------------------------------- |
| className       | `string`   |            | The className of the component.                                                       |
| closeIcon       | `string`   | `collapse` | The [Icon](../Icon) to render.                                                        |
| ref             | `Function` |            | Retrieve the inner DOM node.                                                          |
| isWithRemove    | `boolean`  | `true`     | Whether to show the remove button or not.                                             |
| onRemove        | `Function` |            | Callback when the remove [IconButton](../IconButton) is clicked.                      |
| removeTitle     | `string`   |            | Title to show in the [Tooltip](../Tooltip) on the remove [IconButton](../IconButton). |
| tooltipDelay    | `string`   |            | Delay before the [Tooltip](../Tooltip) renders, on hover.                             |
| tooltipDuration | `string`   |            | Animation duration when the [Tooltip](../Tooltip) renders, on hover.                  |

---

# ConditionField.Group

A ConditionField.Group contains children ConditionField components, and automatically renders a [Condition.Operator](../Condition) between each ConditionField.

## Example

```jsx
<ConditionField.Group>
  <ConditionField>...</ConditionField>
  <ConditionField>...</ConditionField>
  <ConditionField>...</ConditionField>
</ConditionField.Group>
```

## Props

| Prop         | Type       | Default | Description                                                             |
| ------------ | ---------- | ------- | ----------------------------------------------------------------------- |
| className    | `string`   |         | The className of the component.                                         |
| ref          | `Function` |         | Retrieve the inner DOM node.                                            |
| isAddEnabled | `boolean`  | `true`  | Renders an inner [Condition.AddButton](../Condition).                   |
| onAdd        | `Function` |         | Callback when the inner [Condition.AddButton](../Condition) is clicked. |

---

# ConditionField.Item

A ConditionField.Item is used to render the layout of the ConditionField. This component is an alias for [Flexy.Item](../Flexy).

## Example

```jsx
<ConditionField>
  <ConditionField.Item>...</ConditionField.Item>
</ConditionField>
```

# ConditionField.Block

A ConditionField.Block is used to render the layout of the ConditionField. This component is an alias for [Flexy.Block](../Flexy).

## Example

```jsx
<ConditionField>
  <ConditionField.Block>...</ConditionField.Block>
</ConditionField>
```

# Condition.Static

A ConditionField.Static is used to render text next to components like [Inputs](../Input) or [Selects](../Select). This component is an enhanced variant of [Input.Static](../Input).

## Example

```jsx
<ConditionField>
  <ConditionField.Item>
    <Input />
  </ConditionField.Item>
  <ConditionField.Static>...</ConditionField.Static>
</ConditionField>
```

---

# ConditionField.AddButton

A ConditionFiekd.AddButton renders an "And" or "Or" interface. It is an action used to add [Conditions](../Condition) or ConditionFields. This component is used internally by [Conditions](../Condition) and ConditionFields.

## Props

| Prop              | Type       | Default | Description                                        |
| ----------------- | ---------- | ------- | -------------------------------------------------- |
| animationDuration | `number`   | `250`   | Time (ms) it takes to animate on mount/unmount.    |
| animationEasing   | `string`   | `250`   | Time (ms) it takes to animate on mount/unmount.    |
| className         | `string`   |         | The className of the component.                    |
| ref               | `Function` |         | Retrieve the inner DOM node.                       |
| isBorderless      | `boolean`  | `true`  | Renders a white border.                            |
| onClick           | `Function` |         | Callback when component is clicked.                |
| scrollDuration    | `number`   | `300`   | Time (ms) it takes to scroll into view.            |
| scrollOffset      | `number`   | `200`   | Amount (px) used to calculate scrolling into view. |
| type              | `string`   | `or`    | The operator. (`and`/`or`)                         |
