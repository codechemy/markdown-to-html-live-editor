# Markdown Editor

Markdown Editor is a real-time Markdown editor that allows users to type Markdown syntax and see the rendered HTML in a live preview pane. The project consists of a Node.js backend for Markdown to HTML conversion and a React frontend for the user interface.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Setup](#setup)
  - [Backend](#backend-setup)
  - [Frontend](#frontend-setup)

## Overview

The Markdown Editor project provides a simple yet powerful Markdown editing experience. It features a real-time preview of the HTML output as users type Markdown syntax. The backend, powered by Node.js, handles the Markdown to HTML conversion, while the frontend, built with React, provides the user interface.

## Features

- Real-time Markdown to HTML conversion.
- Separate live preview pane.
- Syntax highlighting (optional).
- Efficient backend processing.
- Stateless application (no database required).

## Setup

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/markdown-editor.git
   cd markdown-editor

2. **Install dependencies:**
   ```bash
   cd Backend
   npm install

3. **Run the backend server:**
   ```bash
   npm run start

The backend server will be running at http://localhost:3001.

### Frontend Setup

1. **Install Vite globally**
   ```bash
   npm install -g create-vite

2. **Create a new Vite project**
   ```bash
   create-vite Frontend --template react

3. **Navigate to the frontend directory and install dependencies:**
   ```bash
   cd Frontend
   npm install

4. **Run the frontend development server:**
   ```bash
   npm run dev

The frontend development server will be running at http://localhost:5173.
