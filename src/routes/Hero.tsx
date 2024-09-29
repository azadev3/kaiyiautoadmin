import React from 'react'
import MainTitle from '../uitils/MainTitle'
import ShowComponent from '../uitils/ShowComponent'

const Hero:React.FC = () => {

  return (
    <div className='route-component'>
     <MainTitle children="Hero" msg="Ana səhifədə yerləşən əsas hissəni dəyişdir, sil və ya yenilə." />           
     <ShowComponent />
    </div>
  )
}

export default Hero