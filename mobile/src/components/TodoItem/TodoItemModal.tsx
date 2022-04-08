import React from "react";
import { Button, Modal } from "native-base";
import { useMutation, useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";

import { TodosService } from "../../services";
import { appTheme } from "../../theme";

export default function TodoItemModal({ item, isOpen, onClose }: any) {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const todosService = new TodosService();

  //TODO move invalidation to the separate class??? maybe
  const mutation = useMutation(async (id: string) => todosService.deleteTodo(id), {
    onSuccess: () => {
      console.log("invalidating from modal");

      queryClient.invalidateQueries("todos");
    },
  });

  const deleteHandler = () => {
    mutation.mutate(item._id);
    console.log(mutation.status);
  };

  const editHandler = () => {
    navigation.navigate("TodoForm" as never, item as never);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{item.title}</Modal.Header>
        <Modal.Body>{item.description}</Modal.Body>
        <Modal.Footer>
          <Button.Group variant="ghost" space={2}>
            <Button
              onPress={deleteHandler}
              isLoading={mutation.isLoading}
              colorScheme={appTheme.colorSchemes.dangerColorScheme}
            >
              DELETE
            </Button>
            <Button onPress={editHandler}>EDIT</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
