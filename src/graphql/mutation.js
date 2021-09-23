

import { gql } from '@apollo/client'


// home page
export const  UPLOAD_URL_MUTATION = gql`
    mutation uploadFile($files: Upload){
        uploadFile(files:$files)
    }
`
export const CREATE_USER_MUTATION = gql`
    mutation createUser( 
        $firstName:String
        $lastName:String
        $email:String
        $password:String
        $confirmPassword:String
        $files:String
        
    ){
        createUser(
            firstName:$firstName
            lastName:$lastName
            email:$email
            password:$password
            confirmPassword:$confirmPassword
            files:$files
        )
    }
`
