import React from 'react'
import { SubheadingUI } from './Accordion.css'

export default ({ children }) => (
  <SubheadingUI
    truncate
    weight={400}
    size={13}
    className="c-Accordion__Subheading"
  >
    {children}
  </SubheadingUI>
)
