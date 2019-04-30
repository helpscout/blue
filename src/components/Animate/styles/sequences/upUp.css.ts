const css = `
&.ax-upUp {
  transform: translateY(12px);

  &.ax-entered {
    transform: translateY(0);
  }
  &.ax-exiting {
    transform: translateY(-12px);
  }
  &.ax-exited {
    transform: translateY(-12px);
  }
}
`

export default css
