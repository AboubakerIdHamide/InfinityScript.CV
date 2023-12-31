import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Error, Input, Loading } from "../../components/common";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../utils/constants";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button, FileInput, Label } from "flowbite-react";
import { FiUploadCloud } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [proffesion, setProffesion] = useState("");
  const [address, setAddress] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [biography, setBiography] = useState("");
  const [picture, setPicture] = useState("");
  const [preview, setPreview] = useState("");
  const [userInfoId, setUserInfoId] = useState(0);
  const [editable, setEditable] = useState(false);
  const [userHasData, setUserHasData] = useState(true);
  const { global, auth } = useSelector(state => state);
  const { t } = useTranslation();
  const queryClient = useQueryClient()

  const { isLoading, error } = useQuery("profile", () => {
    return axios.get(`${SERVER_URL}/api/${global.lang}/users/${auth.user.id}/data`).then((res)=>res.data);
  },
  {
    onSuccess: ({success, data}) => {
      if (success) {
        const { user } = data;
        setUserInfoId(user.userinfos.id);
        setFirstName(user.userinfos.first_name);
        setLastName(user.userinfos.last_name);
        setPhone(user.userinfos.phone);
        setProffesion(user.userinfos.proffesion);
        setAddress(user.userinfos.address);
        setLinkedinUrl(user.userinfos.linkedin_url);
        setWebsiteUrl(user.userinfos.website_url);
        setPreview(`${SERVER_URL}/${user.userinfos.picture}`);
        setBiography(user.userinfos.biography);
      } else {
        setUserHasData(false);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
  });
  
  const handleFileInput = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const ext = file.name.split(".").pop();
      if (["jpeg", "png", "jpg", "gif"].includes(ext)) {
        setPicture(file);
        setPreview(URL.createObjectURL(file));
      } else {
        toast.error(t("dashboard.invalide_file_type"), {duration: 3000});
      }
    }
  };

  const mutation = useMutation((data) => { 
    return axios.post(`${SERVER_URL}/api/${global.lang}/user-infos/${userInfoId}?_method=PUT`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).then((res)=>res.data);
  },
    {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message, { duration: 5000 });
          queryClient.invalidateQueries('profile');
        } else {
          let errors = data.data;
          if (errors) {          
            Object.keys(errors).forEach((key) => {
              toast.error(errors[key][0], { duration:2000 });
            });
          } else {
            toast.error(data.message, { duration:2000 });          
          }
        }
      },
      onError: (error) => {
        console.log(error);
        toast.error(t("dashboard.error_something_wrong"), { duration: 5000 });
      },
    }
  );

  const updateInfo = () => {
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone", phone);
    formData.append("proffesion", proffesion);
    formData.append("address", address);
    formData.append("linkedin_url", linkedinUrl);
    formData.append("website_url", websiteUrl);
    if (picture) {
      formData.append("picture", picture);
    }
    formData.append("biography", biography);
    formData.append("user_id", auth.user.id);
    mutation.mutate(formData);
    setEditable(false);
  }

  if (isLoading || mutation.isLoading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <div className="relative bg-white w-full h-full rounded-[10px] flex flex-col md:flex-row overflow-y-scroll p-[40px] gap-[20px]">
      {!userHasData ? (
        <div className="w-full h-full flex flex-col justify-center items-center gap-[20px]">
          <p className="text-royal-purple text-center text-[20px] font-semibold">{t("dashboard.setup_profile")}</p>
          <Link to="create-resume/1/personal-info" className="bg-royal-purple border-royal-purple p-2 text-white rounded-lg" >
            {t("dashboard.create_resume")}
          </Link>
        </div>
      ) : (
          <>  
            <div className="absolute left-[20px] top-[20px] w-[40px] h-[40px] flex justify-center items-center rounded-full">
              <Button className="bg-royal-purple border-royal-purple w-[40px] h-[40px] rounded-full" onClick={() => setEditable(!editable)}>
                {editable ? (<MdOutlineClose className="text-lg"/>) : (<FaPencilAlt  className="text-lg"/>)}
              </Button>
            </div>
      
            {editable ? (
              <>
                <div className="flex flex-col md:basis-1/3 justify-evenly gap-[20px]">
                  <div className="flex items-center justify-center">
                      <Label
                        htmlFor="dropzone-file"
                        className="dark:hover:bg-bray-800 flex w-[180px] h-[180px] cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-royal-purple bg-[#EFF1F9] hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        {preview ? (
                            <img
                              src={preview}
                              alt="Preview"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                              <FiUploadCloud className='text-[70px] text-royal-purple'/>
                              <p className="text-center mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">{ t("dashboard.click_to_upload")}</span>
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">jpeg, png, jpg, gif</p>
                            </div>
                          )}
                        <FileInput onChange={handleFileInput} id="dropzone-file" className="hidden" />
                      </Label>
                  </div>
                  <Input placeholder={t("dashboard.first_name")} value={firstName} setValue={setFirstName}/>
                  <Input placeholder={t("dashboard.last_name")} value={lastName} setValue={setLastName} />
                  <Input placeholder={t("dashboard.phone")} value={phone} setValue={setPhone} />
                </div>
                <div className="flex flex-col md:basis-2/3 justify-evenly">
                  <div className="flex w-full flex-wrap gap-[20px] justify-between">
                    <div className="flex flex-col w-full md:w-[45%] gap-[20px]">
                        <Input placeholder={t("dashboard.address")} value={address} setValue={setAddress}/>
                        <Input placeholder={t("dashboard.linkedin_url")} value={linkedinUrl} setValue={setLinkedinUrl}/>
                    </div>
                    <div className="flex flex-col w-full md:w-[45%] gap-[20px]">
                        <Input placeholder={t("dashboard.profession")} value={proffesion} setValue={setProffesion}/>
                        <Input placeholder={t("dashboard.website_url")} value={websiteUrl} setValue={setWebsiteUrl}/>
                    </div>
                    <textarea defaultValue={biography} onChange={e=>setBiography(e.target.value)} className='w-full min-h-[200px] rounded-lg text-royal-purple bg-[#EFF1F9] border-0 p-[10px] focus:ring-0 placeholder-[#ABAFB1]  mb-2 capitalize resize-none text-justify' placeholder={t("dashboard.biography")}>
                    </textarea>
                  </div>
                  <div>
                    <Button className="bg-royal-purple border-royal-purple float-right" onClick={updateInfo}>{t("dashboard.save")}</Button>
                  </div>
                </div>
              </>
            ) : (
                <div className="w-full flex flex-col justify-center items-center">
                  <img className="w-36 h-36 rounded-full mx-auto border-[5px] border-royal-purple" src={preview} alt="" />
                  <div className="text-sm mt-5">
                    <p className="text-[28px] font-medium mb-3 text-center text-midnight-blue">
                      {firstName} {lastName}
                    </p>
                    <p className="text-center text-royal-purple text-lg">{proffesion}</p>
                  </div>
                  <p className="mt-2 text-[17px] text-gray-500 text-center w-[84%] mb-3">{biography}</p>
                  <div className="flex p-2 w-50 justify-evenly items-center gap-[10px]">
                    {linkedinUrl.length > 0 && (
                      <a href={linkedinUrl}>
                        <FaLinkedin className="text-royal-purple text-[25px]" />
                      </a>
                    )}
                    <a href={`mailto:${auth.user.email}`}>
                        <MdAlternateEmail className="text-royal-purple text-[25px]" />
                    </a>
                    {websiteUrl.length > 0 && (
                      <a href={websiteUrl}>
                        <FaLink className="text-royal-purple text-[25px]" />
                      </a>
                    )}
                  </div>
                </div>
            )}
          </>
      )}
    </div>
  )
}

export default Profile