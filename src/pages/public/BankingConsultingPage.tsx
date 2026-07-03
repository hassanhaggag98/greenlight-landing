import { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Landmark } from 'lucide-react'
import { publicApi } from '@/api/public.api'
import { PageHeader, SEO } from '@/components/common'
import { Button, Card, CardContent, Input, PhoneInput, Textarea } from '@/components/ui'
import { ROUTES } from '@/constants'

type FormData = {
  name: string
  email: string
  phone: string
  company?: string
  message: string
}

export default function BankingConsultingPage() {
  const { t } = useTranslation()
  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('validation.nameMin')),
        email: z.string().email(t('validation.emailInvalid')),
        phone: z.string().min(8, t('validation.phoneMin')),
        company: z.string().optional(),
        message: z.string().min(10, t('validation.messageMin')),
      }),
    [t],
  )
  const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await publicApi.submitBankingConsultation(data)
      toast.success(t('banking.success'))
      reset()
    } catch {
      toast.error(t('common.error'))
    }
  }

  return (
    <>
      <SEO title={t('banking.title')} description={t('banking.subtitle')} />
      <PageHeader title={t('banking.title')} subtitle={t('banking.subtitle')} breadcrumbs={[{ label: t('nav.banking'), href: ROUTES.banking }]} />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Landmark className="mb-4 size-10 text-gold" />
            <h2 className="text-xl font-semibold">{t('banking.formTitle')}</h2>
            <p className="mt-2 text-muted">{t('banking.formSubtitle')}</p>
          </div>
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
                <Textarea label={t('contact.message')} rows={4} {...register('message')} error={errors.message?.message} />
                <Button type="submit" className="w-full" isLoading={isSubmitting}>{t('common.submit')}</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
