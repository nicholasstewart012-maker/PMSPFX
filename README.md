# Property Management Directory SPFx Web Part

A modern SharePoint Framework (SPFx) web part for managing property locations.

## Features
- **Dashboard**: Summary statistics for locations.
- **Filtering**: Filter by State (cascading to Branch) and Search.
- **Results Grid**: Sortable, paginated list of locations.
- **Details Drawer**: View full location details.
- **Blueprint Viewer**: Inline PDF viewer for blueprints.
- **Mock Data**: Built-in mock mode for local development.

## Prerequisites
- Node.js v18 (Recommended) or v16.
  - *Note: Project scaffolded with Node v22 compatibility in mind, but SPFx generally prefers LTS versions.*
- Gulp CLI: `npm install --global gulp-cli`
- SharePoint Online Tenant (for production).

## Installation

1. Clone or download the repository.
2. Navigate to the project directory:
   ```bash
   cd spfx-property-management-directory
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Local Testing (Mock Mode)

You can test the web part locally without a SharePoint connection using Mock Data mode.

1. Run the local workbench:
   ```bash
   gulp serve
   ```
2. Open the browser to the local workbench URL (usually `https://localhost:4321/temp/workbench.html`).
3. Add the **PropertyManagementDirectory** web part.
4. Ensure **Enable Mock Data** is checked in the property pane (it is by default).
   - Mock data will load 20 sample locations.
   - Blueprints use a sample public PDF URL.

## SharePoint Setup

For production use, you must create the required Lists and Libraries.

### 1. Branch Locations (List)
Create a Custom List named `Branch Locations` with the following columns:

| Column Name | Type | Note |
|---|---|---|
| Title | Single line of text | Renamed from default Title |
| State | Single line of text | |
| Branch | Single line of text | |
| Street | Single line of text | |
| City | Single line of text | |
| Zip | Single line of text | |
| Country | Single line of text | |
| Contact | Single line of text | |
| Phone | Single line of text | |
| DistrictManager | Single line of text | |
| Active | Yes/No | |
| Latitude | Number | |
| Longitude | Number | |
| BuildingSqft | Number | |
| LotSqft | Number | |
| ParkingSpots | Number | |
| YearBuilt | Number | |
| BlueprintUrl | Hyperlink | Link to document |
| FloorplanUrl | Hyperlink | Link to document |
| DocsFolderUrl | Hyperlink | Link to folder |

### 2. Branch Documents (Library)
Create a Document Library named `Branch Documents`.
- Upload your PDF blueprints here.
- Copy the link to the file and add it to the `BlueprintUrl` column in the list item.

## Deployment

1. **Build the solution**:
   ```bash
   npm run build
   # OR if gulp is installed
   gulp clean
   gulp build --ship
   ```

2. **Package the solution**:
   ```bash
   gulp bundle --ship
   gulp package-solution --ship
   ```

3. **Deploy**:
   - Locate the package at `sharepoint/solution/spfx-property-management-directory.sppkg`.
   - Upload it to your Tenant App Catalog.
   - Deploy/Trust the app.
   - Add the app to your site content.
   - Add the web part to a page.

4. **Configure**:
   - Edit the web part properties.
   - Set **List Title** to `Branch Locations`.
   - Uncheck **Enable Mock Data**.

## Troubleshooting
- **PDF Viewer**: The inline viewer uses `react-pdf`. If PDFs fail to load, ensure CORS is configured on the source (if external) or that the user has permission to view the file in SharePoint.
- **Styles**: The web part uses Fluent UI. Ensure the page has context.
- **IDE Errors**: If you see "Cannot find module" errors in VS Code despite a successful build:
  1. Run `npm install` again.
  2. Restart VS Code or the TypeScript server (Ctrl+Shift+P > "TypeScript: Restart TS Server").