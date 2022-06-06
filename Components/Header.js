import Link from 'next/link'
import styles from '@/styles/Header.module.css'
const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <Link href='/'>
                <a>Dj Events</a>
            </Link>
        </div>
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link href='/events'>
                        <a className={styles.navItemEvent}>Events</a>
                    </Link>
                </li>
                <li>
                    <Link href='/createEvent'>
                        <a className={styles.navItemEvent}>Create Event</a>
                    </Link>
                </li>
                <li>
                    <Link href='/login'>
                        <a className={styles.navItemEvent}>Login</a>
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
    )
}

export default Header