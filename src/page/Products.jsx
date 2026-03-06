import React, { useState, useEffect } from 'react';
import { Button, Space, Table, Form, Image, Drawer, Input, InputNumber, Popconfirm, notification } from 'antd';
import axios from 'axios';

function Products() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [search, setSearch] = useState("");
    
    const [form] = Form.useForm();
    
    const API_URL = "https://91d0bfb9f2b293b2.mokky.dev/Products";
    
    const getProducts = () => {
        axios.get(API_URL)
        .then(res => setProducts(res.data))
        .catch(err => console.error(err));
    }
    
    useEffect(() => {
        getProducts();
    }, []);
    
    useEffect(() => {
        if (editingProduct) {
            form.setFieldsValue({
                name: editingProduct.name,
                image: editingProduct.image,
                price: editingProduct.price,
                year: editingProduct.year
            });
        }
    }, [editingProduct, form]);
    
    const showDrawer = () => {
        setEditingProduct(null);
        setOpen(true);
    }
    
    const onClose = () => {
        setOpen(false);
        setEditingProduct(null);
        form.resetFields();
    }
    
    const onFinish = (values) => {
        const payload = {
            ...values,
            price: Number(values.price),
            year: Number(values.year)
        };
        
        if (editingProduct) {
            axios.patch(`${API_URL}/${editingProduct.id}`, payload)
            .then(() => {
                notification.success({ 
                    title: "Success",  // ← message → title
                    description: "Product updated successfully!" 
                });
                getProducts();
                onClose();
            })
            .catch(err => {
                notification.error({ 
                    title: "Error",  // ← message → title
                    description: err.message 
                });
            });
        } else {
            axios.post(API_URL, payload)
            .then(() => {
                notification.success({ 
                    title: "Success",  // ← message → title
                    description: "Product added successfully!" 
                });
                getProducts();
                onClose();
            })
            .catch(err => {
                notification.error({ 
                    title: "Error",  // ← message → title
                    description: err.message 
                });
            });
        }
    }
    
    const deleteProduct = (id) => {
        axios.delete(`${API_URL}/${id}`)
        .then(() => {
            notification.success({ 
                title: "Success",  // ← message → title
                description: "Product deleted successfully!" 
            });
            getProducts();
        })
        .catch(err => {
            notification.error({ 
                title: "Error",  // ← message → title
                description: err.message 
            });
        });
    }
    
    const editProduct = (record) => {
        setEditingProduct(record);
        setOpen(true);
    }
    
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );
    
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { 
            title: 'Image', 
            dataIndex: 'image', 
            key: 'image', 
            render: (_, record) => <Image width={100} src={record.image} /> 
        },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Year', dataIndex: 'year', key: 'year' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                <Button onClick={() => editProduct(record)}>Edit</Button>
                <Popconfirm
                title="O'chirmoqchimisiz?"
                okText="Ha"
                cancelText="Yo'q"
                onConfirm={() => deleteProduct(record.id)}
                >
                <Button danger>Delete</Button>
                </Popconfirm>
                </Space>
            )
        }
    ];
    
    return (
        <>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <Input 
        placeholder="Search product..." 
        style={{ width: 250 }} 
        onChange={e => setSearch(e.target.value)} 
        />
        <Button type="primary" size="large" onClick={showDrawer}>
        Add Product
        </Button>
        </div>
        
        <Table 
        columns={columns} 
        dataSource={filteredProducts} 
        rowKey="id" 
        pagination={{ pageSize: 5 }} 
        />
        
        <Drawer 
        title={editingProduct ? "Edit Product" : "Add Product"} 
        onClose={onClose} 
        open={open} 
        size="default"
        >
        <Form 
        form={form} 
        layout="vertical"
        onFinish={onFinish}
        >
        <Form.Item 
        label="Name" 
        name="name" 
        rules={[{ required: true, message: 'Please enter product name' }]}
        >
        <Input />
        </Form.Item>
        
        <Form.Item 
        label="Image URL" 
        name="image" 
        rules={[
            { required: true, message: 'Please enter image URL' },
            { type: 'url', message: 'Please enter valid URL' }
        ]}
        >
        <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>
        
        <Form.Item 
        label="Price" 
        name="price" 
        rules={[{ required: true, message: 'Please enter price' }]}
        >
        <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>
        
        <Form.Item 
        label="Year" 
        name="year" 
        rules={[{ required: true, message: 'Please enter year' }]}
        >
        <InputNumber style={{ width: "100%" }} min={1900} max={2100} />
        </Form.Item>
        
        <Form.Item>
        <Button type="primary" htmlType="submit" block>
        {editingProduct ? "Update Product" : "Add Product"}
        </Button>
        </Form.Item>
        </Form>
        </Drawer>
        </>
    );
}

export default Products;