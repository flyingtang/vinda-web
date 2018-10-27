import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';
import MyEditor from "./editor"
import * as article from "../../../servies/article"
import styles from './new.css';
import * as category from "../../../servies/category"
import router from 'umi/router';



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
    categories: []
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
  findCategories = ()=>{
    category.find().then(res=>{
      if (res && res.data){
        this.setState({categories: res.data})
      }
    })
  }
  findById = (id) => {
    article.findById(id).then(res=>{
      console.log("findbyId ", res)
      if (res && res.data){
        this.setState({article: res.data})
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      const {id} =  this.props;
        // 编辑
      if (id) {
        article.update(id, values).then(res=>{
                this.props.form.resetFields();
                router.go(-1)
              })  
      }else{
        // 创建
        console.log("我呀哦创建看了")
        article.create(values).then((res)=>{
          console.log("res", res)
          message.success("创建成功")
          this.props.form.resetFields();
          this.setState({ visible: false, selectRecord:{}});
          // router.go(-1)
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




  render() {
    const { form:{getFieldDecorator}, id } = this.props;
    const { article, categories } = this.state;

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
               {categories.map(cat => <Option value={cat.id}>{cat.name}</Option>)}
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
            initialValue: article.content
          })(
            <MyEditor></MyEditor>
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
