# Input

An Input component is an enhanced version of the default HTML `<input>`. Input can be transformed into a `<textarea>` if the `multiline` prop is defined.

## Example

### Input

```jsx
<Input
  value="Stay classy San Diego"
  placeholder="Please enter sign-off catch-phrase"
  autoFocus
/>
```

### Textarea

```jsx
<Input
  multiline={3}
  placeholder="Please enter sign-off catch-phrase."
  autoFocus
/>
```

## Props

| Prop                     | Type                 | Description                                                                |
| ------------------------ | -------------------- | -------------------------------------------------------------------------- |
| autoFocus                | `bool`               | Automatically focuses the input.                                           |
| className                | `string`             | Custom class names to be added to the component.                           |
| disabled                 | `bool`               | Disable the input.                                                         |
| errorIcon                | `string`             | Icon that renders when the state is `error`.                               |
| errorMessage             | `string`             | Error message that renders into a Tooltip.                                 |
| forceAutoFocusTimeout    | `bool`               | Determines the amount of time (`ms`) for the component to focus on mount.  |
| helpText                 | `string`/`component` | Displays text underneath input.                                            |
| hintText                 | `string`/`component` | Displays text above input.                                                 |
| id                       | `string`             | ID for the input.                                                          |
| inlinePrefix             | `string`             | Text to appear before the input.                                           |
| inlineSuffix             | `string`             | Text to after before the input.                                            |
| isFirst                  | `boolean`            | Helps render component without right borders.                              |
| isFocused                | `string`             | Determines if the component is focused.                                    |
| isLast                   | `boolean`            | Helps render component without left borders.                               |
| isNotOnly                | `boolean`            | Helps render component without left/right borders.                         |
| label                    | `string`/`component` | Label for the input.                                                       |
| maxHeight                | `number`/`string`    | Sets the `max-height` for the input. Used with `multiline`.                |
| moveCursorToEnd          | `boolean`            | Moves the selection cursor to the end, on focus. Default `false`.          |
| multiline                | `bool`/`number`      | Transforms input into an auto-expanding textarea.                          |
| name                     | `string`             | Name for the input.                                                        |
| offsetAmount             | `number`             | Number of characters to offset (bottom-right) for multiline resizing.      |
| onBlur                   | `function`           | Callback when input is blurred.                                            |
| onChange                 | `function`           | Callback when input value is changed.                                      |
| onFocus                  | `function`           | Callback when input is focused.                                            |
| onResize                 | `function`           | Callback when input is resized.                                            |
| onStartTyping            | `function`           | Callback when user starts typing, rate limited by `typingThrottleInterval` |
| onStopTyping             | `function`           | Callback when user stops typing after delay of `typingTimeoutDelay`.       |
| placeholder              | `string`             | Placeholder text for the input.                                            |
| prefix                   | `any`                | Component to render before the input.                                      |
| readOnly                 | `bool`               | Disable editing of the input.                                              |
| refApplyCallStopTyping   | `function`           | Exposes `CallStopTyping`, so that it can be called outside itself.         |
| removeStateStylesOnFocus | `bool`               | Removes the `state` styles on input focus. Default `false`.                |
| resizable                | `bool`               | Enables resizing for the textarea (only enabled for `multiline`).          |
| scrollLock               | `bool`               | Enables scrollLock for component. Default `false`.                         |
| seamless                 | `bool`               | Removes the border around the input.                                       |
| size                     | `string`             | Determines the size of the input.                                          |
| state                    | `string`             | Change input to state color.                                               |
| suffix                   | `any`                | Component to render after the input.                                       |
| type                     | `string`             | Determines the input type.                                                 |
| typingThrottleInterval   | `number`             | Determines the rate limiting interval for firing `onStartTyping`.          |
| typingTimeoutDelay       | `number`             | Determines the delay of when `onStopTyping` fires after typing stops.      |
| value                    | `string`             | Initial value of the input.                                                |
| withTypingEvent          | `bool`               | Enables typing `onStartTyping` and `onStopTyping` event callbacks.         |

### States

| Prop      | Description              |
| --------- | ------------------------ |
| `error`   | Changes color to red.    |
| `success` | Changes color to green.  |
| `warning` | Changes color to yellow. |
