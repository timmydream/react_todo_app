import React, {Component} from 'react';
import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends Component {
    maxId = 100;
    state = {
        todoData: [
            this.createTodoItem('Drink a coffee'),
            this.createTodoItem('Make something'),
            this.createTodoItem('Studying')
        ], 
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const ind = todoData.findIndex((el) => el.id === id);

            const newArray = [...todoData.slice(0, ind), ...todoData.slice(ind + 1)];

            return {
                todoData: newArray
            };
        });
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);  
        this.setState(({todoData}) => {
            const newArr = [...todoData, newItem];

            return {
                todoData: newArr
            }
        });
    }

    toggleProperty(arr, id, propName) {
        const ind = arr.findIndex((el) => el.id === id);
            const oldItem = arr[ind];

            const newItem = {...oldItem, [propName]: !oldItem[propName]};
            const newArray = [...arr.slice(0, ind), newItem, ...arr.slice(ind + 1)];

            return newArray;
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    search = (arr, term) => {
        if (term.length === 0) {
            return arr;
        }
        return arr.filter((item) => { 
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    onSearchChange = (term) => {
        this.setState({term});
    };

    onFilterChange = (filter) => {
        this.setState({filter});
    };

    filter(items, filter) {
        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);       
            default:
                return items;
        }
    }

    render() {
        const doneCount = this.state.todoData.filter((el) => el.done).length;
        const todoCount = this.state.todoData.length - doneCount;
        const visible = this.filter(this.search(this.state.todoData, this.state.term), this.state.filter);

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="d-flex top-panel">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={this.state.filter} onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList todos={visible} onDeleted={this.deleteItem} 
                        onToggleImportant={this.onToggleImportant} onToggleDone={this.onToggleDone}/>
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    }
};
