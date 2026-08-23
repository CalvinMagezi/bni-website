import type { Partner } from '@/lib/supabase/types'

/** Fallback when partners table is empty or not yet migrated */
export const DEFAULT_PARTNERS: Pick<Partner, 'name' | 'logo_url' | 'website_url' | 'position'>[] = [
  {
    name: 'Partner Organisation',
    logo_url: 'https://framerusercontent.com/images/y9Lt3M9oqgQXMYtQiFooT0GYDgg.png',
    website_url: null,
    position: 1,
  },
  {
    name: 'Case Hospital',
    logo_url: 'https://casemedservices.org/casemedcare/wp-content/uploads/sites/10/2021/02/caselogo.png',
    website_url: 'https://casemedservices.org/casemedcare/',
    position: 2,
  },
  {
    name: 'Mt. Horeb International School',
    logo_url: 'https://mthoreb-ics.com/wp-content/uploads/2025/01/MT-HOREB-ICS-LOGO-FC.pdf.jpg',
    website_url: 'https://mthoreb-ics.com/',
    position: 3,
  },
  {
    name: 'Uganda Baati',
    logo_url: '/uganda-baati-logo.png',
    website_url: 'https://ugandabaati.com/',
    position: 4,
  },
]
