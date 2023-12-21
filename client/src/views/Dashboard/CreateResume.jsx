// import React from 'react'
import { useParams } from "react-router-dom";


const CreateResume = () => {
  const { template_id } = useParams();
  return (
    <div>CreateResume : {template_id}</div>
  )
}

export default CreateResume