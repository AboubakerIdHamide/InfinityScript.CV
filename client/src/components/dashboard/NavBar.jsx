import { Avatar, Dropdown, Navbar, Select } from 'flowbite-react';
import { languages } from '../../utils/constants';
import { useTranslation } from 'react-i18next';

const NavBar = ({ setIsOpen, isOpen }) => {
  const { i18n } = useTranslation();
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <Navbar fluid rounded className='h-[10vh]'>
      <Navbar.Brand href="/">
        <img src="/logo-no-background.png" className="mr-3 h-6 sm:h-9" alt="InfinityScript.CV" />
        <span className="self-center text-royal-purple whitespace-nowrap text-xl font-semibold dark:text-white">InfinityScript.CV</span>
      </Navbar.Brand>
      <div className="flex">
        <select onChange={changeLanguage} className="font-mono text-royal-purple font-bold w-[106px] text-sm me-2 border-0 focus:ring-0">
          {languages.map((language, index) =>  (
                <option className='p-[10px]' key={index} value={language.code}>{language.name}</option>
            )
          )}
        </select>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle className='ms-2 bg-royal-purple hover:bg-white text-white hover:text-royal-purple' onClick={()=>setIsOpen(!isOpen)} />
      </div>
    </Navbar>
  )
}
export default NavBar