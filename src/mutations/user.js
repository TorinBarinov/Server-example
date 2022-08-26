import {gql} from '@apollo/client';

export const CREATE_USER =  gql`
mutation createUser($input: UserInput){
 createUser(input: $input){
  id, username, age
 }  
}`
export const DELETE_USER =  gql`
mutation deleteUserByID($input: InputRemoveUser){
  deleteUserByID(input:$input){
    username
    id
    age
  }
}`