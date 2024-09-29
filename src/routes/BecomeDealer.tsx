import React from 'react'
import MainTitle from '../uitils/MainTitle'
import ShowComponent from '../uitils/ShowComponent'

const BecomeDealer:React.FC = () => {

  return (
    <div className='route-component'>
     <MainTitle children="Diler ol" msg="Ana səhifədə yerləşən Diler Ol hissəsini dəyişdir, sil və ya yenilə." />           
     <ShowComponent />
    </div>
  )
}

export default BecomeDealer