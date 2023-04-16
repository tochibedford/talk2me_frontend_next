import styles from "./ErrorDisplay.module.scss"

export default function ErrorDisplay({ error }: { error: string }) {
  return (
    <div className={styles.container}>
      {error}
    </div>
  )
}