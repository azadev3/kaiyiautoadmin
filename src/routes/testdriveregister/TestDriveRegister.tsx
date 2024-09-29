import React from 'react'
import MainTitle from '../../uitils/MainTitle'
import ShowComponent from '../../uitils/ShowComponent'
const TestDriveRegister:React.FC = () => {

  return (
    <div className='route-component'>
     <MainTitle children="Test Sürüşü Üçün Qeydiyyat" msg="Test sürüşü üçün qeydiyyat hissəsini dəyişdir, sil və ya yenilə." />           
     <ShowComponent />
    </div>
  )
}

export default TestDriveRegister