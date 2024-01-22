import React from 'react'
import { useParams, Link } from 'react-router-dom'

const BriefDetail = (props) => { 
    const { id } = useParams()
    console.log(props?.data)

    console.log(props?.data?.Customer?.Name)

    return (
        <div>
            <div className="auto_container">
                <div className="brief_wrap p-10 bg-white border border-solid border-[#EBEBEB] rounded-[10px] mb-10">
                    <h2 className="brief_title text-[36px] font-medium leading-[1.3] mb-10">
                        Бриф {props?.data?.Code}
                    </h2>

                    <div className="brief_box flex items-end justify-between">
                        <div className="brief_info flex">
                            <div className="brief_col mr-[100px]">
                                <div className='flex items-center'>
                                    <h4 className="mb-[15px] text-[16px] font-normal leading-[1.3] text-[#4D4D4D] min-w-[200px] mr-10">
                                        Менеджер
                                    </h4>
                                    <h4 className="mb-[15px] text-[16px] font-normal leading-[1.3] text-[#1A1A1A]">
                                        {props?.data?.Employee?.FirstName + ' ' + props?.data?.Employee?.LastName}
                                    </h4>
                                </div>


                                <div className='flex items-center'>
                                    <h4 className="mb-[15px] text-[16px] font-normal leading-[1.3] text-[#4D4D4D] min-w-[200px] mr-10">
                                        Клиент
                                    </h4>
                                    <h4 className="mb-[15px] text-[16px] font-normal leading-[1.3] text-[#1A1A1A]">
                                        {props?.data?.Customer?.Name || ' '}
                                    </h4>
                                </div>


                                <div className='flex items-center'>
                                    <h4 className="mb-[15px] text-[16px] font-normal leading-[1.3] text-[#4D4D4D] min-w-[200px] mr-10">
                                        Бренд
                                    </h4>
                                    <h4 className="mb-[15px] text-[16px] font-normal leading-[1.3] text-[#1A1A1A]">
                                        {props?.data?.Brand || ' '}
                                    </h4>
                                </div>


                                <div className='flex items-center'>
                                    <h4 className="mb-[15px] text-[16px] font-normal leading-[1.3] text-[#4D4D4D] min-w-[200px] mr-10">
                                        Дизайнер
                                    </h4>
                                    <h4 className="mb-[15px] text-[16px] font-normal leading-[1.3] text-[#1A1A1A]">
                                        Уолтер Уайт
                                    </h4>
                                </div>


                                <div className='flex items-center'>
                                    <h4 className="mb-[15px] text-[16px] font-normal leading-[1.3] text-[#4D4D4D] min-w-[200px] mr-10">
                                        Кто добавил
                                    </h4>
                                    <h4 className="mb-[15px] text-[16px] font-normal leading-[1.3] text-[#1A1A1A]">
                                        Скайлер Уайт
                                    </h4>
                                </div>


                                <div className='flex items-center'>
                                    <h4 className="mb-[15px] text-[16px] font-normal leading-[1.3] text-[#4D4D4D] min-w-[200px] mr-10">
                                        Дата добавления
                                    </h4>
                                    <h4 className="mb-[15px] text-[16px] font-normal leading-[1.3] text-[#1A1A1A]">
                                        {props?.data?.OpenedAt?.slice(0, 10)}
                                    </h4>
                                </div>
                            </div>

                        </div>

                        {/* <button onClick={()=>history.push({pathname:"/fileUpload"})} className='p-[16px] text-white text-[18px] font-regual leading-[1.3] bg-[#333333] cursor-pointer rounded-[10px]'>
                            + Добавить файл
                        </button> */}

                        <Link to={"/fileUpload/"+id} className='p-[16px] text-white text-[18px] font-regual leading-[1.3] bg-[#333333] cursor-pointer rounded-[10px]'>
                            + Добавить файл
                        </Link>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default BriefDetail