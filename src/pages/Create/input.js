import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

const Input = ({ name, ...rest }) => {
  const inputRef = useRef(null)
  const { fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: (ref) => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', maxWidth: '200px' }}
    >
      <input
        name={name}
        ref={inputRef}
        type='text'
        placeholder='Type your username'
        {...rest}
      />
      {error && (
        <span style={{ color: '#f00', fontSize: '12px', paddingLeft: '5px' }}>
          {error}
        </span>
      )}
    </div>
  )
}
export default Input
