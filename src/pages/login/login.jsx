import React, { useState } from 'react';
import logo from "../../images/logo.png"
import { axiosInstance } from "../../utils/axiosInstance"
import { useHistory } from 'react-router-dom';
const Login = () => {
    const history = useHistory();
    const [type, setType] = useState("password");
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [is_error, setIs_error] = useState(false);
    const userLogin = () => {

        // -------------
        localStorage.setItem("profile", JSON.stringify({token:"dgfdgfdgfdgdgf"}));
        history.push({ pathname: "/" })





        user.username?.length > 0 && user.password?.length > 0 && axiosInstance.post("/api/user/login", {
            username: user.username,
            password: user.password
        }).then((res) => {
            console.log(res.data?.data)
            if (res.data?.data?.token ||true) {
                setIs_error(false)
                localStorage.setItem("profile", JSON.stringify(res.data?.data));
                history.push({ pathname: "/" })
                
            } else {
                console.log(res.data?.message)
                setIs_error(true)
            }

        }).catch((err) => {
            console.log(err);
            setIs_error(true)
        })


    }

    return (
        <section className="login w-full min-h-screen flex items-center justify-center">
            <div className="login_wrap w-full">
                <div className="login_form w-[calc(100%-100px)] max-w-[340px] p-10 m-auto bg-white block">
                    <div className="logo w-full h-[56px] mb-10 ">
                        <img src={logo} alt="logo" className='block w-full h-full object-contain' />
                    </div>

                    <h2 className="login_title text-[28px] font-medium leading-[1.3] mb-5 ">
                        Авторизация
                    </h2>

                    <div className="login_input w-full mb-5">
                        <label htmlFor="login_name" className='text-[16px] font-normal block mb-[10px] '>Логин</label>
                        <input onChange={(e) => setUser({ ...user, username: e.target.value })} value={user.username} id="login_name" placeholder="Введите свой логин" className='p-4 text-[14px] font-normal leading-[1.3] text-black border border-solid border-[#EBEBEB] rounded-[5px] w-full placeholder:[#808080]' />
                    </div>

                    <div className="login_input w-full mb-5">
                        <label htmlFor="password" className='text-[16px] font-normal block mb-[10px] '>Пароль</label>
                        <input type={type} id="password" onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password} placeholder="Введите свой пароль" className='p-4 text-[14px] font-normal leading-[1.3] text-black border border-solid border-[#EBEBEB] rounded-[5px] w-full placeholder:[#808080]' />

                    </div>
                    {
                        is_error && <div>
                            Error
                        </div>
                    }

                    <button onClick={() => userLogin()} type="submit" className="login_btn w-full block text-[18px] font-normal leadeing-[1.3] p-4 rounded-[10px] bg-[#333333] text-white cursor-pointer">
                        Войти
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Login;