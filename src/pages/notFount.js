import React from "react";
import "./notFound.css"
import { useHistory, Link } from 'react-router-dom'


const NotFount = () => {
    const history = useHistory()


    return <div>
        <div id="main">
            <div class="fof">
                <h1>Error 404</h1>

                <Link to="/" className="logo w-[160px] m-auto mt-5 bg-black text-white p-4 rounded block cursor-pointer border-[1px] border-solid border-black transition hover:bg-transparent hover:text-black">
                    Go Home
                </Link>
            </div>
        </div>
    </div>
}

export default NotFount