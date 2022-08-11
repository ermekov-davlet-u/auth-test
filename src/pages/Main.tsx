import 'antd/dist/antd.css';
import { Card, Button, Space, Image, Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import { store } from './../store';
import http from './../hook';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Header, Content } from 'antd/lib/layout/layout';


function Main() {

    const { fetchApi } = http()
 
    const getUser = async function(){
        const user = await fetch("http://localhost:8080/about", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${store.authToken}`,
            },
        }).then(response => response.json());

        if(user.error) return

        store.newUser(user.data)
    }

    useEffect(() => {
        getUser()
    },[])

    return ( 
        <Layout  >
        <Header>
            Главная страница
        </Header>
        <Content
        style={{
            padding: '50px',
        }}>
            <NavLink to={"/login"} ><Button type="link">Войти</Button></NavLink>
            <Card
                style={{
                width: 400,
                }}>
                <Space size={12}>
                    <Image
                        width={200}
                        src={store.user?.avatar}
                    />
                </Space>
                <p>
                    {
                        store.user?.username    
                    }
                </p>
                <p>
                    {
                        store.user?.about
                    }
                </p>
            </Card>
            </Content>
        </Layout>
     );
}

export default observer(Main);