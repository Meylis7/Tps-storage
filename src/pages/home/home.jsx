import React, { useEffect, useState } from "react";
import Table from "./table";
import search from "../../images/search.svg"
import Select from "../../components/select";
import { useHistory } from "react-router-dom";
const Home = () => {
    const history = useHistory()
    const [is_clear, setIs_clear] = useState(false);
    const [filtersData, setFiltersData] = useState({
        year: { defOpt: "Year", options: ["2023", "2022", "2021"] },
        client: { defOpt: "Client", options: ["Wekil", "Meylis", "Kakajan"] },
        filter: { defOpt: "Filter", options: ["2023", "2022", "2021"] },
        manager: { defOpt: "Manager", options: ["Durdy", "Myrat", "Zair"] },
    })
    const [filter, setFilter] = useState({ year: "", client: "", manager: "", filter: "" });
    useEffect(() => {
        console.log(filter)
        setIs_clear(false)
    }, [filter])

    const cleraFilter = () => {
        setFilter({ year: "", client: "", manager: "", filter: "" })
    }


    return <div className="w-full p-10 bg-white rounded-[10px]">
        <div className="w-full">
            <h1 className="text-[#1A1A1A] font-[500] text-[36px] text-left">Брифы</h1>
            <div className="w-full my-10 rounded-[10px] border-[1px] border-[#808080] shadow-md px-5 gap-3 flex justify-between items-center">
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 13C4.68333 13 3.146 12.3707 1.888 11.112C0.63 9.85333 0.000666667 8.316 0 6.5C0 4.68333 0.629333 3.146 1.888 1.888C3.14667 0.63 4.684 0.000666667 6.5 0C8.31667 0 9.854 0.629333 11.112 1.888C12.37 3.14667 12.9993 4.684 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L17.3 15.9C17.4833 16.0833 17.575 16.3167 17.575 16.6C17.575 16.8833 17.4833 17.1167 17.3 17.3C17.1167 17.4833 16.8833 17.575 16.6 17.575C16.3167 17.575 16.0833 17.4833 15.9 17.3L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13ZM6.5 11C7.75 11 8.81267 10.5623 9.688 9.687C10.5633 8.81167 11.0007 7.74933 11 6.5C11 5.25 10.5623 4.18733 9.687 3.312C8.81167 2.43667 7.74933 1.99933 6.5 2C5.25 2 4.18733 2.43767 3.312 3.313C2.43667 4.18833 1.99933 5.25067 2 6.5C2 7.75 2.43767 8.81267 3.313 9.688C4.18833 10.5633 5.25067 11.0007 6.5 11Z" fill="#808080" />
                </svg>
                <input className="w-full text-[#000] text-[16px] font-[400] py-3 bg-transparent .placeholder-{#808080} outline-none rounded-[10px]" type="text" placeholder="Введите номер брифа. Например «Бриф 129», «129», «Бриф №129», «Бриф #129» без кавычек" />
            </div>
            <div className="flex w-full gap-4 justify-start">
                <Select value={filter?.year} onChange={(value) => setFilter({ ...filter, year: value })} defOpt={filtersData.year.defOpt} options={filtersData.year.options} />
                <Select value={filter.client} onChange={(value) => setFilter({ ...filter, client: value })} defOpt={filtersData.client.defOpt} options={filtersData.client.options} />
                <Select value={filter.manager} onChange={(value) => setFilter({ ...filter, manager: value })} defOpt={filtersData.manager.defOpt} options={filtersData.manager.options} />
                <Select value={filter.filter} onChange={(value) => setFilter({ ...filter, filter: value })} defOpt={filtersData.filter.defOpt} options={filtersData.filter.options} />
            </div>
            <div>
                <button onClick={() => cleraFilter()}>clear</button>
            </div>
        </div>

        <Table />
    </div>
}

export default Home