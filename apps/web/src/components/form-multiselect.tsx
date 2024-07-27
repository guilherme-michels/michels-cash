import { Control, Controller, FieldValues, Path } from 'react-hook-form'

import { Multiselect } from './multiselect'

type FormMultiselectProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  options: {
    value: string
    name: string
  }[]
}

export function FormMultiselect<T extends FieldValues>({
  control,
  name,
  label,
  options,
}: FormMultiselectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Multiselect
          value={field.value}
          label={label}
          onChange={field.onChange}
          error={fieldState.error?.message}
          options={options}
        />
      )}
    />
  )
}
