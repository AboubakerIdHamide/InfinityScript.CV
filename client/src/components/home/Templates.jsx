import { Link } from 'react-router-dom';
import { Carousel } from 'flowbite-react';
const Templates = () => {
    return(
        <div id="templates"  >
            <div className='flex flex-col justify-center mb-5'>
                <h2 className="text-4xl font-extrabold dark:text-white text-center">Find Your <span className='text-purple-500'>Perfect</span>  Template</h2>
                <p className="my-4 text-lg text-gray-500 w-2/3 text-center m-auto">Welcome to InfinityScriptCV's Template Gallery! Discover the perfect template to showcase your skills and experiences.</p>
                <Link to="dashboard/templates" className="inline-flex justify-center items-center text-lg text-purple-500 hover:underline hover:text-black sm:w-1/3 m-auto">
                Choose Your Template
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                </Link>
            </div>
        
            <div className="h-screen">
            <Carousel pauseOnHover >
                <img src="/templates/template1.png" className='sm:w-1/3'  alt="..." />
                <img src="/templates/template1.png" className='sm:w-1/3' alt="..." />
                <img src="/templates/template1.png" className='sm:w-1/3' alt="..." />
                <img src="/templates/template1.png" className='sm:w-1/3' alt="..." />
                <img src="/templates/template1.png" className='sm:w-1/3' alt="..." />
            </Carousel>
            </div>
        </div>
    )
};
export default Templates