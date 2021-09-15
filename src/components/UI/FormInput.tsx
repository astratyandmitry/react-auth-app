import React, { useEffect, useRef, useState } from 'react'

interface FormInputProps {
  id: string;
  label: string;
  dataType: string;
  value?: any;
  isValid: boolean | null;

  onChange (e: React.ChangeEvent<HTMLInputElement>): void;

  onBlur (e: React.FocusEvent<HTMLInputElement>): void;
}

function FormInput ({ id, label, dataType = 'text', value, isValid, onChange, onBlur }: FormInputProps) {
  const [hasErrors, setHasErrors] = useState(false)
  const notInitialRender = useRef(false)

  useEffect(() => {
    console.log('start')
    if (notInitialRender.current) {
      setHasErrors(!isValid)
    } else {
      notInitialRender.current = true
    }
  }, [isValid])

  return (
    <div>
      <label
        className={`block text-xs font-medium uppercase mb-1 ${hasErrors ? 'text-red-500' : 'text-gray-400'}`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`text-sm border p-3 rounded block w-full ${hasErrors ? 'bg-red-50 border-red-200' : 'bg-gray-50'}`}
        id={id} type={dataType} name={id} value={value} onChange={onChange} onBlur={onBlur}
      />
    </div>
  )
}

export default FormInput
