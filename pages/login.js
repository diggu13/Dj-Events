import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/login.module.css'
import Router from "next/router";
import  cookie  from 'js-cookie';

const login = () => {
    const [firstName,setFirstName] = useState('')
    const [email,setEmail] = useState('')
    const [p,setP] = useState(null)
    useEffect(()=>{
        setTimeout(()=>{
            setP(null)
        },3000)
    },[p])
    const firstNameFunc = (e)=>{
        e.preventDefault();
        setFirstName(e.target.value)
    }
    const emailFunc = (e)=>{
        e.preventDefault();
        setEmail(e.target.value)
    }
    const submitLogin= async(e)=>{
        e.preventDefault();
        const reqBody={
            query:`
                query{
                    findUser(firstName:"${firstName}",email:"${email}"){
                      token
                    }
                }
            `
        }
        const res = await fetch('http://localhost:4000/app',{
            method:'POST',
            body : JSON.stringify(reqBody),
            headers :{
                'Content-Type':'application/json',                
            }
        })
        const data = await res.json();
        if(data.data === null){
            setP(data.errors[0].message)
        }else{
            cookie.set('token',`${data.data.findUser.token}`)
            // document.cookie = cookie.serialize('token',  data.data.findUser.token, {
            //     maxAge: 36000, // 10 hours
            //     path: '/',
            //   });
              localStorage.setItem('token',`${data.data.findUser.token}`)
            Router.push('/createEvent')
        }
    }
  return (
    <Layout>
    <div className={styles.formContainer}>
        <form className={styles.form}>
            <h2>Login</h2>
            <div className={styles.firstNameBlock}>
                <label>First Name</label><br/>
                <input onChange={firstNameFunc} type="text" className={styles.firstName} />
            </div>
           
            <div  className={styles.emailBlock}>
                <label>Email</label><br/>
                <input onChange={emailFunc} type="email" className={styles.email} />
            </div>
            <div>
                <input onClick={submitLogin} type="submit" className={styles.submit}/>
                <p className={styles.validation}>{p}</p>
                <Link href='/signup'>
                    <p className={styles.p}>Don't have account? Signup</p>
                </Link>
            </div>
            
        </form>
    </div>
    </Layout>
  )
}


export default login