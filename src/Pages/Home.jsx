import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/Vector.png"


function Home() {
    const tempData = [
        {date: '11/7/16', name: "Arlene McCoy", status: "Present"},
        {date: '2/11/12', name: "Eleanor Pena", status: "Absent"},
        {date: '4/21/12', name: "Wade Warren", status: "Present"},
        {date: '8/15/17', name: "Jacob Jones", status: "Absent"},
        {date: '6/19/14', name: "Darlene Robertson", status: "Present"},
        {date: '6/21/19', name: "Floyd Miles", status: "Absent"},
        {date: '5/19/12', name: "Ralph Edwards", status: "Present"},
        {date: '5/7/16', name: "Leslie Alexander", status: "Present"},
    ]
    
  return <>
    <section className='container m-auto h-full relative'>
        <div className='flex justify-start items-center mt-6 mx-4 md:mx-auto'> <Link to="/login"><img src={logo} className="w-40" alt="Logo" /></Link> </div>
        <div className='md:mt-10 my-10 flex justify-center'>
            <div className='bg-[#1678CB] rounded-[5px] px-2 md:mx-auto mx-4'><p className=' leading-[42px]  text-[#ffffff] md:text-[36px] text-[26px] font-semibold p-3 md:p-5'>Attendance information</p></div>
        </div>
        <div className='flex justify-around'>
                <div className='flex flex-col'><h5 className='font-medium leading-[19px] mb-6'>Date</h5>
                {tempData.map((data) => <>
                    <p className='mb-8 font-normal text-[15px] leading-[18px]'>{data.date}</p>
                </>)}
                </div>
                <div className='flex flex-col'><h5 className='font-medium leading-[19px] mb-6'>Employee Name</h5>
                {tempData.map((data) => <>
                    <p className='mb-8 font-normal text-[15px] leading-[18px]'>{data.name}</p>
                </>)}
                </div>
                <div className='flex flex-col'><h5 className='font-medium leading-[19px] mb-6'>Status</h5>
                {tempData.map((data) => <>
                    <p className='mb-8 font-normal text-[15px] leading-[18px]'>{data.status}</p>
                </>)}
                </div>
        </div>
    </section>
  </>
}

export default Home