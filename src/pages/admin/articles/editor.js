import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.core.css'

class MyEditor extends React.Component {
	constructor(props){
		super(props)
		this.modules = {
			toolbar: [
				[{ 'header': [1, 2, false] }],
				['bold', 'italic', 'underline','strike', 'blockquote'],
				[{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
				['link', 'image'],
				['clean']
			],
		};
	
		this.formats = [
			'header',
			'bold', 'italic', 'underline', 'strike', 'blockquote',
			'list', 'bullet', 'indent',
			'link', 'image'
		]
	}


  render() {
		const {value="", onChange} = this.props;
    return (
			<ReactQuill  
			value={value}
			modules={this.modules}
			formats={this.formats}
                  onChange={(newValue)=>onChange(newValue)} />
    )
  }
}

export default MyEditor