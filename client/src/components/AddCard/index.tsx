import styles from "./styles.module.scss";

interface AddCardProps {
  onClick?: () => void;
}

export default function AddCard({ onClick }: AddCardProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      <p>+</p>
    </div>
  );
}
