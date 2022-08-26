import { buildSchema } from 'graphql';

 export const schema = buildSchema(`
type User {
 id:ID
 username: String
 age: Int
 posts: [Post] 
}
type Post {
  id:ID
  title: String
  content: String
}
input UserInput{
  id: ID
  username: String!
  age: Int!
  posts: [PostInput]
}
input PostInput{
  id: ID
  title: String!
  content: String!
}
input InputRemoveUser{
  id: ID!
  username: String!
  age: Int!
  posts: [PostInput]
}
type Query {
  getAllUsers: [User]
  getUser(id: ID): User
}
type Mutation {
  createUser(input: UserInput): User
  deleteUserByID(input: InputRemoveUser): User
}
`)
