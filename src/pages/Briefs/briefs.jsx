import React, { useEffect, useState } from 'react';
import Table from './table';
import Select from '../../components/select';
import { axiosInstance } from '../../utils/axiosInstance';
import Pagination from '../../components/pagination';
import Loading from '../../components/loading';

const Briefs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [briefs, setBriefs] = useState([]);
  const [metaBrief, setMetaBrief] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState();
  let years = [];
  const date = new Date();
  const year = date.getFullYear();
  let year2021 = 2022;

  while (year2021 <= year) {
    years.push({ Name: year2021, Oid: year2021 });
    year2021 = +year2021 + 1;
  }

  const [filtersData, setFiltersData] = useState({
    year: { defOpt: 'Год', options: years },
    client: { defOpt: 'Клиент', options: [] },
  });

  const [managersData, setManagersData] = useState({
    manager: { defOpt: 'Менеджер', options: [] },
  });

  const [filter, setFilter] = useState({ year: '', client: '', manager: '', filter: '' });
  useEffect(() => {
    console.log(filter);
  }, [filter]);

  const cleraFilter = async () => {
    setFilter({ year: '', client: '', manager: '', filter: '' });
    setIsLoading(true);
    axiosInstance
      .post('/api/briefs?limit=' + limit + '&page=' + page, {})
      .then((res) => {
        console.log(res.data?.data);
        setBriefs(res.data?.data);
        setMetaBrief(res.data?.meta);
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getEmployees();
    getManagers();
  }, []);

  useEffect(() => {
    getData();
  }, [page, limit]);
  useEffect(() => console.log(filtersData), [filtersData]);

  const getData = () => {
    setIsLoading(true);
    axiosInstance
      .post(
        '/api/briefs?limit=' +
          limit +
          '&page=' +
          page +
          (filter?.year ? '&year=' + +filter?.year : '') +
          (filter?.client ? '&customer=' + filter?.client : '') +
          (filter?.manager ? '&employee=' + filter?.manager : '') +
          (searchValue.length !== 0 ? `&code=${searchValue}` : ''),
        {},
      )
      .then((res) => {
        console.log(res.data?.data);
        setIsLoading(false);
        setBriefs(res.data?.data);
        setMetaBrief(res.data?.meta);
        console.log('briefs', briefs);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const getEmployees = () => {
    axiosInstance
      .post('/api/employees', {})
      .then(async (res) => {
        let array = [];
        await res.data.data?.map((item) => {
          let obj = { Oid: item?.Oid, Name: item?.FirstName + ' ' + item?.LastName };
          array.push(obj);
        });
        let data = { defOpt: 'Менеджер', options: array };
        setManagersData({ ...managersData, manager: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getManagers = () => {
    axiosInstance
      .post('/api/customers', {})
      .then((res) => {
        let data = { defOpt: 'Клиент', options: res.data.data };
        setFiltersData({ ...filtersData, client: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full my-10">
      <div className="auto_container">
        <div className="bg-white p-10 border-[1px] border-solid border-[#EBEBEB] rounded-[10px]">
          <h1 className="text-[#1A1A1A] font-[500] text-[36px] text-left">Брифы</h1>
          <div className="w-full my-10 rounded-[10px] border-[1px] border-[#808080] shadow-md px-5 gap-3 flex justify-between items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.5 13C4.68333 13 3.146 12.3707 1.888 11.112C0.63 9.85333 0.000666667 8.316 0 6.5C0 4.68333 0.629333 3.146 1.888 1.888C3.14667 0.63 4.684 0.000666667 6.5 0C8.31667 0 9.854 0.629333 11.112 1.888C12.37 3.14667 12.9993 4.684 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L17.3 15.9C17.4833 16.0833 17.575 16.3167 17.575 16.6C17.575 16.8833 17.4833 17.1167 17.3 17.3C17.1167 17.4833 16.8833 17.575 16.6 17.575C16.3167 17.575 16.0833 17.4833 15.9 17.3L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13ZM6.5 11C7.75 11 8.81267 10.5623 9.688 9.687C10.5633 8.81167 11.0007 7.74933 11 6.5C11 5.25 10.5623 4.18733 9.687 3.312C8.81167 2.43667 7.74933 1.99933 6.5 2C5.25 2 4.18733 2.43767 3.312 3.313C2.43667 4.18833 1.99933 5.25067 2 6.5C2 7.75 2.43767 8.81267 3.313 9.688C4.18833 10.5633 5.25067 11.0007 6.5 11Z"
                fill="#808080"
              />
            </svg>
            <input
              className="w-full text-[#000] text-[16px] font-[400] py-3 bg-transparent .placeholder-{#808080} outline-none rounded-[10px]"
              type="text"
              placeholder="Введите номер брифа. Например «Бриф 129», «129», «Бриф №129», «Бриф #129» без кавычек"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex w-full gap-4 justify-start">
              <Select
                value={filter?.year}
                onChange={(value) => setFilter({ ...filter, year: value?.Name })}
                defOpt={filtersData.year.defOpt}
                options={filtersData.year.options}
              />
              <Select
                value={filter?.client}
                onChange={(value) => setFilter({ ...filter, client: value?.Oid })}
                defOpt={filtersData.client.defOpt}
                options={filtersData.client.options}
              />
              <Select
                value={filter?.manager}
                onChange={(value) => setFilter({ ...filter, manager: value?.Oid })}
                defOpt={managersData.manager.defOpt}
                options={managersData.manager.options}
              />
              {/* <Select value={filter?.filter} onChange={(value) => setFilter({ ...filter, filter: value?.Oid })} defOpt={filtersData.filter.defOpt} options={filtersData.filter.options} /> */}
            </div>

            <div className="flex gap-3">
              <p className="text-[14px] font-normal leading-[1.3] text-[#808080]">Показать:</p>
              <button
                className={`${
                  limit == 10 && 'underline '
                } text-[14px] font-normal leading-[1.3] text-[#808080] cursor-pointer`}
                onClick={() => {
                  setLimit(10);
                  setPage(1);
                }}>
                10
              </button>
              <button
                className={`${
                  limit == 50 && 'underline '
                } text-[14px] font-normal leading-[1.3] text-[#808080] cursor-pointer`}
                onClick={() => {
                  setLimit(50);
                  setPage(1);
                }}>
                50
              </button>
              <button
                className={`${
                  limit == 100 && 'underline '
                } text-[14px] font-normal leading-[1.3] text-[#808080] cursor-pointer`}
                onClick={() => {
                  setLimit(100);
                  setPage(1);
                }}>
                {' '}
                100
              </button>
            </div>
          </div>
          <div className="mt-5 mb-10">
            <button
              onClick={() => getData()}
              className="mr-5 text-[14px] font-semibold leading-[1.3] text-[#1A1A1A] cursor-pointer">
              Применить выбранные
            </button>
            <button
              className="text-[14px] font-normal leading-[1.3] text-[#808080] cursor-pointer"
              onClick={() => {
                cleraFilter();
              }}>
              Отменить фильтры
            </button>
          </div>
          {isLoading ? (
            <div className="max-h-[570px]">
              <Loading />
            </div>
          ) : (
            <div className="min-w-[80vh]">
              {briefs.length > 0 ? (
                <Table page={page} limit={limit} data={briefs} meta={metaBrief} />
              ) : briefs.length === 0 ? (
                <div className="w-full text-[14px] text-center py-[22px] border border-solid border-[#EBEBEB] rounded-[5px]">
                  Нет результата
                </div>
              ) : (
                <div className="w-full text-[14px] text-center py-[22px] border border-solid border-[#EBEBEB] rounded-[5px]">
                  Ошибка подключения
                </div>
              )}
              <Pagination
                onChange={(e) => {
                  setPage(e);
                }}
                meta={metaBrief}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Briefs;
