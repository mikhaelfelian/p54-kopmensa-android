import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

type ActionButtonProps = {
  icon: string;
  label: string;
  color: string;
  library?: "Feather" | "FontAwesome" | "MaterialIcons";
  onPress?: () => void;
};

export const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, color, library = "Feather", onPress }) => {
  const Icon = library === "MaterialIcons" ? MaterialIcons : library === "FontAwesome" ? FontAwesome : Feather;

  return (
    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: color }]} onPress={onPress}>
      <Icon name={icon} size={14} />
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
};
