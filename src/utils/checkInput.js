export const checkInputs = (newFormData, setModalVisible) => {
  if (!newFormData.product_name.trim()) {
    alert("product name required!");
    return;
  }
  if (!newFormData.product_image.trim()) {
    alert("product image required!");
    return;
  }
  if (!newFormData.original_price.trim()) {
    alert("original price required!");
    return;
  }
  if (!newFormData.selling_price.trim()) {
    alert("selling price required!");
    return;
  }
  if (!newFormData.product_quantity.trim()) {
    alert("product quantity required!");
    return;
  }
  if (!newFormData.product_type.trim()) {
    alert("product type required!");
    return;
  }
  console.log("data", newFormData);
  setModalVisible(true);
};
