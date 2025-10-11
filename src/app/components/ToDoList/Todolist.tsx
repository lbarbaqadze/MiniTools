import styles from "./Todolist.module.scss";
import { use, useState } from "react";

export default function Todolist() {

    const [tasks, setTasks] = useState<string[]>([])
    const [input, setInput] = useState('')

    const addTask = () => {
        if (input.trim() === "") return;
        setTasks([...tasks, input.trim()])
        setInput("")
    }

    const deleteTask = (index: number) => {
        const newTasks = tasks.filter((_, i) => i !== index)
        setTasks(newTasks)
    }

    return (
        <div className={styles.container}>
            <div className={styles.cont1}>
                <h1 className={styles.h1}>
                    To-Do-List
                    <img
                        src="/icons/icons8-to-do-list.png"
                        alt="Todo Icon"
                        className={styles.icon}
                    />
                </h1>
            </div>
            <div className={styles.cont2}>
                <input type="text" placeholder="New task" className={styles.input} 
                value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()} />
                <button className={styles.button} onClick={addTask}>Add</button>
            </div>
            <div className={styles.cont3}>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index}>
                            <span className={styles.taskText}>{task}</span>
                            <span
                                className={styles.delete}
                                onClick={() => deleteTask(index)}
                            >
                                ❌
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}
