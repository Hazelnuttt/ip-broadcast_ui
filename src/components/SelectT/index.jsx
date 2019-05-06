import React from 'react';

import { Table } from 'antd';
import './index.scss';
export default class SelectT extends React.Component {
  state = {};

  // 选择框变更
  onSelectChange = (selectedRowKeys, selectedRows) => {
    let rowSelection = this.props.rowSelection;
    const selectedIds = [];
    if (rowSelection == 'checkbox') {
      selectedRows.map(item => {
        selectedIds.push(item.id);
      });
      this.setState({
        selectedRowKeys,
        selectedIds: selectedIds,
        selectedItem: selectedRows[0]
      });
    }
    this.props.updateSelectedItem(
      selectedRowKeys,
      selectedRows[0],
      selectedIds
    );
  };

  getOptions = () => {
    let p = this.props;
    const { selectedRowKeys } = this.props;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelect: (record, selected, selectedRows) => {
        console.log('...');
      }
    };
    let row_selection = this.props.rowSelection;
    // 当属性未false或者null时，说明没有单选或者复选列
    if (row_selection === false || row_selection === null) {
      row_selection = false;
    } else if (row_selection == 'checkbox') {
      //设置类型未复选框
      rowSelection.type = 'checkbox';
    } else {
      //默认未单选
      row_selection = 'radio';
    }
    return (
      <Table
        className="card-wrap page-table"
        bordered
        {...this.props}
        rowSelection={row_selection ? rowSelection : null}
        rowKey={record => record.endPointId}
        onRow={(record, index) => ({
          onClick: () => {
            if (!row_selection) {
              return;
            }
          }
        })}
      />
    );
  };
  render = () => {
    return <div>{this.getOptions()}</div>;
  };
}
