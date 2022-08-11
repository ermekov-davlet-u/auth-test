import { Button, Checkbox, Form, Input, Layout } from 'antd';
import { ChangeEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Content, Header } from 'antd/lib/layout/layout';


function Register() {

    // const form = useState<{
    //     username: string,
    //     password: string
    // }>({
    //     username: '',
    //     password: ''
    // })

    const navigate = useNavigate();


    const onFinish = async (values: {
        username: string,
        password: string
    }) => {
        const res = await fetch("http://localhost:8080/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then(res => res.json())
        if(res.error){
            alert(res.error)
        }

        navigate("/login", { state: { mess: res.message } })

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return ( 
        <>
        <Layout  >
            <Header>
                Регистрация
            </Header>
            <Content
            style={{
                padding: '50px',
            }}>
                <p>
                    <NavLink to={"/login"} ><Button type="link">Войти</Button></NavLink>
                </p>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 6,
                    }} 
                    initialValues={{
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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
        </>
     );
}

export default Register;