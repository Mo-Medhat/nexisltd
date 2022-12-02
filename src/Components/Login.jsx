import React, { useState } from 'react'
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router';
import ConstantSide from '../Components/ConstantSide';
import { Link } from 'react-router-dom';

function Login({decodeToken}) {

  const navigate = useNavigate()
    const [messageFaild, setMessageFaild] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const baseURL = 'https://test.nexisltd.com/'
    const [user, setUser] = useState({
        email:"",
        password:""
      });

    function getUserInput(e) {
        setErrorMessages([])
        let newUser = {...user};
        setUser(newUser, newUser[e.target.id] = e.target.value );
    }

    async function submitForm(e) {
        e.preventDefault();
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(/^[a-z0-9]{8,30}$/i).required(),
        });
          let joiResponse = schema.validate(user, { abortEarly: false });

          
          if (joiResponse.error) {
            setErrorMessages(joiResponse.error.details);
          }else{
           let {data} = await axios.post(`${baseURL}login`, user);
           if (data.status == 401) {
            setMessageFaild(data.error);
           }else{
            localStorage.setItem("userToken", data.token);
            decodeToken();      
            navigate('/home');
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
                    <h3 className='text-[20px] leading-[24px] font-semibold my-14 text-center text-rgba(0, 0, 0, 1)'>Log in Form</h3>

                      <div className='flex flex-col justify-center'>
                        <input onChange={getUserInput} type="email" className='w-4/5 m-auto my-6 leading-[19px] pl-3 border-b font-normal outline-none border-[#A4A4A4]' placeholder='Write Email Address' name='email' id='email' />
                        <input onChange={getUserInput} type="password" className='w-4/5 m-auto mb-1 mt-6 leading-[19px] pl-3 border-b font-normal outline-none border-[#A4A4A4]' placeholder='Write Password' name='password' id='password' />
                        <span className='w-4/5 m-auto leading-[15px] text-[12px] font-normal pl-3 text-[#7E7E7E]'>Your password must be 8 character</span>
                      </div>
                        <div className='flex justify-center my-10'>
                          <button onClick={submitForm} className='leading-[19px] font-medium text-white bg-[#1678CB] rounded-[15px] px-[20px] py-[15px] flex items-center'>Log In</button>
                      </div>
                      <div className='text-end px-6 mt-20 mb-10'><span className='leading-[15px] font-normal text-[12px] text-[#7E7E7E]'>Don’t have an account?</span> <Link to="/signup" className='leading-[17px] text-[14px] font-semibold border-b text-[#1678CB]'>SIGNUP HERE!</Link></div>

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

export default Login