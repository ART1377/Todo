"use client";
import React, { useState, useRef, useContext } from "react";
import nextId from "react-id-generator";
import { todoContext } from "./context/TodoContext";
import { Todo } from "../../../next-d-type";
import { AiOutlineCloseCircle } from "react-icons/ai";
type Props = {
  item: Todo;
};

const EditModal = ({ item }: Props) => {
  const todoCtx = useContext(todoContext);

  const [nameState, setNameState] = useState<string>(item.name);
  const [descriptionState, setDescriptionState] = useState<string>(
    item.description
  );
  const [compeleteState, setCompeleteState] = useState<boolean>(item.compelete);
  const [error, setError] = useState<boolean>(false);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredName = nameState;
    const enteredDescription = descriptionState;
    const enteredCompelete = compeleteState;

    if (!enteredName?.trim()) {
      setError(true);
      return;
    }

    const todo: Todo = {
      name: enteredName!,
      description: enteredDescription!,
      id: item.id,
      compelete: enteredCompelete,
    };
    todoCtx.editTodo(todo);
    todoCtx.changeEditModal();
  };

  return (
    <>
      <div className="bg-neutral-500/70 flex justify-center items-center w-screen h-screen fixed top-0 left-0 z-10 overflow-hidden">
        <div className="md:!w-[60%] !w-[90%] !h-[60%] xs:!h-[80%] !max-w-[700px] overflow-x-hidden relative bg-neutral-100 rounded-md p-4 xs:p-8 shadow-md overflow-hidden">
          <button
            onClick={todoCtx.changeEditModal}
            className="absolute top-2 right-2"
          >
            <AiOutlineCloseCircle className="text-cyan-500 text-4xl" />
          </button>
          <div className="mt-8 mb-16 ">
            <h4 className="text-neutral-900 font-semibold xs:text-3xl">
              Edit Todo
            </h4>
            <p className="text-neutral-600 pt-1 text-xs xs:text-base">
              Edit Yout Tasks here.
            </p>
          </div>
          <form onSubmit={submitHandler}>
            <div className="relative mt-12">
              <input
                type="text"
                id="name"
                className="peer bg-neutral-100 border-b-2 border-neutral-300 p-1 w-full focus:outline-none focus:border-b-cyan-500"
                onChange={(e) => setNameState(e.target.value)}
                value={nameState}
                placeholder=" "
                maxLength={40}
              />
              <label
                htmlFor="name"
                className="text-neutral-500 absolute left-1 -top-5 text-xs transition-all duration-300 
                peer-placeholder-shown:-top-0
                peer-placeholder-shown:left-1
                peer-placeholder-shown:text-base
                peer-focus:text-cyan-500  peer-focus:text-sm 
                peer-focus:left-1 peer-focus:-top-5"
              >
                name
              </label>
              {error && (
                <small className="text-rose-500">
                  name field shoud be filled.
                </small>
              )}
            </div>

            <div className="relative mt-12">
              <input
                type="text"
                id="description"
                className="peer bg-neutral-100 border-b-2 border-neutral-300 p-1 w-full focus:outline-none focus:border-b-cyan-500"
                onChange={(e) => setDescriptionState(e.target.value)}
                value={descriptionState}
                placeholder=" "
                maxLength={255}
              />
              <label
                htmlFor="description"
                className="text-neutral-500 absolute left-1 -top-5 text-xs transition-all duration-300 
                peer-placeholder-shown:-top-0
                peer-placeholder-shown:left-1
                peer-placeholder-shown:text-base
                peer-focus:text-cyan-500  peer-focus:text-sm 
                peer-focus:left-1 peer-focus:-top-5"
              >
                description
              </label>
            </div>

            {/* Checkbox /////////////////// */}
            <div className="flex items-center mt-5">
              <input
                checked={compeleteState ? true : false}
                id="cyan-checkbox"
                type="checkbox"
                onChange={() => setCompeleteState((prev) => !prev)}
                className="w-4 h-4 rounded accent-cyan-500 hover:cursor-pointer peer"
              />
              <label
                htmlFor="purple-checkbox"
                className="ml-2 text-xs xs:text-sm font-medium text-gray-900 dark:text-gray-300 peer-checked:text-cyan-500"
              >
                I have done this work !
              </label>
            </div>
            {/* Buttons /////////////////// */}
            <div className="absolute bottom-4 right-4">
              <button
                onClick={todoCtx.changeMainModal}
                type="button"
                className="bg-transparent text-cyan-500 ring-2 ring-inset outline-cyan-500 px-4 text-sm py-2 xs:px-6 xs:text-base rounded-md shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-t from-[rgba(0,179,209,1)] from-10% via-[rgba(65,121,230,1)] via-67% to-[rgba(8,145,178,1)] to-100% text-neutral-50 px-4 text-sm py-2 xs:px-6 xs:text-base rounded-md shadow-md ms-3"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditModal;
