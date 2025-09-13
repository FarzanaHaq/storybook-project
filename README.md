# Frontend Assignment – React Components

This project contains two reusable UI components built with **React**, **TypeScript**, **TailwindCSS**, and documented with **Storybook**.  
The goal of the assignment is to create scalable, typed, and tested components that can be reused in modern frontend applications.

---

## 🚀 Tech Stack
- **React** (UI library)
- **TypeScript** (static typing)
- **TailwindCSS** (utility-first styling)
- **Storybook** (component documentation)
- **Jest + React Testing Library** (unit tests)
- **Vite** (development bundler)

---

## 📂 Project Structure

src/
├── components/
│ ├── InputField/
│ │ ├── InputField.tsx 
│ │ ├── InputField.stories.tsx 
│ │ ├── InputField.constants.ts
│ │ └── index.ts 
│ │
│ ├── DataTable/
│ │ ├── DataTable.tsx
│ │ ├── DataTable.stories.tsx
│ │ ├── DataTable.constants.ts
│ │ └── index.ts
│ │
│ └── Form.tsx
│ |__ Table.tsx
|
│── App.tsx
└── main.css 



---

## 🎯 Components

### 1. InputField
A flexible input component with:
- Variants: **filled, outlined, ghost**
- Sizes: **sm, md, lg**
- States: **disabled, invalid, loading**
- Features: label, placeholder, helper text, error message  
- Optional: clear button, password toggle

### 2. DataTable
A simple, reusable table with:
- Column sorting
- Row selection (single/multiple)
- Loading and empty states
- Generic typing (`DataTable<T>`)

---

## 📖 Storybook

Run Storybook to explore the components interactively:

```bash
npm run storybook


## Setup & Installation 

Clone the repo:

```
git clone https://github.com/your-username/frontend-assignment.git
cd frontend-assignment

```

Install dependencies:

```
npm install

```

Start the development server:

```
npm run dev

```