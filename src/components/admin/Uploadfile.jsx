import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { removeFiles, uploadFiles } from '../../api/Product'
import useEcomStore from '../../store/ecom-store'
import { Loader } from 'lucide-react';


const Uploadfile = ({ form, setForm }) => {
    //javascript
    const token = useEcomStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)
    const handleOnChange = (e) => {
        //code
        setIsLoading(true)
        const files = e.target.files
        if (files) {
            setIsLoading(true)
            let allFiles = form.images  // [] empty arr
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i])

                //validate
                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} this not image`)
                    continue
                }

                //   image Resize 
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        // endpoint Backend                        
                        uploadFiles(token, data)
                            .then((res) => {
                                console.log(res)

                                allFiles.push(res.data) // เพิ่มข้อมูลเพิ่มไปต่อใน  arr
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                setIsLoading(false)
                                toast.success('Upload Image Success!')
                            })
                            .catch((err) => {
                                console.log(err)
                                setIsLoading(false)
                            })
                    },
                    "base64"
                )

            }
        }
    }
    console.log(form)


    const handleDelete = (public_id) => {
        const images = form.images
        removeFiles(token, public_id)
            .then((res) => {
                const filterImages = images.filter((item) => {
                    console.log(item)
                    return item.public_id !== public_id
                })
                // console.log('filterImages',filterImages)
                setForm({
                    ...form,
                    images: filterImages
                })
                toast.error(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className='my-4'>
            <div className='flex mx-4 gap-4 my-4'>
               {
                   isLoading && <Loader className='w-16 h-16 animate-spin' />
               }
               
                {/* Image */}
                {
                    form.images.map((item, index) =>
                        <div className='relative' key={index}>
                            <img
                                className='w-24 h-24 hover:scale-125'
                                src={item.url} />
                            <span
                                onClick={() => handleDelete(item.public_id)}
                                className='absolute top-0 right-0 bg-red-400 px-1 rounded hover:cursor-pointer'>x</span>
                        </div>
                    )
                }
            </div>
            <div>
                <input
                    onChange={handleOnChange}
                    type='file'
                    name='images'
                    multiple
                />
            </div>
        </div>
    )
}

export default Uploadfile