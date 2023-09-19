import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiconnector from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Footer from '../components/comman/Footer';
import CourseSlider from '../components/core/Catalog/CourseSlider';

const Catalog = () => {

    const { catalogName } = useParams()
    const [categoryId, setCategoryId] = useState();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [active, setActive] = useState(1)
    useEffect(() => {

        const getCategoryDetailsInDept = async () => {
            const result = await apiconnector("GET", categories.CATEGORIES_API);
            const categoryId = result?.data?.categoryDetails?.filter((ct) => ct.Name.split(" ").join("-").toLowerCase() === catalogName)[0]._id
            console.log(`Category Id`, categoryId);
            setCategoryId(categoryId)
        }

        getCategoryDetailsInDept()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [catalogName])

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const res = await getCatalogaPageData(categoryId)
                console.log(res);
                setCatalogPageData(res)

            } catch (error) {
                console.log(error?.response?.data?.message);
                //toast.error(error?.response?.data?.message)
            }
        }
        getCategoryDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId])
    return (
        <>
            <div className='bg-richblack-800  box-content px-4'>
                <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent'>
                    <div className='text-richblack-25 max-w-maxContent my-auto flex flex-col gap-3 '>
                        <p className="text-sm text-richblack-300 text-left">
                            {`Home / Catalog / `}
                            <span className="text-yellow-25">
                                {catalogPageData?.selectCategory?.Name}
                            </span>
                        </p>
                        <p className="text-3xl text-richblack-5">
                            {catalogPageData?.selectCategory?.Name}
                        </p>
                        <p className="max-w-[870px] text-richblack-200">
                            {catalogPageData?.selectCategory?.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 1 */}
            <div className=' w-11/12 mx-auto mt-11 flex max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent text-richblack-25 py-12'>
                <p className='lg:text-4xl font-bold text-richblack-5 text-2xl'>Courses to get you started</p>
                <div className=' text-sm flex box-border border-b border-b-richblack-600'>
                    <p className={`cursor-pointer px-4 py-2 ${active === 1 ? `text-yellow-25 border-b-yellow-100 border-b ` : ` text-richblack-50`}`} onClick={() => setActive(1)}>Most Popular</p>
                    <p className={`cursor-pointer px-4 py-2  ${active === 2 ? `text-yellow-25 border-b-yellow-100 border-b ` : ` text-richblack-50`}`} onClick={() => setActive(2)}>New</p>
                </div>
                <div>
                    <CourseSlider Courses={catalogPageData?.selectCategory?.courses} btnClass="selectCategory" />
                </div>
            </div>
            {/* Section 2 */}
            <div className=' w-11/12 mx-auto mt-11 flex max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent text-richblack-25 py-12'>
                <p className='lg:text-4xl font-bold text-richblack-5 text-2xl'>Top courses in {catalogPageData?.differentCategories?.Name}</p>
                {/* <div className=' text-sm flex box-border border-b border-b-richblack-600'>
                    <p className={`cursor-pointer px-4 py-2 ${active === 1 ? `text-yellow-25 border-b-yellow-100 border-b ` : ` text-richblack-50`}`} onClick={() => setActive(1)}>Most Popular</p>
                    <p className={`cursor-pointer px-4 py-2  ${active === 2 ? `text-yellow-25 border-b-yellow-100 border-b ` : ` text-richblack-50`}`} onClick={() => setActive(2)}>New</p>
                </div> */}
                <div>
                    <CourseSlider Courses={catalogPageData?.differentCategories?.courses} btnClass="differentCategories" />
                </div>
            </div>


            <Footer />
        </>
    )
}

export default Catalog