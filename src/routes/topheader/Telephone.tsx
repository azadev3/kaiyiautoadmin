import React from 'react'
import MainTitle from '../../uitils/MainTitle'
import ShowComponent from '../../uitils/ShowComponent'

const Telephone:React.FC = () => {

  return (
    <div className='route-component'>
     <MainTitle children="Telephone" msg="Üst headerda yerləşən telefonu dəyişdir, sil və ya yenilə." />           
     <ShowComponent />
    </div>
  )
}

export default Telephone