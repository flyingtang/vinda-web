import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.core.css'
import 'react-mde/lib/styles/css/react-mde-all.css';
import styles from "./editor.less"
import "draft-js/dist/Draft.css"
import "normalize.css/normalize.css"
import "./all"
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import {Button} from "antd"
class MyEditor extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
			mdeState: null,
			// isMarkdown: true,
        };
		this.converter = new Showdown.Converter({tables: true, simplifiedAutoLink: true});
		this.modules = {
			toolbar: [
				[{ 'header': [1, 2, false] }],
				['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],
				[{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
				['link', 'image'],
				['clean']
			],
		};
	
		this.formats = [
			'header', 'font', 'size',
			'bold', 'italic', 'underline', 'strike', 'blockquote',
			'list', 'bullet', 'indent',
			'link', 'image', 'color', 'code-block',
		]
    }
	
    render() {
		let {value, onChange, isMarkdown, buttonClick} = this.props;
		
        return (
            <div className={styles["container"]}>
				<div className={styles["buttongroup"]}>
					<div className={styles["button"]}><Button  onClick={buttonClick}>{isMarkdown?"富文本格式":"MK格式"}</Button></div>
					<div className={styles["tip"]}>当前选中格式： {isMarkdown?"MK格式":"富文本格式"}</div>
				</div>
				{
				isMarkdown?(<ReactMde
						// onChange={this.handleValueChange}
						onChange={(newValue)=>onChange(newValue)}
						// editorState={this.state.mdeState}
						editorState = {value}
						layout="tabbed"
						generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
					/>):(<ReactQuill  
						value={value||""}
						modules={this.modules}
						formats={this.formats}
							  onChange={(newValue)=>onChange(newValue)} />)
				}
                
            </div>
        );
    }

}

export default MyEditor