import React from 'react';

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '', imagePreviewUrl: props.value || ''};
    }

    _handleImageChange(e,cb) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
            cb(reader.result);
        }

        reader.readAsDataURL(file);

    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img className={this.props.className} src={imagePreviewUrl}/>);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <div className="previewComponent">
                <input className="fileInput"
                       type="file"
                       onChange={(e) => this._handleImageChange(e,this.props.onChange)}/>
                <div style={{textAlign:'center'}}>
                    {$imagePreview}
                </div>
            </div>
        )
    }
}

export default ImageUpload;