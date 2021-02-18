import React from 'react'

const Loading = ({ loading }) => {
  if (loading) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  }
  return null
}

export default Loading