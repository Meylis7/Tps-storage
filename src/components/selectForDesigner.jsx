import React, { useState, useRef, useEffect } from 'react';

const Select = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    props?.value ? props?.value : { FirstName: 'Choose', LastName: 'Designer!' },
  );
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  useEffect(() => {
    props?.onChange(selectedOption, props?.indexOfFile);
  }, [selectedOption]);

  const openRef = useRef(null);
  useOutsideAlerter(openRef);

  return (
    <div ref={openRef} className="select-none relative z-[10]">
      <div
        onClick={() => (props?.isDone ? setOpen(false) : setOpen(!open))}
        className="rounded-[5px] flex justify-between gap-4 items-center py-[10px] px-[15px] border-[1px] border-solid border-[#EBEBEB] cursor-pointer">
        <p className="LineText mr-[5px]">
          {props?.value
            ? props?.value?.FirstName + ' ' + props?.value?.LastName
            : selectedOption.FirstName + ' ' + selectedOption.LastName}
        </p>

        <span className={`${(open ? '-rotate-180' : '') + ' transition'} `}>
          <svg
            width="8"
            height="6"
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.99987 3.60002L6.59987 1.00002C6.72209 0.877794 6.87765 0.816683 7.06654 0.816683C7.25542 0.816683 7.41098 0.877794 7.5332 1.00002C7.65542 1.12224 7.71654 1.27779 7.71654 1.46668C7.71654 1.65557 7.65542 1.81113 7.5332 1.93335L4.46654 5.00002C4.39987 5.06668 4.32765 5.11379 4.24987 5.14135C4.17209 5.16891 4.08876 5.1829 3.99987 5.18335C3.91098 5.18335 3.82765 5.16935 3.74987 5.14135C3.67209 5.11335 3.59987 5.06624 3.5332 5.00002L0.466536 1.93335C0.344314 1.81113 0.283203 1.65557 0.283203 1.46668C0.283203 1.27779 0.344314 1.12224 0.466536 1.00002C0.588758 0.877795 0.744314 0.816683 0.933203 0.816683C1.12209 0.816683 1.27765 0.877795 1.39987 1.00002L3.99987 3.60002Z"
              fill="#1A1A1A"
            />
          </svg>
        </span>
      </div>
      {open && (
        <div className="absolute left-0 top-[100%] bg-white shadow-custom border-[1px] border-solid border-[#EBEBEB] w-full overflow-y-auto max-h-72 z-[10]">
          {props?.options?.map((item, i) => {
            return (
              <div
                className="py-[10px] px-[15px] w-full cursor-pointer hover:bg-[#EBEBEB]"
                key={'option' + i}
                onClick={() => {
                  setSelectedOption(item);
                  setOpen(false);
                }}>
                {item?.FirstName + ' ' + item?.LastName}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
