import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const Educations = () => {
  const { setTab } = useOutletContext();
  useEffect(() => {
    setTab({ index: 2, title: "dashboard.education" });
  }, []);

  return (
    <div>Educations</div>
  )
}

export default Educations