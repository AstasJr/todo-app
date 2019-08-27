import React from "react";
import TodoListItem  from '../todo-list-item';
//импортируем css
import './todo-list.css';

const TodoList = ({todos, onDeleted, onToggleImportant, onToggleDone}) => {
    //получаем элементы массива
    const elements = todos.map((item) => {
        //сохраняем свойства
        const {id, ...itemProps} = item;
        //возвращаем элемент
        return (
            <li key={id} className="list-group-item">
                <TodoListItem
                    {...itemProps}
                    onDeleted = {() => onDeleted(id)}
                    onToggleImportant = {() => onToggleImportant(id)}
                    onToggleDone = {() => onToggleDone(id)} />
            </li>
        );
    });
    //возвращаем список элементов
    return (
        <ul className="list-group todo-list">
            { elements }
        </ul>
    );
};
//экспорт списка элементов
export default TodoList;