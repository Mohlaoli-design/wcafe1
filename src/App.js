import { useEffect, useState } from 'react';

// Sample initial data
const initialProducts = [
  { id: 1, name: "Coffee", description: "Strong black coffee", category: "Beverages", price: 50, quantity: 15, lowStock: false },
  { id: 2, name: "Cappuccino", description: "Coffee,dark chocolate with milk", category: "Beverages", price: 55, quantity: 8, lowStock: true },
  { id: 3, name: "Muffin", description: "Fresh baked muffin", category: "Pastries", price: 25, quantity: 5, lowStock: true },
  { id: 4, name: "Pap,chicken stew, vegetables", description: "Pap,chicken stew,vegetables and soft", category: "Food", price: 60, quantity: 5, lowStock: true },
  { id: 5, name: "Tsoeu koto", description: "Tsoeu koto", category: "Drinks", price: 600, quantity: 12, lowStock: false }
];

// Sample initial customers
const initialCustomers = [
  {id: 5, name: "Raterekeke Mokhoamphiri", email: "rtrekere@pham.co.za", phone:"+27 722334466", loyaltyPoints: 25 },
  {id: 4, name: "Joala Makhampopo", email: "joalaboholo@gov.co.ls", phone:"22334466", loyaltyPoints: 10 },
  { id: 1, name: "John Ntiri", email: "ntiri@hotmail.com", phone: "58120001", loyaltyPoints: 120 },
  { id: 2, name: "Jane Seoete", email: "seoete@outlook.com", phone: "59123401", loyaltyPoints: 75 },
  { id: 3, name: "Mike Joele", email: "mike@yahoo.com", phone: "57120056", loyaltyPoints: 200 }
];

// Sample initial sales
const initialSales = [
  { id: 1, customerId: 1, date: "2025-08-15", items: [{ productId: 1, quantity: 2 }, { productId: 3, quantity: 1 }], total: 125, paymentMethod: "Cash" },
  { id: 2, customerId: 2, date: "2025-08-16", items: [{ productId: 2, quantity: 1 }, { productId: 4, quantity: 2 }], total: 185, paymentMethod: "Card" },
  { id: 3, customerId: 3, date: "2025-08-17", items: [{ productId: 1, quantity: 3 }], total: 150, paymentMethod: "Cash" }
];

