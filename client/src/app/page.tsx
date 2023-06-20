'use client'

import styles from './page.module.css'
import Form from '../components/Form'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { useRouter } from 'next/navigation';
import { uploadFileToS3 } from '../utils';
export default function Home() {
  const { push } = useRouter();
  const onSubmit: any = async ({ userData, selectedFile }: any) => {
    const { data: { generateUrl } } = await client.mutate({
      mutation: gql`
      mutation generateUrl($fileName:String!,$fileType:String!){
        generateUrl(fileName:$fileName,fileType:$fileType)
      }
        `, variables: { fileName: selectedFile.name, fileType: selectedFile.type }
    });
    if (generateUrl) {
      uploadFileToS3(generateUrl, selectedFile)
    }
    const { data } = await client.mutate({
      mutation: gql`
        mutation createUser($createUserInput:CreateUserInput!){
          createUser(createUserInput:$createUserInput){
            id
          }
        }
        `, variables: { createUserInput: userData }
    });
    if (data.createUser) {
      push("/success");
    }
  }
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Form onSubmit={onSubmit} />
      </div>
    </main>
  )
}
