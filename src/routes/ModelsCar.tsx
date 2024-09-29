import React from 'react'
import MainTitle from '../uitils/MainTitle'
import ShowComponent from '../uitils/ShowComponent'

const ModelsCar:React.FC = () => {

  return (
    <div className='route-component'>
     <MainTitle children="Modellər" msg="Maşınların modellərini əlavə edin, dəyişdirin, silin." />           
     <ShowComponent />
    </div>
  )
}

export default ModelsCar