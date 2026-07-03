import { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { publicApi } from '@/api/public.api'
import { ContactInfo, PageHeader, SEO } from '@/components/common'
import { SocialLinksSection } from '@/components/sections'
import { Button, Card, CardContent, Input, PhoneInput, Textarea } from '@/components/ui'
import { CONTACT_EMAIL, ROUTES } from '@/constants'

type ContactForm = {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

function buildMailtoLink(data: ContactForm) {
  const subject = encodeURIComponent(data.subject)
  const body = encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone ?? '—'}\n\n${data.message}`,
  )
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
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
      window.location.href = buildMailtoLink(data)
      toast.success(t('contact.fallbackSuccess'))
      reset()
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

      <SocialLinksSection />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="mb-5 text-lg font-semibold text-foreground">{t('contact.infoTitle')}</h2>
            <ContactInfo />
          </CardContent>
        </Card>

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
