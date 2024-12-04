const { test, expect } = require('@playwright/test');


class apiClass{
    constructor(request) {
      this.request = request;
      this.baseUrl = 'https://restful-booker.herokuapp.com';
    }

 // Authenticate to get a token
 async authenticate(username, password) {
    const response = await this.request.post(`${this.baseUrl}/auth`, {
      data: { username, password },
    });

    if (response.status() !== 200) {
      throw new Error(`Authentication failed. Status: ${response.status()}`);
    }

    const data = await response.json();
    if (!data.token) {
      throw new Error('Token not received from the authentication response.');
    }
    return data.token;
  }

  // Create a booking
  async createBooking(payload) {
    return this.request.post(`${this.baseUrl}/booking`, {
      data: payload,
    });
  }

 
  // GET /booking
    async getBookings() {
        return this.request.get(`${this.baseUrl}/booking`);
    }
 
  // POST /booking
    async createBooking(payload, token) {
        return this.request.post(`${this.baseUrl}/booking`, {
        headers: {
            Cookie: `token=${token}`, 
            'Content-Type': 'application/json',
        },
        data: payload,
      });
    }

 // PUT Booking
 async updateBooking(bookingId, payload, token) {
    return this.request.put(`${this.baseUrl}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
        'Content-Type': 'application/json',
      },
      data: payload,
    });
  }
    // DELETE
    async deleteBooking(bookingId, token) {
        return this.request.delete(`${this.baseUrl}/booking/${bookingId}`, {
          headers: {
            Cookie: `token=${token}`, 
            'Content-Type': 'application/json', 
          },
        });
      }
      
    

}

module.exports = [ apiClass ];
