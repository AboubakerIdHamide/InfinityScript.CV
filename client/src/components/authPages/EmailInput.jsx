
const EmailInput = () => {
    
    return(
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <i className="fa-light fa-user text-white"></i>
            </div>
            <input type="email" id="email" className="bg-transparent border border-white text-white text-sm rounded-md focus:ring-blue-500 focus:border-white-500 block w-full ps-10 p-2.5 placeholder-white" placeholder="EMAIL"/>
        </div>
    )
}

export default EmailInput;