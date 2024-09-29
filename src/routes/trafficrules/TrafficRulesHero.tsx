import React from 'react'
import MainTitle from '../../uitils/MainTitle'
import ShowComponent from '../../uitils/ShowComponent'

const TrafficRulesHero:React.FC = () => {

  return (
    <div className='route-component'>
     <MainTitle children="Yol Qaydaları - Hero hissə" msg="Yol qaydaları səhifəsində yerləşən Hero hissəsini dəyişdir, sil və ya yenilə." />           
     <ShowComponent />
    </div>
  )
}

export default TrafficRulesHero