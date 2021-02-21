import { StyleSheet } from "react-native";

export const externalCSS = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 18,
    // padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  orangeButton: {
    padding: 10,
    backgroundColor: "#f68e5f",
    borderRadius: 10,
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
  picker: {
    height: 50,
    width: 165,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
