'use client'
import Link from "next/link"
import { useState } from "react"
import styles from "./page.module.css"
import Navbar from "./components/Navbar/Navbar"
import Todolist from "./components/ToDoList/Todolist"
import Calculator from "./components/Calculator/Calculator"
import Weather from "./components/Weather/Weather"
import Notes from "./components/Notes/Notes"
import Passgenerator from "./components/PassGenerator/Passgenerator"
import Quote from "./components/Quote/Quote"

export default function Home(){

  const [activePage, setActivePage] = useState("todolist");

    return(
        <>
        <Navbar setActivePage={setActivePage}/>
        <div className={styles.container}>
            {activePage === "todolist" && <Todolist/>}
            {activePage === "calculator" && <Calculator/>}
            {activePage === "weather" && <Weather/>}
            {activePage === "notes" && <Notes/>}
            {activePage === "passgenerator" && <Passgenerator/>}
            {activePage === "quote" && <Quote/>}
        </div>
        </>
    )
}