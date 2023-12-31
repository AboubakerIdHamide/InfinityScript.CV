import { FileInput, Label } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FiUploadCloud } from "react-icons/fi";
import { t } from 'i18next';
import toast from "react-hot-toast";

const Biography = () => {
  const {
    setTab,
    biography,
    setBiography,
    setShowSaveBtns
  } = useOutletContext();
  const [file, setFile] = useState(biography?.file);
  const [preview, setPreview] = useState(biography?.preview);
  const [description, setDescription] = useState(biography?.description);

  useEffect(() => {
    setTab({ index: 1, title: "dashboard.biography" });
      setShowSaveBtns(false);
  }, []);

  useEffect(() => {
    setBiography({ file, description, preview });
  }, [file, description]);

  const handleFileInput = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const ext = file.name.split(".").pop();
      if (["jpeg", "png", "jpg", "gif"].includes(ext)) {
        setFile(file);
        setPreview(URL.createObjectURL(file));
      } else {
        toast.error(t("dashboard.invalide_file_type"), {duration: 3000});
      }
    }
  };

    return (
      <div className='mt-[25px] w-[90%] md:h-[65%] flex flex-col md:flex-row gap-[15px]'>
        <div className="md:basis-1/3 md:h-[80%]">
          <div className="flex w-full h-full items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="dark:hover:bg-bray-800 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-royal-purple bg-[#EFF1F9] hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
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
        </div>
        <div className="md:basis-2/3 min-h-[300px] md:min-h-[100px]  md:h-[80%]">
          <textarea defaultValue={description} onChange={e=>setDescription(e.target.value)} className='w-full h-full rounded-lg text-royal-purple bg-[#EFF1F9] border-0 p-[10px] focus:ring-0 placeholder-[#ABAFB1]  mb-2 capitalize resize-none' placeholder={t("dashboard.biography")}>
          </textarea>
        </div>
      </div>
    )
}

export default Biography