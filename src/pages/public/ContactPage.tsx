import { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { publicApi } from '@/api/public.api'
import { PageHeader, SEO } from '@/components/common'
import { Button, Card, CardContent, Input, PhoneInput, Textarea } from '@/components/ui'
import { ROUTES } from '@/constants'

type ContactForm = {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export default function ContactPage() {
  const { t } = useTranslation()
  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('validation.nameMin')),
        email: z.string().email(t('validation.emailInvalid')),
        phone: z.string().optional(),
        subject: z.string().min(3, t('validation.subjectMin')),
        message: z.string().min(10, t('validation.messageMin')),
      }),
    [t],
  )
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    try {
      await publicApi.submitContact(data)
      toast.success(t('contact.success'))
      reset()
    } catch {
      toast.error(t('common.error'))
    }
  }

  return (
    <>
      <SEO title={t('contact.title')} description={t('contact.subtitle')} />
      <PageHeader
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        breadcrumbs={[{ label: t('nav.contact'), href: ROUTES.contact }]}
      />
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
              <Input label={t('contact.subject')} {...register('subject')} error={errors.subject?.message} />
              <Textarea label={t('contact.message')} rows={5} {...register('message')} error={errors.message?.message} />
              <Button type="submit" className="w-full" isLoading={isSubmitting}>
                {t('common.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
