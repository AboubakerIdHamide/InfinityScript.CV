import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import { useMutation, useQuery } from "react-query";
import { Loading, Error } from "../../components/common";
import { useSelector } from "react-redux";
import { HiOutlineCloudDownload } from "react-icons/hi";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MyResumes = () => {
  const [progress, setProgress] = useState(0);
  const { global, auth } = useSelector(state => state);
  const { t } = useTranslation();

  const { isLoading, error, data } = useQuery("resumes", () => {
    return axios.get(`${SERVER_URL}/api/${global.lang}/users/${auth.user.id}/resumes`).then((res)=>res.data.data);
  });

  const mutation = useMutation((data) => { 
    return axios.post(`${SERVER_URL}/api/${global.lang}/download`, data, {
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentage);
      },
    }).then((res)=>res.data);
  },
    { onSuccess: (data) => { 
        const blobUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', `${auth.user.email}.pdf`);
        link.click();
        setProgress(0);
        link.remove();
      }
    }
  );

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <div className="bg-white w-full h-full rounded-[10px] p-4 flex justify-evenly gap-[20px] flex-wrap overflow-y-scroll">
      {data.length == 0 ?
        (<h1 className="w-full h-full flex items-center justify-center text-royal-purple text-xl text-center">{t("dashboard.dont_have_resumes")}</h1>) :
        data.map((template) => (
        <div key={template.id} className="w-60 h-[380px] from-slate-300 to-slate-100 text-slate-600 border border-slate-300 grid grid-col-2 justify-center p-1 gap-1 rounded-lg shadow-md">
          <div className="col-span-2 rounded-md">
            <img src={`${SERVER_URL}/${template.preview_img}`} alt="" className="rounded-lg"/>
          </div>
          <div className="col-span-2 z-[1] flex justify-evenly items-center text-royal-purple rounded-lg relative">
            <span className="absolute z-[-1] top-0 left-0 bg-[#7752FE77] text-white rounded-lg h-full" style={{width:`${progress}%`}}></span>
            <span>{ template.name }</span>
            <button
              disabled={mutation.isLoading}
              onClick={() => mutation.mutate({ template_id: template.id, user_id: auth.user.id })}
              className={`${mutation.isLoading ?"text-[gray]" : "text-royal-purple"} rounded-md bg-slate-300 hover:bg-slate-600 hover:text-slate-200 duration-300 p-2`}>
                <HiOutlineCloudDownload className="text-xl" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyResumes