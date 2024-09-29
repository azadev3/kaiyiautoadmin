import React from 'react'
import MainTitle from '../../uitils/MainTitle'
import ShowComponent from '../../uitils/ShowComponent'

const Logo:React.FC = () => {

  return (
    <div className='route-component'>
     <MainTitle children="Logo" msg="Üst headerda yerləşən loqonu dəyişdir, sil və ya yenilə." />           
     <ShowComponent />
    </div>
  )
}

export default Logo