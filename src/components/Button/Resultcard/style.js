import { StyleSheet } from "react-native";
import { colors } from "./style"
export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 23,
  },
  label: {
    color: colors.textSecondary,
    marginBottom: 8,   
    fontSize: 14,
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold", 
    marginBottom: 14,   
  },
  rate: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
