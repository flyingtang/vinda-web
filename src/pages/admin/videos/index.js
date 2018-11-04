
import React from "react"
import {Form, Table, Button, Icon, Divider, Modal, Input, Radio, message} from 'antd';
import moment from "moment";
import PicturesWall from "../articles/PicturesWall"
import * as video from "../../../servies/video"

const { TextArea } = Input;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
class VideoList extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      videos: [],
      total: 0,
      visible: false,
      selectRecord: {},
      fileList:[],
      actionUrl: "/api/v1/video/upload",
      pageSize:0,
    }
  }

  columns = [{
    title: '标题',
    dataIndex: 'title',
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
    dataIndex: 'status',
    width: 100,
    render: (text) => text==1?"启用":"禁用"
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
            <Divider type="vertical" />
            <a onClick={this.open.bind(this, text)} >打开</a>
          </span>
      )
    }
  }];


  componentDidMount(){
    this.fetch({page: 1})
  }

  open = (text)=>{
    console.log(process, process.env, "001010")
  }

  fetch =(filter)=>{
     this.setState({loading: true})
      video.find(filter).then(res=>{
        if(res && res.data){
             const {data=[], total} = res
                this.setState({videos: data, total: total, pageSize: res.pageSize})
        } 
      }).finally(err=>{
        this.setState({loading: false})
      })
  }

  edit = (record)=>{
   
    this.setState({selectRecord: record, fileList:[{url: record.originName,name: record.originName, uid :record.id}]}, ()=>{
      this.setState({visible: true, })
    })
  }
  delete = (record) => {
    this.setState({loading: true})
    video.deleteOne(record.id).then((res)=>{
      this.fetch({page:1})
      this.setState({ loading: false});
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
    video.deleteAll(selectedRowKeys).then((res)=>{
      this.fetch({page:1})
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
      console.log(values, "values")
      const urlName = this.state.fileList[0] && (this.state.fileList[0].response && this.state.fileList[0].response.urlName || this.state.fileList[0].urlName)
      const originName = this.state.fileList[0] && (this.state.fileList[0].response && this.state.fileList[0].response.originName)
      values.urlName = urlName;
      values.originName = originName
      if (!values.urlName) {
        values.urlName = this.state.selectRecord && this.state.selectRecord.urlName;
      }
      if (!values.originName){
        values.originName = this.state.selectRecord && this.state.selectRecord.originName
       
      }
      // 编辑
      if (id) {
        video.update(id, values).then(res=>{
                this.fetch({page:1})
                form.resetFields();
                this.setState({ visible: false, selectRecord:{}, fileList:[]});
              })  
      }else{
        // 创建
        video.create(values).then((res)=>{
          this.fetch({page:1})
          form.resetFields();
          this.setState({ visible: false, selectRecord:{}, fileList:[]});
        })
      }
    });
  }
  
  handleSubmit = () => {
    console.log(234)
  }

  // 模态框取消处理
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  // 上传视频处理
  handleChange = ({ fileList }) =>{
    console.log(fileList,"fileListfileList")
    this.setState({ fileList })
  }
  
  // 上传文件移除
  handleRemove = (file) => {
    console.log(file ,"移除文化家")
  }
  /**
   *  翻页处理
   * @memberof VideoList
   */
  changeHandle = ({current, pageSize, total}, filters, sorter) => {
    if (!current) {
      current = 1;
    }
    this.fetch({page:current})
  }
  render() {
    const { loading, selectedRowKeys, videos, total , selectRecord={}, actionUrl, pageSize} = this.state;
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
        <Table onChange={this.changeHandle.bind(this)}   rowKey={record => record.id} loading={loading} rowSelection={rowSelection} columns={this.columns} pagination={{total: total, pageSize: pageSize}} dataSource={videos}  />
        <Modal
          title={selectRecord.id ? "编辑":"创建"}
          visible={this.state.visible}
          onOk={this.handleOk.bind(this, selectRecord.id)}
          onCancel={this.handleCancel}
        >
              <Form>
                  <FormItem
                  {...formItemLayout}
                      label="标题"
                    >
                      {getFieldDecorator('title', {
                        rules: [{
                          required: true, message: 'Please input your title',
                        }],
                        initialValue: selectRecord && selectRecord.title,
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
                      {getFieldDecorator('status', {
                        initialValue: selectRecord && selectRecord.status || 1,
                      })(
                        <RadioGroup>
                        <Radio value={1}>启用</Radio>
                        <Radio value={0}>禁用</Radio>
                      </RadioGroup>
                      )}
                    </FormItem>
                    <FormItem
                      label="上传" 
                      {...formItemLayout}
                    >
                      {getFieldDecorator('urlName', {
                        initialValue: selectRecord && selectRecord.urlName,
                      })(
                        <PicturesWall  handleRemove={this.handleRemove.bind(this)} actionUrl={actionUrl} fileList={this.state.fileList} listType="text" handleChange={this.handleChange} />
                      )}
                    </FormItem>
            </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(VideoList);
// export default CategoryList;
