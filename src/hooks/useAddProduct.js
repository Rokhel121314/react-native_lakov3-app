import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/productSlice";
import { useNavigation } from "@react-navigation/native";

const useAddProduct = () => {
  //
  const { userData } = useSelector((state) => state.user);
  const { productDetail } = useSelector((state) => state.product);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // INPUT DATA
  const [newFormData, setNewFormData] = useState({
    product_name: "",
    product_image: "",
    original_price: "",
    selling_price: "",
    product_quantity: "",
    product_type: "",
  });

  // TRANSOFORMING INPUT DATA THAT NEEDED TO PASS ON API AND CONVERTING DATA THAT NEEDED TO BE NUMBERS
  const formData = {
    product_name: newFormData.product_name,
    product_image: newFormData.product_image,
    original_price: parseFloat(newFormData.original_price),
    selling_price: parseFloat(newFormData.selling_price),
    product_quantity: parseFloat(newFormData.product_quantity),
    product_type: newFormData.product_type,
  };

  //   RTK ASYNCTHUNK PARAMETER
  const dispatchData = {
    formData,
    user_id: userData.user_id,
  };

  //    HANDLE INPUT CHANGE
  const handleInputChange = (name, value) => {
    setNewFormData({ ...newFormData, [name]: value });
  };

  //    UPLOADING IMAGE
  const addProductImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      const uploadedImage = result.assets[0].base64;
      const image = "data:image/jpeg;base64," + uploadedImage;
      setNewFormData({ ...newFormData, product_image: image });
    }
  };

  //   SAVING PRODUCT TO DATA BASE

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await dispatch(addProduct(dispatchData));
    navigation.navigate("view-product", { item: productDetail });
  };

  return {
    newFormData,
    handleInputChange,
    addProductImage,
    formData,
    handleAddProduct,
  };
};

export default useAddProduct;