// Format currency as Maloti
const formatCurrency = (amount) => {
  return `M${amount.toFixed(2)}`;
};

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [products, setProducts] = useState(initialProducts);
  const [customers, setCustomers] = useState(initialCustomers);
  const [sales, setSales] = useState(initialSales);
  const [lowStockCount, setLowStockCount] = useState(0);
  
  // Calculate low stock count
  useEffect(() => {
    const lowStockItems = products.filter(product => product.quantity < 10);
    setLowStockCount(lowStockItems.length);
  }, [products]);
  
  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '' },
    { id: 'products', label: 'Product Management', icon: '' },
    { id: 'inventory', label: 'Inventory', icon: '' },
    { id: 'sales', label: 'Sales', icon: '' },
    { id: 'customers', label: 'Customers', icon: '' },
    { id: 'reports', label: 'Reports', icon: '' }
  ];
  
  
  // Render the current view based on state
  const renderView = () => {
    switch(currentView) {
      case 'dashboard':
        return <Dashboard products={products} sales={sales} />;
      case 'products':
        return <ProductManagement products={products} setProducts={setProducts} />;
      case 'inventory':
        return <Inventory products={products} setProducts={setProducts} />;
      case 'sales':
        return <Sales products={products} customers={customers} sales={sales} setSales={setSales} setProducts={setProducts} />;
      case 'customers':
        return <CustomerManagement customers={customers} setCustomers={setCustomers} sales={sales} />;
      case 'reports':
        return <Reports products={products} sales={sales} />;
      default:
        return <Dashboard products={products} sales={sales} />;
    }
  };
  
  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Wings Cafe</h2>
          <p>Stock Inventory System</p>
        </div>
        <ul className="nav-menu">
          {navItems.map(item => (
            <li 
              key={item.id} 
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>{navItems.find(item => item.id === currentView)?.label || 'Dashboard'}</h1>
          <div className="notification-area">
            {lowStockCount > 0 && (
              <div className="notification-badge">
                {lowStockCount}
              </div>
            )}
          </div>
        </div>
        
        <div className="module-container">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ products, sales }) => {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const lowStockItems = products.filter(product => product.quantity < 10).length;
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  
  return (
    <div>
      <div className="dashboard">
        <div className="card stat-card">
          <div className="stat-value">{totalProducts}</div>
          <div className="stat-label">Total Products</div>
        </div>
        <div className="card stat-card">
          <div className="stat-value">{formatCurrency(totalValue)}</div>
          <div className="stat-label">Total Inventory Value</div>
        </div>
        <div className="card stat-card">
          <div className="stat-value">{lowStockItems}</div>
          <div className="stat-label">Low Stock Items</div>
        </div>
        <div className="card stat-card">
          <div className="stat-value">{formatCurrency(totalSales)}</div>
          <div className="stat-label">Total Sales</div>
        </div>
      </div>
      
      <div className="card">
        <h2>Recent Products</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 5).map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.quantity < 10 ? (
                    <span className="low-stock">Low Stock</span>
                  ) : (
                    <span>In Stock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Product Management Component
const ProductManagement = ({ products, setProducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: ''
  });
  const [editingId, setEditingId] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing product
      setProducts(prev => prev.map(product => 
        product.id === editingId 
          ? { ...product, ...formData, id: editingId, price: parseFloat(formData.price), quantity: parseInt(formData.quantity) }
          : product
      ));
      setEditingId(null);
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        lowStock: parseInt(formData.quantity) < 10
      };
      setProducts(prev => [...prev, newProduct]);
    }
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      quantity: ''
    });
  };
  
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      quantity: product.quantity.toString()
    });
    setEditingId(product.id);
  };
  
  const handleDelete = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };
  
  return (
    <div>
      <div className="card">
        <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price (M)</label>
            <input
              type="number"
              step="0.01"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Initial Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
          {editingId && (
            <button 
              type="button" 
              className="btn"
              onClick={() => {
                setFormData({
                  name: '',
                  description: '',
                  category: '',
                  price: '',
                  quantity: ''
                });
                setEditingId(null);
              }}
              style={{marginLeft: '10px'}}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
      
      <div className="card">
        <h2>Product List</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{formatCurrency(product.price)}</td>
                <td className={product.quantity < 10 ? 'low-stock' : ''}>
                  {product.quantity}
                </td>
                <td>
                  <button 
                    className="btn btn-primary"
                    style={{padding: '5px 10px', marginRight: '5px'}}
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger"
                    style={{padding: '5px 10px'}}
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Inventory Component
const Inventory = ({ products, setProducts }) => {
  const [adjustmentData, setAdjustmentData] = useState({
    productId: '',
    adjustment: '',
    reason: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdjustmentData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAdjustment = (e) => {
    e.preventDefault();
    
    const product = products.find(p => p.id === parseInt(adjustmentData.productId));
    if (!product) return;
    
    const adjustmentValue = parseInt(adjustmentData.adjustment);
    const newQuantity = product.quantity + adjustmentValue;
    
    if (newQuantity < 0) {
      alert("Cannot adjust stock to a negative value");
      return;
    }
    
    setProducts(prev => prev.map(p => 
      p.id === product.id 
        ? { ...p, quantity: newQuantity, lowStock: newQuantity < 10 }
        : p
    ));
    
    // Reset form
    setAdjustmentData({
      productId: '',
      adjustment: '',
      reason: ''
    });
  };
  
  return (
    <div>
      <div className="card">
        <h2>Adjust Stock Levels</h2>
        <form onSubmit={handleAdjustment}>
          <div className="form-group">
            <label>Product</label>
            <select
              name="productId"
              className="form-control"
              value={adjustmentData.productId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} (Current: {product.quantity})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Adjustment (+/-)</label>
            <input
              type="number"
              name="adjustment"
              className="form-control"
              value={adjustmentData.adjustment}
              onChange={handleInputChange}
              required
            />
            <small>Use positive numbers to add stock, negative to remove</small>
          </div>
          <div className="form-group">
            <label>Reason</label>
            <input
              type="text"
              name="reason"
              className="form-control"
              value={adjustmentData.reason}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Apply Adjustment
          </button>
        </form>
      </div>
      
      <div className="card">
        <h2>Current Inventory</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{formatCurrency(product.price)}</td>
                <td className={product.quantity < 10 ? 'low-stock' : ''}>
                  {product.quantity}
                </td>
                <td>
                  {product.quantity < 10 ? (
                    <span className="low-stock">Low Stock</span>
                  ) : (
                    <span>In Stock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Sales Component with transaction analysis
const Sales = ({ products, customers, sales, setSales, setProducts }) => {
  const [saleForm, setSaleForm] = useState({
    customerId: '',
    items: [],
    paymentMethod: 'Cash'
  });
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddItem = () => {
    if (!selectedProduct || quantity < 1) return;
    
    const product = products.find(p => p.id === parseInt(selectedProduct));
    if (!product) return;
    
    if (product.quantity < quantity) {
      alert(`Not enough stock. Only ${product.quantity} available.`);
      return;
    }
    
    // Check if product already in cart
    const existingItemIndex = saleForm.items.findIndex(item => item.productId === parseInt(selectedProduct));
    
    if (existingItemIndex >= 0) {
      // Update quantity
      const updatedItems = [...saleForm.items];
      updatedItems[existingItemIndex].quantity += quantity;
      setSaleForm({...saleForm, items: updatedItems});
    } else {
      // Add new item
      setSaleForm({
        ...saleForm,
        items: [...saleForm.items, { productId: parseInt(selectedProduct), quantity }]
      });
    }
    
    setQuantity(1);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...saleForm.items];
    updatedItems.splice(index, 1);
    setSaleForm({...saleForm, items: updatedItems});
  };

  const calculateTotal = () => {
    return saleForm.items.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const handleCompleteSale = () => {
    if (saleForm.items.length === 0) {
      alert("Please add items to the sale");
      return;
    }
    
    if (!saleForm.customerId) {
      alert("Please select a customer");
      return;
    }
    
    const total = calculateTotal();
    const newSale = {
      id: Math.max(...sales.map(s => s.id)) + 1,
      customerId: parseInt(saleForm.customerId),
      date: new Date().toISOString().split('T')[0],
      items: [...saleForm.items],
      total,
      paymentMethod: saleForm.paymentMethod
    };
    
    // Update sales
    setSales([...sales, newSale]);
    
    // Update product quantities
    setProducts(prev => prev.map(product => {
      const item = saleForm.items.find(i => i.productId === product.id);
      if (item) {
        const newQuantity = product.quantity - item.quantity;
        return { ...product, quantity: newQuantity, lowStock: newQuantity < 10 };
      }
      return product;
    }));
    
    // Reset form
    setSaleForm({
      customerId: '',
      items: [],
      paymentMethod: 'Cash'
    });
    
    alert("Sale completed successfully!");
  };

  // Sales analysis data
  const totalSalesValue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const salesByDay = sales.reduce((acc, sale) => {
    acc[sale.date] = (acc[sale.date] || 0) + sale.total;
    return acc;
  }, {});
  
  const topSellingProducts = products.map(product => {
    const sold = sales.reduce((sum, sale) => {
      const item = sale.items.find(i => i.productId === product.id);
      return sum + (item ? item.quantity : 0);
    }, 0);
    return { ...product, sold, revenue: sold * product.price };
  }).sort((a, b) => b.sold - a.sold).slice(0, 5);

  return (
    <div>
      <div className="card">
        <h2>New Sale</h2>
        <div className="form-group">
          <label>Customer</label>
          <select
            className="form-control"
            value={saleForm.customerId}
            onChange={(e) => setSaleForm({...saleForm, customerId: e.target.value})}
            required
          >
            <option value="">Select a customer</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Add Product</label>
          <div style={{display: 'flex', gap: '10px'}}>
            <select
              className="form-control"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Select a product</option>
              {products.filter(p => p.quantity > 0).map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - {formatCurrency(product.price)} (Stock: {product.quantity})
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              className="form-control"
              style={{width: '100px'}}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <button type="button" className="btn btn-primary" onClick={handleAddItem}>
              Add Item
            </button>
          </div>
        </div>
        
        {saleForm.items.length > 0 && (
          <div>
            <h3>Order Items</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {saleForm.items.map((item, index) => {
                  const product = products.find(p => p.id === item.productId);
                  return product ? (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(product.price)}</td>
                      <td>{formatCurrency(product.price * item.quantity)}</td>
                      <td>
                        <button 
                          className="btn btn-danger"
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
            
            <div style={{marginTop: '20px'}}>
              <h3>Total: {formatCurrency(calculateTotal())}</h3>
              
              <div className="form-group">
                <label>Payment Method</label>
                <select
                  className="form-control"
                  value={saleForm.paymentMethod}
                  onChange={(e) => setSaleForm({...saleForm, paymentMethod: e.target.value})}
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Mobile Money">Mobile Money</option>
                </select>
              </div>
              
              <button 
                className="btn btn-primary" 
                onClick={handleCompleteSale}
                style={{marginTop: '10px'}}
              >
                Complete Sale
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="card">
        <h2>Sales Analysis</h2>
        
        <div className="dashboard">
          <div className="card stat-card">
            <div className="stat-value">{formatCurrency(totalSalesValue)}</div>
            <div className="stat-label">Total Sales Value</div>
          </div>
          <div className="card stat-card">
            <div className="stat-value">{sales.length}</div>
            <div className="stat-label">Total Transactions</div>
          </div>
        </div>
        
        <h3>Top Selling Products</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Units Sold</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topSellingProducts.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sold}</td>
                <td>{formatCurrency(product.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <h3>Recent Transactions</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {sales.slice().reverse().slice(0, 5).map(sale => {
              const customer = customers.find(c => c.id === sale.customerId);
              return (
                <tr key={sale.id}>
                  <td>{sale.date}</td>
                  <td>{customer ? customer.name : 'Unknown'}</td>
                  <td>
                    {sale.items.map(item => {
                      const product = products.find(p => p.id === item.productId);
                      return product ? `${item.quantity}x ${product.name}` : '';
                    }).join(', ')}
                  </td>
                  <td>{formatCurrency(sale.total)}</td>
                  <td>{sale.paymentMethod}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Customer Management Component
const CustomerManagement = ({ customers, setCustomers, sales }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing customer
      setCustomers(prev => prev.map(customer => 
        customer.id === editingId 
          ? { ...customer, ...formData, id: editingId }
          : customer
      ));
      setEditingId(null);
    } else {
      // Add new customer
      const newCustomer = {
        id: Math.max(...customers.map(c => c.id)) + 1,
        ...formData,
        loyaltyPoints: 0
      };
      setCustomers(prev => [...prev, newCustomer]);
    }
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: ''
    });
  };

  const handleEdit = (customer) => {
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone
    });
    setEditingId(customer.id);
  };

  const handleDelete = (id) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
  };

  // Calculate customer statistics
  const customerStats = customers.map(customer => {
    const customerSales = sales.filter(sale => sale.customerId === customer.id);
    const totalSpent = customerSales.reduce((sum, sale) => sum + sale.total, 0);
    const orderCount = customerSales.length;
    
    return {
      ...customer,
      totalSpent,
      orderCount,
      avgOrderValue: orderCount > 0 ? totalSpent / orderCount : 0
    };
  });

  return (
    <div>
      <div className="card">
        <h2>{editingId ? 'Edit Customer' : 'Add New Customer'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update Customer' : 'Add Customer'}
          </button>
          {editingId && (
            <button 
              type="button" 
              className="btn"
              onClick={() => {
                setFormData({
                  name: '',
                  email: '',
                  phone: ''
                });
                setEditingId(null);
              }}
              style={{marginLeft: '10px'}}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
      
      <div className="card">
        <h2>Customer Database</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Loyalty Points</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerStats.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.orderCount}</td>
                <td>{formatCurrency(customer.totalSpent)}</td>
                <td>{customer.loyaltyPoints}</td>
                <td>
                  <button 
                    className="btn btn-primary"
                    style={{padding: '5px 10px', marginRight: '5px'}}
                    onClick={() => handleEdit(customer)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger"
                    style={{padding: '5px 10px'}}
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Reports Component
const Reports = ({ products, sales }) => {
  const lowStockProducts = products.filter(p => p.quantity < 10);
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const totalSalesValue = sales.reduce((sum, sale) => sum + sale.total, 0);
  
  // Sales by category
  const salesByCategory = products.reduce((acc, product) => {
    const sold = sales.reduce((sum, sale) => {
      const item = sale.items.find(i => i.productId === product.id);
      return sum + (item ? item.quantity : 0);
    }, 0);
    
    const revenue = sold * product.price;
    
    if (!acc[product.category]) {
      acc[product.category] = { sold, revenue, products: 0 };
    } else {
      acc[product.category].sold += sold;
      acc[product.category].revenue += revenue;
    }
    
    acc[product.category].products += 1;
    return acc;
  }, {});
  
  return (
    <div>
      <div className="card">
        <h2>Inventory Reports</h2>
        
        <h3>Low Stock Alert</h3>
        {lowStockProducts.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Current Stock</th>
                <th>Price</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td className="low-stock">{product.quantity}</td>
                  <td>{formatCurrency(product.price)}</td>
                  <td>{formatCurrency(product.price * product.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products are low in stock.</p>
        )}
        
        <h3>Inventory Valuation</h3>
        <p>Total inventory value: <strong>{formatCurrency(totalValue)}</strong></p>
        
        <h3>Sales Performance</h3>
        <p>Total sales revenue: <strong>{formatCurrency(totalSalesValue)}</strong></p>
        
        <h3>Sales by Category</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Products</th>
              <th>Units Sold</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(salesByCategory).map(([category, data]) => (
              <tr key={category}>
                <td>{category}</td>
                <td>{data.products}</td>
                <td>{data.sold}</td>
                <td>{formatCurrency(data.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <h3>Category Breakdown</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Number of Products</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            {[...new Set(products.map(p => p.category))].map(category => {
              const categoryProducts = products.filter(p => p.category === category);
              const categoryValue = categoryProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
              return (
                <tr key={category}>
                  <td>{category}</td>
                  <td>{categoryProducts.length}</td>
                  <td>{formatCurrency(categoryValue)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// CSS Styles
const styles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #e0e6eeff;
  color: #333;
}

.app-container {
  display: flex;
  min-height: 50vh;
}

/* Sidebar Styles */
.sidebar {
  width: 250px;
  background-color: #090e13ff;
  color: white;
  padding: 20px 0;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

.sidebar-header {
  padding: 0 20px 20px;
  border-bottom: 1px solid #34495e;
  margin-bottom: 20px;
}

.sidebar-header h2 {
  color: #ecf0f1;
  font-size: 1.5rem;
}

.nav-menu {
  list-style: none;
}

.nav-item {
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.nav-item:hover {
  background-color: #34495e;
}

.nav-item.active {
  background-color: #3498db;
  border-left: 4px solid rgba(25, 28, 29, 1);
}

.nav-icon {
  margin-right: 10px;
  font-size: 1.2rem;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
}

.header h1 {
  color: #2c3e50;
  font-size: 1.8rem;
}

.notification-badge {
  background-color: #a71504ff;
  color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

/* Dashboard Styles */
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.stat-card {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #3498db;
  margin: 10px 0;
}

.stat-label {
  color: #7f8c8d;
  font-size: 0.9rem;
}

/* Table Styles */
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(69, 70, 148, 0.05);
}

.data-table th, .data-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid; teal;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.data-table tr:hover {
  background-color: #f5f7fa;
}

/* Form Styles */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
}

.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #297bceff;
  border-radius: 4px;
  font-weight: 200;
  font-size: bold: 4rem;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background-color: #c0392b;
}

/* Low stock warning */
.low-stock {
  color: #e74c3c;
  font-weight: 500;
}

/* Module container */
.module-container {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive design */
@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    padding: 10px 0;
  }
  
  .dashboard {
    grid-template-columns: 1fr;
  }
}
`;

// Add styles to the document
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default App;