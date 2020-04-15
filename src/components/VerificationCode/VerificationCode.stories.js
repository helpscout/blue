import React, { useState } from 'react'
import VerificationCode from './'

export default {
  component: VerificationCode,
  title: 'Components/Forms/VerificationCode',
}

export const Default = () => {
  return <VerificationCode />
}

Default.story = {
  name: 'default',
}

export const Invalid = () => {
  return (
    <VerificationCode
      isValid={false}
      onChange={val => {
        console.log(val)
      }}
    />
  )
}

Invalid.story = {
  name: 'invalid',
}

export const AutoFocus = () => {
  return (
    <VerificationCode
      autoFocus={true}
      onChange={val => {
        console.log(val)
      }}
    />
  )
}

AutoFocus.story = {
  name: 'autofocus',
}

export const AutoFocusWithCode = () => {
  return (
    <VerificationCode
      autoFocus={true}
      code="002006"
      onChange={val => {
        console.log(val)
      }}
    />
  )
}

AutoFocusWithCode.story = {
  name: 'autofocus with code',
}

export const AutoFocusWithHalfCode = () => {
  return (
    <div>
      <VerificationCode
        autoFocus={true}
        code="002"
        onChange={val => {
          console.log(val)
        }}
      />
      <p>test</p>
    </div>
  )
}

AutoFocusWithHalfCode.story = {
  name: 'autofocus with half code',
}

export const AutoSubmit = () => {
  const [code, setCode] = useState()
  return (
    <div>
      <VerificationCode
        autoFocus={true}
        autoSubmit={true}
        onChange={val => {
          console.log(val)
        }}
        onEnter={val => {
          setCode(val)
        }}
      />
      <p>
        Submitted code: <b>{code}</b>
      </p>
    </div>
  )
}

AutoSubmit.story = {
  name: 'autoSubmit',
}
