import styles from "./Pass.module.scss"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy} from "@fortawesome/free-solid-svg-icons"

export default function Passgenerator(){

    const [password, setPassword] = useState("")
    const [copied, setCopied] = useState(false)

    const generatePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        let newPass = "";
        for (let i = 0; i < 12; i++) {
            newPass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(newPass);
    };

    const copyToClipboard = () => {
        if (!password) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    return(
        <div className={styles.container}>
            <h1 className={styles.h1}>Password Generator</h1>
            <div className={styles.cont2}>
                <div className={styles.cont1}>
                    <input type="text" placeholder="Generator a password" readOnly value={password}/>
                    <FontAwesomeIcon icon={faCopy} className={styles.icon} onClick={copyToClipboard}/>
                </div>
                {copied && <p className={styles.copied}>✅ Password copied!</p>}
            </div>
            <button className={styles.button} onClick={generatePassword}>Password Generator</button>
        </div>
    )
}