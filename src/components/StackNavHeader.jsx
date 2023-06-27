import { TouchableOpacity, View, Text } from "react-native";
import React, { useState } from "react";
import BackButton from "./BackButton";
import { deleteProduct } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "./ConfirmationModal";

const StackNavHeader = ({
  item,
  back,
  navigation,
  backDestination,
  editButton,
  deleteButton,
  saveButton,
  title,
}) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const productUserId = {
    user_id: userData.user_id,
    product_id: item._id,
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleDelete = async () => {
    await dispatch(deleteProduct(productUserId));
    setIsSaved(true);
    setTimeout(() => {
      navigation.navigate("stocks");
      setIsSaved(false);
    }, 3000);
  };

  return (
    <>
      <ConfirmationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleConfirmAction={() => handleDelete()}
        confirmationMessage={"Do you want to delete "}
        confirmBtnText={"CONFIRM"}
        cancelBtnText={"CANCEL"}
        isSaved={isSaved}
        productDetail={item}
        successMessage={"HAS BEEN DELETED SUCCESSFULLY!"}
      />
      <View className="h-16 bg-gray-100 flex-row justify-between items-center">
        {back ? (
          <BackButton
            navigation={navigation}
            backDestination={backDestination}
          />
        ) : null}
        {title ? (
          <Text className="text-2xl font-bold text-blue-dianne place-self-center">
            {title}
          </Text>
        ) : null}
        <View className="flex-row mr-4 gap-3">
          {editButton ? (
            <TouchableOpacity
              className="bg-blue-dianne rounded-xl justify-items-center"
              onPress={() => navigation.navigate("update-product", { item })}>
              <Text className="px-2 py-1 text-gray-50">EDIT</Text>
            </TouchableOpacity>
          ) : null}
          {deleteButton ? (
            <TouchableOpacity
              className="bg-blue-dianne rounded-xl justify-items-center"
              onPress={() => setModalVisible(true)}>
              <Text className="px-2 py-1 text-gray-50">DELETE</Text>
            </TouchableOpacity>
          ) : null}
          {saveButton ? (
            <TouchableOpacity className="bg-blue-dianne rounded-xl justify-items-center">
              <Text className="px-2 py-1 text-gray-50">SAVE</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default StackNavHeader;
