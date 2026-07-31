import {
    useState,
    type ChangeEvent,
    type FormEvent,
  } from 'react';
  import type {
    CreateOrderData,
  } from '../types/order.types';
 
  interface CreateOrderFormProps {
    onCreateOrder: (orderData: CreateOrderData) => Promise<void>;
  }
  
  const initialFormData: CreateOrderData = {
    customerName: '',
    customerEmail: '',
    product: '',
    quantity: 1,
  };
  
  export function CreateOrderForm({
    onCreateOrder
  }: CreateOrderFormProps) {
    const [formData, setFormData] =
      useState<CreateOrderData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(
      null,
    );
  
    function handleChange(
      event: ChangeEvent<HTMLInputElement>,
    ): void {
      const { name, value } = event.target;
  
      setFormData((currentFormData) => ({
        ...currentFormData,
        [name]:
          name === 'quantity'
            ? Number(value)
            : value,
      }));
    }
  
    async function handleSubmit(
      event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
      event.preventDefault();
  
      try {
        setIsSubmitting(true);
        setErrorMessage(null);
  
        await onCreateOrder(formData);
        
        setFormData(initialFormData);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred';
  
        setErrorMessage(message);
      } finally {
        setIsSubmitting(false);
      }
    }
  
    return (
      <form
        className="create-order-form"
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
      >
        <h2>Create order</h2>
  
        {errorMessage && (
          <p role="alert">{errorMessage}</p>
        )}
  
        <div>
          <label htmlFor="customerName">
            Customer name
          </label>
  
          <input
            id="customerName"
            name="customerName"
            type="text"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
  
        <div>
          <label htmlFor="customerEmail">
            Customer email
          </label>
  
          <input
            id="customerEmail"
            name="customerEmail"
            type="email"
            value={formData.customerEmail}
            onChange={handleChange}
            required
          />
        </div>
  
        <div>
          <label htmlFor="product">
            Product
          </label>
  
          <input
            id="product"
            name="product"
            type="text"
            value={formData.product}
            onChange={handleChange}
            required
          />
        </div>
  
        <div>
          <label htmlFor="quantity">
            Quantity
          </label>
  
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            max="100"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
  
        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create order'}
        </button>
      </form>
    );
  }