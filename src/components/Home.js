
import { useEffect,useState } from 'react'
import { Form,Button,Grid,Image,Input,Label,Dimmer,Loader,Segment } from 'semantic-ui-react'

// graphql
import { useMutation } from '@apollo/client'
import { UPLOAD_URL_MUTATION, CREATE_USER_MUTATION } from '../graphql/mutation'

import 'semantic-ui-css/semantic.min.css'
import '../App.css';


const Home = () => {

    // register data
    const [register,setRegister] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
        url:'https://res.cloudinary.com/dnnq8kne2/image/upload/c_scale,h_150,w_150/v1632400237/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju_sozidd.jpg'
    })
    const onChange = (e) => {
        const { name,value } = e.target
        setRegister( (val) => ({ ...val, [name]:value }) )
    }
    const [ createUser, { data:createUserData, loading: createUserLoading, error:createUserError  } ] = useMutation(CREATE_USER_MUTATION)
    const registerHandler = (e) => {
        createUser({
            variables:{
                firstName: register.firstName,
                lastName: register.lastName,
                email: register.email,
                password: register.password,
                confirmPassword: register.confirmPassword,
                files: register.url
            }
        })
    }


    // upload data
    const [upload,setUpload] = useState({})
    const [ uploadImage ,{ data: uploadImageData,loading: uploadImageLoading,error }] = useMutation(UPLOAD_URL_MUTATION) 
    if(error){
        console.log(error)
    }
    const onChangeUpload = (e) => {
        const files = e.target.files[0]
        { files ? (
            uploadImage({
                variables: {
                    files
                }
            })
        ) : console.log( '' ) }
    }


    // useEffect
    useEffect( () => {
        if(uploadImageData){
            console.log(uploadImageData)
            setRegister( (val) => ({ ...val, url: uploadImageData.uploadFile }) )
        }
        if(createUserData){
            console.log(createUserData.createUser)
        }
    },[uploadImageData])

    return(
        
        <Grid columns = {2} className = "home-page">
            <Grid.Row>
                <Grid.Column className = "form-register" width = {5}>
                    <Label>Register</Label>

                    {/* <Segment>
                        <Dimmer active inverted>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>

                    </Segment> */}
                        <Image className = 'profile-register' src = {register.url}  circular/>

                    <Form.Input 
                        type = "file" 
                        name = 'upload'
                        onChange = { onChangeUpload }
                        />
                    <Form.Input 
                        placeholder = 'Firstname'
                        name = 'firstName'
                        value = {register.firstName}
                        onChange = {onChange}
                    />
                    <Form.Input 
                        placeholder = 'Lastname'
                        name = 'lastName'
                        value = {register.lastName}
                        onChange = {onChange}
                    />
                    <Form.Input 
                        name = 'email'
                        placeholder = 'Email'
                        value = {register.email}
                        onChange = {onChange}
                    />
                    <Form.Input 
                        name = 'password'
                        placeholder = 'Password'
                        value = {register.password}
                        onChange = {onChange}
                    />
                    <Form.Input 
                        name = 'confirmPassword'
                        placeholder = 'ConfirmPassword'
                        value = {register.confirmPassword}
                        onChange = {onChange}
                    />

                    <Button primary onClick = {registerHandler} >Register</Button>
                </Grid.Column>
                <Grid.Column width = {11}>

                </Grid.Column>
            </Grid.Row>
        </Grid>
          
    )
}

export default Home