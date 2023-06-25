import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../redux/productSlice";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const useUpdateProduct = () => {
  //
  const { userData } = useSelector((state) => state.user);
  const { productDetail, isSavingProduct } = useSelector(
    (state) => state.product
  );
  const navigation = useNavigation();

  console.log("isSavingProduct", isSavingProduct);

  // CAPITALIZING FIRST LETTER OF PRODUCT NAME
  const productName =
    productDetail.product_name.charAt(0).toUpperCase() +
    productDetail.product_name.slice(1);

  // NEW INPUT DATA
  const [newFormData, setNewFormData] = useState({
    product_name: productName,
    product_image: productDetail.product_image,
    original_price: productDetail.original_price,
    selling_price: productDetail.selling_price,
    product_quantity: productDetail.product_quantity,
    product_type: productDetail.product_type,
  });

  // CONVERTING DATA THAT SHOULD BE NUMBER
  const formData = {
    product_name: newFormData.product_name,
    product_image: newFormData.product_image,
    original_price: parseFloat(newFormData.original_price),
    selling_price: parseFloat(newFormData.selling_price),
    product_quantity: parseFloat(newFormData.product_quantity),
    product_type: newFormData.product_type,
  };

  //   RTK ASYNCTHUNK PARAMETER
  const updatedData = {
    user_id: userData.user_id,
    product_id: productDetail._id,
    formData,
  };

  // INPUT STYLE ON FOCUS & BLUR
  const onFocusStyle =
    "text-4xl font-bold  w-full bg-gray-200 rounded-md border border-gray-400";
  const onBlurStyle = "text-4xl font-bold bg-gray-100 mr-2";
  const [editing, setEditing] = useState(false);
  const [textInputStyle, setTextInputStyle] = useState(onBlurStyle);

  const blur = () => {
    setTextInputStyle(onBlurStyle);
    setEditing(false);
  };

  const focus = () => {
    setTextInputStyle(onFocusStyle);
    setEditing(true);
  };

  // HANDLE INPUT CHANGE
  const handleInputChange = (name, value) => {
    setNewFormData({ ...newFormData, [name]: value });
  };

  //    UPLOADING IMAGE
  const productImageChange = async () => {
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

  const dispatch = useDispatch();

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    await dispatch(updateProduct(updatedData));
    navigation.navigate("view-product", { item: productDetail });
  };

  return {
    handleUpdateProduct,
    focus,
    blur,
    editing,
    textInputStyle,
    newFormData,
    productDetail,
    isSavingProduct,
    productImageChange,
    handleInputChange,
  };
};

export default useUpdateProduct;
