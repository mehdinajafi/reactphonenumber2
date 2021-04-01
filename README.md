# react-phonenumber2

> Telephone number input React component. Made with jquery and select2.

[![NPM](https://img.shields.io/npm/v/reactphonenumber2.svg)](https://www.npmjs.com/package/reactphonenumber2) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img alt="TypeScript" src="https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white"/> <img alt="jQuery" src="https://img.shields.io/badge/jquery%20-%230769AD.svg?&style=for-the-badge&logo=jquery&logoColor=white"/>

## Install

```bash
npm install --save reactphonenumber2
```

## Usage

First put the following link tag in your html file:

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/css/flag-icon.min.css"
/>
```

```jsx
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

  const changePhoneNumber = (phoneNumber: string, selected:any) => {
    console.log(JSON.stringify({
      phoneNumber, selected
    }, null, 2))
  }

  return (
    <div>
      <ReactPhonenumber
        onChange={changePhoneNumber}
        countries={countries}
        defaultCode="IR"
      />
    </div>
  )
}

export default App
```

## License

MIT © [mehdinajafi](https://github.com/mehdinajafi)
