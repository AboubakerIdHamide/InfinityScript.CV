import { t } from 'i18next';
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { Input } from '../../common';
import { Button } from 'flowbite-react';
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Experiences = () => {
  const {
    setTab,
    experiences,
    setExperiences,
    setShowSaveBtns
  } = useOutletContext();

  const [title, setTitle] = useState("");
  const [employementType, setEmployementType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [locationType, setLocationType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [currentExperience, setCurrentExperience] = useState(null);

  useEffect(() => {
    setTab({ index: 4, title: "dashboard.experience" });
    setShowSaveBtns(true);
  }, []);

  useEffect(() => {
    setCurrentExperience({
      title,
      employement_type : employementType,
      company_name : companyName,
      location,
      location_type : locationType,
      start_date : startDate,
      end_date : endDate,
      description,
    })
  }, [
    companyName,
    description,
    employementType,
    endDate,
    location,
    locationType,
    startDate,
    title
  ]);

  const addExperiences = () => {
    setExperiences([
      ...experiences,
      currentExperience
    ]);
    setTitle("");
    setEmployementType("");
    setCompanyName("");
    setLocation("");
    setLocationType("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  }

  const deleteExperience = (i, e) => {
    e.stopPropagation();
    const newExperiences = [...experiences];
    newExperiences.splice(i, 1);
    setExperiences(newExperiences);
  }

  const modify = (experience, i, e) => {
    setTitle(experience.title);
    setEmployementType(experience.employement_type);
    setCompanyName(experience.company_name);
    setLocation(experience.location);
    setLocationType(experience.location_type);
    setStartDate(experience.start_date);
    setEndDate(experience.end_date);
    setDescription(experience.description);
    deleteExperience(i,e)
  }
  
  return (
    <div className='relative mt-[25px] w-[90%] md:h-[65%] flex flex-col md:flex-row gap-[15px]'>
      <div className="flex flex-col md:h-[90%] md:basis-1/2 justify-between">
        <Input placeholder={t("dashboard.title")} value={title} setValue={setTitle}/>
        <Input placeholder={t("dashboard.employement_type")} value={employementType} setValue={setEmployementType} />
        <Input placeholder={t("dashboard.company_name")} value={companyName} setValue={setCompanyName} />
        <Input placeholder={t("dashboard.location")} value={location} setValue={setLocation}/>
        <Input placeholder={t("dashboard.location_type")} value={locationType} setValue={setLocationType} />
      </div>
      <div className="flex flex-col md:h-[90%] md:basis-1/2 justify-evenly">
        <textarea value={description} onChange={e=>setDescription(e.target.value)} className='w-full h-full rounded-lg text-royal-purple bg-[#EFF1F9] border-0 p-[10px] focus:ring-0 placeholder-[#ABAFB1]  mb-2 capitalize resize-none' placeholder={t("dashboard.description")}>
        </textarea>
        <div className='w-full flex flex-col mt-1'>
          <span className='ms-2 text-[14px] text-royal-purple'>{t("dashboard.start_date")}</span>
          <Input type="date" value={startDate} setValue={setStartDate}/>
        </div>
        <div className='w-full flex flex-col mt-1'>
          <span className='ms-2 text-[14px] text-royal-purple'>{t("dashboard.end_date")}</span>
          <Input type="date" value={endDate} setValue={setEndDate}/>
        </div>
      </div>
      <Button onClick={addExperiences} className='absolute right-0 -top-[40px] bg-royal-purple w-[35px] h-[35px]'>
        <FaPlus className='text-white'/>
      </Button>
      {
        experiences.length > 0 && (
        <div className="absolute bg-[#EFF1F9]  right-[50px] -top-[40px] w-[80%] md:w-[40%] h-[35px] rounded-[5px] p-1 flex gap-[8px] overflow-x-scroll overflow-hidden-scroll">
          {experiences.map((experience, i) => (
            <div key={`exp-${i}`} className="w-fit flex rounded-lg bg-white p-1 justify-between items-center gap-[8px] cursor-pointer"  onClick={(e)=>modify(experience, i, e)}>
              <span className='text-[12px] whitespace-nowrap'>{experience.title}</span>
              <Button className='bg-royal-purple w-[20px] h-[20px]  rounded-lg' onClick={(e)=>deleteExperience(i, e)}>
                <IoMdClose />
              </Button>
            </div>
          ))}
        </div>
        )
      }
    </div>
  )
}

export default Experiences