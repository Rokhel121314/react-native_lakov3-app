import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../firebase/firebaseConfig";
import { useState } from "react";
import { register } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const useFirebaseAuth = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    store_name: "",
    user_name: "",
    user_password: "",
  });

  const email = formData.user_name;
  const password = formData.user_password;
  const dispatch = useDispatch();
  const fireBaseSignin = async () => {
    try {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((userCredential) => {
          setFormData({
            ...formData,
            user_name: userCredential.user.email,
            user_password: userCredential.user.password,
          });
        })
        .then(() => dispatch(register(formData)))
        .catch((error) => console.log("error", error));
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
  return { fireBaseSignin, formData, setFormData };
};

export default useFirebaseAuth;
