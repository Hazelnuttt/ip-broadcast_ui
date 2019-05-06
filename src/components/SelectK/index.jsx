import React from 'react';

export default {
  // state = {}
  updateSelectedItem(
    selectedRowKeys,
    selectedRows,
    selectedIds,
    selectedKeys,
    rowKey
  ) {
    if (selectedIds) {
      this.setState({
        selectedRowKeys,
        selectedIds: selectedIds,
        selectedItem: selectedRows
      });
    } else {
      this.setState({
        rowKey,
        selectedKeys,
        selectedRowKeys,
        selectedItem: selectedRows
      });
    }
  }
};

// export default SelectK
