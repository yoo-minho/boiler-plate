import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd'
import { Icon } from '@ant-design/compatible'
import Dropzone from 'react-dropzone'

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    {value: 0, label : "Private"},
    {value: 1, label : "Public"}
]

const CategoryOptions = [
    {value: 0, label : "Film & Animation"},
    {value: 1, label : "Autos & Vehicles"},
    {value: 2, label : "Muxic"},
    {value: 3, label : "Pets"}
]

function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value);
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value);
    }

    const onDrop = (files) => {

        let formData = new FormData;
        const config = {
            header : {'content-type':'multipart/form-data'}
        }
        formData.append("file",files[0]);

        Axios.post('/api/video/uploadfiles', formData, config)
        .then(response => {
                if(response.data.success){

                } else {
                    alert('실패');
                }
        })
    }

    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style = {{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit>
                <div style={{ display:'flex', justifyContent:'space-between'}}>
                    <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={100000000}>
                    {({getRootProps, getInputProps}) => (
                        <div style={{ width: '300px', height: '240px', 
                            border:'1px solid lightgray', display:'flex',
                            alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                            <input {...getInputProps()}/>
                            <Icon type="plus" style={{fontSize:'3rem'}}/>
                        </div>
                    )}
                    </Dropzone>
                    <div><img src alt></img></div>
                
                </div>

                <br/>
                <br/>
                <label>Title</label>
                <Input
                    onChange = {onTitleChange}
                    value = {VideoTitle}
                />
                <br/>
                <br/>
                <label>Descripti on</label>
                <TextArea
                    onChange = {onDescriptionChange}
                    value = {Description}
                />
                <br/>
                <br/>

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br/>
                <br/>

                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                            <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br/>
                <br/>

                <Button type="primary" size="large" onClick>
                    Submit
                </Button> 
            
            </Form>
            
        </div>
    )
}

export default VideoUploadPage
