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
    backgroundColor: "#011627",
    borderRadius: 10,
    width: 120,
  },
  smallButton: {
    padding: 10,
    backgroundColor: "#011627",
    borderRadius: 10,
    width: 50,
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
    width: 170,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewRating: 15,
  reviews: {
    padding: 10,
  },
});
