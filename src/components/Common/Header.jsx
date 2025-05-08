import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useAuth } from '/src/components/Hooks/UseAuth.jsx';
import { Badge, Dropdown, Space, Button, message } from 'antd';
import { 
  SearchOutlined, 
  BellOutlined, 
  UserOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  TruckOutlined,
  SettingOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { api } from '../../utils/authUtils.js';

const Header = ({ title }) => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notifications');
      setNotifications(response.data);
      setUnreadCount(response.data.filter(n => !n.read).length);
    } catch (error) {
      message.error('Failed to load notifications');
      console.error('Notification error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data);
      setShowSearchResults(true);
    } catch (error) {
      message.error('Search failed');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => 
        n.id === id ? {...n, read: true} : n
      ));
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Mark as read error:', error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await api.patch('/notifications/mark-all-read');
      setNotifications(notifications.map(n => ({...n, read: true})));
      setUnreadCount(0);
    } catch (error) {
      console.error('Mark all as read error:', error);
    }
  };

  // Quick action handlers
  const handleQuickAction = async (action) => {
    try {
      let response;
      switch (action) {
        case 'add_product':
          response = await api.post('/products', { name: 'New Product' });
          message.success('Product created successfully');
          break;
        case 'new_order':
          response = await api.post('/orders', { status: 'pending' });
          message.success('Order created successfully');
          break;
        case 'add_supplier':
          response = await api.post('/suppliers', { name: 'New Supplier' });
          message.success('Supplier added successfully');
          break;
        default:
          break;
      }
      return response?.data;
    } catch (error) {
      message.error(`Failed to perform ${action.replace('_', ' ')}`);
      console.error(`${action} error:`, error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    // Set up real-time updates (WebSocket or polling)
    const notificationInterval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
    
    return () => clearInterval(notificationInterval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) handleSearch();
    }, 500); // Debounce search by 500ms

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const notificationItems = [
    {
      key: 'header',
      label: (
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <span className="font-semibold">Notifications</span>
          <Button 
            type="link" 
            size="small"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </div>
      ),
    },
    ...(loading ? [{
      key: 'loading',
      label: (
        <div className="flex justify-center p-4">
          <LoadingOutlined />
        </div>
      )
    }] : notifications.map(notification => ({
      key: notification.id,
      label: (
        <div 
          className={`px-4 py-2 ${!notification.read ? 'bg-blue-50' : ''}`}
          onClick={() => markAsRead(notification.id)}
        >
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              {notification.type === 'order' && <ShoppingCartOutlined className="text-blue-500" />}
              {notification.type === 'user' && <UserAddOutlined className="text-green-500" />}
              {notification.type === 'supplier' && <TruckOutlined className="text-orange-500" />}
              {notification.type === 'delivery' && <TruckOutlined className="text-purple-500" />}
            </div>
            <div>
              <p className="font-medium mb-1">{notification.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ),
    }))),
    {
      key: 'footer',
      label: (
        <div className="text-center px-4 py-2 border-t">
          <Button type="link" href="/notifications">View all notifications</Button>
        </div>
      ),
    }
  ];

  const profileItems = [
    {
      key: '1',
      label: (
        <a href="/profile" className="flex items-center">
          <UserOutlined className="mr-2" /> Profile
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a href="/settings" className="flex items-center">
          <SettingOutlined className="mr-2" /> Settings
        </a>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: (
        <button onClick={logout} className="w-full text-left">
          Logout
        </button>
      ),
    },
  ];

  const quickActions = [
    {
      label: 'Add Product',
      icon: <PlusOutlined />,
      action: 'add_product',
    },
    {
      label: 'New Order',
      icon: <ShoppingCartOutlined />,
      action: 'new_order',
    },
    {
      label: 'Add Supplier',
      icon: <TruckOutlined />,
      action: 'add_supplier',
    },
  ];

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      
      <div className="flex items-center space-x-6">
        {/* Search Bar with Results */}
        <div className="relative">
          <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders, products..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowSearchResults(true)}
            onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
          />
          
          {showSearchResults && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-auto">
              {loading ? (
                <div className="p-4 flex justify-center">
                  <LoadingOutlined />
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map(result => (
                  <a 
                    key={result.id} 
                    href={`/${result.type}s/${result.id}`}
                    className="block px-4 py-2 hover:bg-gray-100 border-b last:border-b-0"
                  >
                    <div className="flex items-center">
                      {result.type === 'product' && <ShoppingCartOutlined className="mr-2" />}
                      {result.type === 'order' && <ShoppingCartOutlined className="mr-2" />}
                      {result.type === 'user' && <UserOutlined className="mr-2" />}
                      {result.type === 'supplier' && <TruckOutlined className="mr-2" />}
                      <div>
                        <p className="font-medium">{result.name || `#${result.id}`}</p>
                        <p className="text-xs text-gray-500 capitalize">{result.type}</p>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="p-4 text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <Space>
          {quickActions.map((action, index) => (
            <Button
              key={index}
              type="primary"
              icon={action.icon}
              onClick={() => handleQuickAction(action.action)}
              className="flex items-center"
              loading={loading}
            >
              {action.label}
            </Button>
          ))}
        </Space>

        {/* Notifications */}
        <Dropdown
          menu={{ items: notificationItems }}
          trigger={['click']}
          placement="bottomRight"
          overlayClassName="w-80"
          onOpenChange={(open) => open && fetchNotifications()}
        >
          <Badge count={unreadCount} className="cursor-pointer">
            <BellOutlined className="text-xl text-gray-600" />
          </Badge>
        </Dropdown>

        {/* Profile Dropdown */}
        <Dropdown
          menu={{ items: profileItems }}
          trigger={['click']}
          placement="bottomRight"
        >
          <div className="flex items-center cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-2">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <span className="font-medium">{user?.name || 'Admin'}</span>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;