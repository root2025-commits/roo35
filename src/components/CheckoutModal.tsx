import React, { useState, useEffect } from 'react';
import { X, MapPin, User, Phone, Home, CreditCard, DollarSign, MessageCircle, AlertCircle, Check } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
}

export interface OrderData {
  orderId: string;
  customerInfo: CustomerInfo;
  deliveryZone: any;
  deliveryCost: number;
  items: any[];
  subtotal: number;
  transferFee: number;
  total: number;
  cashTotal?: number;
  transferTotal?: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (orderData: OrderData) => void;
  items: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}

export function CheckoutModal({ isOpen, onClose, onCheckout, items, total }: CheckoutModalProps) {
  const { state: adminState } = useAdmin();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    address: ''
  });
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  // Obtener zonas de entrega del admin en tiempo real
  const deliveryZones = adminState.deliveryZones || [];

  // Escuchar cambios en las zonas de entrega
  useEffect(() => {
    const handleAdminChange = (event: CustomEvent) => {
      if (event.detail.type === 'delivery_zone_add' || 
          event.detail.type === 'delivery_zone_update' || 
          event.detail.type === 'delivery_zone_delete') {
        // Las zonas se actualizarán automáticamente desde adminState
        setSelectedZone(null); // Reset selection if zones change
      }
    };

    window.addEventListener('admin_state_change', handleAdminChange as EventListener);
    return () => {
      window.removeEventListener('admin_state_change', handleAdminChange as EventListener);
    };
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s-()]+$/.test(customerInfo.phone)) {
      newErrors.phone = 'Formato de teléfono inválido';
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (deliveryType === 'delivery' && !selectedZone) {
      alert('Por favor selecciona una zona de entrega');
      return;
    }

    setIsSubmitting(true);

    const orderId = `TV-${Date.now()}`;
    const deliveryCost = deliveryType === 'delivery' ? (selectedZone?.cost || 0) : 0;
    const finalTotal = total + deliveryCost;

    const orderData: OrderData = {
      orderId,
      customerInfo,
      deliveryZone: deliveryType === 'delivery' ? selectedZone : { name: 'Recogida en tienda', cost: 0 },
      deliveryCost,
      items,
      subtotal: total,
      transferFee: 0,
      total: finalTotal
    };

    setTimeout(() => {
      onCheckout(orderData);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Finalizar Pedido</h2>
              <p className="text-blue-100">Completa tus datos para proceder</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Información Personal
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={customerInfo.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tu nombre completo"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+53 5555 5555"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección *
                </label>
                <textarea
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tu dirección completa"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.address}
                  </p>
                )}
              </div>
            </div>

            {/* Delivery Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Opciones de Entrega
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    deliveryType === 'pickup'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Home className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="font-medium">Recogida en Tienda</p>
                  <p className="text-sm text-gray-600">Gratis</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    deliveryType === 'delivery'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="font-medium">Entrega a Domicilio</p>
                  <p className="text-sm text-gray-600">Según zona</p>
                </button>
              </div>

              {/* Delivery Zones */}
              {deliveryType === 'delivery' && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Selecciona tu zona de entrega:
                  </label>
                  {deliveryZones.length > 0 ? (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {deliveryZones.map((zone: any) => (
                        <button
                          key={zone.id}
                          type="button"
                          onClick={() => setSelectedZone(zone)}
                          className={`w-full p-3 text-left border rounded-lg transition-all ${
                            selectedZone?.id === zone.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{zone.name}</span>
                            <span className="text-blue-600 font-semibold">{zone.cost} CUP</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        No hay zonas de entrega configuradas. Por favor contacta al administrador.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Resumen del Pedido</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} elementos)</span>
                  <span>{total} CUP</span>
                </div>
                <div className="flex justify-between">
                  <span>Entrega</span>
                  <span>
                    {deliveryType === 'delivery' && selectedZone 
                      ? `${selectedZone.cost} CUP` 
                      : 'Gratis'
                    }
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    {total + (deliveryType === 'delivery' && selectedZone ? selectedZone.cost : 0)} CUP
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Procesando...
                </>
              ) : (
                <>
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Enviar Pedido por WhatsApp
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}