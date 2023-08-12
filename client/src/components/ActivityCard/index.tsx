import styles from "./styles.module.scss";
import calendar from "../../assets/calendar.png";
import { Activity } from "../../model/activity";

const colors = {
  Todo: {
    cardColor: "#846351",
    separatorColor: "#887B6B",
  },
  Doing: {
    cardColor: "#46556C",
    separatorColor: "#6B7E88",
  },
  Done: {
    cardColor: "#466C6C",
    separatorColor: "#6B7E88",
  },
};

interface ActivityCardProps {
  activity: Activity;
  deleteActivity: (id: number) => void;
}

export default function ActivityCard({ activity, deleteActivity }: ActivityCardProps) {
  return (
    <div
      className={styles.card}
      style={{ backgroundColor: colors[activity.type].cardColor }}
      onClick={() => deleteActivity(activity.id)}
    >
      <p className={styles.title}>{activity.title}</p>
      <div
        className={styles.separator_horizontal}
        style={{
          backgroundColor: colors[activity.type].separatorColor,
        }}
      ></div>
      <div className={styles.information}>
        <div className={styles.user}>
          <img src={`https://robohash.org/${activity.user}?set=set5&bgset=bg1`} alt={activity.user} />
          <p>{activity.user}</p>
        </div>
        <div className={styles.date}>
          <img src={calendar} alt="calendar" />
          <p>{new Date(activity.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div
        className={styles.separator_vertical}
        style={{ backgroundColor: colors[activity.type].separatorColor }}
      ></div>
      <div className={styles.description}>
        <p>{activity.description}</p>
      </div>
    </div>
  );
}
