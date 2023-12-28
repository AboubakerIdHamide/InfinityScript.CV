import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const Experiences = () => {
  const { setTab } = useOutletContext();
  useEffect(() => {
    setTab({ index: 4, title: "dashboard.experience" });
  }, []);
  
  return (
    <div>Experiences</div>
  )
}

export default Experiences