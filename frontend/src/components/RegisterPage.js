import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext, API } from "../App";
import { toast } from "../utils/auth";

export default function RegisterPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirm_password) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API}/auth/register`, formData);
      
      login(response.data.user, response.data.access_token);
      toast.success(`Bem-vindo, ${response.data.user.full_name}!`);
      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.detail || "Erro no cadastro";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fadeInUp">
        <div className="glass-effect rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">MB</span>
            </div>
            <h1 className="text-2xl font-bold gradient-text mb-2">
              Registrar-se
            </h1>
            <p className="text-gray-600">
              Crie sua conta para começar sua jornada
            </p>
         
