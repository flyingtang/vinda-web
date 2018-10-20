
import React from "react"
import { Table, Button, Icon, Divider } from 'antd';
import moment from "moment";

const columns = [{
  title: '标题',
  dataIndex: 'title',
  width: 300,
}, {
  title: '作者',
  dataIndex: 'authod',
  width: 100,
}, {
  title: '浏览数',
  dataIndex: 'visit_count',
  width: 10,
}, {
  title: '创建时间',
  dataIndex: 'created_at',
  width: 200,
}, {
  title: '更新时间',
  dataIndex: 'updated_at',
  width: 200,
},{
  title: '状态',
  dataIndex: 'status',
  width: 100,
},{
  title: '操作',
  key: 'operation',
  width: 200,
  render: (text, record)=>{
    return (
      <span>
          <a href="#">编辑</a>
          <Divider type="vertical" />
          <a href="#">删除</a>
        </span>
    )
  }
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    title: `Edward King ${i}`,
    authod: 32,
    visit_count: 32,
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    status: "正常",
  });
}



class ArticleList extends React.Component{

  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16, textAlign: "right"}} >
          <Button
            type="danger"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >删除</Button>
          <Button
            type="primary"
            onClick={this.start}
            loading={loading}
          >
            创建
          </Button>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data}  />
      </div>
    );
  }
}

export default ArticleList;