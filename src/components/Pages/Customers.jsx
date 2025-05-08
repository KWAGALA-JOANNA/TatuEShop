// customers.js - Customer management module

class CustomerManager {
    constructor(dataSource) {
      this.dataSource = dataSource;
      this.customers = [];
      this.loaded = false;
    }
  
    async loadCustomers() {
      try {
        this.customers = await this.dataSource.getAllCustomers();
        this.loaded = true;
        return this.customers;
      } catch (error) {
        console.error('Error loading customers:', error);
        throw error;
      }
    }
  
    async getCustomerById(id) {
      try {
        // Check if we already have this customer loaded
        if (this.loaded) {
          const customer = this.customers.find(c => c.id === id);
          if (customer) return customer;
        }
        
        // Otherwise fetch from data source
        return await this.dataSource.getCustomerById(id);
      } catch (error) {
        console.error(`Error fetching customer ${id}:`, error);
        throw error;
      }
    }
  
    async addCustomer(customerData) {
      try {
        // Validate customer data
        this.validateCustomerData(customerData);
        
        // Add to data source
        const newCustomer = await this.dataSource.createCustomer(customerData);
        
        // Update local cache if loaded
        if (this.loaded) {
          this.customers.push(newCustomer);
        }
        
        return newCustomer;
      } catch (error) {
        console.error('Error adding customer:', error);
        throw error;
      }
    }
  
    async updateCustomer(id, customerData) {
      try {
        // Validate customer data
        this.validateCustomerData(customerData, true);
        
        // Update in data source
        const updatedCustomer = await this.dataSource.updateCustomer(id, customerData);
        
        // Update local cache if loaded
        if (this.loaded) {
          const index = this.customers.findIndex(c => c.id === id);
          if (index !== -1) {
            this.customers[index] = updatedCustomer;
          }
        }
        
        return updatedCustomer;
      } catch (error) {
        console.error(`Error updating customer ${id}:`, error);
        throw error;
      }
    }
  
    async deleteCustomer(id) {
      try {
        // Delete from data source
        await this.dataSource.deleteCustomer(id);
        
        // Update local cache if loaded
        if (this.loaded) {
          this.customers = this.customers.filter(c => c.id !== id);
        }
        
        return true;
      } catch (error) {
        console.error(`Error deleting customer ${id}:`, error);
        throw error;
      }
    }
  
    validateCustomerData(data, isUpdate = false) {
      // Basic validation
      if (!isUpdate && !data.name) {
        throw new Error('Customer name is required');
      }
      
      if (data.email && !this.isValidEmail(data.email)) {
        throw new Error('Invalid email address');
      }
      
      if (data.phone && !this.isValidPhone(data.phone)) {
        throw new Error('Invalid phone number');
      }
      
      return true;
    }
  
    isValidEmail(email) {
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    isValidPhone(phone) {
      // Simple phone validation
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      return phoneRegex.test(phone);
    }
  
    async searchCustomers(query) {
      try {
        // If we have customers loaded, search locally for better performance
        if (this.loaded && query) {
          const lowerQuery = query.toLowerCase();
          return this.customers.filter(customer => 
            customer.name.toLowerCase().includes(lowerQuery) ||
            (customer.email && customer.email.toLowerCase().includes(lowerQuery)) ||
            (customer.phone && customer.phone.includes(query))
          );
        }
        
        // Otherwise, search via data source
        return await this.dataSource.searchCustomers(query);
      } catch (error) {
        console.error('Error searching customers:', error);
        throw error;
      }
    }
  
    async getCustomerSegments() {
      try {
        return await this.dataSource.getCustomerSegments();
      } catch (error) {
        console.error('Error fetching customer segments:', error);
        throw error;
      }
    }
  
    async getCustomerOrders(customerId) {
      try {
        return await this.dataSource.getCustomerOrders(customerId);
      } catch (error) {
        console.error(`Error fetching orders for customer ${customerId}:`, error);
        throw error;
      }
    }
  }
  
  // Sample data source adapter
  class CustomerDataSource {
    constructor(apiEndpoint) {
      this.apiEndpoint = apiEndpoint;
    }
  
    async getAllCustomers() {
      try {
        const response = await fetch(`${this.apiEndpoint}/customers`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Failed to fetch customers:', error);
        throw error;
      }
    }
  
    async getCustomerById(id) {
      try {
        const response = await fetch(`${this.apiEndpoint}/customers/${id}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error(`Failed to fetch customer ${id}:`, error);
        throw error;
      }
    }
  
    async createCustomer(customerData) {
      try {
        const response = await fetch(`${this.apiEndpoint}/customers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customerData)
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Failed to create customer:', error);
        throw error;
      }
    }
  
    async updateCustomer(id, customerData) {
      try {
        const response = await fetch(`${this.apiEndpoint}/customers/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customerData)
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error(`Failed to update customer ${id}:`, error);
        throw error;
      }
    }
  
    async deleteCustomer(id) {
      try {
        const response = await fetch(`${this.apiEndpoint}/customers/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        return true;
      } catch (error) {
        console.error(`Failed to delete customer ${id}:`, error);
        throw error;
      }
    }
  
    async searchCustomers(query) {
      try {
        const response = await fetch(`${this.apiEndpoint}/customers/search?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Failed to search customers:', error);
        throw error;
      }
    }
  
    async getCustomerSegments() {
      try {
        const response = await fetch(`${this.apiEndpoint}/customers/segments`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Failed to fetch customer segments:', error);
        throw error;
      }
    }
  
    async getCustomerOrders(customerId) {
      try {
        const response = await fetch(`${this.apiEndpoint}/customers/${customerId}/orders`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error(`Failed to fetch orders for customer ${customerId}:`, error);
        throw error;
      }
    }
  }
  
  export { CustomerManager, CustomerDataSource };