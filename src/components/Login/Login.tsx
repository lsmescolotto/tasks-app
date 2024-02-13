import {Dispatch, SetStateAction, useState} from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import firebase from "../../firebaseConnection";

interface LoginProps {
  setUser: Dispatch<SetStateAction<null | string | undefined>>;
}

const Login = (props: LoginProps) => {
  const {setUser} = props;

  const [loginInfo, setLoginInfo] = useState({email: "", password: ""});
  const [accessType, setAccessType] = useState<"login" | "sign up">("login");

  const handleChangeAccessType = () => {
    setAccessType((state) => (state === "login" ? "sign up" : "login"));
  };

  const handleLoginAndRegister = () => {
    if (accessType === "login") {
      firebase
        .auth()
        .signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
        .then((userInfo) => {
          setUser(userInfo.user?.uid);
        })
        .catch((error) => console.log(error));
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(loginInfo.email, loginInfo.password)
        .then((userInfo) => setUser(userInfo.user?.uid))
        .catch((error) => console.log(error));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={loginInfo.email}
        onChangeText={(text) =>
          setLoginInfo((state) => ({...state, email: text}))
        }
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={loginInfo.password}
        onChangeText={(text) =>
          setLoginInfo((state) => ({...state, password: text}))
        }
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleLoginAndRegister}
        style={styles.loginButton}>
        <Text style={styles.loginButtonText}>
          {accessType === "login" ? "Login" : "Register"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleChangeAccessType}>
        <Text style={{textAlign: "center"}}>
          {accessType === "login"
            ? "Don't have an account yet? Go to register"
            : "Already have an account? Go to login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#f2f6fc",
    justifyContent: "center",
  },

  input: {
    marginBottom: 15,
    backgroundColor: "#FFF",
    borderRadius: 6,
    padding: 10,
    borderWidth: 1,
    borderColor: "#141414",
  },

  loginButton: {
    padding: 15,
    backgroundColor: "#141414",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    borderRadius: 8,
  },
  loginButtonText: {
    color: "#FFF",
  },
});

export default Login;
