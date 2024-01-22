import React from 'react'
import FileUpload from '../../components/fileUpload'

const FileuploadPage = () => {

    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <section className="file relative block py-[100px]">
            <div className="auto_container max-w-[1360px] m-auto relative px-[60px]">
                <div className="file_wrap">
                    <FileUpload onFileChange={(files) => onFileChange(files)} />
                </div>
            </div>
        </section>
    )
}

export default FileuploadPage