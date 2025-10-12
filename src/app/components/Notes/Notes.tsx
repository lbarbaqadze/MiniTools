import styles from "./Notes.module.scss"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faDeleteLeft } from "@fortawesome/free-solid-svg-icons"

export default function Notes() {

    const [notes, setNotes] = useState<string[]>([])
    const [text, setText] = useState('')

    const addNote = () => {
        if (text.trim() === "") return;
        setNotes([text, ...notes])
        setText('')
    }

    const deleteNote = (index: number) => {
        setNotes(notes.filter((_, i) => i !== index))
    }

    const editNote = (index: number, value: string) => {
        const newNotes = [...notes]
        newNotes[index] = value
        setNotes(newNotes)
    }

    return (
        <div className={styles.container}>
            <div className={styles.cont1}>
                <img src={process.env.NODE_ENV === "production" ? "/MiniTools/icons/icons8-notes-64.png" : "/icons/icons8-notes-64.png"} alt="Notes Icon" />
                <h1 className={styles.h1}>Notes</h1>
            </div>

            <button className={styles.button} onClick={addNote}>
                <FontAwesomeIcon icon={faPen} style={{ color: "rgba(209, 209, 255, 1)" }} />
                Add Note
            </button>

            <div className={styles.cont2}>
                <textarea
                    className={styles.textarea1}
                    value={text}
                    placeholder="Write a note and add..."
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            <div className={styles.cont3}>
                {notes.map((note, index) => (
                    <div key={index} className={styles.note}>
                        <textarea
                            className={styles.textarea}
                            value={note}
                            onChange={(e) => editNote(index, e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={faDeleteLeft}
                            className={styles.icon}
                            onClick={() => deleteNote(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
