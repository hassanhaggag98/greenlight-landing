import { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { PageHeader, SEO } from '@/components/common'
import { Button, Card, CardContent, Input, PhoneInput, Textarea } from '@/components/ui'
import { ROUTES } from '@/constants'
import { openMailto } from '@/utils/mailto'

type FormData = {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
}

export default function RequestQuotePage() {
  const { t } = useTranslation()
  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('validation.nameMin')),
        email: z.string().email(t('validation.emailInvalid')),
        phone: z.string().optional(),
        company: z.string().optional(),
        message: z.string().min(10, t('validation.messageMin')),
      }),
    [t],
  )
  const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    openMailto(t('quote.title'), {
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Company: data.company,
      Message: data.message,
    })
    toast.success(t('contact.fallbackSuccess'))
    reset()
  }

  return (
    <>
      <SEO title={t('quote.title')} description={t('quote.subtitle')} />
      <PageHeader title={t('quote.title')} subtitle={t('quote.subtitle')} breadcrumbs={[{ label: t('quote.title'), href: ROUTES.quote }]} />
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input label={t('contact.name')} {...register('name')} error={errors.name?.message} />
              <Input label={t('contact.email')} type="email" {...register('email')} error={errors.email?.message} />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput label={t('contact.phone')} {...field} error={errors.phone?.message} />
                )}
              />
              <Input label={t('quote.company')} {...register('company')} />
              <Textarea label={t('contact.message')} rows={5} {...register('message')} error={errors.message?.message} />
              <Button type="submit" className="w-full" isLoading={isSubmitting}>{t('common.submit')}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
