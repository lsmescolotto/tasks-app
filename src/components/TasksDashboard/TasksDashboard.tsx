import {useEffect, useState, useRef} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Keyboard,
} from "react-native";
import TaskItem from "../TaskItem/TaskItem";
import firebase from "../../firebaseConnection";
import Material from "react-native-vector-icons/MaterialIcons";

const TasksDashboard = (props) => {
  const {user} = props;

  const inputRef = useRef<any>(null);

  const [newTask, setNewTask] = useState("");
  const [tasksList, setTasksList] = useState<
    {id: string | null; name: string}[]
  >([]);
  const [taskKey, setTaskKey] = useState("");

  const handleDeleteTask = (key: string | null) => {
    firebase
      .database()
      .ref("tasks")
      .child(user)
      .child(key ?? "")
      .remove()
      .then(() => {
        const newList = tasksList.filter((item) => item.id !== key);
        setTasksList(newList);
      });
  };

  const handleEditTask = (data: {id: string | null; name: string}) => {
    setNewTask(data.name);
    setTaskKey(data.id ?? "");
    inputRef?.current?.focus();
  };

  const handleAddNewTask = () => {
    if (taskKey) {
      firebase
        .database()
        .ref("tasks")
        .child(user)
        .child(taskKey)
        .update({
          name: newTask,
        })
        .then(() => {
          const taskIndex = tasksList.findIndex((item) => item.id === key);
          const tempTasksList = [...tasksList];
          tempTasksList[taskIndex].name = newTask;
          setTasksList(tempTasksList);
        });
      setNewTask("");
      setTaskKey("");
      Keyboard.dismiss();
      return;
    }
    if (newTask !== "") {
      const tasks = firebase.database().ref("tasks").child(user);
      const key = tasks.push().key;
      tasks
        .child(key ?? "")
        .set({
          name: newTask,
        })
        .then(() => {
          const data = {id: key, name: newTask};
          setTasksList((state) => [...state, data]);
          setNewTask("");
          Keyboard.dismiss();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleCancelTaskEdit = () => {
    setNewTask("");
    setTaskKey("");
    Keyboard.dismiss();
  };

  useEffect(() => {
    const getTasks = () => {
      if (!user) {
        return;
      }
      firebase
        .database()
        .ref("tasks")
        .child(user)
        .once("value", (snapshot) => {
          setTasksList([]);
          snapshot?.forEach((item) => {
            const data = {name: item.val().name, id: item.key};
            setTasksList((state) => [...state, data]);
          });
        });
    };
    getTasks();
  }, [user]);

  return (
    <View>
      {taskKey && (
        <View style={styles.edit}>
          <TouchableOpacity onPress={handleCancelTaskEdit}>
            <Material name="highlight-off" size={20} color="#ff0000" />
          </TouchableOpacity>
          <Text style={styles.editText}>You are editing a task</Text>
        </View>
      )}
      <View style={styles.header}>
        <TextInput
          placeholder={"Your beautiful task"}
          onChangeText={(text) => setNewTask(text)}
          style={styles.taskInput}
          value={newTask}
          ref={inputRef}
        />
        <TouchableOpacity onPress={handleAddNewTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasksList}
        renderItem={({item}) => (
          <TaskItem
            data={item}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  edit: {flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10},
  editText: {color: "#ff0000"},
  header: {
    flexDirection: "row",
  },
  taskInput: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#141414",
    height: 45,
  },
  addButton: {
    backgroundColor: "#141414",
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    borderRadius: 6,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 20,
  },
});

export default TasksDashboard;
