import { Button, Checkbox, Form, Input, Typography, Layout } from 'antd';
import { log } from 'console';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { store } from './../store';
import { Content, Header } from 'antd/lib/layout/layout';
import { observer } from 'mobx-react-lite';

const { Text, Link } = Typography;


function Login() {
    let location: any = useLocation();
    // const [loginForm, setForm] = useState<{
    //     username: string,
    //     password: string
    // }>({
    //     username: '',
    //     password: ''
    // })

    const mess = location.state?.mess || ""

    const onFinish = async(values: any) => {
        const res = await fetch("http://localhost:8080/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then(res => res.json())
        

        if(res.error) {
            alert(res.error);
        }
        console.log(res.token);
        
        store.newAuthToken(res.token)

    };


    return ( 
        <Layout  >
            <Header>
                Страница входа
            </Header>
            <Content
            style={{
                padding: '50px',
            }}>
            <p>
                <NavLink to={"/register"} ><Button type="link">Регистрация</Button></NavLink>
                {
                    store.authToken && <NavLink to={"/"} ><Button type="link">На главную</Button></NavLink>
                }
            </p>
            {
                mess && <Text type="success">Вы успешно зарегистрировались</Text>
            }
            <Form
                name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 6,
                    }} 
                    initialValues={{}}
                    onFinish={onFinish}
                    autoComplete="off">
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                        
                    >
                        <Input name='username'/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password name='password' />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Регистрация
                        </Button>
                    </Form.Item>
                </Form>
        </Content>
        </Layout>
     );
}

export default observer(Login);