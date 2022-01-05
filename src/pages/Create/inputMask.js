import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import ReactInputMask from 'react-input-mask'

const InputMask = ({ name, ...rest }) => {
  const inputRef = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue(value)
      },
      clearValue(ref) {
        ref.setInputValue('')
      },
    })
  }, [fieldName, registerField])

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', maxWidth: '200px' }}
    >
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && (
        <span style={{ color: '#f00', fontSize: '12px', paddingLeft: '5px' }}>
          {error}
        </span>
      )}
    </div>
  )
}
export default InputMask
