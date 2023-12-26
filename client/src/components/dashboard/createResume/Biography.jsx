import { FileInput, Label } from 'flowbite-react';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FiUploadCloud } from "react-icons/fi";
import { t } from 'i18next';

const Biography = () => {
  const { setTab } = useOutletContext();

  useEffect(() => {
    setTab({ index: 1, title: "dashboard.biography"});
  }, []);

    return (
      <div className='mt-[25px] w-[90%] md:h-[65%] flex flex-col md:flex-row gap-[15px]'>
      <div className="md:basis-1/3 h-[80%]">
        <div className="flex w-full h-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="dark:hover:bg-bray-800 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-royal-purple bg-[#EFF1F9] hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <FiUploadCloud className='text-[70px] text-royal-purple'/>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">{ t("dashboard.click_to_upload")}</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">jpeg, png, jpg, gif</p>
            </div>
            <FileInput id="dropzone-file" className="hidden" />
          </Label>
        </div>
      </div>
      <div className="md:basis-2/3  h-[80%]">
        <textarea className='w-full h-full rounded-lg text-royal-purple bg-[#EFF1F9] border-0 p-[10px] focus:ring-0 placeholder-[#ABAFB1]  mb-2 capitalize resize-none' placeholder={t("dashboard.biography")}>
            
        </textarea>
      </div>
    </div>
    )
}

export default Biography