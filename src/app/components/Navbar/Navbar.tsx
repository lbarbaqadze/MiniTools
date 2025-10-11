import styles from "./Navbar.module.scss"
import Button from "../Button/Button"
import { useState } from "react";

type Props = {
    setActivePage: (page: string) => void;
}

export default function Navbar({setActivePage}: Props){

    return(
        <div className={styles.container}>
            <h1 className={styles.h1}>ReactMiniTools</h1>
            <ul className={styles.ul}>
                <li><Button title="ToDoList" onClick={() => setActivePage("todolist")}/></li>
                <li><Button title="Calculator" onClick={() => setActivePage("calculator")} /></li>
                <li><Button title="Weather" onClick={() => setActivePage("weather")}/></li>
                <li><Button title="Notes" onClick={() => setActivePage("notes")}/></li>
                <li><Button title="PassGenerator" onClick={() => setActivePage("passgenerator")}/></li>
                <li><Button title="Quote" onClick={() => setActivePage("quote")}/></li>
            </ul>
        </div>
    )
}