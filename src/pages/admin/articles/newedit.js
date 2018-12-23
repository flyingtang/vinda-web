import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';
import MyEditor from "./editor"
import * as article from "../../../servies/article"
import styles from './new.css';
import * as category from "../../../servies/category"
import router from 'umi/router';
import PicturesWall from "./PicturesWall"


const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;


class NEArticle extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    confirmDirty: false,
    autoCompleteResult: [],
    article : {},
    categories: [],
    fileList:[],
    isMarkdown: false,
    actionUrl: "/api/v1/upload",
    };
  }
  
  componentDidMount(){

   const {id} = this.props
    // 更新
    if (id){
      this.findById(id)
    }
    this.findCategories()
  }

  buttonClick = () => {
		const {isMarkdown} = this.state;
		this.setState({isMarkdown: !isMarkdown})
  }
  
  findCategories = ()=>{
    category.find().then(res=>{
      if (res && res.data){
        this.setState({categories: res.data})
      }
    })
  }
  findById = (id) => {
    article.findById(id).then(res=>{
      
      if (res && res.data){
        // this.setState({article: res.data, fileList:[{url: `http://127.0.0.1:3000/${res.data.mainPic}`,uid :id}]})
        let isMarkdown = this.state.isMarkdown
        if (res.data.markdown) {
          isMarkdown= true
        }
        this.setState({article: res.data, fileList:[{url: res.data.mainPic,uid :id}],isMarkdown: isMarkdown})
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      console.log(values, "000")
      const {id} =  this.props;
     
      const mainPic = this.state.fileList[0] && (this.state.fileList[0].response && this.state.fileList[0].response.url || this.state.fileList[0].url)
    
      let content = values.content;
      let markdown = values.markdown;
      if (typeof content == "object") {
        markdown = content.markdown
        content = content.html
      }
      values.content = `<div class="mde-preview "> <div class="mde-preview-content">${content}</div> </div>`;
      values.markdown = markdown
      values.mainPic = mainPic;
      console.log(values, "1111")
        // 编辑
      if (id) {
        article.update(id, values).then(res=>{
                this.props.form.resetFields();
                router.go(-1)
              })  
      }else{
        // 创建
        article.create(values).then((res)=>{
          message.success("创建成功")
          // this.props.form.resetFields();
        
        })
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }


  handleChange = ({ fileList }) =>{
    this.setState({ fileList })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  contentChange = (content) => {}

  render() {
    const { form:{getFieldDecorator}, id } = this.props;
    const { article, categories, actionUrl } = this.state;

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
       <FormItem
          {...formItemLayout}
          label="文章标题"
        >
          {getFieldDecorator('title', {
            rules: [{
              required: true, message: 'Please input your title',
            }],
            initialValue: article.title
          })(
            <Input />
          )}
        </FormItem>
        <FormItem 
           {...formItemLayout}
           label="文章分类"
        >
         {getFieldDecorator("categoryId", {
            rules: [{
              required: true, message: 'Please input your title',
            }],
             initialValue: article.categoryId || (categories && categories[0]&&categories[0].id)
         })(
            <Select >
               {categories.map(cat => <Option key={cat.id} value={cat.id}>{cat.name}</Option>)}
            </Select>
         )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="文章简介"
        >
          {getFieldDecorator('description', {
            initialValue: article.description
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="文章内容"
          {...formItemLayout}
        >
          {getFieldDecorator('content', {
            initialValue: article.markdown ?({
              html : article.content,
              markdown : article.markdown,
            }): (article.content)
          })(
            <MyEditor isMarkdown={this.state.isMarkdown}  buttonClick = {this.buttonClick.bind(this)}></MyEditor>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="文章主图"
        >
          {getFieldDecorator('mainPic', {
            initialValue: article.mainPic
          })(
            <PicturesWall actionUrl={actionUrl} fileList={this.state.fileList} handleChange={this.handleChange}/>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">{id?"更新":"创建"}</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(NEArticle);

