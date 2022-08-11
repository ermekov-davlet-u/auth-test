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


    const register = async (values: {
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
                    initialValues={{
                    }}
                    onFinish={register}
                    autoComplete="off">
                    <Form.Item
                        label="Имя пользователя"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Введите имя пользователя!',
                        },
                        ]}>
                        <Input name='username'/>
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Введите пароль!',
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