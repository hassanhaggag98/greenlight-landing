import { ImagePlus, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'

interface ImageUploadProps {
  label?: string
  value?: File | string | null
  onChange: (file: File | null) => void
  error?: string
  className?: string
}

export function ImageUpload({ label, value, onChange, error, className }: ImageUploadProps) {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(
    typeof value === 'string' ? value : null,
  )

  const handleChange = (file: File | null) => {
    onChange(file)
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
    } else {
      setPreview(null)
    }
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
      <div className="relative">
        <div
          className={cn(
            'flex h-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-border transition-colors hover:border-primary-green',
            error && 'border-red-500',
          )}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          role="button"
          tabIndex={0}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="size-full object-cover" />
          ) : (
            <>
              <ImagePlus className="mb-2 size-8 text-muted" />
              <p className="text-sm text-muted">{t('a11y.uploadImage')}</p>
            </>
          )}
        </div>
        {preview && (
          <button
            type="button"
            onClick={() => handleChange(null)}
            className="absolute end-2 top-2 rounded-full bg-dark-navy/80 p-1 text-white"
            aria-label={t('a11y.removeImage')}
          >
            <X className="size-4" />
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleChange(e.target.files?.[0] ?? null)}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
