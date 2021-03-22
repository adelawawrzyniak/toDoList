import React from "react";
import ReactDOM from "react-dom";
import './toDoList.css';
import ToDoList from "./toDoList";
  
var destination = document.querySelector("#listBody");
  
ReactDOM.render(
    <div>
        <ToDoList/>
    </div>,
    destination
);