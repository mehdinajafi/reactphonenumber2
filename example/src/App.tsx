import React, { useState } from 'react'
import { ReactPhonenumber } from 'reactphonenumber2'

const countries = [
  { code: 'IR', name: 'Iran', dialingCode: '98' },
  { code: 'AF', name: 'Afghanistan', dialingCode: '93' },
  { code: 'AL', name: 'Albania', dialingCode: '213' },
  { code: 'AS', name: 'American Samoa', dialingCode: '1684' }
]

const App = () => {
  const [phoneNumber, setphoneNumber] = useState<string>('')

  const changePhoneNumber = (phoneNumber: string, selected: any) => {
    setphoneNumber(phoneNumber ? phoneNumber : '')
    console.log(
      JSON.stringify(
        {
          phoneNumber,
          selected
        },
        null,
        2
      )
    )
  }

  return (
    <div>
      <ReactPhonenumber
        options={{ dir: 'ltr' }}
        onChange={changePhoneNumber}
        countries={countries}
        defaultCode='IR'
      />
      <ReactPhonenumber
        options={{ dir: 'ltr' }}
        onChange={changePhoneNumber}
        countries={countries}
        defaultCode='AS'
      />
    </div>
  )
}

export default App
