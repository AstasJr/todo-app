import React, {Component} from 'react';

import TodoList           from '../todo-list';
import AppHeader          from '../app-header';
import SearchPanel        from '../search-panel';
import ItemStatusFilter   from '../item-status-filter';
import ItemAddForm        from '../item-add-form';
//импортируем css
import './app.css';

export default class App extends Component {
    //задаём максимальный id элемента
    maxId = 100;
    // создаём массив элементов заданий
    state = {
        //массив элементов
        todoData : [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a Lunch')
        ],
        term: '', //текст поиска,
        filter: '' //all, active, done
    };
    //функция создания элемента
    createTodoItem(label) {
        return {
            label, //название элемента
            done: false,
            important: false,
            id: this.maxId++
        };
    };
    //функция удаления элемента
    deleteItem = (id) => {
        this.setState( ({todoData}) => {
            const idx = todoData.findIndex( (el) => el.id === id );
            const newTodoData = [ ...todoData.slice(0,idx), ...todoData.slice(idx+1) ];
            return {
                todoData: newTodoData
            };
        });
    };
    //функция добавления элемента
    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todoData}) => {
            const newTodoData = [ ...todoData, newItem ];
            return {
                todoData: newTodoData
            };
        });
    };

    toggleProperty (arr, id, propName) {
        //получаем индекс элемента с текущим id
        const idx = arr.findIndex((el) => el.id === id);
        //выносим элемент с текущим индексом в константу
        const oldItem = arr[idx];
        //создаём дубликат элемента c противоположным значением done
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };
        //создаём новый массив
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleDone = (id) => {
        this.setState( ({todoData}) => {
            //возвращаем данные для списка дел с новым массивом текущего элемента с изменённым done
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState( ({todoData}) => {
            //возвращаем данные для списка дел с новым массивом текущего элемента с изменённым important
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };
    //отслеживание изменений в строке поискап
    onSearchChange = (term) => {
        this.setState({term});
    };
    //отслеживание изменений статуса кнопок фильтра
    onFilterChange = (filter) => {
        this.setState({filter});
    };
    //функция поиска элементов
    search(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };
    //фильтр заданий
    filter(items, filter) {
        if (filter == 'all') {
            return items;
        } else if (filter == 'active') {
            return items.filter((item) => !item.done);
        } else if (filter == 'done') {
            return items.filter((item) => item.done);
        } else {
            return items;
        }
    }

    render() {
        //деструктурируем state
        const { todoData, term, filter } = this.state;
        //отоброжаемые элементы
        const visibleItems = this.filter(this.search(todoData, term), filter);
        //проверяем элементы на done и вычисляем их количество
        const doneCount = todoData.filter( (el) => el.done ).length;
        //вычисляем количество активных заданий
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange = {this.onSearchChange} />
                    <ItemStatusFilter filter={filter} onFilterChange = {this.onFilterChange} />
                </div>
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem} />
            </div>
        );

    }

};