# Programming Task - elo

Create a set of APIs using JS Framework and save data into a MongoDB database.

### Backend Stack

- Node.js
- Express.js
- MongoDB
- Cloudinary (Image Management)

**URL: https://elo-task-backend.herokuapp.com**

#### POST

- Add a Manufacturer
  - endpoint: _/api/v1/manufacturers_
  - submit form data:
  ```
    {
      name [Required] [Unique],
      country [Required],
      logo
    }
  ```
- Add a Car and link to Manufacturer
  - endpoint: _/api/v1/cars_
  - submit form data:
  ```
    {
      name [Required],
      year,
      manufacturer [Required],
      image [Required]
    }
  ```

#### GET

- Cars manufactured in Country
  - endpoint: _/api/v1/manufacturers_
  - query: `country=countryName`
- List of all cars
  - endpoint: _/api/v1/cars_
- List of all manufacturers
  - endpoint: _/api/v1/manufacturers_

#### DELETE

- Manufacturer
  - endpoint: _/api/v1/manufacturers/:id_
- Car
  - endpoint: _/api/v1/cars/:id_
