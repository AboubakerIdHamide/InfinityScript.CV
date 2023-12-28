import { Link } from "react-router-dom"
import { Button } from 'flowbite-react';
const Contact = () => {
    return(
        <div className=" flex flex-col gap-10 justify-center h-screen">
            <div>
                <h2 className="text-4xl font-extrabold dark:text-white text-center">We'd <span className='text-purple-500'> Love </span> to Hear From You </h2>
                <p className="my-4 text-lg text-gray-500 w-2/3 text-center m-auto">We'd love to hear from you. Whether you have a question, want to share your thoughts, or simply say hello, we're here for it all.</p>
            </div>
            <form className="flex flex-col justify-center items-center gap-10">
            <input type="email" id="email" className="bg-purple-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block sm:w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="EMAIL" required/>
            
            <textarea id="message" rows="4" className="bg-purple-100 sm:w-1/3 block p-2.5 text-sm text-gray-900 bg-purple-100 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
          
            <Button color="purple" className="w-1/4 md:w-1/6">Send</Button>
            </form>

        </div>
    )
}
export default Contact