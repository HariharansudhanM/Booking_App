EndPoints 
1. Create Room = https://booking-app-3bsl.onrender.com/Rooms/createRoom 
Sample Data : 
   {
       
        "RoomName": "Utra Delux",
        "amenities": "wifi, Recliner, AC",
        "Status": "Available",
        "Bookings": []
    }

2.Get Rooms = https://booking-app-3bsl.onrender.com/Rooms/

3. Book Room =  https://booking-app-3bsl.onrender.com/Rooms/book/2
Sample Data :
{
  "Bookings": [
    {
      "Booking_id" : 1,
      "customer Name": "Admin",
      "startDate": "25/06/2024",
      "endDate": "26/06/2024"
    }
  ]
}
