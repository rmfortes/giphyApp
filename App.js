import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from "react-native";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=JhiCBevfz9NI7KPSHm0ssjk7AvaFKYmi&limit=5&rating=g"
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  ) : (
    data.map((gifObject, key) => {
      return (
        <View key={key} style={styles.container}>
          <Image
            style={{
              width: parseInt(gifObject.images.original.width),
              height: parseInt(gifObject.images.original.height)
            }}
            source={{ uri: gifObject.images.original.url }}
          />
          <StatusBar style="auto" />
        </View>
      );
    })
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
