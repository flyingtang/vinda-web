import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import router from 'umi/router';
import cookie from 'react-cookies'
import style from  './login.css';
import * as account from "../servies/account"
const FormItem = Form.Item;

class LoginForm extends React.Component {
  componentWillMount(){
     if(cookie.load("token")){
      router.push("/admin/articles")
     }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
       return console.log('Received values of form: ', values);
      }
      account.login(values).then(res=>{
        this.props.form.resetFields();
      
        // 存token
        if(res){
            cookie.save("token", res.token, { path: '/', maxAge: 3600*24})
            message.success(res.message)
            router.push("/admin/articles")
        }
      })
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={style["login-form"]}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
                 <a className={style["login-form-forgot"]} href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className={style["login-form-button"]}>
           登录
          </Button>
          Or <a href="">注 册!</a>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);