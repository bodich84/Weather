import React from 'react'

const Alert = ({ error, message }) => {
  if (error) {
    return (
      <div className="p-3 mt-3 mb-3 border border-danger text-danger">
        {message}
      </div>
    )
  }
  return null
}

export default Alert