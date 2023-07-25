"use client";
import { createContext, useContext, useState } from "react";
import { Todo } from "../../../../next-d-type";

const dummyData: Todo[] = [
  {
    name: "Programming",
    description: "I will make tow website this week",
    id: "dummyId",
    compelete: true,
  },
  {
    name: "Hobby",
    description: "This sunday is my best friend birthday I should go shopping !",
    id: "dummyId2",
    compelete: false,
  },
];

export const todoContext = createContext({
  toDos: [] as Todo[],
  deleteTodo: (id: string) => {},
  createTodo: ({ name, description, id, compelete }: Todo) => {},
  editTodo: ({ name, description, id, compelete }: Todo) => {},
  changeMainModal: () => {},
  changeEditModal: () => {},
  mainModal: false,
  editModal: false,
});

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [toDos, setTodos] = useState<Todo[]>(dummyData);
  const [mainModal, setMainModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const changeMainModal = () => {
    setMainModal((prev) => !prev);
    if (mainModal) {
      setEditModal(false);
    }
  };
  const changeEditModal = () => {
    setEditModal((prev) => !prev);
    if (editModal) {
      setMainModal(false);
    }
  };

  const createTodoHandler = ({ name, description, id, compelete }: Todo) => {
    const newTodo = {
      name,
      description,
      id,
      compelete,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodoHandler = (id: string) => {
    const newTodos = toDos?.filter((item) => item.id !== id);
    setTodos([...newTodos]);
  };
  const editTodoHandler = ({ name, description, id, compelete }: Todo) => {
    const allTodos = [...toDos];
    const formerTodo = allTodos?.find((item) => item.id === id);
    formerTodo!.name = name;
    formerTodo!.description = description;
    formerTodo!.id = id;
    formerTodo!.compelete = compelete;

    setTodos([...allTodos]);
    console.log(toDos);
    // toDos[todoIndex].name=name;
    // toDos[todoIndex].description=description;
    // toDos[todoIndex].id=id;
  };

  return (
    <todoContext.Provider
      value={{
        toDos,
        createTodo: createTodoHandler,
        deleteTodo: deleteTodoHandler,
        editTodo: editTodoHandler,
        mainModal,
        editModal,
        changeMainModal,
        changeEditModal,
      }}
    >
      {children}
    </todoContext.Provider>
  );
};
export default TodoProvider;
