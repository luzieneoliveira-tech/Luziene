import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ReceiptText, 
  Package, 
  Users, 
  BarChart3, 
  Search, 
  Bell, 
  Settings, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Clock, 
  MoreVertical,
  ShoppingCart,
  UserPlus,
  AlertTriangle,
  Filter,
  Download
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

// --- Types ---

interface MetricProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
  progress: number;
}

interface SummaryItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

interface Sale {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: 'Concluído' | 'Pendente' | 'Cancelado';
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Em Estoque' | 'Baixo Estoque' | 'Sem Estoque';
  image: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: string;
  lastPurchase: string;
}

// --- Components ---

const MetricCard = ({ title, value, trend, isPositive, icon, color, progress }: MetricProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {trend}
      </div>
    </div>
    <p className="text-slate-500 text-sm font-medium">{title}</p>
    <h3 className="text-2xl font-bold mt-1 text-slate-900">{value}</h3>
    <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${color.replace('bg-', 'bg-')}`}
      />
    </div>
  </motion.div>
);

const SummaryCard = ({ label, value, icon, iconBg, iconColor }: SummaryItemProps) => (
  <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg} ${iconColor}`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</p>
      <p className="text-lg font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [notifications, setNotifications] = useState(3);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  
  // Sales State
  const [sales, setSales] = useState<Sale[]>([
    { id: '#9402', customer: 'João Silva', date: 'Hoje, 14:30', amount: 'R$ 1.250,00', status: 'Concluído' },
    { id: '#9401', customer: 'Maria Oliveira', date: 'Hoje, 12:15', amount: 'R$ 840,50', status: 'Pendente' },
    { id: '#9400', customer: 'Carlos Souza', date: 'Ontem, 18:45', amount: 'R$ 2.100,00', status: 'Concluído' },
    { id: '#9399', customer: 'Ana Pereira', date: 'Ontem, 16:20', amount: 'R$ 450,00', status: 'Cancelado' },
    // Fevereiro
    { id: '#9350', customer: 'Roberto Carlos', date: '15 Fev, 10:00', amount: 'R$ 3.500,00', status: 'Concluído' },
    { id: '#9351', customer: 'Juliana Lima', date: '20 Fev, 14:20', amount: 'R$ 1.800,00', status: 'Concluído' },
    { id: '#9352', customer: 'Marcos Paulo', date: '25 Fev, 09:15', amount: 'R$ 2.200,00', status: 'Concluído' },
    // Março
    { id: '#9380', customer: 'Fernanda Costa', date: '05 Mar, 11:30', amount: 'R$ 4.100,00', status: 'Concluído' },
    { id: '#9381', customer: 'Ricardo Alves', date: '12 Mar, 16:45', amount: 'R$ 2.950,00', status: 'Concluído' },
    { id: '#9382', customer: 'Beatriz Santos', date: '18 Mar, 13:10', amount: 'R$ 5.400,00', status: 'Concluído' },
  ]);

  // Products State
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Smartphone Galaxy S24', category: 'Eletro', price: 4500, stock: 15, status: 'Em Estoque', image: 'https://loremflickr.com/100/100/smartphone,galaxy' },
    { id: '2', name: 'Camiseta Algodão Premium', category: 'Moda', price: 89.9, stock: 45, status: 'Em Estoque', image: 'https://loremflickr.com/100/100/tshirt,cotton' },
    { id: '3', name: 'Arroz Integral 5kg', category: 'Ali', price: 24.5, stock: 5, status: 'Baixo Estoque', image: 'https://loremflickr.com/100/100/rice,food' },
    { id: '4', name: 'Jogo de Panelas Inox', category: 'Casa', price: 350, stock: 0, status: 'Sem Estoque', image: 'https://loremflickr.com/100/100/pans,kitchen' },
    { id: '5', name: 'Smart TV 55" 4K', category: 'Eletro', price: 2800, stock: 8, status: 'Baixo Estoque', image: 'https://loremflickr.com/100/100/tv,4k' },
    { id: '6', name: 'Tênis Esportivo', category: 'Moda', price: 299.9, stock: 20, status: 'Em Estoque', image: 'https://loremflickr.com/100/100/sneakers,running' },
    { id: '7', name: 'Cafeteira Elétrica', category: 'Casa', price: 180, stock: 12, status: 'Em Estoque', image: 'https://loremflickr.com/100/100/coffee,maker' },
  ]);

  // Customers State
  const [customers, setCustomers] = useState<Customer[]>([
    { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 98765-4321', totalSpent: 'R$ 2.450,00', lastPurchase: 'Hoje' },
    { id: '2', name: 'Maria Oliveira', email: 'maria@email.com', phone: '(11) 91234-5678', totalSpent: 'R$ 1.120,50', lastPurchase: 'Ontem' },
    { id: '3', name: 'Carlos Souza', email: 'carlos@email.com', phone: '(11) 99887-7665', totalSpent: 'R$ 4.300,00', lastPurchase: '2 dias atrás' },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Eletro', price: '', stock: '', image: '' });
  const [newSale, setNewSale] = useState({ customer: '', productId: '', quantity: '1' });
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });
  const [editStockValue, setEditStockValue] = useState('');

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      showToast('Por favor, preencha todos os campos', 'info');
      return;
    }

    const stockNum = parseInt(newProduct.stock);
    const status: Product['status'] = stockNum > 10 ? 'Em Estoque' : stockNum > 0 ? 'Baixo Estoque' : 'Sem Estoque';

    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: stockNum,
      status,
      image: newProduct.image || `https://loremflickr.com/100/100/${newProduct.name.replace(/\s+/g, ',')}`
    };

    setProducts([product, ...products]);
    setIsModalOpen(false);
    setNewProduct({ name: '', category: 'Eletro', price: '', stock: '', image: '' });
    showToast('Produto adicionado com sucesso!');
  };

  const handleCreateSale = (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find(p => p.id === newSale.productId);
    const qty = parseInt(newSale.quantity);

    if (!product || !newSale.customer || qty <= 0) {
      showToast('Preencha todos os campos corretamente', 'info');
      return;
    }

    if (product.stock < qty) {
      showToast(`Estoque insuficiente! Disponível: ${product.stock}`, 'info');
      return;
    }

    // Update Stock
    const updatedProducts = products.map(p => {
      if (p.id === product.id) {
        const newStock = p.stock - qty;
        const status: Product['status'] = newStock > 10 ? 'Em Estoque' : newStock > 0 ? 'Baixo Estoque' : 'Sem Estoque';
        return { ...p, stock: newStock, status };
      }
      return p;
    });

    // Add Sale
    const totalAmount = product.price * qty;
    const sale: Sale = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      customer: newSale.customer,
      date: 'Agora',
      amount: `R$ ${totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      status: 'Concluído'
    };

    setProducts(updatedProducts);
    setSales([sale, ...sales]);
    setIsSaleModalOpen(false);
    setNewSale({ customer: '', productId: '', quantity: '1' });
    showToast('Venda realizada e estoque atualizado!');
  };

  const handleUpdateStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || editStockValue === '') return;

    const newStock = parseInt(editStockValue);
    const status: Product['status'] = newStock > 10 ? 'Em Estoque' : newStock > 0 ? 'Baixo Estoque' : 'Sem Estoque';

    const updatedProducts = products.map(p => 
      p.id === editingProduct.id ? { ...p, stock: newStock, status } : p
    );

    setProducts(updatedProducts);
    setIsEditModalOpen(false);
    setEditingProduct(null);
    setEditStockValue('');
    showToast('Estoque atualizado com sucesso!');
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.email) {
      showToast('Nome e Email são obrigatórios', 'info');
      return;
    }

    const customer: Customer = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone || 'Não informado',
      totalSpent: 'R$ 0,00',
      lastPurchase: 'Nunca'
    };

    setCustomers([customer, ...customers]);
    setIsCustomerModalOpen(false);
    setNewCustomer({ name: '', email: '', phone: '' });
    showToast('Cliente cadastrado com sucesso!');
  };

  const handleFinalizeSale = (saleId: string) => {
    setSales(sales.map(s => s.id === saleId ? { ...s, status: 'Concluído' } : s));
    showToast(`Venda ${saleId} finalizada com sucesso!`);
  };

  const categories = [
    { name: 'Eletro', value: 70 },
    { name: 'Moda', value: 45 },
    { name: 'Ali', value: 90 },
    { name: 'Casa', value: 25 },
    { name: 'Outros', value: 55 },
  ];

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: ReceiptText, label: 'Vendas' },
    { icon: Package, label: 'Estoque' },
    { icon: Users, label: 'Clientes' },
    { icon: BarChart3, label: 'Relatórios' },
  ];

  // --- View Components ---

  const EstoqueView = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Controle de Estoque</h3>
          <p className="text-slate-500 text-sm">Gerencie seus produtos e níveis de estoque.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Adicionar Produto
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Preço</th>
                <th className="px-6 py-4">Qtd.</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">{product.name}</p>
                        <p className="text-[10px] text-slate-400">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-bold">R$ {product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm font-medium">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      product.status === 'Em Estoque' ? 'bg-emerald-100 text-emerald-600' :
                      product.status === 'Baixo Estoque' ? 'bg-amber-100 text-amber-600' :
                      'bg-rose-100 text-rose-600'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => {
                        setEditingProduct(product);
                        setEditStockValue(product.stock.toString());
                        setIsEditModalOpen(true);
                      }}
                      className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );

  const ClientesView = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Base de Clientes</h3>
          <p className="text-slate-500 text-sm">Gerencie o relacionamento com seus clientes.</p>
        </div>
        <button 
          onClick={() => setIsCustomerModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
        >
          <UserPlus size={18} />
          Novo Cliente
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Contato</th>
                <th className="px-6 py-4">Total Gasto</th>
                <th className="px-6 py-4">Última Compra</th>
                <th className="px-6 py-4">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">{customer.name}</p>
                        <p className="text-[10px] text-slate-400">ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">{customer.email}</p>
                    <p className="text-[10px] text-slate-400">{customer.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{customer.totalSpent}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{customer.lastPurchase}</td>
                  <td className="px-6 py-4">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );

  const RelatoriosView = () => {
    const monthlyData = [
      { name: 'Fevereiro', total: 7500, color: '#3b82f6' },
      { name: 'Março', total: 12450, color: '#10b981' },
    ];

    const categoryData = [
      { name: 'Eletro', value: 45, color: '#3b82f6' },
      { name: 'Moda', value: 25, color: '#8b5cf6' },
      { name: 'Ali', value: 20, color: '#10b981' },
      { name: 'Casa', value: 10, color: '#f59e0b' },
    ];

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Relatórios de Desempenho</h2>
            <p className="text-sm text-slate-500">Análise detalhada dos meses de Fevereiro e Março.</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} />
            Exportar PDF
          </button>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                <BarChart3 size={24} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase">Fevereiro</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900">R$ 7.500,00</h3>
            <p className="text-sm text-slate-500 mt-1">Total de 3 vendas concluídas</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
                <TrendingUp size={24} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase">Março</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900">R$ 12.450,00</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-emerald-600 text-sm font-bold">+66%</span>
              <span className="text-slate-500 text-sm">em relação a Fevereiro</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-lg font-bold mb-6 text-slate-800">Comparativo Mensal</h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                    {monthlyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-lg font-bold mb-6 text-slate-800">Distribuição por Categoria</h4>
            <div className="h-64 w-full flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 pr-4">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs font-medium text-slate-600">{cat.name}</span>
                    <span className="text-xs font-bold text-slate-800 ml-auto">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h4 className="text-lg font-bold text-slate-800">Produtos Mais Vendidos (Março)</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Produto</th>
                  <th className="px-6 py-4">Vendas</th>
                  <th className="px-6 py-4">Receita</th>
                  <th className="px-6 py-4">Crescimento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">Smartphone Galaxy S24</td>
                  <td className="px-6 py-4 text-sm text-slate-500">12 unidades</td>
                  <td className="px-6 py-4 text-sm font-bold">R$ 54.000,00</td>
                  <td className="px-6 py-4 text-sm text-emerald-600 font-bold">+15%</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">Camiseta Algodão Premium</td>
                  <td className="px-6 py-4 text-sm text-slate-500">45 unidades</td>
                  <td className="px-6 py-4 text-sm font-bold">R$ 4.045,50</td>
                  <td className="px-6 py-4 text-sm text-emerald-600 font-bold">+8%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    );
  };

  const DashboardView = () => (
    <div className="space-y-8">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Vendas Totais" 
          value="R$ 45.250,00" 
          trend="+12.5%" 
          isPositive={true} 
          icon={<Wallet size={24} />} 
          color="bg-blue-600"
          progress={75}
        />
        <MetricCard 
          title="Lucro Mensal" 
          value="R$ 12.800,00" 
          trend="+8.2%" 
          isPositive={true} 
          icon={<TrendingUp size={24} />} 
          color="bg-emerald-500"
          progress={50}
        />
        <MetricCard 
          title="Pedidos Pendentes" 
          value="24" 
          trend="-3.1%" 
          isPositive={false} 
          icon={<Clock size={24} />} 
          color="bg-amber-500"
          progress={25}
        />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
        >
          <h4 className="text-lg font-bold mb-6 text-slate-800">Vendas por Categoria</h4>
          <div className="h-64 w-full flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categories.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.name === 'Eletro' ? '#3b82f6' :
                        entry.name === 'Moda' ? '#8b5cf6' :
                        entry.name === 'Ali' ? '#10b981' :
                        entry.name === 'Casa' ? '#f59e0b' :
                        '#64748b'
                      } 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 w-full">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ 
                      backgroundColor: 
                        cat.name === 'Eletro' ? '#3b82f6' :
                        cat.name === 'Moda' ? '#8b5cf6' :
                        cat.name === 'Ali' ? '#10b981' :
                        cat.name === 'Casa' ? '#f59e0b' :
                        '#64748b'
                    }} 
                  />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{cat.name}</span>
                  <span className="text-[10px] font-bold text-slate-800 ml-auto">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Sales Table */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h4 className="text-lg font-bold text-slate-800">Vendas Recentes</h4>
            <button 
              onClick={() => {
                setActiveTab('Vendas');
                showToast('Navegando para Vendas...', 'info');
              }}
              className="text-blue-600 text-sm font-semibold hover:underline"
            >
              Ver todas
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">ID Pedido</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Valor</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sales.slice(0, 4).map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-blue-600 text-sm">{sale.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{sale.customer}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs">{sale.date}</td>
                    <td className="px-6 py-4 font-bold text-sm">{sale.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        sale.status === 'Concluído' ? 'bg-emerald-100 text-emerald-600' :
                        sale.status === 'Pendente' ? 'bg-amber-100 text-amber-600' :
                        'bg-rose-100 text-rose-600'
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => showToast(`Opções para o pedido ${sale.id}`, 'info')}
                        className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Bottom Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
        <SummaryCard 
          label="Ticket Médio" 
          value="R$ 342,00" 
          icon={<TrendingUp size={18} />} 
          iconBg="bg-blue-50" 
          iconColor="text-blue-600" 
        />
        <SummaryCard 
          label="Total de Itens" 
          value="1.254" 
          icon={<ShoppingCart size={18} />} 
          iconBg="bg-emerald-50" 
          iconColor="text-emerald-600" 
        />
        <SummaryCard 
          label="Novos Clientes" 
          value="48" 
          icon={<UserPlus size={18} />} 
          iconBg="bg-amber-50" 
          iconColor="text-amber-600" 
        />
        <SummaryCard 
          label="Estoque Crítico" 
          value="12 itens" 
          icon={<AlertTriangle size={18} />} 
          iconBg="bg-rose-50" 
          iconColor="text-rose-600" 
        />
      </div>
    </div>
  );

  const PlaceholderView = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-[60vh] text-slate-400 space-y-4"
    >
      <div className="p-8 rounded-full bg-slate-100">
        <Icon size={64} />
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
        <p className="text-sm">Esta tela está em desenvolvimento.</p>
      </div>
      <button 
        onClick={() => setActiveTab('Dashboard')}
        className="text-blue-600 font-semibold hover:underline"
      >
        Voltar para o Dashboard
      </button>
    </motion.div>
  );

  const VendasView = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Histórico de Vendas</h2>
          <p className="text-sm text-slate-500">Acompanhe todas as transações realizadas no período.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Wallet size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Total Vendido</p>
              <p className="text-sm font-bold text-slate-700">
                R$ {sales.reduce((acc, sale) => acc + parseFloat(sale.amount.replace('R$ ', '').replace('.', '').replace(',', '.')), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsSaleModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
          >
            <Plus size={18} />
            Nova Venda
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar venda ou cliente..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors border border-slate-200 rounded-lg bg-white">
              <Filter size={18} />
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors border border-slate-200 rounded-lg bg-white">
              <Download size={18} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">ID Pedido</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-blue-600 text-sm">{sale.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {sale.customer.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{sale.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">{sale.date}</td>
                  <td className="px-6 py-4 font-bold text-sm">{sale.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      sale.status === 'Concluído' ? 'bg-emerald-100 text-emerald-600' :
                      sale.status === 'Pendente' ? 'bg-amber-100 text-amber-600' :
                      'bg-rose-100 text-rose-600'
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {sale.status === 'Pendente' && (
                        <button 
                          onClick={() => handleFinalizeSale(sale.id)}
                          className="text-xs bg-emerald-500 text-white px-2 py-1 rounded hover:bg-emerald-600 transition-colors"
                        >
                          Finalizar
                        </button>
                      )}
                      <button 
                        onClick={() => showToast(`Opções para o pedido ${sale.id}`, 'info')}
                        className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {sales.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    Nenhuma venda registrada no período.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardView />;
      case 'Vendas':
        return <VendasView />;
      case 'Estoque':
        return <EstoqueView />;
      case 'Clientes':
        return <ClientesView />;
      case 'Relatórios':
        return <RelatoriosView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f6f6f8] font-sans text-slate-900 overflow-hidden">
      {/* Toast Notification */}
      {toast && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3"
        >
          <div className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
          <span className="text-sm font-medium">{toast.message}</span>
        </motion.div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center text-white">
            <BarChart3 size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">Sistema ERP</h1>
            <p className="text-xs text-slate-500">Gestão Comercial</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {sidebarItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => {
                setActiveTab(item.label);
                showToast(`Navegando para ${item.label}`, 'info');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeTab === item.label 
                  ? 'bg-blue-50 text-blue-600 font-semibold' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div 
            onClick={() => showToast('Perfil do usuário clicado', 'info')}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
              <img 
                src="https://picsum.photos/seed/admin/100/100" 
                alt="User" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">admin@erp.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-xl font-bold text-slate-800">
              {activeTab === 'Dashboard' ? 'Visão Geral do PDV' : activeTab}
            </h2>
            <div className="relative max-w-md w-full ml-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar vendas, produtos..."
                className="w-full bg-slate-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setNotifications(0);
                showToast('Notificações lidas');
              }}
              className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-blue-600 transition-colors relative"
            >
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>
            <button 
              onClick={() => showToast('Configurações abertas', 'info')}
              className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Settings size={20} />
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <button 
              onClick={() => setIsSaleModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 active:scale-95 transform transition-transform"
            >
              <Plus size={18} />
              Nova Venda
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          {renderContent()}
        </div>
      </main>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Novo Produto</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Nome do Produto</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  placeholder="Ex: Teclado Mecânico RGB"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Categoria</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    <option value="Eletro">Eletro</option>
                    <option value="Moda">Moda</option>
                    <option value="Ali">Alimentos</option>
                    <option value="Casa">Casa</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Preço (R$)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Quantidade em Estoque</label>
                <input 
                  type="number" 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  placeholder="0"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">URL da Imagem (Opcional)</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  placeholder="https://exemplo.com/imagem.jpg"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
                >
                  Salvar Produto
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* New Sale Modal */}
      {isSaleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Nova Venda</h3>
              <button 
                onClick={() => setIsSaleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            <form onSubmit={handleCreateSale} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Cliente</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  placeholder="Nome do cliente"
                  value={newSale.customer}
                  onChange={(e) => setNewSale({...newSale, customer: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Produto</label>
                <div className="flex gap-3">
                  {newSale.productId && (
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                      <img 
                        src={products.find(p => p.id === newSale.productId)?.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <select 
                    required
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                    value={newSale.productId}
                    onChange={(e) => setNewSale({...newSale, productId: e.target.value})}
                  >
                    <option value="">Selecione um produto</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id} disabled={p.stock <= 0}>
                        {p.name} ({p.stock} em estoque)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Quantidade</label>
                <input 
                  type="number" 
                  min="1"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  value={newSale.quantity}
                  onChange={(e) => setNewSale({...newSale, quantity: e.target.value})}
                />
              </div>
              
              {newSale.productId && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600 font-medium">Total da Venda:</span>
                    <span className="text-blue-700 font-bold">
                      R$ {((products.find(p => p.id === newSale.productId)?.price || 0) * parseInt(newSale.quantity || '0')).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsSaleModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
                >
                  Finalizar Venda
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit Stock Modal */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Editar Estoque</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            <form onSubmit={handleUpdateStock} className="p-6 space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-slate-500">Alterando estoque para:</p>
                <p className="text-lg font-bold text-slate-800">{editingProduct.name}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Nova Quantidade</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-center text-2xl font-bold focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  value={editStockValue}
                  onChange={(e) => setEditStockValue(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
                >
                  Atualizar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Add Customer Modal */}
      {isCustomerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Novo Cliente</h3>
              <button 
                onClick={() => setIsCustomerModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            <form onSubmit={handleCreateCustomer} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  placeholder="Ex: Roberto Carlos"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  placeholder="roberto@exemplo.com"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Telefone</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  placeholder="(00) 00000-0000"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsCustomerModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
                >
                  Cadastrar Cliente
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
