"use client";
import { useState, useContext, useEffect } from "react";
import MainModal from "./components/MainModal";
import { todoContext } from "./components/context/TodoContext";
import TodoItem from "./components/TodoItem";
import Image from "next/image";
import {
  MdOutlineRemoveDone,
  MdDoneAll,
  MdOutlineAddCircleOutline,
} from "react-icons/md";
import { Todo } from "../../next-d-type";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [todoItems, setTodoItems] = useState<Todo[]>();
  const todoCtx = useContext(todoContext);

  useEffect(() => {
    if (!search.trim()) {
      setTodoItems(todoCtx.toDos);
    }
    if (search.trim()) {
      const searchString = search.trim()?.toLowerCase();
      setTodoItems(
        todoCtx.toDos.filter((item) =>
          item.name.trim().toLowerCase().includes(searchString)
        )
      );
    }

  }, [search, todoCtx.toDos]);

  return (
    <>
      {todoCtx.mainModal && <MainModal />}

      <header className="relative">
        <Image
          alt="header-image"
          width={400}
          height={400}
          src={"/images/headerImage.png"}
          className="w-full h-[30vh]"
        />
        <div className="search-container w-72 xs:w-96 h-40 bg-neutral-50 shadow-2xl rounded-2xl absolute m-auto left-0 right-0 top-16 overflow-hidden px-8 py-4 flex items-end">
          <div className="text-center w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What are you looking for ?"
              className="bg-neutral-50 border-b-2 w-full h-10 placeholder:text-neutral-400 placeholder:text-sm focus:outline-0 ps-1 focus:border-cyan-500 mb-5"
            />
            <button
              type="submit"
              className="bg-gradient-to-t from-[rgba(0,179,209,1)] from-10% via-[rgba(65,121,230,1)] via-67% to-[rgba(8,145,178,1)] to-100% text-neutral-50 py-1 px-8 text-base rounded-md shadow-md hover:scale-105 transition-all duration-300"
            >
              search
            </button>
          </div>
        </div>
      </header>

      <div className="header-list mt-40 border-neutral-300  px-6 xs:w-10/12 mx-auto">
        <div className="flex justify-between px-2">
          <div className="icons text-neutral-500 flex space-x-2 sm:space-x-4">
            <div className="flex cursor-pointer items-center text-cyan-500">
              <MdDoneAll />
              <span>completed</span>
            </div>
            <div className="flex cursor-pointer items-center text-rose-500">
              <MdOutlineRemoveDone /> <span>pending</span>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-gradient-to-t from-[rgba(0,179,209,1)] from-10% via-[rgba(65,121,230,1)] via-67% to-[rgba(8,145,178,1)] to-100% text-neutral-50 py-1 px-3 text-base rounded-md shadow-md hover:scale-105 transition-all duration-300"
              onClick={todoCtx.changeMainModal}
            >
              ADD <MdOutlineAddCircleOutline className="inline-flex" />
            </button>
          </div>
        </div>
        <div className="line w-full h-px mt-1 bg-neutral-400"></div>
      </div>

      <div className="pb-40">
        {todoItems?.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
