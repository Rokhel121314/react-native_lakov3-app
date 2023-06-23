import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../redux/productSlice";
import { useNavigation } from "@react-navigation/native";

const useUpdateProduct = () => {
  const { userData } = useSelector((state) => state.user);
  const { productDetail, isSavingProduct } = useSelector(
    (state) => state.product
  );
  const navigation = useNavigation();

  console.log("isSavingProduct", isSavingProduct);

  const productName =
    productDetail.product_name.charAt(0).toUpperCase() +
    productDetail.product_name.slice(1);
  const [newFormData, setNewFormData] = useState({
    product_name: productName,
    product_image: productDetail.product_image,
    original_price: productDetail.original_price,
    selling_price: productDetail.selling_price,
    product_quantity: productDetail.product_quantity,
    product_type: productDetail.product_type,
  });

  const formData = {
    product_name: newFormData.product_name,
    product_image: newFormData.product_image,
    original_price: parseInt(newFormData.original_price),
    selling_price: parseInt(newFormData.selling_price),
    product_quantity: parseInt(newFormData.product_quantity),
    product_type: newFormData.product_type,
  };

  const updatedData = {
    user_id: userData.user_id,
    product_id: productDetail._id,
    formData,
  };

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

  const productNameChange = (text) => {
    setNewFormData({ ...newFormData, product_name: text });
  };

  const originalPriceChange = (text) => {
    setNewFormData({ ...newFormData, original_price: text });
  };

  const sellingPriceChange = (text) => {
    setNewFormData({ ...newFormData, selling_price: text });
  };

  const productQuantityChange = (text) => {
    setNewFormData({ ...newFormData, product_quantity: text });
  };

  const productTypeChange = (text) => {
    setNewFormData({ ...newFormData, product_type: text });
  };

  const dispatch = useDispatch();

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    dispatch(updateProduct(updatedData));
    setTimeout(() => {
      navigation.navigate("view-product", { item: productDetail });
    }, 1);
  };

  const handleRedirect = () => {};

  return {
    handleUpdateProduct,
    productTypeChange,
    productQuantityChange,
    sellingPriceChange,
    originalPriceChange,
    productNameChange,
    focus,
    blur,
    editing,
    textInputStyle,
    newFormData,
    productDetail,
    isSavingProduct,
  };
};

export default useUpdateProduct;
