"use client";
import { useState, useContext } from "react";
import EditModal from "@/app/components/EditModal";
import { todoContext } from "@/app/components/context/TodoContext";

import { Todo } from "../../../next-d-type";
import { BsTrash3, BsPencil, BsCheckLg, BsCheckCircle } from "react-icons/bs";

type Props = {
  item: Todo;
};

export default function TodoItem({ item }: Props) {
  const todoCtx = useContext(todoContext);

  return (
    <>
      {todoCtx.editModal && <EditModal item={item} />}

      <div className="todo-items mt-8 px-8">
        <div
          className={`todo-item hover:scale-[1.01] xs:w-10/12 mx-auto transition-all duration-700 min-h-[100px] p-4 border-2 border-s-8 rounded-md shadow-xl flex justify-between ${
            item.compelete ? "border-cyan-500" : "border-rose-500"
          }`}
        >
          {/* {item.compelete && (
            <div className="absolute text-cyan-500 text-2xl top-1/2 right-4 -translate-y-1/2">
              <BsCheckCircle />
            </div>
          )} */}

          <div className="information space-y-2 w-3/4 my-auto">
            <h6 className="font-semibold mb-4 xs:mb-2 xs:text-lg break-words xs:break-normal">
              {item.name}
            </h6>
            <p className="text-neutral-500 text-sm line-clamp-2 break-all max-w-[90%]">
              {item.description}
            </p>
            <button
              className={`text-neutral-50 px-1 ${
                item.compelete ? "bg-cyan-500" : "bg-rose-500"
              }`}
            >
              {item.compelete ? "compeleted" : "pending"}
            </button>
          </div>

          <div className="icons h-full flex flex-col sm:flex-row">
            <div
              onClick={() => todoCtx.editTodo({ ...item, compelete: true })}
              className={`shadow-lg w-10 h-10 cursor-pointer mb-1 mr-1  rounded-full flex justify-center items-center bg-neutral-50 border-2 ${
                item.compelete ? "border-cyan-500" : "border-rose-500"
              }`}
            >
              <BsCheckLg
                className={`text-lg ${
                  item.compelete ? "text-cyan-500" : "text-rose-500"
                }`}
              />
            </div>
            <div
              onClick={()=>todoCtx.changeEditModal()}
              className={`shadow-lg w-10 h-10 cursor-pointer mb-1 mr-1  rounded-full flex justify-center items-center bg-neutral-50 border-2 ${
                item.compelete ? "border-cyan-500" : "border-rose-500"
              }`}
            >
              <BsPencil
                className={`text-lg ${
                  item.compelete ? "text-cyan-500" : "text-rose-500"
                }`}
              />
            </div>
            <div
              onClick={() => todoCtx.deleteTodo(item.id)}
              className={`shadow-lg w-10 h-10 cursor-pointer !m-0 rounded-full flex justify-center items-center bg-neutral-50 border-2 ${
                item.compelete ? "border-cyan-500" : "border-rose-500"
              }`}
            >
              <BsTrash3
                className={`text-lg ${
                  item.compelete ? "text-cyan-500" : "text-rose-500"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
