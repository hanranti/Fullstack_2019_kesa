import React from 'react'

const Notification = ({ notificationMessage, className }) => (
    <div className={"notification " + className}>
        <h3>{notificationMessage}</h3>
    </div >
)

export default Notification