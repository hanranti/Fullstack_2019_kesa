import React from 'react'

const Filter = (props) => (
    <div>
        <input
            value={props.countrySearch}
            onChange={props.handleFilterChange}
        />
    </div>
)

export default Filter
