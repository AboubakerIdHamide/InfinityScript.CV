import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const Skills = () => {
  const { setTab } = useOutletContext();

  useEffect(() => {
    setTab({ index: 3, title: "dashboard.skills" });
  }, []);

  return (
    <div>Skills</div>
  )
}

export default Skills