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
    setSkills
  } = useOutletContext();
  const [skillTags, setSkillTags] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [language, setLanguage] = useState("");
  const [languageLevel, setLanguageLevel] = useState("");
  const [languages, setLanguages] = useState("");
  let langItem = {};

  useEffect(() => {
    setTab({ index: 3, title: "dashboard.skills" });
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
    langItem[language] = languageLevel;
    setLanguages([
      ...languages,
      langItem
    ]);
    setLanguage("");
    setLanguageLevel("");
  }

  const daleteLanguage = (i) => {
    const newLanguages = [...languages];
    newLanguages.splice(i, 1);
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
          {languages.length > 0 ? languages.map((lang, i) => (
            <div key={i} className="flex p-3 justify-between bg-white rounded-lg text-royal-purple">
              <div className="flex gap-[30px]">
                <span>{Object.keys(lang)[0]}</span>
                <span>:</span>
                <span>{Object.values(lang)[0]}</span>
              </div>
              <Button className='w-[25px] h-[25px]'>
                <IoMdClose className='text-[red] text-[22px]' onClick={() => daleteLanguage(i)} />
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