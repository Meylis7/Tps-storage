import React from 'react'
import logo from "../../images/logo.png"

const login = () => {
    return (
        <section className="login w-full min-h-screen flex items-center justify-center">
            <div className="login_wrap w-full">
                <form action="#" className="login_form w-[calc(100%-100px)] max-w-[340px] p-10 m-auto bg-white block">
                    <div className="logo w-full h-[56px] mb-10 ">
                        <img src={logo} alt="logo" className='block w-full h-full object-contain' />
                    </div>

                    <h2 className="login_title text-[28px] font-medium leading-[1.3] mb-5 ">
                        Авторизация
                    </h2>

                    <div className="login_input w-full mb-5">
                        <label for="login_name" className='text-[16px] font-normal block mb-[10px] '>Логин</label>
                        <input id="login_name" placeholder="Введите свой логин" className='p-4 text-[14px] font-normal leading-[1.3] text-black border border-solid border-[#EBEBEB] rounded-[5px] w-full placeholder:[#808080]'/>
                    </div>

                    <div className="login_input w-full mb-5">
                        <label for="password" className='text-[16px] font-normal block mb-[10px] '>Пароль</label>
                        <input id="password" placeholder="Введите свой пароль" className='p-4 text-[14px] font-normal leading-[1.3] text-black border border-solid border-[#EBEBEB] rounded-[5px] w-full placeholder:[#808080]' />
                    </div>

                    <button type="submit" className="login_btn w-full block text-[18px] font-normal leadeing-[1.3] p-4 rounded-[10px] bg-[#333333] text-white cursor-pointer">
                        Войти
                    </button>
                </form>
            </div>
        </section>
    )
}

export default login