import React from 'react'
import ScopeProvider from '../ScopeProvider'
import GlobalStyle from './GlobalStyle'

const Provider = props => {
  const { scope = 'hsds-react' } = props
  return (
    <>
      <GlobalStyle scope={`.${scope}`} />
      <div class={scope}>
        <ScopeProvider scope={`.${scope}`}>{props.children}</ScopeProvider>
      </div>
    </>
  )
}

export default Provider
