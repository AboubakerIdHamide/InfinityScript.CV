import { t } from 'i18next';
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { TagsInput } from "react-tag-input-component";
import { Input } from '../../common';
import { Button } from 'flowbite-react';
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

const Skills = () => {
  const {
    setTab,
    skills,
    setSkills,
    setShowSaveBtns
  } = useOutletContext();
  const [skillTags, setSkillTags] = useState(skills?.skills || []);
  const [hobbies, setHobbies] = useState(skills?.hobbies || []);
  const [language, setLanguage] = useState("");
  const [languageLevel, setLanguageLevel] = useState("");
  const [languages, setLanguages] = useState(skills?.languages || {});

  useEffect(() => {
    setTab({ index: 3, title: "dashboard.skills" });
    setShowSaveBtns(false);
  }, []);

  useEffect(() => {
    setSkills({
      skills: skillTags,
      hobbies,
      languages
    });
  }, [
    skillTags,
    hobbies,
    languages
  ]);

  const addLanguage = () => {
    const newLanguages = { ...languages };
    newLanguages[language] = languageLevel;
    setLanguages(newLanguages);
    setLanguage("");
    setLanguageLevel("");
  }

  const daleteLanguage = (key) => {
    const newLanguages = {...languages};
    delete newLanguages[key];
    setLanguages(newLanguages);
  }

  return (
    <div className='relative mt-[25px] w-[90%] md:h-[65%] flex flex-col md:flex-row gap-[15px]'>
      <div className="flex flex-col md:h-[90%] md:basis-1/2 justify-evenly gap-[20px]">
        <TagsInput
          value={skillTags}
          onChange={setSkillTags}
          name="skills"
          separators={[",", "Enter"]}
          placeHolder={t("dashboard.enter_skills")}
          classNames={{ input: "bg-[#EFF1F9] focus:ring-0", tag: "bg-white p-1 text-royal-purple" }}
        />
        <TagsInput
          value={hobbies}
          onChange={setHobbies}
          name="hobbies"
          placeHolder={t("dashboard.enter_hobbies")}
          classNames={{ input: "bg-[#EFF1F9] focus:ring-0 w-[60%]", tag: "bg-white p-1 text-royal-purple" }}
        />
      </div>
      <div className="flex flex-col md:h-[90%] md:basis-1/2 justify-evenly">
        <Input placeholder={t("dashboard.language")} value={language} setValue={setLanguage} />
        <Input placeholder={t("dashboard.language_level")} value={languageLevel} setValue={setLanguageLevel} />
        <div className="flex bg-[#EFF1F9] flex-col rounded-lg h-[60%] p-2 overflow-y-scroll gap-[15px]">
          {Object.keys(languages).length > 0 ? Object.keys(languages).map((key, i) => (
            <div key={i} className="flex p-3 justify-between bg-white rounded-lg text-royal-purple">
              <div className="flex gap-[30px]">
                <span>{key}</span>
                <span>:</span>
                <span>{languages[key]}</span>
              </div>
              <Button className='w-[25px] h-[25px]'>
                <IoMdClose className='text-[red] text-[22px]' onClick={() => daleteLanguage(key)} />
              </Button>
            </div>
          )) : (
            <div className="flex justify-center items-center h-full">
              <span className="text-royal-purple">{t("dashboard.no_languages")}</span>
            </div>
          )}
        </div>
      </div>
      <Button onClick={addLanguage} className='absolute right-0 -top-[40px] bg-royal-purple w-[35px] h-[35px]'>
        <FaPlus className='text-white'/>
      </Button>
    </div>
  )
}

export default Skills