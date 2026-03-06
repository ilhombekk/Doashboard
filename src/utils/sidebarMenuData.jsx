import {
    CalculatorOutlined,
    DotChartOutlined,
    DropboxOutlined,
    ProductOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router';

export const sitebarMenu = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: <Link to="/">Dashboard</Link>,
    },
    {
        key: '2',
        icon: <DropboxOutlined />,
        label: <Link to="/Banner">Banner</Link>,
    },
    {
        key: '3',
        icon: <ProductOutlined />,
        label: <Link to="/Products">Products</Link>,
    },
    {
        key: '4',
        icon: <CalculatorOutlined />,
        label:<Link to="/Categories">Calculator</Link>,
    },
]