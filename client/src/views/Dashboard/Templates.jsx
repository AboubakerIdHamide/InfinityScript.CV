import { HiOutlineExternalLink } from "react-icons/hi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../utils/constants";
import { useSelector } from "react-redux";
import axios from "axios";
import { Error, Loading } from "../../components/common";

const Templates = () => {
  const { global } = useSelector(state => state);
  const { isLoading, error, data, isFetching } = useQuery("templates", () => {
    return axios.get(`${SERVER_URL}/api/${global.lang}/templates`).then((res)=>res.data.data);
  }, {
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
  });

  if (isLoading || isFetching) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <div className="bg-white w-full h-full rounded-[10px] p-[30px] grid grid-cols-3 gap-[20px] overflow-y-scroll">
      {data.map((template) => (
        <div key={template.id} className="w-60 h-[380px] from-slate-300 to-slate-100 text-slate-600 border border-slate-300 grid grid-col-2 justify-center p-1 gap-1 rounded-lg shadow-md">
          <div className="col-span-2 rounded-md">
            <img src={`${SERVER_URL}/${template.preview_img}`} alt="" className="rounded-lg"/>
          </div>
          <div className="col-span-2 flex justify-evenly items-center text-royal-purple">
            <span>{ template.name }</span>
            <button className="rounded-md bg-slate-300 hover:bg-slate-600 hover:text-slate-200 duration-300 p-2">
              <Link to={`/dashboard/create-resume/${template.id}/personal-info`}>
                <HiOutlineExternalLink className="text-xl" />
              </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Templates