import { Upload, Icon, Modal } from 'antd';
import cookie from 'react-cookies'
import "./new.css";
class PicturesWall extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  }
  
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) =>{
    console.log(fileList, "123");
    this.props.onChange(fileList)
    this.setState({ fileList })
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const actionUrl = `/api/v1/upload?authorization=${cookie.load("token")}`
    console.log(actionUrl, "actionUrl")
    return (
      <div className="clearfix">
        <Upload
          action={actionUrl}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </div>
    );
  }
}

export default PicturesWall;