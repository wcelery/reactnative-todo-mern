import React from "react";
import { Center, FlatList, Spinner } from "native-base";
import { StatusBar } from "expo-status-bar";
import { useIsFetching } from "react-query";

import { CreateTodoBtn, TodoItem } from "../components";
import { TodosService } from "../services";
import { useOnFocusQuery } from "../hooks";
import { RefreshControl } from "react-native";
import { usePreventFlickering } from "../hooks/usePreventFlickering";

interface ITodoItem {
  _id: string;
  title: string;
  description: string;
  year: string;
  isPublic: boolean;
  isCompleted: boolean;
}

export type TTodoItem = {
  item: ITodoItem;
};

export function Main() {
  const todosService = new TodosService();
  //refetch: always, otherwise it would refetch only on DELETE mutation
  const { data, refetch } = useOnFocusQuery(
    ["todos"],
    async () => await todosService.getTodos(),
    {
      refetchOnWindowFocus: "always",
    }
  );
  const isFetching = useIsFetching();

  /* loader is flickering, when you use useQuery's "isFetching"
     https://github.com/tannerlinsley/react-query/issues/2380 */

  const { fetching, handleRefresh } = usePreventFlickering(isFetching, refetch);

  const renderTodoItem = ({ item }: TTodoItem) => <TodoItem item={item} />;
  const renderRefreshControl = () => (
    <RefreshControl refreshing={fetching} onRefresh={handleRefresh} />
  );

  return (
    <Center>
      <StatusBar style="auto" />
      <FlatList
        width="100%"
        height="100%"
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderTodoItem}
        refreshControl={renderRefreshControl()}
      />
      <CreateTodoBtn />
    </Center>
  );
}
