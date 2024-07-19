import { getFormattedDateAndGreeting } from '../../../lib/utils'

export default function HomeHeader() {
  const formattedDateTime = getFormattedDateAndGreeting()

  return (
    <div className="flex w-full items-center justify-center gap-4">
      <div className="flex flex-col items-center">
        <span className="text-sm">{formattedDateTime.formattedDate}</span>
        <strong className="text-sm text-black lg:text-3xl">
          {formattedDateTime.greeting}
        </strong>
      </div>
    </div>
  )
}
