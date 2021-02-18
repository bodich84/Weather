import React from 'react'

const Form = ({ newCity, changeCity, inputCity }) => {
  return (
    <form onSubmit={changeCity}>
      <input type="text"
        name="city"
        placeholder="виберіть місто"
        className="form-control text-center"
        value={newCity}
        onChange={inputCity}
      />
      <button type="submit" className="btn btn-primary mt-3">Змінити місто</button>
    </form>
  )
}

export default Form