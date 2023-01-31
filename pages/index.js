import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setLoading(false);
      setResult(data.result);
      setAnimalInput("");
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>The Krishna way</title>
        <link rel="icon" href="/index.jpeg" />
      </Head>

      <main className={styles.main}>
        <img src="/index.jpeg" className={styles.icon} />
        <h3>The Krishna way</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Samashya batao"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Samadhan padho" />
        </form>

        {loading ? (
          <>
            <img
              src="/blinking.gif"
              style={{ paddingTop: "20px" }}
              className={styles.icon}
            />
          </>
        ) : (
          <></>
        )}

        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
