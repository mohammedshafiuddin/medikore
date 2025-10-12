// import { useTheme } from "@/hooks/theme-context";
import React from "react";
import {
  TextInput as PaperTextInput,
  TextInputProps,
} from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import MyText from "./text";
import { colors } from "common-ui";
import { useTheme } from "common-ui";

type MyTextInputProps = TextInputProps & {
  topLabel?: string;
  fullWidth?: boolean; // Optional prop to control width
};


const MyTextInput: React.FC<MyTextInputProps> = ({
  topLabel,
  fullWidth = true,
  secureTextEntry,
  ...props
}) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = !!secureTextEntry;

  return (
    <View style={{ ...(fullWidth && { width: "100%" }) }}>
      {topLabel && (
        <MyText
          weight="medium"
          style={{ color: theme.colors.gray4, fontSize: 14 }}
        >
          {topLabel}
        </MyText>
      )}
      <PaperTextInput
        {...props}
        secureTextEntry={isPassword && !showPassword}
        label={undefined}
        style={[
          {
            borderRadius: 4,
            backgroundColor: "transparent",
            borderColor: theme.colors.gray2,
            borderWidth: 1,
          },
          props.style,
        ]}
        underlineColor="transparent"
        placeholderTextColor={theme.colors.gray2}
        activeUnderlineColor={"transparent"}
        selectionColor={theme.colors.blue1}
        cursorColor={theme.colors.blue1}
        textColor={colors.black1}
        right={
          isPassword
            ? (
                <PaperTextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword((v) => !v)}
                  forceTextInputFocus={false}
                  style={{ opacity: 0.7 }}
                />
              )
            : undefined
        }
      />
    </View>
  );
};

export default MyTextInput;