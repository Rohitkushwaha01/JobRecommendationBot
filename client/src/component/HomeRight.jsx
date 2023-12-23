import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

export default function HomeRight({handleDisplay}) {
    return (
        <div className="right">
            <p>Get Started</p>
            <div className="btn">
                <Link to="/login" className='btn-link' onClick={handleDisplay}>
                    <Button msg={"Login"}/>
                </Link>
                <Link to="/signup" onClick={handleDisplay}>
                    <Button msg={"Sign up"} />
                </Link>
            </div>
        </div>
    )
}
