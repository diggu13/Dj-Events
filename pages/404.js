import Layout from '@/components/Layout';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
const Error = () => {
    const router  =  useRouter();
    useEffect(()=>{
        setTimeout(()=>{
            router.push('/');
        },5000)
    },[])
  return (
    <Layout>
        <h1>You are not a valid user or you added wrong path</h1>
        <h1>please make sure u are logged in </h1>
        <h2>u'll be directed in homepage shortly</h2>
        <CountdownCircleTimer
            isPlaying
            duration={5}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
        >
            {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
    </Layout>
  )
}

export default Error