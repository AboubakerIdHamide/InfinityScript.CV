import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Input } from '../../common';
import { useSelector } from 'react-redux';

const PersonalInfo = () => {
  const {
    setTab,
    setUserInfo,
  } = useOutletContext();
  
  const { auth } = useSelector(state => state);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(auth.user.email);
  const [phone, setPhone] = useState("");
  const [proffesion, setProffesion] = useState("");
  const [address, setAddress] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  useEffect(() => {
    setTab({ index: 0, title: "dashboard.personal_info" });
  }, []);

  useEffect(() => {
    setUserInfo({
      user_id: auth.user.id,
      first_name: firstName,
      last_name: lastName,
      phone,
      address,
      proffesion,
      linkedin_url: linkedinUrl,
      website_url : websiteUrl
    });
  }, [
    firstName,
    lastName,
    phone,
    address,
    proffesion,
    linkedinUrl,
    websiteUrl
  ]);

  return (
    <div className='w-[90%] md:h-[65%] flex flex-col md:flex-row gap-[15px]'>
      <div className="flex flex-col md:basis-1/2 justify-evenly">
        <Input placeholder={t("dashboard.first_name")} value={firstName} setValue={setFirstName}/>
        <Input placeholder={t("dashboard.last_name")} value={lastName} setValue={setLastName}/>
        <Input placeholder={t("dashboard.email")} value={email} setValue={setEmail}/>
        <Input placeholder={t("dashboard.phone")} value={phone} setValue={setPhone}/>
      </div>
      <div className="flex flex-col md:basis-1/2 justify-evenly">
        <Input placeholder={t("dashboard.profession")} value={proffesion} setValue={setProffesion}/>
        <Input placeholder={t("dashboard.address")} value={address} setValue={setAddress}/>
        <Input placeholder={t("dashboard.linkedin_url")} value={linkedinUrl} setValue={setLinkedinUrl}/>
        <Input placeholder={t("dashboard.website_url")} value={websiteUrl} setValue={setWebsiteUrl}/>
      </div>
    </div>
  )
}

export default PersonalInfo