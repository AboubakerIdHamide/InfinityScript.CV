import { HiOutlineExternalLink } from "react-icons/hi";

const Templates = () => {
  return (
    <div className="bg-white w-full h-full rounded-[10px] p-4 flex justify-evenly gap-[20px] flex-wrap overflow-y-scroll">
      <div className="w-60 h-[380px] from-slate-300 to-slate-100 text-slate-600 border border-slate-300 grid grid-col-2 justify-center p-1 gap-1 rounded-lg shadow-md">
      <div className="col-span-2 rounded-md">
        <img src="/template.png" alt="" className="rounded-lg"/>
      </div>
      <div className="col-span-2 flex justify-evenly items-center text-royal-purple">
        <span>Default Template</span>
        <button className="rounded-md bg-slate-300 hover:bg-slate-600 hover:text-slate-200 duration-300 p-2">
          <HiOutlineExternalLink className="text-xl"/>
        </button>
      </div>
      </div>
    </div>
  )
}

export default Templates