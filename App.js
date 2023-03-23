import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { gStyle } from "./Style/style";
import HomepageStack from "./navigate";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// import {
//   getItemFromAsyncStorage,
//   storeItemToAsyncStorage,
// } from "./components/AsyncStorageMethods";

export default function App() {
  const [userData, setUserData] = useState([]);
  const [isReady, setIsReady] = useState(false);
  /// trigger changes in userData
  // useEffect(() => {
  //   // / if changes registered in userData
  //   console.log(userData);
  // }, [userData]);
  /// STORE USER TO ASYNC STORAGE EXAMPLE
  /*
  const userArrayData = 
    {
        _id: data._id,
        email: data.email,
        name: data.name,
        emailNotifications: data.emailNotifications,
        appNotifications: data.appNotifications,
        secret: data.secret,
        userAvatar: data.userAvatar,
    };
    /// store user to Async Storage                  
    storeItemToAsyncStorage("user", userArrayData);
  */

  /// on app load check if user exist in asyncStorage
  // GET THE USER ARRAY FROM ASYNC STORAGE EXAMPLE
  // const getNewData = async () => {
  //   const newItem = await getItemFromAsyncStorage("user");
  //   //   /// wait until loaded
  //   //   //console.log(newItem)
  //   if (newItem) {
  //     //     // set state
  //     setUserData(newItem);
  //   }
  // };
  /// hit the function

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
    /// call it once by this method
    // getNewData();
  }, []);

  if (!isReady) {
    return null;
  }
  return (
    <View style={gStyle.main}>
      <HomepageStack userData={userData} setUserData={setUserData} />
    </View>
  );
}
