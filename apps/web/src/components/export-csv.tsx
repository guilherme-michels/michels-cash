import { File } from 'lucide-react'

import { Button } from './ui/button'

export function ExportCSV() {
  return (
    <Button className="flex gap-2">
      <File />
    </Button>
  )
}
