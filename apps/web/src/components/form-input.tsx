import { Control, Controller, FieldValues, Path } from 'react-hook-form'

import { Input, InputProps } from './ui/input'

type FormInputProps<T extends FieldValues> = InputProps & {
  control: Control<T>
  name: Path<T>
  label: string
  required: boolean
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  required,
  type,
  ...props
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={(controllerProps) => (
        <Input
          value={controllerProps.field.value as string}
          label={label}
          type={type}
          step={0.1}
          required={required}
          onChange={(event) =>
            controllerProps.field.onChange(
              type === 'number'
                ? Number(event.target.value)
                : event.target.value
            )
          }
          error={controllerProps.fieldState.error?.message}
          {...props}
        />
      )}
    />
  )
}
