import React, { useState } from 'react'
import HomeRight from '../component/HomeRight'
import HomeLeft from '../component/HomeLeft'
import { Outlet } from 'react-router-dom'

export default function HomePage() {
    const [display, setDisplay] = useState(true);

    const handleDisplay = ()=>{
        setDisplay(!display);
    }

    return (
        <div>
            <main>
                <HomeLeft />
                {display ? <HomeRight handleDisplay={handleDisplay}/> : <Outlet />}
            </main>
        </div>
    )
}
