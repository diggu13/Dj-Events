import Link from 'next/link'
import styles from '@/styles/Footer.module.css'
const Footer = () => {
  return (
    <footer className={styles.footer}>
        <p>Copyright &copy; Dj Events</p>
        <Link href='/about'>
            <a className={styles.aboutlink}>About project</a>
        </Link>
    </footer>
  )
}

export default Footer