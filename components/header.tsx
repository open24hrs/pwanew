import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Header() {
    return(
        <div className={styles.header}>
            <Image src={"/icon512_maskable.png"} alt="" height={48} width={48}/>
            <p>Horsemen Music App</p>
        </div>
    )
};