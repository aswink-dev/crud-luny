# 📦 @aswink-dev/crud-luny

[![npm version](https://img.shields.io/npm/v/@aswink-dev/crud-luny.svg)](https://www.npmjs.com/package/@aswink-dev/crud-luny)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A lightweight, intuitive utility library for seamless Data & File CRUD operations in Node.js and Next.js applications.

---

## 🚀 Features

* **⚡ Simple Data CRUD:** Manage in-memory or database entities with clean, predictable APIs.
* **📁 New: File CRUD Operations:** Create, read, update, stream, and delete local files with minimal boilerplate.
* **🔒 Type Safe:** Built with TypeScript for auto-completion and compile-time checks.
* **🌐 Next.js & Node.js Ready:** Smooth integration with server actions, API routes, or standard backend services.

---

## 📦 Installation

```bash
# Using npm
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
Distributed under the MIT License. See LICENSE for more information.


