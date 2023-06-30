import * as MediaLibrary from "expo-media-library";
import { shareAsync } from "expo-sharing";
import { useEffect, useState } from "react";

const useReceipt = () => {
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

  // REQUEST PERMISSION ON DEVICE IMAGE LIBRARY
  const reqMediaLibrabryPermission = async () => {
    const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
    setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
  };

  // SAVE IMAGE ON DEVICE
  const saveImage = async (photo) => {
    try {
      await MediaLibrary.saveToLibraryAsync(photo);
    } catch (error) {
      console.log("error", error);
    }
  };

  //   SHARE IMAGE ON OTHER PLATFORMS
  const shareImage = async (photo) => {
    await shareAsync(photo);
  };
  return { saveImage, shareImage, reqMediaLibrabryPermission };
};

export default useReceipt;
