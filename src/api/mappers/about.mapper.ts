import type { AboutContent } from '@/types/public'

interface RawAboutApiResponse {
  settings?: {
    about_mission?: string
    about_vision?: string
    site_name?: string
  }
  team_members?: Array<{
    name?: string
    position?: string
    role?: string
    image_url?: string
  }>
}

export function mapAboutResponse(raw: RawAboutApiResponse): AboutContent {
  return {
    title: raw.settings?.site_name ?? '',
    description: '',
    mission: raw.settings?.about_mission ?? '',
    vision: raw.settings?.about_vision ?? '',
    team_preview: raw.team_members?.map((member) => ({
      name: member.name ?? '',
      role: member.position ?? member.role ?? '',
      image: member.image_url,
    })),
  }
}
