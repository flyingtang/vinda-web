
import React from "react"
import {Form, Table, Button, Icon, Divider, Modal, Input, Radio, message} from 'antd';
import moment from "moment";

import * as category from "../../../servies/category"

const { TextArea } = Input;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
class CategoryList extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      articles: [],
      total: 0,
      visible: false,
      selectRecord: {},
    }
  }

  columns = [{
    title: '名字',
    dataIndex: 'name',
    width: 300,
  }, {
    title: '描述',
    dataIndex: 'description',
    width: 400,
  },  {
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
    title: '启禁',
    dataIndex: 'enabled',
    width: 100,
    render: (text) => text==true?"启用":"禁用"
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

  fetch =()=>{
     this.setState({loading: true})
      category.find().then(res=>{
    
        const {data=[], total} = res
        this.setState({articles: data, total: total})
      }).finally(err=>{
        this.setState({loading: false})
      })
  }

  edit = (record)=>{
    this.setState({selectRecord: record}, ()=>{
      this.setState({visible: true, })
    })
  }
  delete = (record) => {
    this.setState({loading: true})
    category.deleteOne(record.id).then((res)=>{
      this.fetch()
      this.setState({ loading: false, });
      message.success(res && res["message"])
    })
  }

  create = ()=>{
    this.setState({visible: true })
  }

  deleteRows = () => {
    console.log(this.state.selectedRowKeys, "12121")
    const {selectedRowKeys} = this.state;
    if (selectedRowKeys.length == 0){
        return message.error("无行选择");
    }
    this.setState({loading: true})
    category.deleteAll(selectedRowKeys).then((res)=>{
      this.fetch()
      this.setState({selectedRowKeys:[], loading: false});
      message.success(res && res["message"])
    })
  }


  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  handleOk = (id) => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // 编辑
      if (id) {
        category.update(id, values).then(res=>{
                this.fetch()
                form.resetFields();
                this.setState({ visible: false, selectRecord:{}});
              })  
      }else{
        // 创建
        category.create(values).then((res)=>{
          this.fetch()
          form.resetFields();
          this.setState({ visible: false, selectRecord:{}});
        })
      }
    });
  }

  handleSubmit = () => {
    console.log(234)
  }
  handleCancel = (e) => {
  
    this.setState({
      visible: false,
    });
  }

  

  render() {
    const { loading, selectedRowKeys, articles, total , selectRecord={}} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const { getFieldDecorator } = this.props.form;
    
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };


    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16, textAlign: "right"}} >
          <Button
            type="danger"
            onClick={this.deleteRows}
            disabled={!hasSelected}
          >删除</Button>
          <Button
            type="primary"
            onClick={this.create}
          >
            创建
          </Button>
        </div>
        <Table  rowKey={record => record.id} loading={loading} rowSelection={rowSelection} columns={this.columns} pagination={total} dataSource={articles}  />
        <Modal
          title={selectRecord.id ? "编辑":"创建"}
          visible={this.state.visible}
          onOk={this.handleOk.bind(this, selectRecord.id)}
          onCancel={this.handleCancel}
        >
              <Form>
                  <FormItem
                  {...formItemLayout}
                      label="名字"
                    >
                      {getFieldDecorator('name', {
                        rules: [{
                          required: true, message: 'Please input your title',
                        }],
                        initialValue: selectRecord && selectRecord.name,
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                      label="描述"
                    >
                      {getFieldDecorator('description', {
                          initialValue: selectRecord && selectRecord.description ,
                      })(
                        <TextArea rows={4} />
                      )}
                    </FormItem>
                    <FormItem
                      label="启禁" 
                      {...formItemLayout}
                    >
                      {getFieldDecorator('enabled', {
                        initialValue: selectRecord && selectRecord.enabled || true,
                      })(
                        <RadioGroup>
                        <Radio value={true}>启用</Radio>
                        <Radio value={false}>禁用</Radio>
                      </RadioGroup>
                      )}
                    </FormItem>
            </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(CategoryList);
// export default CategoryList;
