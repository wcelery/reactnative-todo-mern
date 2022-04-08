import React from "react";
import { Box, Container, Fab, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { appTheme } from "../theme";
import { ResponsiveValue } from "styled-system";

//"as never" fixes silly TS issue when .navigate doesn't accept strings

export function CreateTodoBtn() {
  const navigation = useNavigation();

  const navigateToTodoForm = () => navigation.navigate("TodoForm" as never);

  return (
    <Container>
      <Fab
        right={appTheme.positioning.centerFABButton}
        onPress={navigateToTodoForm}
        bgColor={appTheme.colors.buttonPrimaryColor}
        icon={
          <Icon
            color={appTheme.colors.specialWhiteColor}
            as={<AntDesign name="plus" />}
            size={appTheme.sizes.lg}
          />
        }
        renderInPortal={false}
      />
    </Container>
  );
}
