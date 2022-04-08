import { Badge, Flex } from "native-base";
import React from "react";
import { appTheme } from "../theme";

type TBadgeProps = { isCompleted: boolean; isPublic: boolean };

export function BadgeGroup({ isCompleted, isPublic }: TBadgeProps) {
  return (
    <Flex direction="row">
      <Badge
        margin={1}
        shadow={1}
        colorScheme={
          isCompleted
            ? appTheme.colorSchemes.successColorScheme
            : appTheme.colorSchemes.infoColorScheme
        }
      >
        {isCompleted ? "COMPLETED" : "IN PROGRESS"}
      </Badge>
      <Badge
        margin={1}
        shadow={1}
        colorScheme={
          isPublic
            ? appTheme.colorSchemes.successColorScheme
            : appTheme.colorSchemes.darkColorScheme
        }
      >
        {isPublic ? "PRIVATE" : "PUBLIC"}
      </Badge>
    </Flex>
  );
}
