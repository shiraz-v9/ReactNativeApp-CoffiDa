import { StyleSheet } from "react-native";

export const externalCSS = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  orangeButton: {
    padding: 10,
    backgroundColor: "#f68e5f",
    borderRadius: 20,
    width: 120,
  },
  boldWhiteTxt: {
    //BOLD TEXT for Buttons
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  inputBox: {
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
