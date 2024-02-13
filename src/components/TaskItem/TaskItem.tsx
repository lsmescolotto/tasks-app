import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Material from "react-native-vector-icons/MaterialIcons";

interface TaskItemProps {
  data: {id: string | null; name: string};
  handleDeleteTask: (key: string | null) => void;
  handleEditTask: (data: {id: string | null; name: string}) => void;
}

const TaskItem = (props: TaskItemProps) => {
  const {data, handleDeleteTask, handleEditTask} = props;
  console.log(data);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleDeleteTask(data.id)}>
        <Material name="delete" color="#FFF" size={20} />
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={() => handleEditTask(data)}>
        <Text style={{color: "#FFF", marginLeft: 15}}>{data.name}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#121212",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
  },
});

export default TaskItem;
