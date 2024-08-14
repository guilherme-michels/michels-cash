import { SelectProps } from '@radix-ui/react-select'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

import { Multiselect } from './multiselect'

type FormSelectProps<T extends FieldValues> = SelectProps & {
  control: Control<T>
  name: Path<T>
  label: string
  required: boolean
  options:
    | {
        value: string
        name: string
      }[]
    | null
  isLoading?: boolean
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  ...props
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Multiselect
          options={options}
          value={field.value as string}
          label={label}
          onChange={(value) => field.onChange(value)}
          error={fieldState.error?.message}
          defaultValue={field.value as string}
          {...props}
        />
      )}
    />
  )
}
