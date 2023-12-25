import { t } from 'i18next'
import React from 'react'

const Steper = ({tab}) => {
  return (
    <div className="w-[90%] flex flex-col items-end pt-5 mb-[25px]">
        <div className="w-full flex justify-between mb-1">
            <h1 className="text-[22px] text-[#888] capitalize">{tab.title}</h1>
            <span className="text-royal-purple text-sm py-2">{t("dashboard.step")} {tab.index} <span className="text-[#AAA]">{t("dashboard.of")} 5</span> </span>
        </div>
        <div className="w-[100%] h-[6px] bg-gentle-sky rounded-full">
            <div className="h-full bg-royal-purple rounded-full transition-all duration-500" style={{width:`${100 * tab.index / 5}%`}}></div>
        </div>
    </div>
  )
}

export default Steper