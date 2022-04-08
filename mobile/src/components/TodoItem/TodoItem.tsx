import React from "react";
import { Flex, Pressable, Text, useDisclose } from "native-base";

import TodoItemModal from "./TodoItemModal";
import { BadgeGroup } from "../BadgeGroup";
import { TTodoItem } from "../../views";
import { appTheme } from "../../theme";

export function TodoItem({ item }: TTodoItem) {
  const { isOpen, onClose, onToggle } = useDisclose();
  return (
    <Flex w="100%">
      {/* TODO move spacings, shadows etc to separate file */}
      <Pressable
        onPress={onToggle}
        bg="white"
        justifyContent="center"
        height={50}
        _pressed={{
          bg: appTheme.colors.buttonPressedColor,
        }}
        padding={4}
        margin={4}
        rounded={appTheme.sizes.md}
        shadow={1}
      >
        <Flex direction="row" justifyContent="space-between">
          <Text isTruncated w="50%">
            {item.title}
          </Text>
          <BadgeGroup isCompleted={item.isCompleted} isPublic={item.isPublic} />
        </Flex>
      </Pressable>
      <TodoItemModal item={item} onClose={onClose} isOpen={isOpen} />
    </Flex>
  );
}
