# Actions

This component is a presentational wrapper used to render form actions within a [`Page`](./Page.md).

## Example

```jsx
<Page>
  <Page.Card>...</Page.Card>
  <Page.Actions
    primary={<button>Save</button>}
    secondary={<button>Discard Changes</button>}
    serious={<button>Delete Everything</button>}
  />
</Page>
```

## Props

| Prop          | Type       | Description                                                         |
| ------------- | ---------- | ------------------------------------------------------------------- |
| className     | `string`   | Custom class names to be added to the component.                    |
| direction     | `string`   | The alignment of the actions. Default `right`.                      |
| isSticky      | `boolean`  | Stickies the Actions at the bottom of the browser. Default `false`. |
| onStickyStart | `Function` | Callback the moment the component sticks.                           |
| onStickyEnd   | `Function` | Callback the moment the component stops sticking.                   |
| primary       | `any`      | A render slot for the primary action.                               |
| secondary     | `any`      | A render slot for the secondary action.                             |
| serious       | `any`      | A render slot for the serious (probably destructive) action.        |
| zIndex        | `number`   | The CSS `z-index` for when the component is sticky.                 |
