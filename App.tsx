/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import Login from "./src/components/Login/Login";
import TasksDashboard from "./src/components/TasksDashboard/TasksDashboard";

function App(): React.JSX.Element {
  const [user, setUser] = useState<null | string | undefined>(null);

  return (
    <SafeAreaView style={styles.container}>
      {user ? <TasksDashboard user={user} /> : <Login setUser={setUser} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    paddingHorizontal: 10,
    backgroundColor: "#f2f6fc",
  },
});

export default App;
