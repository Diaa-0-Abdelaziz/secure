export const DatePickerOptions = {
  shortcuts: [
      {
        text: 'Today',
        onClick(picker) {
          picker.$emit('pick', new Date())
        }
      },
      {
        text: 'Yesterday',
        onClick(picker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          picker.$emit('pick', date)
        }
      },
      {
        text: 'A week ago',
        onClick(picker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', date)
        }
      }
    ]
}

export const CurrencyOptions = [
  {
    value: 'KWD',
    label: 'KWD',
  },
  {
    value: 'USD',
    label: 'USD',
  }
]
