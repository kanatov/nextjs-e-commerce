# SOLUTION

## Estimation

- Estimated: 32 hours
- Spent: 24 hours

The most time-consuming and challenging task was handling the filters, as it required organizing separate elements around one source of truth and giving them control over it.

## Gorgeous Achievements

- **API implementation**
  - Products with filters, pagination, and handy information for the frontend
  - Filters data: all tags, all vendors, price range
- **Navigation**
  - URL updates
  - Multiple filters
  - Pagination
  - Price range input with debouncer
  - Highlight current state
- **Cypress Tests** and Postman requests library
- **Basic error handling**

| **Products**              | **Pagination**        |
| ------------------------- | --------------------- |
| ![Screen Shot 2025-03-10 at 18 21 04](https://github.com/user-attachments/assets/d213e680-2f12-4873-a89c-a30311c8697e) | ![Screen Shot 2025-03-10 at 18 21 48](https://github.com/user-attachments/assets/1170159e-d7be-4c01-ab39-936219ac9dfb) |
| **Products with filters** | **No products found** |
| ![Screen Shot 2025-03-10 at 18 21 27](https://github.com/user-attachments/assets/f2c16b9c-a3e9-469d-bd45-a50d9e8e56f7) | ![Screen Shot 2025-03-10 at 17 50 59](https://github.com/user-attachments/assets/61cb3944-5a6f-4d0d-89fa-9b88d24f2317) |
| **Vendor not found**      | **Page not found**    |
| ![Screen Shot 2025-03-10 at 17 50 28](https://github.com/user-attachments/assets/895c0306-58d2-461e-8a71-10668f2564e0) | ![Screen Shot 2025-03-10 at 17 50 38](https://github.com/user-attachments/assets/063ee671-cb6c-41bc-a2d0-e94dc4bb6310) |
| **Error**                 |                       |
| ![Screen Shot 2025-03-10 at 17 59 49](https://github.com/user-attachments/assets/7e61cc6c-b932-434d-9caf-e6570c2e356e) |                       |

## How to Run the Project

1. Clone the repo
2. `cd repo-name`
3. Run `npm i` to install dependencies (you might need to install **Cypress**)
4. Use `npm run` to list all available commands

| Command                | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| `npm start`            | Creates an optimized build, starts the server and app |
| `npm run dev`          | Runs dev mode                                         |
| `npm run build`        | Builds the project                                    |
| `npm run lint`         | Checks for linting errors                             |
| `npm run e2e:headless` | Runs E2E tests with Cypress (if installed)            |

## Juicy Details

### Frontend Implementation

#### Next.js Router Structure

While this task could be implemented as an SPA, I thought it would be better to keep it functionally and structurally closer to the real project, as it just sits right with me.

I've assumed the products page wouldn't be the main page of the website, so I placed it at `/products`. From this point, I had to set up the Next.js routing structure.

<img src="https://github.com/user-attachments/assets/117c7acd-1607-4ab6-967b-4874415f385f" width="400"/>

To display this page, I've used:

| Element         | Purpose                                                             |
| --------------- | ------------------------------------------------------------------- |
| `[[...vendor]]` | **Catch-All route** to handle vendors                               |
| `@store`        | **Parallel route** to make the products grid navigate independently |
| `(store)`       | **Routes grouping** to handle custom layout and `not-found` page    |

Bear with me, I'll explain in detail.

The **Catch-All** route is not for the final project but for the demo. The reason I used this instead of a dynamic route (like `[vendor]`) is that I would have had to duplicate pages otherwise, and I didn't have time to make them look and work differently. In a real project, there should be a `page.js` for `[vendor]` and another for `/products`, but the catch-all route allows me to handle both within this test task.

The **parallel route** for products allows independent navigation, which is exactly what we need for pagination since it's independent of the vendor path.

Lastly, **route grouping** allows me to set some custom rules. In this case, I use it for the vendor's `not-found` page.

#### Implementing Navigation and Filters

The most challenging task was handling the state of the filter. I've seen two approaches for that: one using internal state management that affects both the components and the URL, and another using the URL as the source of truth. I wanted the URL to be copyable and for the app to pick up the state from there.

With this in mind, I chose the address bar as a _source of truth_ for the products page state and had to ensure individual components could pick up the state from there. For example, the price range input reads the value from the URL on mount.

If I were to do this again, I would try a combined approach. I'd like to see how having a URL change event listener would work with a global context and what benefits it might bring.

#### URL Structure

The URL represents the current state of the filters and allows users to copy and send it to others or save it for later.

Users can edit the URL, which affects the search parameters.

> `http://localhost:3000/products/PetLab?tags=Chews&tags=Cat&price=92&page=2`

| 1. Slug | `/Vendor-Name`                           |
| ------- | ---------------------------------------- |
| Usage   | `http://localhost:3000/products/PetLab`  |
|         | Allows creating a sub-page for a vendor. |

| 2. Query | `tags=TagName`                                       |
| -------- | ---------------------------------------------------- |
| Usage    | `http://localhost:3000/products?tags=Cats&tags=Dogs` |
|          | Allows filtering by one or multiple tags.            |

| 3. Query | `price=99`                                |
| -------- | ----------------------------------------- |
| Usage    | `http://localhost:3000/products?price=99` |
|          | Allows setting a price cap.               |

| 4. Query | `page=2`                                |
| -------- | --------------------------------------- |
| Usage    | `http://localhost:3000/products?page=2` |
|          | Allows pagination.                      |

### API Implementation

After spending some time with `json-server`, it was obvious that it didn't provide the flexibility I needed for a customizable API.

Filtering features (like retrieving all tags) didn't work in the latest version, while the previous version lacked pagination controls (next/previous page indications, etc.), so I had to write it myself. However, I now think this could be handled with a single `/products/filters` endpoint.

While writing the endpoints, I used Postman to check responses and test different parameters. You can find them in `tools/PetLab.postman_collection.json`.

#### `GET /products/tags`

Used to list all tags for the filtering panel.

Response:

```json
{
"tags": ["one", "two", "three", ... ]
}
```

#### `GET /products/vendors`

Used to list the price range for the filtering panel.

Response:

```json
{
"vendors": ['one', 'two', three, ... ]
}

```

#### `GET /products/price-range`

Used to list the price range for the filtering panel.

Response:

```json
{
  "min": 10,
  "max": 99
}
```

#### `GET /products`

Used to get all paginated products matching the filters.

Querries:

```
page = 2
tags = Tag-Name
tags = Another-Tag-Name
vendor = Vendor-Name
price = 30
```

Response:

```json
{
  "totalCount": 95,
  "page": 1,
  "pages": 2,
  "previous": false,
  "next": true,
  "perPage": 12,
  "products": [ ... ],
}

```

### E2E Tests

I've extended the database entries to have meaningful test data. The tests cover:

- Sidebar
- Product list (should contain 12 products)
- Pagination controls
- Filters (Tags and Vendors)

As well as navigation cases:

- Accessing a vendor's page
- URL changes after interacting with filters
- Filters narrowing results or returning no products
- Pagination

![SCR-20250310-nvtg](https://github.com/user-attachments/assets/86b004c0-da2d-498a-b85e-7f4d1eec9164)

![SCR-20250310-nvvi](https://github.com/user-attachments/assets/f7831bbe-56f2-407f-b06f-2ae5a2d09c49)


### Backlog

Unfortunately, I completely ran out of time solving the highest-priority challenges, so I had to leave some things behind:

- UI design and effects
- Subscription filter, as there were other filters provided instead
- Write tests for edge cases, such as faulty requests

If I had more time, after completing the required functionality and design, I would:

- Try state management to keep track of the filter state inside the app
- Optimise dynamic content loading

### Thank you!
