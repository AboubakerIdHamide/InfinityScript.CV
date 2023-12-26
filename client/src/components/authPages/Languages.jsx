
import { languages } from '../../utils/constants';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from "../../store/reducers/global";

const Languages = () => {
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);
    
    const changeLanguage = (languageCode) => {
        i18n.changeLanguage(languageCode);
        dispatch(setLanguage(languageCode));
      };

    return(
        <ul className="flex flex-wrap items-center justify-center text-gray-900 text-white text-xs font-bold mt-5">
          {languages.map((language, index) =>  (
                <li>
                    <span key={index} className='me-4 hover:underline md:me-2 cursor-pointer' onClick={() => changeLanguage(language.code)}>{language.name}</span>
                </li>
            )
          )}
        </ul>
    )
}

export default Languages