import React,{ useState } from 'react'
import Layout from '@/components/Layout'
import styles from '@/styles/createEvent.module.css'
import { useRouter } from 'next/router'
const createEvent = () => {
    const router = useRouter();
    const [eventName__ , setEventName__]  = useState('');
    const [eventDate__ , setEventDate__]  = useState('')
    const [eventDescription__ , setEventDescription__]  = useState('')
    const [file,setFile] = useState('');
    
    const fileSubmit = (e)=>{
        e.preventDefault();
        setFile(e.target.files[0])
    }
    const eventName = (e=>{
        e.preventDefault();
        setEventName__(e.target.value)
    })
    const eventDate = (e=>{
        e.preventDefault();
        setEventDate__(e.target.value)
    })
    const eventDescription = (e=>{
        e.preventDefault();
        setEventDescription__(e.target.value)
    })
    const submit = async (e)=>{
        e.preventDefault();
        if(eventName__ ===''|| eventDate__==='' || eventDescription__===''){
            alert('enter valid fields')
        }else{
            let fd = new FormData
            fd.append('file',file)
            let url = "http://localhost:4000/createEvent";
            let h = new Headers();
            h.append('Content-type','application/json')
            let json = await fd;
            let req = new Request(url,{
                header: h,
                body : json,
                method: 'POST'
            })
            const rest = await fetch(req);
            const imageData = await rest.json();
            const imageSplit = imageData.image.slice(16) 
            const reqBody = {
                query : `
                    mutation{
                        createEvent(event:"${eventName__}",date:"${eventDate__}",description:"${eventDescription__}",image:"${imageSplit}"){
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
                body : JSON.stringify(reqBody),
                headers :{
                    'Content-Type':'application/json',
                    'Authorization':`${localStorage.getItem('token')}`
                }
            })
            const data  = await res.json();
           if(data.errors[0].message==='failed' || data.errors.message ==='not found'){
            router.push('/404')
           }else{
               alert('suuces')
           }
        }
    }
  return (
    <Layout title="Event || New Event" description="create  anew event Dj events">
        <form className={styles.form}>
            <div className={styles.formItems}>
                <label>Event Name</label>
                <input onChange={eventName} type="text" />
            </div>
            <div  className={styles.formItems}>
                <label>Date</label>
                <input onChange={eventDate} type="date"/>
            </div>
            <div  className={styles.formItems}>
                <label>Description</label>
                <input onChange={eventDescription} type="text" />
            </div>
            <div  className={styles.formItems}>
                <label>Add event image</label>
                <input onChange={fileSubmit} name='file' type="file"/>
            </div>
            <div className={styles.submit}>
                <input onClick={submit} className={styles.submitbutton} type="submit" />
            </div>
        </form>
    </Layout>
  )
}

export default createEvent