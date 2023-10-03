import Image from 'next/image'
import { Login } from '../components/global/Login';
import { LoginTest } from '@/components/global/SignIn';

export const metadata = {
  title: 'Meneses | Login',
};

export default function Home() {
  return (
    <>
      <Login />
    </>
  )
}
