import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Redirecting | Vantaflow',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThankYouPage() {
  redirect('/?submitted=true')
}