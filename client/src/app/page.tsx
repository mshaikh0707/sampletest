'use client'

import styles from './page.module.css'
import Form from './components/Form'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { UserData } from './type';

export default function Home() {

  const onSubmit: any = async (userData: UserData) => {
    console.log("userData", userData)
    const { data } = await client.mutate({
      mutation: gql`
        mutation createUser($createUserInput:CreateUserInput!){
          createUser(createUserInput:$createUserInput){
            id
          }
        }
        `, variables: { createUserInput: userData }
    });
    console.log(data);
  }
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Form onSubmit={onSubmit} />
      </div>
    </main>
  )
}
