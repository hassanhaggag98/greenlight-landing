export interface DialCodeCountry {
  iso: string
  dial: string
  flag: string
  nameEn: string
  nameAr: string
  placeholder: string
}

export const DEFAULT_DIAL_COUNTRY = 'EG'

export const DIAL_CODES: DialCodeCountry[] = [
  { iso: 'EG', dial: '20', flag: '🇪🇬', nameEn: 'Egypt', nameAr: 'مصر', placeholder: '1XX XXX XXXX' },
  { iso: 'SA', dial: '966', flag: '🇸🇦', nameEn: 'Saudi Arabia', nameAr: 'السعودية', placeholder: '5X XXX XXXX' },
  { iso: 'AE', dial: '971', flag: '🇦🇪', nameEn: 'UAE', nameAr: 'الإمارات', placeholder: '5X XXX XXXX' },
  { iso: 'KW', dial: '965', flag: '🇰🇼', nameEn: 'Kuwait', nameAr: 'الكويت', placeholder: 'XXXX XXXX' },
  { iso: 'QA', dial: '974', flag: '🇶🇦', nameEn: 'Qatar', nameAr: 'قطر', placeholder: 'XXXX XXXX' },
  { iso: 'BH', dial: '973', flag: '🇧🇭', nameEn: 'Bahrain', nameAr: 'البحرين', placeholder: 'XXXX XXXX' },
  { iso: 'OM', dial: '968', flag: '🇴🇲', nameEn: 'Oman', nameAr: 'عُمان', placeholder: 'XXXX XXXX' },
  { iso: 'JO', dial: '962', flag: '🇯🇴', nameEn: 'Jordan', nameAr: 'الأردن', placeholder: '7X XXX XXXX' },
  { iso: 'LB', dial: '961', flag: '🇱🇧', nameEn: 'Lebanon', nameAr: 'لبنان', placeholder: 'XX XXX XXX' },
  { iso: 'IQ', dial: '964', flag: '🇮🇶', nameEn: 'Iraq', nameAr: 'العراق', placeholder: '7XX XXX XXXX' },
  { iso: 'SY', dial: '963', flag: '🇸🇾', nameEn: 'Syria', nameAr: 'سوريا', placeholder: '9XX XXX XXX' },
  { iso: 'PS', dial: '970', flag: '🇵🇸', nameEn: 'Palestine', nameAr: 'فلسطين', placeholder: '5X XXX XXXX' },
  { iso: 'YE', dial: '967', flag: '🇾🇪', nameEn: 'Yemen', nameAr: 'اليمن', placeholder: '7XX XXX XXX' },
  { iso: 'LY', dial: '218', flag: '🇱🇾', nameEn: 'Libya', nameAr: 'ليبيا', placeholder: '9X XXX XXXX' },
  { iso: 'TN', dial: '216', flag: '🇹🇳', nameEn: 'Tunisia', nameAr: 'تونس', placeholder: 'XX XXX XXX' },
  { iso: 'DZ', dial: '213', flag: '🇩🇿', nameEn: 'Algeria', nameAr: 'الجزائر', placeholder: 'XXX XX XX XX' },
  { iso: 'MA', dial: '212', flag: '🇲🇦', nameEn: 'Morocco', nameAr: 'المغرب', placeholder: '6XX XXX XXX' },
  { iso: 'SD', dial: '249', flag: '🇸🇩', nameEn: 'Sudan', nameAr: 'السودان', placeholder: '9X XXX XXXX' },
  { iso: 'TR', dial: '90', flag: '🇹🇷', nameEn: 'Turkey', nameAr: 'تركيا', placeholder: '5XX XXX XXXX' },
  { iso: 'US', dial: '1', flag: '🇺🇸', nameEn: 'United States', nameAr: 'أمريكا', placeholder: 'XXX XXX XXXX' },
  { iso: 'CA', dial: '1', flag: '🇨🇦', nameEn: 'Canada', nameAr: 'كندا', placeholder: 'XXX XXX XXXX' },
  { iso: 'GB', dial: '44', flag: '🇬🇧', nameEn: 'United Kingdom', nameAr: 'بريطانيا', placeholder: '7XXX XXXXXX' },
  { iso: 'DE', dial: '49', flag: '🇩🇪', nameEn: 'Germany', nameAr: 'ألمانيا', placeholder: '1XX XXXXXXX' },
  { iso: 'FR', dial: '33', flag: '🇫🇷', nameEn: 'France', nameAr: 'فرنسا', placeholder: '6 XX XX XX XX' },
  { iso: 'IT', dial: '39', flag: '🇮🇹', nameEn: 'Italy', nameAr: 'إيطاليا', placeholder: '3XX XXX XXXX' },
  { iso: 'ES', dial: '34', flag: '🇪🇸', nameEn: 'Spain', nameAr: 'إسبانيا', placeholder: '6XX XXX XXX' },
  { iso: 'NL', dial: '31', flag: '🇳🇱', nameEn: 'Netherlands', nameAr: 'هولندا', placeholder: '6 XXXXXXXX' },
  { iso: 'BE', dial: '32', flag: '🇧🇪', nameEn: 'Belgium', nameAr: 'بلجيكا', placeholder: '4XX XX XX XX' },
  { iso: 'CH', dial: '41', flag: '🇨🇭', nameEn: 'Switzerland', nameAr: 'سويسرا', placeholder: '7X XXX XX XX' },
  { iso: 'AT', dial: '43', flag: '🇦🇹', nameEn: 'Austria', nameAr: 'النمسا', placeholder: '6XX XXXXXXX' },
  { iso: 'SE', dial: '46', flag: '🇸🇪', nameEn: 'Sweden', nameAr: 'السويد', placeholder: '7X XXX XX XX' },
  { iso: 'NO', dial: '47', flag: '🇳🇴', nameEn: 'Norway', nameAr: 'النرويج', placeholder: '4XX XX XXX' },
  { iso: 'DK', dial: '45', flag: '🇩🇰', nameEn: 'Denmark', nameAr: 'الدنمارك', placeholder: 'XX XX XX XX' },
  { iso: 'FI', dial: '358', flag: '🇫🇮', nameEn: 'Finland', nameAr: 'فنلندا', placeholder: '4X XXX XXXX' },
  { iso: 'PL', dial: '48', flag: '🇵🇱', nameEn: 'Poland', nameAr: 'بولندا', placeholder: '5XX XXX XXX' },
  { iso: 'CZ', dial: '420', flag: '🇨🇿', nameEn: 'Czechia', nameAr: 'التشيك', placeholder: 'XXX XXX XXX' },
  { iso: 'GR', dial: '30', flag: '🇬🇷', nameEn: 'Greece', nameAr: 'اليونان', placeholder: '6XX XXX XXXX' },
  { iso: 'PT', dial: '351', flag: '🇵🇹', nameEn: 'Portugal', nameAr: 'البرتغال', placeholder: '9XX XXX XXX' },
  { iso: 'IE', dial: '353', flag: '🇮🇪', nameEn: 'Ireland', nameAr: 'أيرلندا', placeholder: '8X XXX XXXX' },
  { iso: 'RU', dial: '7', flag: '🇷🇺', nameEn: 'Russia', nameAr: 'روسيا', placeholder: '9XX XXX XX XX' },
  { iso: 'UA', dial: '380', flag: '🇺🇦', nameEn: 'Ukraine', nameAr: 'أوكرانيا', placeholder: 'XX XXX XX XX' },
  { iso: 'RO', dial: '40', flag: '🇷🇴', nameEn: 'Romania', nameAr: 'رومانيا', placeholder: '7XX XXX XXX' },
  { iso: 'HU', dial: '36', flag: '🇭🇺', nameEn: 'Hungary', nameAr: 'المجر', placeholder: 'XX XXX XXXX' },
  { iso: 'CN', dial: '86', flag: '🇨🇳', nameEn: 'China', nameAr: 'الصين', placeholder: '1XX XXXX XXXX' },
  { iso: 'JP', dial: '81', flag: '🇯🇵', nameEn: 'Japan', nameAr: 'اليابان', placeholder: '90 XXXX XXXX' },
  { iso: 'KR', dial: '82', flag: '🇰🇷', nameEn: 'South Korea', nameAr: 'كوريا الجنوبية', placeholder: '10 XXXX XXXX' },
  { iso: 'IN', dial: '91', flag: '🇮🇳', nameEn: 'India', nameAr: 'الهند', placeholder: '9XXXX XXXXX' },
  { iso: 'PK', dial: '92', flag: '🇵🇰', nameEn: 'Pakistan', nameAr: 'باكستان', placeholder: '3XX XXX XXXX' },
  { iso: 'BD', dial: '880', flag: '🇧🇩', nameEn: 'Bangladesh', nameAr: 'بنجلاديش', placeholder: '1XXX XXXXXX' },
  { iso: 'ID', dial: '62', flag: '🇮🇩', nameEn: 'Indonesia', nameAr: 'إندونيسيا', placeholder: '8XX XXXX XXXX' },
  { iso: 'MY', dial: '60', flag: '🇲🇾', nameEn: 'Malaysia', nameAr: 'ماليزيا', placeholder: '1X XXX XXXX' },
  { iso: 'SG', dial: '65', flag: '🇸🇬', nameEn: 'Singapore', nameAr: 'سنغافورة', placeholder: 'XXXX XXXX' },
  { iso: 'TH', dial: '66', flag: '🇹🇭', nameEn: 'Thailand', nameAr: 'تايلاند', placeholder: '8X XXX XXXX' },
  { iso: 'VN', dial: '84', flag: '🇻🇳', nameEn: 'Vietnam', nameAr: 'فيتنام', placeholder: '9X XXX XX XX' },
  { iso: 'PH', dial: '63', flag: '🇵🇭', nameEn: 'Philippines', nameAr: 'الفلبين', placeholder: '9XX XXX XXXX' },
  { iso: 'AU', dial: '61', flag: '🇦🇺', nameEn: 'Australia', nameAr: 'أستراليا', placeholder: '4XX XXX XXX' },
  { iso: 'NZ', dial: '64', flag: '🇳🇿', nameEn: 'New Zealand', nameAr: 'نيوزيلندا', placeholder: '2X XXX XXXX' },
  { iso: 'ZA', dial: '27', flag: '🇿🇦', nameEn: 'South Africa', nameAr: 'جنوب أفريقيا', placeholder: '7X XXX XXXX' },
  { iso: 'NG', dial: '234', flag: '🇳🇬', nameEn: 'Nigeria', nameAr: 'نيجيريا', placeholder: '8XX XXX XXXX' },
  { iso: 'KE', dial: '254', flag: '🇰🇪', nameEn: 'Kenya', nameAr: 'كينيا', placeholder: '7XX XXX XXX' },
  { iso: 'ET', dial: '251', flag: '🇪🇹', nameEn: 'Ethiopia', nameAr: 'إثيوبيا', placeholder: '9X XXX XXXX' },
  { iso: 'GH', dial: '233', flag: '🇬🇭', nameEn: 'Ghana', nameAr: 'غانا', placeholder: '2X XXX XXXX' },
  { iso: 'BR', dial: '55', flag: '🇧🇷', nameEn: 'Brazil', nameAr: 'البرازيل', placeholder: '11 9XXXX XXXX' },
  { iso: 'AR', dial: '54', flag: '🇦🇷', nameEn: 'Argentina', nameAr: 'الأرجنتين', placeholder: '9 XX XXXX XXXX' },
  { iso: 'MX', dial: '52', flag: '🇲🇽', nameEn: 'Mexico', nameAr: 'المكسيك', placeholder: '1 XX XXXX XXXX' },
  { iso: 'CO', dial: '57', flag: '🇨🇴', nameEn: 'Colombia', nameAr: 'كولومبيا', placeholder: '3XX XXX XXXX' },
  { iso: 'CL', dial: '56', flag: '🇨🇱', nameEn: 'Chile', nameAr: 'تشيلي', placeholder: '9 XXXX XXXX' },
  { iso: 'PE', dial: '51', flag: '🇵🇪', nameEn: 'Peru', nameAr: 'بيرو', placeholder: '9XX XXX XXX' },
  { iso: 'IR', dial: '98', flag: '🇮🇷', nameEn: 'Iran', nameAr: 'إيران', placeholder: '9XX XXX XXXX' },
  { iso: 'IL', dial: '972', flag: '🇮🇱', nameEn: 'Israel', nameAr: 'إسرائيل', placeholder: '5X XXX XXXX' },
  { iso: 'AF', dial: '93', flag: '🇦🇫', nameEn: 'Afghanistan', nameAr: 'أفغانستان', placeholder: '7X XXX XXXX' },
  { iso: 'AL', dial: '355', flag: '🇦🇱', nameEn: 'Albania', nameAr: 'ألبانيا', placeholder: '6X XXX XXXX' },
  { iso: 'AM', dial: '374', flag: '🇦🇲', nameEn: 'Armenia', nameAr: 'أرمينيا', placeholder: 'XX XXX XXX' },
  { iso: 'AZ', dial: '994', flag: '🇦🇿', nameEn: 'Azerbaijan', nameAr: 'أذربيجان', placeholder: 'XX XXX XX XX' },
  { iso: 'BA', dial: '387', flag: '🇧🇦', nameEn: 'Bosnia', nameAr: 'البوسنة', placeholder: '6X XXX XXX' },
  { iso: 'BG', dial: '359', flag: '🇧🇬', nameEn: 'Bulgaria', nameAr: 'بلغاريا', placeholder: '8X XXX XXXX' },
  { iso: 'BY', dial: '375', flag: '🇧🇾', nameEn: 'Belarus', nameAr: 'بيلاروس', placeholder: 'XX XXX XX XX' },
  { iso: 'CM', dial: '237', flag: '🇨🇲', nameEn: 'Cameroon', nameAr: 'الكameroun', placeholder: '6XX XX XX XX' },
  { iso: 'CY', dial: '357', flag: '🇨🇾', nameEn: 'Cyprus', nameAr: 'قبرص', placeholder: '9X XXX XXX' },
  { iso: 'EE', dial: '372', flag: '🇪🇪', nameEn: 'Estonia', nameAr: 'إستونيا', placeholder: '5XXX XXXX' },
  { iso: 'GE', dial: '995', flag: '🇬🇪', nameEn: 'Georgia', nameAr: 'جورجيا', placeholder: '5XX XXX XXX' },
  { iso: 'HK', dial: '852', flag: '🇭🇰', nameEn: 'Hong Kong', nameAr: 'هونغ كونغ', placeholder: 'XXXX XXXX' },
  { iso: 'HR', dial: '385', flag: '🇭🇷', nameEn: 'Croatia', nameAr: 'كرواتيا', placeholder: '9X XXX XXXX' },
  { iso: 'IS', dial: '354', flag: '🇮🇸', nameEn: 'Iceland', nameAr: 'آيسلندا', placeholder: 'XXX XXXX' },
  { iso: 'KZ', dial: '7', flag: '🇰🇿', nameEn: 'Kazakhstan', nameAr: 'كازاخستان', placeholder: '7XX XXX XX XX' },
  { iso: 'LT', dial: '370', flag: '🇱🇹', nameEn: 'Lithuania', nameAr: 'ليتوانيا', placeholder: '6XX XXXXX' },
  { iso: 'LU', dial: '352', flag: '🇱🇺', nameEn: 'Luxembourg', nameAr: 'لوكسمبург', placeholder: '6XX XXX XXX' },
  { iso: 'LV', dial: '371', flag: '🇱🇻', nameEn: 'Latvia', nameAr: 'لاتvia', placeholder: '2X XXX XXX' },
  { iso: 'MD', dial: '373', flag: '🇲🇩', nameEn: 'Moldova', nameAr: 'مoldova', placeholder: '6XX XX XXX' },
  { iso: 'ME', dial: '382', flag: '🇲🇪', nameEn: 'Montenegro', nameAr: 'الجبل الأسود', placeholder: '6X XXX XXX' },
  { iso: 'MK', dial: '389', flag: '🇲🇰', nameEn: 'North Macedonia', nameAr: 'مقدonia', placeholder: '7X XXX XXX' },
  { iso: 'MT', dial: '356', flag: '🇲🇹', nameEn: 'Malta', nameAr: 'مالطا', placeholder: 'XXXX XXXX' },
  { iso: 'RS', dial: '381', flag: '🇷🇸', nameEn: 'Serbia', nameAr: 'صربيا', placeholder: '6X XXX XXXX' },
  { iso: 'SI', dial: '386', flag: '🇸🇮', nameEn: 'Slovenia', nameAr: 'سلovenia', placeholder: 'XX XXX XXX' },
  { iso: 'SK', dial: '421', flag: '🇸🇰', nameEn: 'Slovakia', nameAr: 'سلovakia', placeholder: '9XX XXX XXX' },
  { iso: 'TW', dial: '886', flag: '🇹🇼', nameEn: 'Taiwan', nameAr: 'تايwan', placeholder: '9XX XXX XXX' },
  { iso: 'UZ', dial: '998', flag: '🇺🇿', nameEn: 'Uzbekistan', nameAr: 'أوزبكستان', placeholder: '9X XXX XX XX' },
]

const DIAL_BY_ISO = new Map(DIAL_CODES.map((c) => [c.iso, c]))

/** Longest dial codes first for reliable parsing */
const DIAL_MATCHERS = [...DIAL_CODES].sort((a, b) => b.dial.length - a.dial.length)

export function getDialCountry(iso: string): DialCodeCountry {
  return DIAL_BY_ISO.get(iso) ?? DIAL_BY_ISO.get(DEFAULT_DIAL_COUNTRY)!
}

export function parsePhoneValue(
  value: string | undefined,
  defaultIso = DEFAULT_DIAL_COUNTRY,
): { iso: string; national: string } {
  if (!value?.trim()) return { iso: defaultIso, national: '' }

  const digits = value.replace(/\D/g, '')
  if (!digits) return { iso: defaultIso, national: '' }

  for (const country of DIAL_MATCHERS) {
    if (digits.startsWith(country.dial)) {
      return { iso: country.iso, national: digits.slice(country.dial.length) }
    }
  }

  return { iso: defaultIso, national: digits }
}

export function formatPhoneValue(iso: string, national: string): string {
  const digits = national.replace(/\D/g, '')
  if (!digits) return ''
  const country = getDialCountry(iso)
  return `+${country.dial}${digits}`
}
