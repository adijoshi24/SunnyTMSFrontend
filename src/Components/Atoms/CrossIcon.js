import React from 'react'
import { ImCross } from 'react-icons/im'

const CrossIcon = ({ style = {} }) => {
    return (
        <ImCross className='crossIcon' style={{ color: '#F5292F', ...style }} />
    )
}

export default CrossIcon