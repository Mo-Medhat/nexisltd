import logo from "../assets/Vector.png"
import photo from "../assets/istockphoto.png"
import { Link } from 'react-router-dom';

function ConstantSide() {
  return <>
        <div className='flex flex-col md:col-span-3 justify-center '>
            <div className='flex justify-start items-center'> <Link to="/home"><img src={logo} className="w-40" alt="Logo" /></Link> </div>
            <div className='flex justify-center items-center'><img src={photo} className="w-full" alt="people" /></div>
        </div>
  </>
}

export default ConstantSide