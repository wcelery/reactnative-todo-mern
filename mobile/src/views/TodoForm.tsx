import React from "react";
import {
  Button,
  Center,
  Container,
  FormControl,
  Input,
  TextArea,
  VStack,
  Text,
  Flex,
} from "native-base";
import { useFormik } from "formik";
import { QueryClient, useMutation } from "react-query";
import Checkbox from "expo-checkbox";

import { TodosService } from "../services";
import { TodoFormProps } from "../../App";
import { createTodoModel } from "../models";
import { appTheme } from "../theme";
import { CreateTodoSchema } from "../schemas";

export interface IFormProps {
  title: string;
  description: string;
  year: string;
  isPublic: boolean;
  isCompleted: boolean;
}

export function TodoForm({ route }: TodoFormProps) {
  const item = route.params;

  const initState = {
    title: "",
    description: "",
    year: JSON.stringify(new Date().getFullYear()),
    isPublic: false,
    isCompleted: false,
  };

  const queryClient = new QueryClient();
  const todosService = new TodosService();

  const mutation = useMutation(async (data: IFormProps) => todosService.postTodo(data), {
    onSuccess: () => {
      console.log("invalidating...");

      queryClient.invalidateQueries("todos");
    },
  });

  const onSubmit = (data: any) => {
    const todoModel = createTodoModel(data);
    console.log("submiting with ", todoModel);
    mutation.mutate(todoModel);
  };

  const formikProps = useFormik({
    initialValues: !!item ? item : initState,
    onSubmit,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: CreateTodoSchema,
  });

  const handleFormSubmit = () => formikProps.handleSubmit();

  //cant figure out how to make it as single function
  const handlePublicCheckbox = (isSelected: boolean) => {
    formikProps.setFieldValue("isPublic", isSelected);
  };

  const handleCompletedCheckbox = (isSelected: boolean) => {
    formikProps.setFieldValue("isCompleted", isSelected);
  };

  return (
    <Center paddingTop={10}>
      <VStack width="80%" space={4}>
        <FormControl isRequired isInvalid={"title" in formikProps.errors}>
          <FormControl.Label>Title</FormControl.Label>
          <Input
            onBlur={formikProps.handleBlur("title")}
            placeholder="Your title..."
            onChangeText={formikProps.handleChange("title")}
            value={formikProps.values.title}
          />
          <FormControl.ErrorMessage>{formikProps.errors.title}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={"description" in formikProps.errors}>
          <FormControl.Label>Description</FormControl.Label>
          <TextArea
            onBlur={formikProps.handleBlur("description")}
            placeholder="Place your description here..."
            onChangeText={formikProps.handleChange("description")}
            value={formikProps.values.description}
          />
          <FormControl.ErrorMessage>
            {formikProps.errors.description}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={"year" in formikProps.errors}>
          <FormControl.Label>Year</FormControl.Label>
          <Input
            onBlur={formikProps.handleBlur("year")}
            onChangeText={formikProps.handleChange("year")}
            value={formikProps.values.year}
          />
          <FormControl.ErrorMessage>{formikProps.errors.year}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl>
          <Container>
            <Flex direction="row" alignItems="center">
              <Checkbox
                color={appTheme.colors.checkboxColor}
                value={formikProps.values.isPublic}
                onValueChange={handlePublicCheckbox}
              />
              {/* theres no way to pass "handleCheckbox" function as reference, cos "isSelected" parameter exists inside a callback */}
              <Text>Public?</Text>
            </Flex>
            <Flex direction="row" alignItems="center">
              <Checkbox
                color={appTheme.colors.checkboxColor}
                value={formikProps.values.isCompleted}
                onValueChange={handleCompletedCheckbox}
              />
              <Text>Completed?</Text>
            </Flex>
          </Container>
        </FormControl>

        <Button
          onPress={handleFormSubmit}
          isLoading={mutation.isLoading}
          bgColor={appTheme.colors.buttonPrimaryColor}
          shadow={1}
        >
          Submit
        </Button>
      </VStack>
    </Center>
  );
}
