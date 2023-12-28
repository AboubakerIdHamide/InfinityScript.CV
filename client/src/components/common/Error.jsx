import { VscBracketError } from "react-icons/vsc";

const Error = ({error}) => {
  return (
     <div className="bg-white w-full h-full rounded-[10px] p-4 flex flex-col justify-center items-center">
      <VscBracketError className="text-[80px] mb-4 text-royal-purple"/>
      <p className="text-royale-purple text-lg text-royal-purple text-center">Error : {error.message}</p>
    </div>
  )
}

export default Error