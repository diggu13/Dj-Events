import Layout from '@/components/Layout'
import styles from '@/styles/home.module.css'
import Image from 'next/image'
import Link from 'next/link'
const events = ({data}) => {
  return (
    <div>
      <Layout title="Dj events Party events" description='All dj events Party events'>
      {data.data.allEvents.map((item)=>{
        return(<div className={styles.eventContainer}>
          <div className={styles.eventName}>
            <h2>{item.event}</h2>
          </div>
          <div>
            <Image  src={item.image} height={100} width={200} objectFit="fill" /><br/>
            <Link href={`/Events/${item.event}`}>
              <button className={styles.details}>Details</button>
            </Link>
          </div>
        </div>)
      })}
      </Layout>
    </div>
  )
}
export default events
export async function getServerSideProps({req,res}){
  const reqBody = {
    query : `
      query {
        allEvents{
          event
          date
          description
          image
        }
      }
    `
  }  
  const response = await fetch('http://localhost:4000/app',{
    method:'POST',
    body: JSON.stringify(reqBody),
    headers :{
        'Content-Type':'application/json',
        'Authorization':`${req.cookies.token}`
    }
  })
  const data = await response.json();
  if(data.data.allEvents === null){
    return {
      redirect: {
        permanent: true,
        destination: "/404"
      }
    }
  }
    return{
      props:{
        data
      }
  }
}