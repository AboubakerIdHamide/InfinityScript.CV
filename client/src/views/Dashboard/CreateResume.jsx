import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { SideBar, Steper } from "../../components/dashboard/createResume";
import { Button } from "flowbite-react";
import { CREATE_CV_ROUTES, SERVER_URL } from "../../utils/constants";
import { t } from "i18next";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { Error, Loading } from "../../components/common";
import toast from "react-hot-toast";

const CreateResume = () => {
  const { template_id } = useParams();
  const [tab, setTab] = useState({ index: 0, title: "dashboard.personal_info" });
  const [userInfo, setUserInfo] = useState(null);
  const [biography, setBiography] = useState(null);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [showSaveBtns, setShowSaveBtns] = useState(false);
  const { auth, global } = useSelector(state => state);
  const navigate = useNavigate();
  
  const context = {
    tab,
    setTab,
    userInfo,
    setUserInfo,
    biography,
    setBiography,
    educations,
    setEducations,
    experiences,
    setExperiences,
    skills,
    setSkills,
    setShowSaveBtns
  };

  const { isLoading, error } = useQuery("user-info", () => {
    return axios.get(`${SERVER_URL}/api/${global.lang}/users/${auth.user.id}/data`).then((res)=>res.data);
  }, {
    onSuccess: ({ success, data }) => {
      if (success) {
        const {user} = data;
        setUserInfo(user.userinfos);
        setBiography({
          preview: `${SERVER_URL}/${user.userinfos.picture}`,
          description: user.userinfos.biography,
        });
        setSkills({
          skills: user.skills.skills.split(","),
          hobbies : user.skills.hobbies.split(","),
          languages: JSON.parse(user.skills.languages)
        });
  
        user.educations.forEach(formatIt);
        setEducations(user.educations);
  
        user.experiences.forEach(formatIt);
        setExperiences(user.experiences);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
  });
        
  const mutation = useMutation((data) => { 
    return axios.post(`${SERVER_URL}/api/${global.lang}/create-resume-update-profile`, data, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).then((res)=>res.data);
  },
    {
      onSuccess: (data) => {
        const blobUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', `${auth.user.email}.pdf`);
        link.click();
        link.remove();
        navigate("/dashboard/my-resumes");
      },
      onError: (error) => {
        console.log(error);
        toast.error(t("dashboard.error_download"), { duration: 5000 });
      },
    }
  );

  const prevStep = () => {
    navigate(CREATE_CV_ROUTES[tab.index - 1]);
  };

  const nextStep = () => {
    navigate(CREATE_CV_ROUTES[tab.index + 1]);
  };

  const formatIt = (item) => {
      item.start_date = item.start_date.split("-").reverse().join("-");
      item.end_date = item.end_date.split("-").reverse().join("-");
  }

  const download = (update) => {
    const formData = new FormData();

    // data
    formData.append('update', update);
    formData.append('user_id', auth.user.id);
    formData.append('template_id', template_id);
    formData.append('informations', JSON.stringify({ ...userInfo, biography: biography.description }));
    formData.append('picture', biography.file);
    // skills
    formData.append('skills', JSON.stringify(skills));

    // educations
    educations.forEach(formatIt);
    formData.append('educations', JSON.stringify(educations));

    // experiences
    experiences.forEach(formatIt);
    formData.append('experiences', JSON.stringify(experiences));
    mutation.mutate(formData);
  }

  if (isLoading || mutation.isLoading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <div className="bg-white w-full h-full rounded-[10px] flex overflow-y-scroll">
      <SideBar/>
      <div className="w-full md:h-full md:basis-4/5 flex flex-col justify-start items-center">
        <Steper tab={tab}/>
        <Outlet context={context} />
        <div className="w-[90%] h-[50px] flex justify-end gap-[15px] my-4 pb-[10px]">
          <Button disabled={tab.index == 0} onClick={prevStep} className="text-royal-purple border-royal-purple">{t("dashboard.prev")}</Button>

          {showSaveBtns ? (
            <>
              <Button onClick={() => download(false)} className="bg-royal-purple border-royal-purple">{t("dashboard.download")}</Button>
              <Button onClick={() => download(true)} className="bg-royal-purple border-royal-purple">{t("dashboard.download_update")}</Button>
            </>
          ): (
            <Button onClick={nextStep} className="bg-royal-purple border-royal-purple">{t("dashboard.next")}</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateResume