// Types and interfaces
interface Document {
  id: string;
  [key: string]: any;
}

interface QueryOptions {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: (doc: Document) => boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}

// Mock API Service Class
class FastApiMock {
  private storagePrefix = 'fast_api_mock_';
  private collectionsKey = 'fast_api_collections';

  constructor() {
    this.ensureCollectionsIndex();
  }

  // Ensure collections index exists
  private ensureCollectionsIndex(): void {
    if (!localStorage.getItem(this.collectionsKey)) {
      localStorage.setItem(this.collectionsKey, JSON.stringify([]));
    }
  }

  // Get all collection names
  private getCollections(): string[] {
    const collections = localStorage.getItem(this.collectionsKey);
    return collections ? JSON.parse(collections) : [];
  }

  // Add collection to index
  private addCollection(name: string): void {
    const collections = this.getCollections();
    if (!collections.includes(name)) {
      collections.push(name);
      localStorage.setItem(this.collectionsKey, JSON.stringify(collections));
    }
  }

  // Remove collection from index
  private removeCollection(name: string): void {
    const collections = this.getCollections();
    const filtered = collections.filter(c => c !== name);
    localStorage.setItem(this.collectionsKey, JSON.stringify(filtered));
  }

  // Get storage key for collection
  private getStorageKey(collection: string): string {
    return `${this.storagePrefix}${collection}`;
  }

  // Get all documents from a collection
  private getCollectionData(collection: string): Document[] {
    const data = localStorage.getItem(this.getStorageKey(collection));
    return data ? JSON.parse(data) : [];
  }

  // Save collection data
  private saveCollectionData(collection: string, documents: Document[]): void {
    localStorage.setItem(this.getStorageKey(collection), JSON.stringify(documents));
    this.addCollection(collection);
  }

  // Generate UUID
  private generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Apply query options
  private applyQueryOptions(documents: Document[], options: QueryOptions = {}): Document[] {
    let result = [...documents];

    // Apply filter
    if (options.filter) {
      result = result.filter(options.filter);
    }

    // Apply sorting
    if (options.sortBy) {
      result.sort((a, b) => {
        const aVal = a[options.sortBy!];
        const bVal = b[options.sortBy!];

        if (aVal < bVal) return options.sortOrder === 'desc' ? 1 : -1;
        if (aVal > bVal) return options.sortOrder === 'desc' ? -1 : 1;
        return 0;
      });
    }

    // Apply pagination
    const offset = options.offset || 0;
    const limit = options.limit;

    if (limit) {
      result = result.slice(offset, offset + limit);
    } else if (offset > 0) {
      result = result.slice(offset);
    }

    return result;
  }

  // CREATE - Add new document
  async create(collection: string, data: Omit<Document, 'id'>): Promise<ApiResponse<Document>> {
    try {
      const documents = this.getCollectionData(collection);
      const newDocument: Document = {
        id: this.generateId(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      documents.push(newDocument);
      this.saveCollectionData(collection, documents);

      return {
        success: true,
        data: newDocument
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to create document: ${error}`
      };
    }
  }

  // READ - Get document by ID
  async getById(collection: string, id: string): Promise<ApiResponse<Document>> {
    try {
      const documents = this.getCollectionData(collection);
      const document = documents.find(doc => doc.id === id);

      if (!document) {
        return {
          success: false,
          error: `Document with id ${id} not found`
        };
      }

      return {
        success: true,
        data: document
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to get document: ${error}`
      };
    }
  }

  // READ - Get all documents with optional query
  async getAll(collection: string, options: QueryOptions = {}): Promise<ApiResponse<Document[]>> {
    try {
      const documents = this.getCollectionData(collection);
      const totalCount = documents.length;
      const result = this.applyQueryOptions(documents, options);

      return {
        success: true,
        data: result,
        count: totalCount
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to get documents: ${error}`
      };
    }
  }

  // UPDATE - Update document by ID
  async update(collection: string, id: string, data: Partial<Document>): Promise<ApiResponse<Document>> {
    try {
      const documents = this.getCollectionData(collection);
      const index = documents.findIndex(doc => doc.id === id);

      if (index === -1) {
        return {
          success: false,
          error: `Document with id ${id} not found`
        };
      }

      const updatedDocument = {
        ...documents[index],
        ...data,
        id, // Ensure ID cannot be changed
        updatedAt: new Date().toISOString()
      };

      documents[index] = updatedDocument;
      this.saveCollectionData(collection, documents);

      return {
        success: true,
        data: updatedDocument
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to update document: ${error}`
      };
    }
  }

  // DELETE - Delete document by ID
  async delete(collection: string, id: string): Promise<ApiResponse<boolean>> {
    try {
      const documents = this.getCollectionData(collection);
      const index = documents.findIndex(doc => doc.id === id);

      if (index === -1) {
        return {
          success: false,
          error: `Document with id ${id} not found`
        };
      }

      documents.splice(index, 1);
      this.saveCollectionData(collection, documents);

      return {
        success: true,
        data: true
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to delete document: ${error}`
      };
    }
  }

  // UTILITY - Clear entire collection
  async clearCollection(collection: string): Promise<ApiResponse<boolean>> {
    try {
      localStorage.removeItem(this.getStorageKey(collection));
      this.removeCollection(collection);

      return {
        success: true,
        data: true
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to clear collection: ${error}`
      };
    }
  }

  // UTILITY - Get all collections
  async getCollectionNames(): Promise<ApiResponse<string[]>> {
    try {
      return {
        success: true,
        data: this.getCollections()
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to get collections: ${error}`
      };
    }
  }

  // UTILITY - Clear entire storage
  async clearAll(): Promise<ApiResponse<boolean>> {
    try {
      const collections = this.getCollections();
      collections.forEach(collection => {
        localStorage.removeItem(this.getStorageKey(collection));
      });
      localStorage.removeItem(this.collectionsKey);

      return {
        success: true,
        data: true
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to clear all data: ${error}`
      };
    }
  }
}

// Export singleton instance
export const apiMock = new FastApiMock();

// Usage examples:

// Create documents
/*
await apiMock.create('users', {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});

await apiMock.create('posts', {
  title: 'My First Post',
  content: 'This is the content of my first post',
  authorId: 'user-123'
});
*/

// Read operations
/*
// Get all users
const allUsers = await apiMock.getAll('users');

// Get users with pagination and sorting
const paginatedUsers = await apiMock.getAll('users', {
  limit: 10,
  offset: 0,
  sortBy: 'name',
  sortOrder: 'asc'
});

// Get users with filter
const filteredUsers = await apiMock.getAll('users', {
  filter: (user) => user.age > 25
});

// Get specific user
const user = await apiMock.getById('users', 'user-id');
*/

// Update operations
/*
await apiMock.update('users', 'user-id', {
  name: 'Jane Doe',
  age: 31
});
*/

// Delete operations
/*
await apiMock.delete('users', 'user-id');
*/

// Utility operations
/*
// Clear entire collection
await apiMock.clearCollection('users');

// Get all collection names
const collections = await apiMock.getCollectionNames();

// Clear all data
await apiMock.clearAll();
*/