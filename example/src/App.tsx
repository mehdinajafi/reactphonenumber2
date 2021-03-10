import React, { useState } from 'react'

import { ReactPhonenumber } from 'reactphonenumber2'

const countries = [
  { id: 'IR', name: 'Iran', dialingCode: '98' },
  { id: 'AF', name: 'Afghanistan', dialingCode: '93' },
  { id: 'AL', name: 'Albania', dialingCode: '213' },
  { id: 'AS', name: 'American Samoa', dialingCode: '1684' }
]

const App = () => {
  const [phoneNumber, setphoneNumber] = useState<string>('')

  const changePhoneNumber = (phoneNumber: string) => {
    setphoneNumber(phoneNumber ? phoneNumber : '')
  }

  return (
    <div>
      <ReactPhonenumber
        options={{ dir: 'ltr' }}
        onChange={changePhoneNumber}
        countries={countries}
      />
    </div>
  )
}

export default App
