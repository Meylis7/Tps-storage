import React, { useEffect, useState } from 'react'

const Pagination = (props) => {
    let array = [];
    for (let i = 1; i <= props?.meta?.last_page; i++) {
        array.push(i);
    }
    const [currentPage, setCurentPage] = useState(props?.meta?.current_page || 1)
    useEffect(() => {
        props?.onChange(currentPage)
    }, [currentPage])
    return (
        <div className='auto_container'>
            <div className='w-full mt-[20px] flex items-center justify-center'>

                <ul className='flex items-center border-[1px] border-solid border-[#EBEBEB] rounded-[5px]'>
                    <li className='block'>
                        <div onClick={() => { currentPage > 1 && setCurentPage(currentPage - 1) }} className='flex items-center justify-center hover:bg-[#EBEBEB] cursor-pointer w-[38px] h-[38px]'>
                            <svg className='block w-full  object-contain' width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.20003 4.00001L4.80003 6.60001C4.92225 6.72223 4.98337 6.87779 4.98337 7.06667C4.98337 7.25556 4.92225 7.41112 4.80003 7.53334C4.67781 7.65556 4.52225 7.71667 4.33337 7.71667C4.14448 7.71667 3.98892 7.65556 3.8667 7.53334L0.800032 4.46667C0.733366 4.40001 0.686255 4.32779 0.658699 4.25001C0.631143 4.17223 0.617144 4.0889 0.616699 4.00001C0.616699 3.91112 0.630699 3.82778 0.658699 3.75001C0.686699 3.67223 0.73381 3.60001 0.800032 3.53334L3.8667 0.466674C3.98892 0.344451 4.14448 0.28334 4.33337 0.28334C4.52225 0.28334 4.67781 0.344451 4.80003 0.466674C4.92225 0.588896 4.98337 0.744452 4.98337 0.93334C4.98337 1.12223 4.92225 1.27779 4.80003 1.40001L2.20003 4.00001Z" fill="#1A1A1A" />
                            </svg>
                        </div>
                    </li>
                    <li className='block'>
                        <div onClick={() => setCurentPage(1)} className={`${currentPage == 1 && "bg-red-600 text-white "} flex items-center justify-center hover:bg-[#EBEBEB] cursor-pointer w-[38px] h-[38px]`}>
                            1
                        </div>
                    </li>
                    {currentPage > 3 && props?.meta?.last_page >= 5 && <li className='block'>
                        <div className={`flex items-center justify-center hover:bg-[#EBEBEB] cursor-pointer w-[38px] h-[38px]`}>
                            ...
                        </div>
                    </li>}


                    {
                        array?.map((item,i) => {
                            return ((item != 1 && item != props?.meta?.last_page) && (Math.abs(currentPage - item) <= 2 || currentPage == item)) && <li key={"pages"+i} className='block'>
                                <div onClick={() => setCurentPage(item)} className={`${currentPage == item && "bg-red-600 text-white "} flex items-center justify-center hover:bg-[#EBEBEB] cursor-pointer w-[38px] h-[38px]`}>
                                    {item}
                                </div>
                            </li>
                        })
                    }

                    {props?.meta?.last_page - currentPage > 3 && props?.meta?.last_page >= 5 && <li className='block'>
                        <div className={`flex items-center justify-center hover:bg-[#EBEBEB] cursor-pointer w-[38px] h-[38px]`}>
                            ...
                        </div>
                    </li>}
                    {props?.meta?.last_page != 1 && <li className='block'>
                        <div onClick={() => setCurentPage(props?.meta?.last_page)} className={`${currentPage == props?.meta?.last_page && "bg-red-600 text-white "} flex items-center justify-center hover:bg-[#EBEBEB] cursor-pointer w-[38px] h-[38px]`}>
                            {props?.meta?.last_page}
                        </div>
                    </li>}

                    <li className='block'>
                        <div onClick={() => { currentPage < props?.meta?.last_page && setCurentPage(currentPage + 1) }} className='flex items-center justify-center hover:bg-[#EBEBEB] cursor-pointer w-[38px] h-[38px]'>
                            <svg className='block w-full object-contain' width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.40003 4.00001L0.800032 1.40001C0.67781 1.27779 0.616699 1.12223 0.616699 0.93334C0.616699 0.744452 0.67781 0.588896 0.800032 0.466674C0.922255 0.344451 1.07781 0.28334 1.2667 0.28334C1.45559 0.28334 1.61114 0.344451 1.73337 0.466674L4.80003 3.53334C4.8667 3.60001 4.91403 3.67223 4.94203 3.75001C4.97003 3.82778 4.98381 3.91112 4.98337 4.00001C4.98337 4.0889 4.96937 4.17223 4.94137 4.25001C4.91337 4.32779 4.86625 4.40001 4.80003 4.46667L1.73337 7.53334C1.61114 7.65556 1.45559 7.71667 1.2667 7.71667C1.07781 7.71667 0.922255 7.65556 0.800032 7.53334C0.67781 7.41112 0.616699 7.25556 0.616699 7.06667C0.616699 6.87779 0.67781 6.72223 0.800032 6.60001L3.40003 4.00001Z" fill="#1A1A1A" />
                            </svg>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Pagination