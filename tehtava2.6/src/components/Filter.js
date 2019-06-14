import React from 'react'

const Filter = (props) => (
    <div>
        filter shown with:
      <input
            value={props.filterName}
            onChange={props.handleFilterNameChange}
        />
    </div>
)

export default Filter