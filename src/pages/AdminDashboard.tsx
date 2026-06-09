import React, { useEffect, useState } from 'react';
import { ResourceItem } from '../data';
import { Settings, Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function AdminDashboard({ token }: { token: string }) {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ResourceItem>>({});
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await fetch('/api/admin/resources', {
        headers: { 'x-admin-token': token, 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setResources(data.resources);
      }
    } catch (err) {
      console.error("Failed to load resources", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/admin/resources/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token, 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setResources(resources.filter(r => r.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      const isNew = isAdding;
      const url = isNew ? '/api/admin/resources' : `/api/admin/resources/${editingId}`;
      const method = isNew ? 'POST' : 'PATCH';
      
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-token': token,
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      
      const data = await res.json();
      if (data.success) {
        setEditingId(null);
        setIsAdding(false);
        fetchResources();
      } else {
        alert("Error saving: " + data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (item: ResourceItem) => {
    setEditingId(item.id);
    setEditForm(item);
    setIsAdding(false);
  };

  const startAdd = () => {
    setEditingId('new');
    setIsAdding(true);
    setEditForm({
      id: 'prod_' + Date.now(),
      title: '',
      description: '',
      fullDescription: '',
      imageUrl: '',
      thumbnail: '',
      category: 'Script',
      type: 'script',
      price: '0',
      soldCount: '0'
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black flex items-center gap-3">
          <Settings className="text-brand" /> {`Admin Dashboard`}
        </h1>
        <button 
          onClick={startAdd}
          className="bg-brand text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
        >
          <Plus size={18} /> {`Add Product`}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {resources.map(item => (
            <div key={item.id} className="bg-card-bg border border-border-subtle p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center">
              {editingId === item.id ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    value={editForm.id || ''}
                    onChange={e => setEditForm({ ...editForm, id: e.target.value })}
                    className="bg-bg-app border border-border-subtle p-2 rounded-lg text-text-main"
                    placeholder="ID"
                  />
                  <input
                    value={editForm.title || ''}
                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    className="bg-bg-app border border-border-subtle p-2 rounded-lg text-text-main"
                    placeholder="Title"
                  />
                  <input
                    value={editForm.imageUrl || ''}
                    onChange={e => setEditForm({ ...editForm, imageUrl: e.target.value })}
                    className="bg-bg-app border border-border-subtle p-2 rounded-lg text-text-main"
                    placeholder="Image URL"
                  />
                  <input
                    value={editForm.price || ''}
                    onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                    className="bg-bg-app border border-border-subtle p-2 rounded-lg text-text-main"
                    placeholder="Price"
                  />
                  <textarea
                    value={editForm.description || ''}
                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                    className="bg-bg-app border border-border-subtle p-2 rounded-lg md:col-span-2 text-text-main"
                    placeholder="Description"
                  />
                  <textarea
                    value={editForm.fullDescription || ''}
                    onChange={e => setEditForm({ ...editForm, fullDescription: e.target.value })}
                    className="bg-bg-app border border-border-subtle p-2 rounded-lg md:col-span-2 min-h-[100px] text-text-main"
                    placeholder="Full Description"
                  />
                  <div className="flex gap-2 md:col-span-2 justify-end">
                    <button onClick={() => { setEditingId(null); setIsAdding(false); }} className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg font-medium flex items-center gap-2">
                      <X size={16} /> Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-brand text-white rounded-lg font-medium flex items-center gap-2">
                      <Save size={16} /> Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <img src={item.imageUrl || item.thumbnail} alt={item.title as string} className="w-24 h-24 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-text-main">{item.title as string}</h3>
                    <p className="text-text-muted text-sm line-clamp-1">{item.description}</p>
                    <div className="text-brand font-medium mt-1">฿{item.price}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(item)} className="p-2 hover:bg-brand/10 rounded-xl transition-colors text-blue-500">
                      <Edit size={20} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-500/10 rounded-xl transition-colors text-red-500">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* New Item Form */}
          {isAdding && (
            <div className="bg-card-bg border border-border-subtle p-4 rounded-2xl flex flex-col gap-4">
              <h3 className="font-bold text-lg mb-2 text-text-main">Adding New Product</h3>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={editForm.id || ''}
                  onChange={e => setEditForm({ ...editForm, id: e.target.value })}
                  className="bg-bg-app border border-border-subtle p-2 rounded-lg text-text-main"
                  placeholder="ID"
                />
                <input
                  value={editForm.title || ''}
                  onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                  className="bg-bg-app border border-border-subtle p-2 rounded-lg text-text-main"
                  placeholder="Title"
                />
                <input
                  value={editForm.imageUrl || ''}
                  onChange={e => setEditForm({ ...editForm, imageUrl: e.target.value })}
                  className="bg-bg-app border border-border-subtle p-2 rounded-lg text-text-main"
                  placeholder="Image URL"
                />
                <input
                  value={editForm.category || ''}
                  onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                  className="bg-bg-app border border-border-subtle p-2 rounded-lg text-text-main"
                  placeholder="Category (e.g. Script)"
                />
                <input
                  value={editForm.price || ''}
                  onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                  className="bg-bg-app border border-border-subtle p-2 rounded-lg text-text-main"
                  placeholder="Price"
                />
                <textarea
                  value={editForm.description || ''}
                  onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                  className="bg-bg-app border border-border-subtle p-2 rounded-lg md:col-span-2 text-text-main"
                  placeholder="Short Description"
                />
                <textarea
                  value={editForm.fullDescription || ''}
                  onChange={e => setEditForm({ ...editForm, fullDescription: e.target.value })}
                  className="bg-bg-app border border-border-subtle p-2 rounded-lg md:col-span-2 min-h-[100px] text-text-main"
                  placeholder="Full Description"
                />
                <div className="flex gap-2 md:col-span-2 justify-end mt-4">
                  <button onClick={() => { setEditingId(null); setIsAdding(false); }} className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg font-medium flex items-center gap-2">
                    <X size={16} /> Cancel
                  </button>
                  <button onClick={handleSave} className="px-4 py-2 bg-brand text-white rounded-lg font-medium flex items-center gap-2">
                    <Save size={16} /> Save Product
                  </button>
                </div>
              </div>
            </div>
          )}

          {resources.length === 0 && !isAdding && (
            <div className="text-center py-12 text-text-muted">No products found. Start by adding one!</div>
          )}
        </div>
      )}
    </div>
  );
}
