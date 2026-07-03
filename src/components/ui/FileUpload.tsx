import { Upload, X } from 'lucide-react'
import { useRef } from 'react'
import { cn } from '@/utils/cn'

interface FileUploadProps {
  label?: string
  accept?: string
  value?: File | null
  onChange: (file: File | null) => void
  error?: string
  className?: string
}

export function FileUpload({ label, accept, value, onChange, error, className }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
      <div
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6 transition-colors hover:border-primary-green',
          error && 'border-red-500',
        )}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        <Upload className="mb-2 size-8 text-muted" />
        <p className="text-sm text-muted">
          {value ? value.name : 'Click to upload or drag and drop'}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </div>
      {value && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="flex items-center gap-1 text-xs text-red-500"
        >
          <X className="size-3" /> Remove file
        </button>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
