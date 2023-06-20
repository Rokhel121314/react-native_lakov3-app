import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { authentication } from "../firebase/firebaseConfig";
import { useState } from "react";
import { register, login, logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const useFirebaseAuth = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    store_name: "",
    user_name: "",
    user_password: "",
  });

  const [loginData, setLoginData] = useState({
    user_name: "",
    user_password: "",
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // REGISTER USER FIREBASE EMAIL/PASSWORD AUTHENTICATION
  const fireBaseRegister = async () => {
    const email = formData.user_name;
    const password = formData.user_password;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        authentication,
        email,
        password
      );
      setFormData({
        ...formData,
        user_name: userCredential.user.email,
        user_password: userCredential.user.password,
      });
      dispatch(register(formData));
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.log("Email address is already in use!");
      }
      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }
      console.log(error.message);
    }
  };

  // LOGIN USER FIREBASE EMAIL/PASSWORD AUTHENTICATION
  const fireBaseLogin = async () => {
    const email = loginData.user_name;
    const password = loginData.user_password;
    try {
      const userCredential = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
      setLoginData({
        ...loginData,
        user_name: userCredential.user.email,
        user_password: userCredential.user.password,
      });
      dispatch(login(loginData));
    } catch (error) {
      console.log("error", error);
    }
  };

  // LOG OUT USER FIREBASE EMAIL/PASSWORD AUTHENTICATION
  const fireBaseLogout = async () => {
    await signOut(authentication);
    dispatch(logout());
    console.log("logged out");
  };

  // VERIFY USER STATE FIREBASE EMAIL/PASSWORD AUTHENTICATION
  const fireBaseAuthenticateUser = async () => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(`user ${uid} is signed in!`);
        navigation.navigate("bottom-tab");
      } else {
        navigation.navigate("login");
        console.log("user not signed in");
      }
    });
  };

  return {
    fireBaseRegister,
    formData,
    setFormData,
    fireBaseLogin,
    loginData,
    setLoginData,
    fireBaseLogout,
    fireBaseAuthenticateUser,
  };
};

export default useFirebaseAuth;
