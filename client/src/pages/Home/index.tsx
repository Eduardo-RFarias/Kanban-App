import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import ActivityCard from "../../components/ActivityCard";
import { Activity, ActivityCreate } from "../../model/activity";
import AddCard from "../../components/AddCard";
import FormCard from "../../components/FormCard";
import { api } from "../../api";

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const [addingTodo, setAddingTodo] = useState(false);
  const [addingDoing, setAddingDoing] = useState(false);
  const [addingDone, setAddingDone] = useState(false);

  const todo = useMemo(() => activities.filter((item) => item.type === "Todo"), [activities]);

  const doing = useMemo(() => activities.filter((item) => item.type === "Doing"), [activities]);

  const done = useMemo(() => activities.filter((item) => item.type === "Done"), [activities]);

  useEffect(() => {
    api
      .get<Activity[]>("/api/activity")
      .then(({ data }) => setActivities(data))
      .catch(() => alert("Erro ao carregar atividades"));
  }, []);

  function saveActivity(activity: ActivityCreate) {
    api
      .post<Activity>("/api/activity", activity)
      .then(({ data }) => setActivities([...activities, data]))
      .catch(() => alert("Erro ao salvar atividade"));
  }

  function deleteActivity(id: number) {
    api
      .delete(`/api/activity/${id}`)
      .then(() => setActivities(activities.filter((item) => item.id !== id)))
      .catch(() => alert("Erro ao deletar atividade"));
  }

  return (
    <div id={styles.kanban}>
      <div id={styles.board_title_1}>
        <p>A fazer</p>
      </div>
      <div id={styles.board_title_2}>
        <p>Fazendo</p>
      </div>
      <div id={styles.board_title_3}>
        <p>Feito</p>
      </div>

      <div id={styles.board_cell_1}>
        {todo.map((item) => (
          <ActivityCard key={item.id} activity={item} deleteActivity={deleteActivity} />
        ))}
        {addingTodo ? (
          <FormCard type="Todo" toggleForm={() => setAddingTodo(false)} saveActivity={saveActivity} />
        ) : (
          <AddCard onClick={() => setAddingTodo(true)} />
        )}
      </div>
      <div id={styles.board_cell_2}>
        {doing.map((item) => (
          <ActivityCard key={item.id} activity={item} deleteActivity={deleteActivity} />
        ))}
        {addingDoing ? (
          <FormCard type="Doing" toggleForm={() => setAddingDoing(false)} saveActivity={saveActivity} />
        ) : (
          <AddCard onClick={() => setAddingDoing(true)} />
        )}
      </div>
      <div id={styles.board_cell_3}>
        {done.map((item) => (
          <ActivityCard key={item.id} activity={item} deleteActivity={deleteActivity} />
        ))}
        {addingDone ? (
          <FormCard type="Done" toggleForm={() => setAddingDone(false)} saveActivity={saveActivity} />
        ) : (
          <AddCard onClick={() => setAddingDone(true)} />
        )}
      </div>
    </div>
  );
}
