import { redirect } from 'next/navigation'

export default function MagazinePage() {
  redirect('/resources?tab=magazine')
}
