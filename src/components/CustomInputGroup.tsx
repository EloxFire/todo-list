import React from 'react'
import '../styles/components/customInputGroup.scss'

interface CustomInputGroupProps {
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomInputGroup: React.FC<CustomInputGroupProps> = (props) => {

  const { label, type, placeholder, value, onChange } = props

  return (
    <div className="input-group">
      <label htmlFor={`input-${type}-${label}`}>{label}</label>
      <input onChange={() => onChange} value={value} id={`input-${type}-${label}`} type={type} placeholder={placeholder} />
    </div>
  )
}

export default CustomInputGroup