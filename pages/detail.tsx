import * as React from 'react'
import Layout from '../components/Layout'
import { User } from '../interfaces'
import { findData } from '../utils/sample-data'
import ListDetail from '../components/ListDetail'
import { inject, observer } from 'mobx-react'
import UserStore from '../stores/user'

type Props = {
  item?: User
  userStore: UserStore
  errors?: string
}

interface NextFC<T> extends React.FC<T> {
  getInitialProps: Function
}

const InitialPropsDetail: NextFC<Props> = ({ userStore, item, errors }) => {
  if (errors) {
    return (
      <Layout title={`Error | Next.js + TypeScript Example`}>
        <p>
          <span style={{color: 'red'}}>Error:</span> {errors}
        </p>
      </Layout>
    )
  }
  return (
    <Layout
      title={`${item ? item.name : 'Detail'} | Next.js + TypeScript Example`}
    >
      {item && <ListDetail item={item}/>}
      <p>
        Name: {userStore.name}
      </p>
      <button onClick={() => {
        userStore.setName('set by client')
      }}>click to set name
      </button>
    </Layout>
  )
}

InitialPropsDetail.getInitialProps = async ({ query, mobxStore }: any) => {
  mobxStore.userStore.setName('set by server')
  try {
    const {id = 101} = query
    const item = await findData(parseInt(id))
    return {item}
  } catch (err) {
    return {errors: err.message}
  }
}

export default inject('userStore')(observer(InitialPropsDetail))
