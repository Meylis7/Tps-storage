import React, { useState, useRef, useEffect } from "react";

const Select = (props) => {

    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(props?.value ? props?.value : props?.defOpt);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpen(false);
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useEffect(() => {
        props?.onChange(selectedOption)

    }, [selectedOption])

    // useEffect(()=>{
    //     if(props?.clear==true && props?.defOpt !=selectedOption){
    //         setSelectedOption(props?.defOpt)
    //     }
    // },[props])


    const openRef = useRef(null);
    useOutsideAlerter(openRef);




    return <div ref={openRef} className="select-none">
        <div onClick={() => setOpen(!open)} className="rounded-[5px] flex gap-4 items-center p-[10px] border-[1px] cursor-pointer">
            {selectedOption} <span className={`${(open ? "-rotate-180" : "") + " transition"} `}>
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.99987 3.60002L6.59987 1.00002C6.72209 0.877794 6.87765 0.816683 7.06654 0.816683C7.25542 0.816683 7.41098 0.877794 7.5332 1.00002C7.65542 1.12224 7.71654 1.27779 7.71654 1.46668C7.71654 1.65557 7.65542 1.81113 7.5332 1.93335L4.46654 5.00002C4.39987 5.06668 4.32765 5.11379 4.24987 5.14135C4.17209 5.16891 4.08876 5.1829 3.99987 5.18335C3.91098 5.18335 3.82765 5.16935 3.74987 5.14135C3.67209 5.11335 3.59987 5.06624 3.5332 5.00002L0.466536 1.93335C0.344314 1.81113 0.283203 1.65557 0.283203 1.46668C0.283203 1.27779 0.344314 1.12224 0.466536 1.00002C0.588758 0.877795 0.744314 0.816683 0.933203 0.816683C1.12209 0.816683 1.27765 0.877795 1.39987 1.00002L3.99987 3.60002Z" fill="#1A1A1A" />
                </svg>
            </span>
        </div>
        {open && <div>
            {
                props?.options?.map((item, i) => {
                    return <div key={"option" + i} onClick={() => { setSelectedOption(item); setOpen(false) }}>{item}</div>
                })
            }
        </div>}

    </div>
}

export default React.memo(Select)