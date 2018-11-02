
import React from "react"
import router from 'umi/router';
import { Table, Button, Icon, Divider, message } from 'antd';
import moment from "moment";
import * as article from "../../../servies/article"
import { routerActions } from "react-router-redux";
 

class ArticleList extends React.Component{
  constructor(props){
     super(props)
    this.state={
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      data: [],
      total: 0,
    }
  }
  columns = [{
    title: '标题',
    dataIndex: 'title',
    width: 300,
  }, {
    title: '作者',
    dataIndex: 'author',
    width: 100,
  }, {
    title: '浏览数',
    dataIndex: 'visit_count',
    width: 100,
    render: ()=>0
  }, {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 200,
    render:(text)=> moment(text).format("YYYY-MM-DD HH:mm:ss")
  }, {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 200,
    render:(text)=> moment(text).format("YYYY-MM-DD HH:mm:ss")
  },{
    title: '状态',
    dataIndex: 'status',
    width: 100,
    render: (text)=> {
       switch(text){
         case 1 : return "正常"
         default : return  "不正常"
       }
    }
  },{
    title: '操作',
    key: 'operation',
    width: 200,
    render: (text, record)=>{
      return (
        <span>
            <a onClick={this.edit.bind(this, record)} >编辑</a>
            <Divider type="vertical" />
            <a onClick={this.delete.bind(this, text)} >删除</a>
          </span>
      )
    }
  }];

  componentDidMount(){
     this.fetch()
  }

  changeHandle = ({current, pageSize, total}, filters, sorter) => {

    if (!current) {
      current = 1;
    }
    this.fetch({page:current})
  }

  edit = (record)=>{
  
    if (record && record.id) {
      const url = `/admin/articles/${record.id}`;
    router.push(url);
    }else{
      message.error("操作无效")
    }
  }
  delete = (record) => {
    this.setState({loading: true})
    article.deleteOne(record.id).then((res)=>{
      this.fetch()
      this.setState({ loading: false, });
      message.success(res && res["message"])
    })
  }

  deleteRows = () => {
   
    const {selectedRowKeys} = this.state;
    if (selectedRowKeys.length == 0){
        return message.error("无行选择");
    }
    this.setState({loading: true})
    article.deleteAll(selectedRowKeys).then((res)=>{
      this.fetch()
      this.setState({selectedRowKeys:[], loading: false});
      message.success(res && res["message"])
    })
  }

  create = ()=>{
    router.push('/admin/articles/new');
  }
  fetch(filter){
     this.setState({loading: true})
     article.find(filter).then((res)=>{
        if (res && res.data){
            this.setState({data: res.data, total: res.total})
        }
        // message.success(res && res.message)
     }).finally(()=>{
      this.setState({loading: false})
     })
  }
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

    this.setState({ selectedRowKeys });
  }
  render() {
    const { loading, selectedRowKeys, data, total} = this.state;
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
            onClick={this.deleteRows}
            disabled={!hasSelected}
            loading={loading}
          >删除</Button>
          <Button
            type="primary"
            onClick={this.create}
            loading={loading}
          >
            创建
          </Button>
        </div>
        <Table rowKey={record => record.id} onChange={this.changeHandle.bind(this)} loading={loading} pagination={{total:total}} rowSelection={rowSelection} columns={this.columns} dataSource={data}  />
      </div>
    );
  }
}

export default ArticleList;