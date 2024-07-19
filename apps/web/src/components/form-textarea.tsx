import { Control, Controller, FieldValues, Path } from 'react-hook-form'

import { Textarea, TextareaProps } from './ui/textarea'

type FormTextareaProps<T extends FieldValues> = TextareaProps & {
  control: Control<T>
  name: Path<T>
  label: string
  required: boolean
}

export function FormTextarea<T extends FieldValues>({
  control,
  name,
  label,
  required,
  ...props
}: FormTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={(controllerProps) => (
        <Textarea
          value={controllerProps.field.value as string}
          label={label}
          required={required}
          onChange={(event) =>
            controllerProps.field.onChange(event.target.value)
          }
          error={controllerProps.fieldState.error?.message}
          {...props}
        />
      )}
    />
  )
}
