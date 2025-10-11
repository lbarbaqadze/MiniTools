import styles from "./Button.module.scss"

type Props = {
    title: string,
    onClick: () => void;
}

export default function Button({onClick, title}: Props){
    return(
        <>
            <button className={styles.button} onClick={onClick}>{title}</button>
        </>
    )
}