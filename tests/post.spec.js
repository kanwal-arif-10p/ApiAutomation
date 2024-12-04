const { test, expect } = require('@playwright/test');
const [ apiClass ] = require('../Module/apiClass');

test.describe('POST API Tests', () => {
  let bookingAPI;

  test.beforeEach(async ({ request }) => {
    bookingAPI = new apiClass(request);
  });

  test('Validate POST /booking creates a new booking', async () => {
    const payload = {
      firstname: 'Bob',
      lastname: 'Doe',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2024-12-10',
        checkout: '2024-12-20',
      },
      additionalneeds: 'Breakfast',
    };

    const response = await bookingAPI.createBooking(payload);
    // Status code for successful creation
    expect(response.status()).toBe(200); 
    const data = await response.json();
    console.log(data)

    // Assert that the response contains the expected structure and values
    expect(data).toHaveProperty('bookingid');
    expect(data.booking.firstname).toBe(payload.firstname);
    expect(data.booking.lastname).toBe(payload.lastname);

    
    console.log('Booking Created')
  });
});
