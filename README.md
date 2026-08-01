# @aswink-dev/crud-luny

> A lightweight, zero-dependency in-memory CRUD engine and file management utility designed for rapid Next.js prototyping and full-stack Node.js applications.

[![npm version](https://img.shields.io/npm/v/@aswink-dev/crud-luny.svg?color=blue)](https://www.npmjs.com/package/@aswink-dev/crud-luny)
[![license](https://img.shields.io/npm/l/@aswink-dev/crud-luny.svg)](LICENSE)

---

## 🚀 Overview

Setting up database schemas and writing repetitive `fs`/`path` streams just to build a prototype or test full-stack features slows down development. 

`@aswink-dev/crud-luny` provides:
- **`CrudLuny`**: An instant, zero-config in-memory collection engine for managing data without setting up external databases.
- **`FileLuny`**: A simplified file-handling layer built to streamline file uploads, extension checks, and directory management in Next.js Server Actions.

---

## 📦 Installation

```bash
npm install @aswink-dev/crud-luny

# Using yarn
yarn add @aswink-dev/crud-luny

# Using pnpm
pnpm add @aswink-dev/crud-luny


⚡ Quick Start
1. Data CRUD Operations

import { CrudLuny } from '@aswink-dev/crud-luny';

// Initialize collection
const users = new CrudLuny<User>('users');

// Create
const newUser = await users.create({ name: 'Aswin', role: 'Developer' });

// Read
const allUsers = await users.findMany();
const user = await users.findById(newUser.id);

// Update
const updated = await users.update(newUser.id, { role: 'Full-Stack Developer' });

// Delete
await users.delete(newUser.id);

2. File CRUD Operations 🆕
Easily manage file storage operations directly through crud-luny:

import { FileLuny } from '@aswink-dev/crud-luny';

const storage = new FileLuny({ uploadDir: './uploads' });

// 📄 Create / Save File
const file = await storage.saveFile({
  filename: 'document.pdf',
  content: bufferOrString,
});

// 📖 Read / Get File Info
const fileData = await storage.getFile('document.pdf');

// ✏️ Update / Replace File
await storage.updateFile('document.pdf', newBufferContent);

// 🗑️ Delete File
await storage.deleteFile('document.pdf');

### 3. MongoDB Integration

Pass a MongoDB connection or URI to handle document-based CRUD operations:

```typescript
import { CrudLuny } from '@aswink-dev/crud-luny';

// Connect using MongoDB adapter
const posts = new CrudLuny({
  provider: 'mongodb',
  uri: process.env.MONGODB_URI,
  collection: 'posts'
});

// Perform MongoDB CRUD
const newPost = await posts.create({ title: 'Hello World', content: 'CRUD Luny with MongoDB!' });
const allPosts = await posts.findMany({ status: 'published' });


🤝 Contributing
Contributions, issues, and feature requests are welcome!

📜 License
MIT © Aswin K


