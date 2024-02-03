import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils/axiosInstance';
import BriefDetail from '../../components/briefDetail';

import Pagination from '../../components/pagination';
import Table from './table';

const BriefDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [files, setFiles] = useState([]);

  const [metaFiles, setMetaFiles] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getDetail();
  }, []);

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = () => {
    axiosInstance
      .post('/api/briefs/' + id + '/files')
      .then((res) => {
        console.log('files:', res.data?.data);
        setFiles(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDetail = () => {
    axiosInstance
      .post('/api/briefs/' + id)
      .then((res) => {
        console.log('details:', res.data?.data);
        setDetail(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section className="py-[40px]">
        <BriefDetail data={detail} />
        {files ? (
          <>
            <Table page={page} limit={limit} data={files} meta={metaFiles} />

            <Pagination
              onChange={(e) => {
                setPage(e);
              }}
              meta={metaFiles}
            />
          </>
        ) : (
          <div className="w-full text-[14px] text-center py-[22px] border border-solid border-[#EBEBEB] rounded-[5px]">
            Ошибка подключения
          </div>
        )}
      </section>
    </div>
  );
};

export default BriefDetails;
