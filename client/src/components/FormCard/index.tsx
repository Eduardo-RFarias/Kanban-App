import styles from "./styles.module.scss";
import userIcon from "../../assets/user.png";
import calendar from "../../assets/calendar.png";
import CloseIcon from "@mui/icons-material/CloseRounded";
import CheckIcon from "@mui/icons-material/CheckRounded";
import { useState } from "react";
import { ActivityCreate } from "../../model/activity";

interface FormCardProps {
  type: "Todo" | "Doing" | "Done";
  toggleForm: () => void;
  saveActivity: (activity: ActivityCreate) => void;
}

export default function FormCard({ type, toggleForm, saveActivity }: FormCardProps) {
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedDate = new Date(date);

    const activity: ActivityCreate = {
      title,
      user,
      date: parsedDate,
      description,
      type,
    };

    saveActivity(activity);

    setTitle("");
    setUser("");
    setDate("");
    setDescription("");
    toggleForm();
  }

  function handleReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTitle("");
    setUser("");
    setDate("");
    setDescription("");
    toggleForm();
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit} onReset={handleReset}>
      <input
        className={styles.invisible_input + " " + styles.title}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div className={styles.separator_horizontal}></div>
      <div className={styles.information}>
        <div className={styles.user}>
          <img src={userIcon} alt="user" />
          <input
            className={styles.invisible_input}
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="User"
            required
          />
        </div>
        <div className={styles.date}>
          <img src={calendar} alt="calendar" />
          <input
            className={styles.invisible_input}
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      </div>
      <div className={styles.separator_vertical}></div>
      <div className={styles.description}>
        <textarea
          className={styles.invisible_input}
          rows={5}
          cols={10}
          style={{
            resize: "none",
          }}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={styles.cancel}>
        <button type="reset">
          <CloseIcon fontSize="large" />
        </button>
      </div>
      <div className={styles.confirm}>
        <button type="submit">
          <CheckIcon fontSize="large" />
        </button>
      </div>
    </form>
  );
}
