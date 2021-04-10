import * as React from 'react'
import $ from 'jquery'
import { createUseStyles } from 'react-jss'
import { v4 as uuidv4 } from 'uuid'
import 'select2/dist/js/select2.min.js'
import 'select2/dist/css/select2.min.css'

interface country {
  code: string
  name: string
  dialingCode: string
}

interface Props {
  inputValue?: string
  defaultCode?: string
  options?: Select2.Options
  className?: string
  dir?: 'ltr' | 'rtl'
  searchDir?: 'ltr' | 'rtl'
  onChange: (
    phoneNumber: string,
    selected: country,
    phoneNumberInputValue: string
  ) => void
  countries: country[]
}

const useStyles = createUseStyles((props) => ({
  inputsWrapper: {
    display: 'flex',
    '& .phone-number-input': {
      direction: 'ltr',
      MozAppearance: 'textfield'
    },
    '& .phone-number-input::-webkit-outer-spin-button, .phone-number-input::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0
    },
    '& .select2-container': {
      right: '0',
      left: '0 !important'
    },
    '& .select2-container .select2-dropdown': {
      width: '100% !important',
      right: '0',
      left: '0'
    },
    '& .select2-container .select2-selection': {
      right: '0',
      left: '0',
      outline: 'none',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center'
    },
    "& .select2-container--default[dir='rtl'] .select2-selection--single .select2-selection__arrow": {
      left: 'auto',
      right: '0.5em'
    },
    "& .select2-container[dir='rtl'] .select2-selection--single .select2-selection__rendered": {
      paddingRight: '25px',
      paddingLeft: '10px'
    },
    '& .select2-container--default .select2-results__option--highlighted.select2-results__option--selectable': {
      '& div > div > span': {
        color: '#fff !important'
      }
    }
  }
}))

export const ReactPhonenumber: React.FC<Props> = ({
  inputValue,
  onChange,
  defaultCode,
  countries,
  options,
  className = '',
  dir
}) => {
  const [phoneNumberValue, setPhoneNumberValue] = React.useState(
    inputValue ? Number(inputValue).toString() : ''
  )
  const [selected, setSelected] = React.useState(
    defaultCode
      ? countries.filter((country) => country.code === defaultCode)[0]
      : countries[0]
  )
  const [selectedDialingCode, setSelectedDialingCode] = React.useState(
    defaultCode
      ? countries.filter((country) => country.code === defaultCode)[0]
          .dialingCode
      : countries[0].dialingCode
  )

  const [randomId, setRandomId] = React.useState<string>(uuidv4())

  const classes = useStyles({ props: 'rtl' })

  // handle OnChanges
  const handleOnChangePhoneNumberValue = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setPhoneNumberValue((e.target as HTMLInputElement).value)
  }

  const handleOnChangeSelected = (country: country) => {
    setSelected(country)
  }

  const handleOnChangeDialogCode = (dialingCode: string) => {
    setSelectedDialingCode(dialingCode)
  }

  // OnChange Function
  React.useEffect(() => {
    onChange(
      selectedDialingCode + Number(phoneNumberValue).toString(),
      selected,
      Number(phoneNumberValue).toString()
    )
  }, [selected, phoneNumberValue, onChange])

  // Select2
  React.useEffect(() => {
    function formatState(country: any) {
      if (!country.code) {
        return country.name
      }

      const $country = $(
        `<div dir="ltr" style="display: flex; align-items: center; justify-content: space-between; width: 100%">
          <div style="margin-left: 0.5em; margin-right: 0.5em">
            <span class="flag-icon flag-icon-${country.code.toLowerCase()} flag-icon-squared"></span>
          </div>
          <div>
            <span>${
              country.dialingCode
                ? '+' + country.dialingCode
                : '<i class="fa fa-globe" aria-hidden="true"></i>'
            }</span>
          </div>
        </div>`
      )

      return $country
    }

    function templateResult(country: any) {
      if (!country.code) {
        return country.name
      }

      const $country = $(
        `
        <div style="display: flex; align-items: center; flex-direction: ${
          options?.dir === 'rtl' ? 'row-reverse' : 'ltr'
        }; justify-content: space-between; width: 100%; font-size: 13px">
          <div dir="ltr" style="display: flex; width: 90%;">
            <span style="width: 4em; color: #828282; text-align: left">+${
              country.dialingCode
            }</span>
            <span style="font-weight: bold; text-align: ${
              options?.dir === 'rtl' ? 'right' : 'left'
            };flex-grow: 1; padding: 0 0.5em;">${country.name}</span>
          </div>
          <div dir="rtl" style="display: flex; width: 10%;">
            <span class="flag-icon flag-icon-${country.code.toLowerCase()} flag-icon-squared"></span>
          </div>
        </div>
        `
      )

      return $country
    }

    function matchCustom(params: any, data: any) {
      if ($.trim(params.term) === '') {
        return data
      }
      if (typeof data.name === 'undefined') {
        return null
      }
      if (
        data.name.toLowerCase().indexOf(params.term.toLowerCase()) > -1 ||
        data.dialingCode.toString().indexOf(params.term) > -1
      ) {
        const modifiedData = $.extend({}, data, true)
        return modifiedData
      }
      return null
    }

    ;($(`#${randomId} .select-country-phonenumber`) as any).select2({
      dir: 'ltr',
      templateSelection: formatState,
      templateResult: templateResult,
      width: '100%',
      dropdownAutoWidth: true,
      data: countries.map((country) => ({
        ...country,
        id: country.code,
        selected: country.code === defaultCode
      })),
      matcher: matchCustom,
      dropdownParent: $(`#${randomId} #inputs-wrapper`),
      language: {
        noResults: function () {
          return '<div style="text-align: right; font-size: 13px">کشور مورد نظر شما پیدا نشد</div>'
        }
      },
      escapeMarkup: function (markup: any) {
        return markup
      },
      ...options
    })

    $(`#${randomId} .select-country-phonenumber`).on('select2:select', function (e: any) {
      const data = e.params.data
      handleOnChangeDialogCode(data.dialingCode)
      handleOnChangeSelected({
        code: data.code,
        dialingCode: data.dialingCode,
        name: data.name
      })
    })
  }, [])

  return (
    <div
      className={className}
      id={randomId}
      style={{
        position: 'relative',
        width: 'min-content'
      }}
    >
      <div
        id='inputs-wrapper'
        className={classes.inputsWrapper}
        dir={dir ? dir : 'ltr'}
      >
        <select className='select-country-phonenumber'></select>
        <input
          type='number'
          value={phoneNumberValue}
          onChange={(e) => handleOnChangePhoneNumberValue(e)}
          className='phone-number-input'
          dir='ltr'
          required
          disabled={options?.disabled}
        />
      </div>
    </div>
  )
}
