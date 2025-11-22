# Invoice Generator

A React application built with Vite that allows users to create invoices/quotations with client information and item details, then generate and download PDFs.

## Features

- **Multi-step Form**:

  - Step 1: Enter client information
  - Step 2: Add multiple items with particulars, dimensions, and rates
  - Step 3: Preview and generate PDF

- **PWA Support**: Progressive Web App capabilities for offline use
- **Responsive Design**: Works on desktop and mobile devices
- **PDF Generation**: Generate professional PDF invoices with client details and itemized list
- **Auto-calculations**: Automatic calculation of totals based on height, width, and rate

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. Enter client information (name, address, phone, email, date)
2. Click "Next" to proceed
3. Add items with particulars, height, width, and rate per sq/ft
4. Use "Add New Item" to add more items
5. Click "Finish" when done
6. Review the preview
7. Click "Generate PDF" to download the invoice

## Technologies

- React 18
- Vite
- Ant Design UI components
- jsPDF & jspdf-autotable for PDF generation
- html2pdf.js for high-quality PDF generation
- PWA plugin for offline support

## PWA Features

The application works as a Progressive Web App (PWA):

- **Offline Support**: Service worker caches all assets for offline use
- **Installable**: Can be installed on mobile devices and desktop
- **Auto-update**: Service worker automatically updates when new version is available
- **Fast Loading**: Assets are cached for faster subsequent loads

### Testing PWA

1. Build the application: `npm run build`
2. Preview the build: `npm run preview`
3. Open in browser and check:
   - Service worker should be registered (check DevTools > Application > Service Workers)
   - Install prompt should appear (on supported browsers)
   - Works offline after first load
