import React, {Component} from "react";
import "./item-status-filter.css";

export default class ItemStatusFilter extends Component {
    //массив параметров кнопок фильтра
    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'}
    ];

    render() {
        //деструктурируем значение фильтра из массива свойств
        const {filter, onFilterChange} = this.props;
        //массив самих кнопок фильтра
        const buttons = this.buttons.map(({name, label}) => {
            //определение активной кнопки
            const isActive = filter === name;
            //определение класса для кнопки
            const btnClass = isActive ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button type="button"
                        className={`btn ${btnClass}`}
                        key={name}
                        onClick={() => onFilterChange(name)}>
                    {label}
                </button>
            );
        });

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}
