import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ]

  render() {

    const buttons = this.buttons.map(({name, label}) => {
      const isActive = this.props.filter === name;
      const classNm = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button type="button"
          className={`btn ${classNm}`} key={name} onClick={() => this.props.onFilterChange(name)}>{label}</button>
      )
    });

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}