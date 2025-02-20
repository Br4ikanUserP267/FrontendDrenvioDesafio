import { useState, useEffect } from "react";
import {
  getSpecialPrices,
  addSpecialPrice,
  updateSpecialPrice,
  deleteSpecialPrice,
} from "../../services/SpeciallPrice";
import { getProducts } from "../../services/Product";
import { Producto } from "../../models/Product";
import { SpecialPrice } from "../../models/SpecialPrice";

interface SpecialPricesProps {
  theme: string;
}

const SpecialPricesTable: React.FC<SpecialPricesProps> = ({ theme }) => {
  const [specialPrices, setSpecialPrices] = useState<SpecialPrice[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filteredPrices, setFilteredPrices] = useState<SpecialPrice[]>([]);
  const [formData, setFormData] = useState<SpecialPrice>({
    _id: "",
    productId: "",
    specialPrice: 0,
    description: "",
  });
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setFilteredPrices(specialPrices.filter(price => price.productId === selectedProduct));
    } else {
      setFilteredPrices(specialPrices);
    }
  }, [selectedProduct, specialPrices]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [productsData, specialPricesData] = await Promise.all([
        getProducts(),
        getSpecialPrices(),
      ]);
      setProductos(productsData);
      setSpecialPrices(specialPricesData);
      setFilteredPrices(specialPricesData);
    } catch (err) {
      setError("Error cargando datos");
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setFormData((prev) => ({ ...prev, productId: selectedId }));

    const existingPrice = specialPrices.find((price) => price.productId === selectedId);
    if (existingPrice) {
      setFormData(existingPrice);
      setEditing(true);
    } else {
      setFormData({ _id: "", productId: selectedId, specialPrice: 0, description: "" });
      setEditing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.productId) {
      alert("Por favor selecciona un producto.");
      return;
    }

    const productoSeleccionado = productos.find(p => p._id === formData.productId);
    
    if (!productoSeleccionado) {
      alert("El producto seleccionado no existe.");
      return;
    }

    if (formData.specialPrice >= productoSeleccionado.price) {
      alert("El precio especial debe ser menor al precio original del producto.");
      return;
    }

    try {
      if (editing) {
        await updateSpecialPrice(formData._id, formData);
      } else {
        await addSpecialPrice(formData);
      }
      fetchInitialData();
      setFormData({ _id: "", productId: "", specialPrice: 0, description: "" });
      setEditing(false);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const handleDelete = async (specialPriceId: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este precio especial?")) return;

    try {
      await deleteSpecialPrice(specialPriceId);
      fetchInitialData();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div className={`container py-4 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <h2 className="mb-4 text-center">📋 Precios Especiales</h2>
      
      <div className={`card p-3 mb-4 ${theme === "dark" ? "bg-secondary text-white" : "bg-white text-dark"}`}>
        <h3 className="text-center">{editing ? "✏️ Editar Precio Especial" : "🛒 Agregar Precio Especial"}</h3>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">📦 Producto:</label>
            <select className="form-select" value={formData.productId} onChange={handleProductChange}>
              <option value="">-- Selecciona --</option>
              {productos.map((producto) => (
                <option key={producto._id} value={producto._id}>{producto.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">💲 Precio Especial:</label>
            <input 
              type="number" 
              className="form-control" 
              value={formData.specialPrice} 
              onChange={(e) => setFormData({ ...formData, specialPrice: parseFloat(e.target.value) })} 
            />
          </div>
          <div className="col-12">
            <label className="form-label">📝 Descripción:</label>
            <input 
              type="text" 
              className="form-control" 
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
            />
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary">{editing ? "Actualizar" : "Agregar"}</button>
          </div>
        </form>
      </div>

      <div className="table-responsive">
        <table className={`table table-bordered table-hover ${theme === "dark" ? "table-dark" : ""}`}>
          <thead className={`${theme === "dark" ? "table-dark" : "table-light"}`}>
            <tr>
              <th>Producto</th>
              <th>Precio Especial</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrices.map((price) => (
              <tr key={price._id}>
                <td>{productos.find(p => p._id === price.productId)?.name || "Desconocido"}</td>
                <td>${price.specialPrice.toFixed(2)}</td>
                <td>{price.description}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => { setFormData(price); setEditing(true); }}>✏️ Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(price._id)}>🗑️ Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecialPricesTable;
