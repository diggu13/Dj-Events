import Image from 'next/image'
import Layout from '@/components/Layout'
const slug = ({data}) => {
  return (
    <Layout>
        <div>
            <h1>{data.data.findOne.event}</h1>
            <h5>{data.data.findOne.date}</h5>
        </div>
        <div>
        <Image  src={data.data.findOne.image} height={300} width={500} objectFit="fill" />
        </div>
        <div>
            <h2>Description</h2>
            <p>{data.data.findOne.description}</p>
        </div>
    </Layout>
  )
}

export default slug;

export async function getServerSideProps(context){
    const slug = context.params.slug;

    const reqBody = {
      query : `
        query {
          findOne(event:"${slug}"){
            event
            date
            description
            image
          }
        }
      `
    }
    const res = await fetch('http://localhost:4000/app',{
      method:'POST',
      body: JSON.stringify(reqBody),
      headers :{
          'Content-Type':'application/json'
      }
    })
    const data = await res.json()
    return{
      props:{
        data
      }
    }
  }