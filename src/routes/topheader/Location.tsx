import React from 'react'
import MainTitle from '../../uitils/MainTitle'
import ShowComponent from '../../uitils/ShowComponent'

const Location:React.FC = () => {

  return (
    <div className='route-component'>
     <MainTitle children="Location" msg="Üst headerda yerləşən Location icon + Title dəyişdir, sil və ya yenilə." />           
     <ShowComponent />
    </div>
  )
}

export default Location