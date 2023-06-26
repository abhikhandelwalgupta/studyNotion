import React from 'react'
import Template from '../components/core/Auth/Template'
import signupImg from "../assets/Images/signup.webp"

const SignUp = () => {
  return (
    <Template
    title={"Join the millions learning to code with StudyNotion for free"}
    image={signupImg}
    description1={"Build skills for today, tomorrow, and beyond."}
    description2={"Education to future-proof your career."}
    formType={"signup"}
    />
  )
}

export default SignUp