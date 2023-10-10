import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { ViewCourseSideBar } from '../components/core/ViewCourse/ViewCourseSideBar';
// import ViewCourseVideoDetails from '../components/core/Dashboard/Student/ViewCourseVideoDetails';

const ViewCourse = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return navigate("/login", { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (

        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <ViewCourseSideBar />
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                    <Outlet />
                </div>
            </div>
        </div>
           
            
       
    )
}

export default ViewCourse