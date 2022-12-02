import React, { useState } from 'react'
import { HiArrowRight } from 'react-icons/hi';
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router';
import ConstantSide from '../Components/ConstantSide';
import { Link } from 'react-router-dom';

function Signup() {

    const navigate = useNavigate()
    const [messageFaild, setMessageFaild] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const baseURL = 'https://test.nexisltd.com/'
    const [next, setNext] = useState(1)
    const [user, setUser] = useState({
        first_name:"",
        last_name:"",
        phone_number: '',
        email:"",
        password:""
      });

    function getUserInput(e) {
        setErrorMessages([])
        let newUser = {...user};
        setUser(newUser, newUser[e.target.id] = e.target.value );
    }

    function getNextForm() {
        setNext(next + 1)
    }
    function getBackForm() {
        setNext(next - 1)
    }

    async function submitForm(e) {
        e.preventDefault();
        const schema = Joi.object({
            first_name: Joi.string().alphanum().min(2).max(15).required(),
            last_name: Joi.string().alphanum().min(2).max(15).required(),
            phone_number: Joi.number().required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(/^[a-z0-9]{8,30}$/i).required(),
        });
          let joiResponse = schema.validate(user, { abortEarly: false });

          
          if (joiResponse.error) {
            setErrorMessages(joiResponse.error.details);
          }else{
           let {data} = await axios.post(`${baseURL}signup`, user);
           if (data) {
            setMessageFaild(data.error);
           }else{
            navigate('/login');
            }
            
          }
          
    }
    
  return <>
    <section className='container m-auto h-full relative'>
    <div className='md:mt-20 md:mx-auto my-20 mx-8'>

        <div className='grid md:grid-cols-5 grid-cols-1'>

            <ConstantSide/>

            <div className='flex flex-col md:col-span-2 justify-center'>
                <div className='spicalShadow'>
                    <h3 className='text-[20px] leading-[24px] font-semibold my-14 text-center text-rgba(0, 0, 0, 1)'>SignUp Form</h3>

                    {next == 1 ? <>
                        <div className='flex flex-col justify-center'>
                        <input onChange={getUserInput} type="text" className='w-4/5 m-auto my-6 leading-[19px] pl-3 border-b font-normal outline-none border-[#A4A4A4]' placeholder='Write First Name' name='first_name' id='first_name' />
                        <input onChange={getUserInput} type="text" className='w-4/5 m-auto my-6 leading-[19px] pl-3 border-b font-normal outline-none border-[#A4A4A4]' placeholder='Write Last Name' name='last-name' id='last_name' />
                    </div></>: undefined}

                    {next == 2 ? <><div className='flex flex-col justify-center'>
                        <input onChange={getUserInput} type="phone" className='w-4/5 m-auto my-6 leading-[19px] pl-3 border-b font-normal outline-none border-[#A4A4A4]' placeholder='1xxxxxxxxxx' name='phone_number' id='phone_number' />
                        <input onChange={getUserInput} type="email" className='w-4/5 m-auto my-6 leading-[19px] pl-3 border-b font-normal outline-none border-[#A4A4A4]' placeholder='Write Email Address' name='email' id='email' />
                    </div></>: undefined}

                    {next == 3 ? <><div className='flex flex-col justify-center'>
                        <input onChange={getUserInput} type="password" className='w-4/5 m-auto mb-1 mt-6 leading-[19px] pl-3 border-b font-normal outline-none border-[#A4A4A4]' placeholder='Write Password' name='password' id='password' />
                        <span className='w-4/5 m-auto leading-[15px] text-[12px] font-normal pl-3 text-[#7E7E7E]'>Your password must be 8 character</span>
                    </div></>: undefined}

                    {next == 1 || next == 2 ? <>
                    <div className='flex justify-center my-10'>
                        {next > 1 ? <><button onClick={getBackForm} className='leading-[15px] text-[12px] font-semibold text-[#767676] px-[15px] py-[10px] mr-8'>Back</button></>: undefined}
                        <button onClick={getNextForm} className='leading-[19px] font-medium text-white bg-[#1678CB] rounded-[15px] px-[20px] py-[15px] flex items-center'>Next Step <span className='ml-1'><HiArrowRight/></span></button>
                    </div>
                        
                    </>:
                    <><div className='flex justify-center my-10'>
                        {next > 1 ? <><button onClick={getBackForm} className='leading-[15px] text-[12px] font-semibold text-[#767676] px-[15px] py-[10px] mr-8'>Back</button></>: undefined}
                        <button onClick={submitForm} className='leading-[19px] font-medium text-white bg-[#1678CB] rounded-[15px] px-[20px] py-[15px] flex items-center'>Sign Up</button>
                    </div>
                    </>}

                    <div className='text-end px-6 mt-20 mb-10'>{next === 1? <><span className='leading-[15px] font-normal text-[12px] text-[#7E7E7E]'>Already have an account?</span> <Link to="/login" className='leading-[17px] text-[14px] font-semibold border-b text-[#1678CB]'>LOGIN HERE!</Link></>: <><div className='py-3'></div></>}</div>
                </div>
            </div>

        </div>
                <div className='flex flex-wrap mt-2'>
                    {errorMessages?.map((errmsgs, idx)=> <>
                        <div key={idx} className='spicalShadow flex-1 m-2'><p className='text-base p-2 text-center'>{errmsgs.message}</p></div>
                    </>)}
                </div>
        </div>

    </section>
  </>
}

export default Signup