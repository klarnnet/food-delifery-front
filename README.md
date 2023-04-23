### Folder Structure

The project contains the following tree structure:

- **`app`**
  > Contains the core providers and styles that are used in the top level app.tsx

- **`app/providers`**
  > StoreProvider, BrowserRouter and etc

- **`app/styles`**
  > Global styles

- **`components`**
    > All components that are presentational

- **`containers`**
  > All components that contain the business logic of the application

- **`layouts`**
  > Contains the app layouts

- **`pages`**
    > Contains all components that represent a React Route

- **`shared`**
  > Contains reusable things

- **`shared/api`**
  > Axios (or other http-client) instance

- **`shared/assets`**
  > Contains the project’s assets that are used throughout the application

- **`shared/config`**
  > Contains some configs. For example: react-router config

- **`shared/constants`**
  > Contains app constants. For example: local storage key

- **`shared/lib`**
  > Contains utility functions that are used throughout the application

- **`shared/ui`**
  > Contains UI kit components (Button, Selector and etc)

- **`store`**
  > Contains the state for global client-side data management

- **`store/selectors`**
  > Contains selectors

- **`store/services`**
  > Contains async actions (AsyncThunk)

- **`store/slices`**
  > Contains slices

- **`store/types`**
  > Contains types for store
