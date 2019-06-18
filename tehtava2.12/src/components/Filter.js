import React from 'react'

const Filter = (props) => (<div>
    <input
        value={props.countrySearch}
        onChange={props.handleCountrySearchChange}
    />>
</div>)

export default Filter