import { Upload, Icon, Modal } from 'antd';
import cookie from 'react-cookies'
import "./new.css";
class PicturesWall extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      
    };
  }
  
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  render() {
    const { previewVisible, previewImage} = this.state;

    const {handleChange, fileList=[]} = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
  
    return (
      <div className="clearfix">
        <Upload
          action={`/api/v1/upload?authorization=${cookie.load("token")}`}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          // onChange={this.handleChange}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;