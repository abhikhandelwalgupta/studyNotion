import React from 'react'

export const HightlightText = (props) => {
  const color = (props.color) ? props.color : "gradient-text"
  return (
    <span className= { `font-bold ${color}`}  >{`   ${props.text}`}</span>
  )
}
