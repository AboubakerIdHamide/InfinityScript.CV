import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { Input } from '../../common';
import { t } from 'i18next';
import { Button } from 'flowbite-react';
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Educations = () => {
  const {
    setTab,
    educations,
    setEducations,
    setShowSaveBtns
  } = useOutletContext();
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [currentEducation, setCurrentEducation] = useState(null);
  
  useEffect(() => {
    setTab({ index: 2, title: "dashboard.education" });
    setShowSaveBtns(false);
  }, []);

  useEffect(() => {
    setCurrentEducation({
        school,
        degree,
        start_date: startDate,
        end_date: endDate,
        description
    })
  }, [
    school,
    degree,
    startDate,
    endDate,
    description,
  ]);

  const addEducation = () => {
    setEducations([
      ...educations,
      currentEducation
    ]);
    setSchool("");
    setDegree("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  }

  const deleteEducation = (i, e) => {
    e.stopPropagation();
    const newEducations = [...educations];
    newEducations.splice(i, 1);
    setEducations(newEducations);
  }

  const modify = (education, i, e) => {
    setSchool(education.school);
    setDegree(education.degree);
    setStartDate(education.start_date)
    setEndDate(education.end_date)
    setDescription(education.description);
    deleteEducation(i,e)
  }

  return (
    <div className='relative mt-[25px] w-[90%] md:h-[65%] flex flex-col md:flex-row gap-[15px]'>
      <div className="flex flex-col md:h-[90%] md:basis-1/2 justify-between">
        <Input placeholder={t("dashboard.school")} value={school} setValue={setSchool}/>
        <Input placeholder={t("dashboard.degree")} value={degree} setValue={setDegree} />
        <div className='w-full flex flex-col mt-1'>
          <span className='ms-2 text-[14px] text-royal-purple'>{t("dashboard.start_date")}</span>
          <Input type="date" value={startDate} setValue={setStartDate} />
        </div>
        <div className='w-full flex flex-col mt-1'>
          <span className='ms-2 text-[14px] text-royal-purple'>{t("dashboard.end_date")}</span>
          <Input type="date" value={endDate} setValue={setEndDate}/>
        </div>
      </div>
      <div className="flex flex-col md:h-[90%] md:basis-1/2 justify-evenly">
        <textarea value={description} onChange={e=>setDescription(e.target.value)} className='w-full h-full rounded-lg text-royal-purple bg-[#EFF1F9] border-0 p-[10px] focus:ring-0 placeholder-[#ABAFB1]  mb-2 capitalize resize-none' placeholder={t("dashboard.description")}>
        </textarea>
      </div>
      <Button onClick={addEducation} className='absolute right-0 -top-[40px] bg-royal-purple w-[35px] h-[35px]'>
        <FaPlus className='text-white'/>
      </Button>
      {
        educations.length > 0 && (
        <div className="absolute bg-[#EFF1F9]  right-[50px] -top-[40px] w-[80%] md:w-[40%] h-[35px] rounded-[5px] p-1 flex gap-[8px] overflow-x-scroll overflow-hidden-scroll">
          {educations.map((education, i) => (
            <div key={`edu-${i}`} className="w-fit flex rounded-lg bg-white p-1 justify-between items-center gap-[8px] cursor-pointer" onClick={(e)=>modify(education, i, e)}>
              <span className='text-[12px] whitespace-nowrap'>{education.school}</span>
              <Button className='bg-royal-purple w-[20px] h-[20px]  rounded-lg' onClick={(e)=>deleteEducation(i, e)}>
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

export default Educations