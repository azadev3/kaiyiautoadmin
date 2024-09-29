import React from 'react'
import MainTitle from '../uitils/MainTitle'
import ShowComponent from '../uitils/ShowComponent'

const SubscribtionNews:React.FC = () => {

  return (
    <div className='route-component'>
     <MainTitle children="Xəbərlər - Abunəliklər" msg="Ana səhifədə yerləşən xəbərlərə gələn mail ünvanları." />           
     <ShowComponent />
    </div>
  )
}

export default SubscribtionNews