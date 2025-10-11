import { useState } from "react";
import styles from "./Calculator.module.scss";

export default function Calculator() {
  const [input, setInput] = useState(""); 
  const [result, setResult] = useState("");

  const handleClick = (value: string) => {
    setInput(prev => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleDelete = () => {
    setInput(prev => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const calc = eval(input.replace("X", "*"));
      setResult(calc.toString());
    } catch {
      setResult("Error");
    }
  };

  const buttons: (string | { label: string; action: () => void })[] = [
    { label: "AC", action: handleClear },
    { label: "/", action: () => handleClick("/") },
    { label: "X", action: () => handleClick("X") },
    { label: "Del", action: handleDelete },
    "7","8","9","-",
    "4","5","6","+",
    "1","2","3",".",
    "0","%"
  ];

  return (
    <div className={styles.container}>
      <div className={styles.cont3}>
        <h1>Calculator</h1>
      </div>

      <div className={styles.cont1}>
        <h6 className={styles.h6}>{input}</h6>
        <h1 className={styles.h1}>{result}</h1>
      </div>

      <div className={styles.cont2}>
        {buttons.map((btn, i) => {
          if (typeof btn === "string") {
            return (
              <div key={i} className={styles.div1} onClick={() => handleClick(btn)}>
                {btn}
              </div>
            );
          } else {
            return (
              <div key={i} className={styles.div1} onClick={btn.action}>
                {btn.label}
              </div>
            );
          }
        })}
        <div className={styles.div2} onClick={handleCalculate}>=</div>
      </div>
    </div>
  );
}
