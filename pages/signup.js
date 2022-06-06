import React,{ useState,useEffect } from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/login.module.css'
import Router from "next/router";
const login = () => {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [contact,setContact] = useState('')
    const [data,setData] = useState(null)
    useEffect(()=>{
        setTimeout(()=>{
            setData(null)
        },3000)
    },[data])
    const firstNameFunc = (e)=>{
        e.preventDefault();
        setFirstName(e.target.value)
    }
    const lastNameFunc = (e)=>{
        e.preventDefault();
        setLastName(e.target.value)
    }
    const emailFunc = (e)=>{
        e.preventDefault();
        setEmail(e.target.value)
    }
    const contactFunc = (e)=>{
        e.preventDefault();
        setContact(e.target.value)
    }
    const submitForm = async (e)=>{
        e.preventDefault()
        if(firstName === '' || lastName ===''|| email === '' || contact ===''){
                setData('Fill fields')
        }else{
            const contactToString = contact.toString()
            const reqBody = {
                query : `
                  mutation {
                    createUser(firstName:"${firstName}",lastName:"${lastName}",email:"${email}",contact:"${contactToString}"){
                      firstName
                      lastName
                      email
                      contact
                    }
                  }
                `
              }
              const res = await fetch('http://localhost:4000/app',{
                method:'POST',
                body : JSON.stringify(reqBody),
                headers :{
                    'Content-Type':'application/json'
                }
            })
            const data  = await res.json();
            if(data.data === null){
                return setData(data.errors[0].message)
            }
            else{
                setData('Account created')
                Router.push('/login')
            }
        }
    }
  return (
    <Layout>
    <div className={styles.formContainer}>
        <form className={styles.form}>
            <h2>Create Account</h2>
            <div className={styles.firstNameBlock}>
                <label>First Name</label><br/>
                <input onChange={firstNameFunc} type="text" className={styles.firstName} />
            </div>
            <div  className={styles.lastNameBlock}>
                <label>Last Name</label><br/>
                <input onChange={lastNameFunc} type="text" className={styles.lastName} />
            </div>
            <div  className={styles.emailBlock}>
                <label>Email</label><br/>
                <input onChange={emailFunc} type="email" className={styles.email} />
            </div>
            <div  className={styles.contactBlock}>
                <label>Contact</label><br/>
                <input onChange={contactFunc} type="number" className={styles.contact} />
            </div>
            <div>
                <input onClick={submitForm} type="submit" className={styles.submit}/>
                <p className={styles.validation}>{data}</p>
                <Link href='/login'>
                    <p className={styles.p}>Already have account? login</p>
                </Link>
            </div>
            
        </form>
    </div>
    </Layout> 
  )
}

export default login