"use client";
import React, { useRef, useContext,useState } from "react";
import nextId from "react-id-generator";
import { todoContext } from "./context/TodoContext";
import { Todo } from "../../../next-d-type";
import { AiOutlineCloseCircle } from "react-icons/ai";
const MainModal = () => {
  const todoCtx = useContext(todoContext);

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const compeleteRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
   
    const enteredName = nameRef.current?.value;
    const enteredDescription = descriptionRef.current?.value;
    const enteredCompelete = compeleteRef.current?.checked;

    if (!enteredName?.trim()) {
      setError(true)
      return
    }

    const todo: Todo = {
      name: enteredName!,
      description: enteredDescription!,
      id: nextId(),
      compelete: enteredCompelete!,
    };
    todoCtx.createTodo(todo);
    todoCtx.changeMainModal();
  };

  return (
    <>
      <div className="bg-neutral-500/70 flex justify-center items-center w-screen h-screen fixed bottom-0 top-0 left-0 right-0 z-10 overflow-hidden">
        <div className="md:!w-[60%] !w-[90%] !h-[60%] xs:!h-[80%] !max-w-[700px] overflow-x-hidden relative bg-neutral-100 rounded-md p-4 xs:p-8 shadow-md overflow-hidden">
          <button
            onClick={todoCtx.changeMainModal}
            className="absolute top-2 right-2"
          >
            <AiOutlineCloseCircle className="text-cyan-500 text-4xl" />
          </button>
          <div className="mt-8 mb-16 ">
            <h4 className="text-neutral-900 font-semibold xs:text-3xl">Create Todo</h4>
            <p className="text-neutral-600 pt-1 text-xs xs:text-base">
              Create Todo with information like name and etc.
            </p>
          </div>
          <form onSubmit={submitHandler}>
            <div className="relative mt-12">
              <input
                type="text"
                id="name"
                className="peer bg-neutral-100 border-b-2 border-neutral-300 p-1 w-full focus:outline-none focus:border-b-cyan-500"
                ref={nameRef}
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
              {error&&(<small className="text-rose-500">name field shoud be filled.</small>)}
            </div>

            <div className="relative mt-12">
              <input
                type="text"
                id="description"
                className="peer bg-neutral-100 border-b-2 border-neutral-300 p-1 w-full focus:outline-none focus:border-b-cyan-500"
                ref={descriptionRef}
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
                id="cyan-checkbox"
                type="checkbox"
                value=""
                ref={compeleteRef}
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
                Add Todo
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MainModal;

{
  /* <div className="relative mt-12">
               <select
                name="select"
                id="select-box"
                className="w-full h-10 bg-neutral-100 border-b-2 border-neutral-300 focus:outline-none"
              >
                <option
                  className="checked:bg-cyan-500 checked:text-neutral-100"
                  value="daily work"
                  key="daily work"
                >
                  daily work
                </option>
                <option
                  className="checked:bg-cyan-500 checked:text-neutral-100"
                  value="programming"
                  key="programming"
                >
                  programming
                </option>
                <option
                  className="checked:bg-cyan-500 checked:text-neutral-100"
                  value="shopping"
                  key="shopping"
                >
                  shopping
                </option>
                <option
                  className="checked:bg-cyan-500 checked:text-neutral-100"
                  value="hobby"
                  key="hobby"
                >
                  hobby
                </option>
                <option
                  className="checked:bg-cyan-500 checked:text-neutral-100"
                  value="business"
                  key="business"
                >
                  business
                </option>
                <option
                  className="checked:bg-cyan-500 checked:text-neutral-100"
                  value="family"
                  key="family"
                >
                  family
                </option>
                <option
                  className="checked:bg-cyan-500 checked:text-neutral-100"
                  value="other"
                  key="other"
                  selected
                >
                  other
                </option>
              </select> 
            </div> */
}
