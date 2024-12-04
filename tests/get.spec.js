const { test, expect } = require('@playwright/test');
const [ apiClass ] = require('../Module/apiClass');

test.describe('GET API Tests', () => {
  let bookingAPI;

  test.beforeEach(async ({ request }) => {
    bookingAPI = new apiClass(request);
  });


  test('Validate GET /booking response', async () => {
    const response = await bookingAPI.getBookings();

    // Status code for successful request
    expect(response.status()).toBe(200); 
    const data = await response.json();

    console.log(data)
    
    console.log('GET Booking ')

    
  });
});