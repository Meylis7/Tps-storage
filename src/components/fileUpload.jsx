import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageConfig } from '../components/imageConfig';
import { useParams } from 'react-router-dom';
import Select from '../components/selectForDesigner';
import { axiosInstance } from '../utils/axiosInstance';
import '../components/lineText.css';

const FileUpload = () => {
  const { id } = useParams();
  const fileRef = useRef(null);
  const [file, setFile] = useState();
  const [fileList, setFileList] = useState([]);
  const [designers, setDesigners] = useState([]);

  const [isDone, setIsDone] = useState(false);
  const [approveDesigner, setApproveDesigner] = useState(false);
  const [designerError, setDesignerError] = useState(false);

  // Add this state
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    getDesigners();
  }, []);

  useEffect(() => {
    console.log(fileList);
  }, [fileList]);
  const getDesigners = () => {
    axiosInstance
      .post('/api/employees')
      .then((res) => {
        console.log(res.data.data);
        setDesigners(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    let array = fileList;

    array.push({
      file: e.target.files[0],
      brief: id,
      designer: '',
      approveDesigner: false,
      isLoading: false,
    });
    setFileList([...array]);
  };

  const addDesigner = (designer, indexOfFile) => {
    console.log(designer);
    let array = fileList;
    array[indexOfFile].designer = designer;
    setFileList([...array]);
  };

  const deletUpFile = (indexOfFile) => {
    let array = fileList;
    array.splice(indexOfFile, 1);
    setFileList([...array]);
  };

  const addApproved = (indexOfFile) => {
    let array = fileList;
    if (array[indexOfFile].designer?.Oid) {
      array[indexOfFile].designer.approveDesigner = true;
      setFileList([...array]);
    }
  };

  // const UploadAllFileToServer = async () => {
  //   setIsDone(true);
  //   let isOk = true;
  //   await fileList?.map((item) => {
  //     item?.designer?.approveDesigner != true ? (isOk = false) : console.log('');
  //   });
  //   if (isOk) {
  //     fileList?.map(async (sendDataFile) => {
  //       let formData = new FormData();

  //       formData.append('file', fileList[0].file);

  //       console.log(sendDataFile.file);
  //       formData.append('brief', sendDataFile.brief);
  //       formData.append('designer', sendDataFile.designer?.Oid);
  //       formData.append('file', sendDataFile.file, sendDataFile.file?.name);
  //       console.log(formData.has('file'));
  //       await axiosInstance
  //         .post('/api/briefs/files/add', formData)
  //         .then((res) => {
  //           console.log(res.data);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     });
  //   }
  // };

  // const UploadAllFileToServer = async () => {
  //   setIsDone(true);
  //   let isOk = true;

  //   // Use Promise.all to wait for all uploads to finish
  //   await Promise.all(
  //     fileList?.map(async (item) => {
  //       if (item?.designer?.approveDesigner !== true) {
  //         isOk = false;
  //         return;
  //       }

  //       let formData = new FormData();
  //       formData.append('brief', item.brief);
  //       formData.append('designer', item.designer?.Oid);
  //       formData.append('file', item.file, item.file?.name);

  //       await axiosInstance
  //         .post('/api/briefs/files/add', formData, {
  //           onUploadProgress: (progressEvent) => {
  //             // Update the progress state
  //             const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
  //             setUploadProgress(progress);
  //           },
  //         })
  //         .then((res) => {
  //           console.log(res.data);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }),
  //   );

  //   // Reset progress after all uploads are complete
  //   setUploadProgress(0);

  //   if (!isOk) {
  //     // Handle error if not all designers are approved
  //     setDesignerError(true);
  //   }
  // };

  const isAllDesignersSelected = () => {
    // Check if all files have an approved designer
    return fileList.every((item) => item?.designer?.approveDesigner && item?.designer?.Oid);
  };

  const UploadAllFileToServer = async () => {
    setIsDone(true);

    // Check if all designers are selected
    if (!isAllDesignersSelected()) {
      setDesignerError(true);
      return;
    }

    // Use Promise.all to wait for all uploads to finish
    await Promise.all(
      fileList?.map(async (item) => {
        let formData = new FormData();
        formData.append('brief', item.file);
        formData.append('designer', item.designer?.Oid);
        formData.append('file', item.file, item.file?.name);

        await axiosInstance
          .post('/api/briefs/files/add', formData, {
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              setUploadProgress(progress);
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }),
    );

    // setUploadProgress(0);

    // Proceed with any logic you need after successful file uploads
    console.log('All designers are selected. Do something here.');
  };

  return (
    <div className="file_form max-w-[450px] m-auto border-[1px] border-solid border-[#EBEBEB] rounded-[10px]">
      <div className="file_form-inner py-[30px] px-[50px] bg-white">
        {fileList?.map((item, i) => {
          return (
            <div
              key={'files' + i}
              className="file_item border-l-0 border-t-0 border-r-0 border-b border-solid border-[#EBEBEB] pb-5 mb-5">
              <div className="file_load w-full flex items-start">
                <span className="file_load-icon block min-w-[24px] w-6 h-6 mr-[14px]">
                  <img
                    className="min-w-[30px] object-contain block"
                    src={ImageConfig[item?.file?.type.split('/')[1]] || ImageConfig['default']}
                    // src="/static/media/jpg.cb06bc5a556439af217d1461986cf2ad.svg"
                    alt=""
                  />
                </span>

                <div className="file_load-group w-full">
                  <div className="file_load-row flex items-start justify-between">
                    <h6 className="file_load-name text-[16px] font-normal leading-[1.3] mr-[15px] LineText max-w-[220px]">
                      {item?.file?.name}
                    </h6>

                    <p className="file_load-size text-[16px] font-normal leading-[1.3] text-[#808080]">
                      {item?.file &&
                        (item?.file?.size / 1024 > 1000
                          ? (item?.file?.size / 1024 / 1024).toFixed(2) + 'MB'
                          : (item?.file?.size / 1024).toFixed(2) + 'KB')}
                    </p>
                  </div>

                  <span className="file_load-progress block w-full h-1 bg-[#EBEBEB] rounded-[2px] mt-[5px]">
                    <div
                      style={{
                        width: `${uploadProgress < 100 ? uploadProgress : 100}%`,
                        backgroundColor: '#1E7E2E',
                      }}
                      className=" w-full h-1"></div>
                  </span>
                </div>
              </div>

              <div className="file_select mt-[10px] ml-[30px] block">
                <div
                  onClick={() => deletUpFile(i)}
                  className="cursor-pointer flex items-center mt-2 mb-4">
                  <span className="block w-4 h-4 mr-2">
                    <svg
                      className="w-full h-full object-contain block"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.66663 12C2.29996 12 1.98618 11.8696 1.72529 11.6087C1.4644 11.3478 1.33374 11.0338 1.33329 10.6667V2C1.1444 2 0.986182 1.936 0.858626 1.808C0.73107 1.68 0.66707 1.52178 0.666626 1.33333C0.666626 1.14444 0.730626 0.986222 0.858626 0.858667C0.986626 0.731111 1.14485 0.667111 1.33329 0.666667H3.99996C3.99996 0.477778 4.06396 0.319556 4.19196 0.192C4.31996 0.0644445 4.47818 0.000444444 4.66663 0H7.33329C7.52218 0 7.68063 0.0640001 7.80863 0.192C7.93663 0.32 8.0004 0.478222 7.99996 0.666667H10.6666C10.8555 0.666667 11.014 0.730667 11.142 0.858667C11.27 0.986667 11.3337 1.14489 11.3333 1.33333C11.3333 1.52222 11.2693 1.68067 11.1413 1.80867C11.0133 1.93667 10.8551 2.00044 10.6666 2V10.6667C10.6666 11.0333 10.5362 11.3473 10.2753 11.6087C10.0144 11.87 9.7004 12.0004 9.33329 12H2.66663ZM9.33329 2H2.66663V10.6667H9.33329V2ZM5.99996 7.26667L7.26663 8.53333C7.38885 8.65555 7.5444 8.71667 7.73329 8.71667C7.92218 8.71667 8.07774 8.65555 8.19996 8.53333C8.32218 8.41111 8.38329 8.25556 8.38329 8.06667C8.38329 7.87778 8.32218 7.72222 8.19996 7.6L6.93329 6.33333L8.19996 5.06667C8.32218 4.94444 8.38329 4.78889 8.38329 4.6C8.38329 4.41111 8.32218 4.25556 8.19996 4.13333C8.07774 4.01111 7.92218 3.95 7.73329 3.95C7.5444 3.95 7.38885 4.01111 7.26663 4.13333L5.99996 5.4L4.73329 4.13333C4.61107 4.01111 4.45551 3.95 4.26663 3.95C4.07774 3.95 3.92218 4.01111 3.79996 4.13333C3.67774 4.25556 3.61663 4.41111 3.61663 4.6C3.61663 4.78889 3.67774 4.94444 3.79996 5.06667L5.06663 6.33333L3.79996 7.6C3.67774 7.72222 3.61663 7.87778 3.61663 8.06667C3.61663 8.25556 3.67774 8.41111 3.79996 8.53333C3.92218 8.65555 4.07774 8.71667 4.26663 8.71667C4.45551 8.71667 4.61107 8.65555 4.73329 8.53333L5.99996 7.26667Z"
                        fill="#EB2F2F"
                      />
                    </svg>
                  </span>

                  <p className="text-[#EB2F2F] text-[13px] font-normal leading-[1.3]">Удалить</p>
                </div>

                <Select
                  isDone={item?.designer?.approveDesigner}
                  onChange={(e, indexOfFile) => addDesigner(e, indexOfFile)}
                  options={designers}
                  value={item?.designer}
                  indexOfFile={i}
                />

                {isDone && !item?.designer?.Oid ? (
                  <span
                    className={` file_select-alert block text-[14px] font-normal leading-[1.3] text-[#EB2F2F] mt-[16px]`}>
                    ! Выберете дизайнера
                  </span>
                ) : (
                  <div></div>
                )}

                <div
                  onClick={() => addApproved(i)}
                  className="flex  items-center justify-between w-full mt-3">
                  <p
                    className={`${
                      (item?.designer?.Oid
                        ? '!cursor-pointer opacity-100'
                        : ' !pointer-events-none opacity-50') + ' transition'
                    }  file_select-btn text-[16px] font-normal leading-[1.3] block bg-transparent  ${
                      uploadProgress === 100 ? 'text-[#1E7E2E] !cursor-auto' : ''
                    }`}>
                    {uploadProgress === 100 ? 'Файл загружен' : 'Подтвердить'}
                  </p>

                  <span
                    className={`${
                      (item?.designer?.approveDesigner ? '' : 'hidden') + ' transition'
                    } w-[20px] h-[20px] block`}>
                    <svg
                      width="12"
                      height="9"
                      viewBox="0 0 12 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="block w-full h-full object-contain">
                      <path
                        d="M4.00005 6.60005L9.90005 0.700048C10.0834 0.516715 10.3167 0.425049 10.6 0.425049C10.8834 0.425049 11.1167 0.516715 11.3 0.700048C11.4834 0.883382 11.575 1.11671 11.575 1.40005C11.575 1.68338 11.4834 1.91672 11.3 2.10005L4.70005 8.70005C4.50005 8.90005 4.26672 9.00005 4.00005 9.00005C3.73338 9.00005 3.50005 8.90005 3.30005 8.70005L0.700048 6.10005C0.516715 5.91672 0.425049 5.68338 0.425049 5.40005C0.425049 5.11671 0.516715 4.88338 0.700048 4.70005C0.883382 4.51672 1.11672 4.42505 1.40005 4.42505C1.68338 4.42505 1.91672 4.51672 2.10005 4.70005L4.00005 6.60005Z"
                        fill="#1E7E2E"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        <input
          onChange={(e) => handleFile(e)}
          ref={fileRef}
          accept="image/*, .pdf"
          type="file"
          className="hidden"
        />

        <button
          onClick={() => {
            fileRef.current.click();
          }}
          className="addMore mt-[10px] ml-[30px] bg-transparent cursor-pointer flex items-center text-[14px] font-normal leading-[1.3]">
          <span className="block w-[14px] h-[14px] mr-[10px]">
            <svg
              className="block w-full h-full object-contain"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13 7.99805H8V12.998C8 13.2633 7.89464 13.5176 7.70711 13.7052C7.51957 13.8927 7.26522 13.998 7 13.998C6.73478 13.998 6.48043 13.8927 6.29289 13.7052C6.10536 13.5176 6 13.2633 6 12.998V7.99805H1C0.734784 7.99805 0.48043 7.89269 0.292893 7.70515C0.105357 7.51762 0 7.26326 0 6.99805C0 6.73283 0.105357 6.47848 0.292893 6.29094C0.48043 6.1034 0.734784 5.99805 1 5.99805H6V0.998047C6 0.73283 6.10536 0.478476 6.29289 0.29094C6.48043 0.103403 6.73478 -0.00195313 7 -0.00195312C7.26522 -0.00195313 7.51957 0.103403 7.70711 0.29094C7.89464 0.478476 8 0.73283 8 0.998047V5.99805H13C13.2652 5.99805 13.5196 6.1034 13.7071 6.29094C13.8946 6.47848 14 6.73283 14 6.99805C14 7.26326 13.8946 7.51762 13.7071 7.70515C13.5196 7.89269 13.2652 7.99805 13 7.99805Z"
                fill="black"
              />
            </svg>
          </span>
          Добавить файл
        </button>
      </div>

      <button
        onClick={() => UploadAllFileToServer()}
        className=" text-[18px] font-normal leading-[1.3] text-center w-full py-5 px-[10px] cursor-pointer bg-[#F5F5F5]">
        Готово
      </button>
    </div>
  );
};

export default FileUpload;
