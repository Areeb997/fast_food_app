import { ID } from "react-native-appwrite";
import { appwriteConfig, database, storage } from "./appwrite";
import dummyData from "./Data";

interface Category {
    name: string;
    description: string;
}

interface Customization {
    name: string;
    price: number;
    type: "topping" | "side" | "size" | "crust" | string;
}

interface MenuItem {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    category_name: string;
    customizations: string[];
}

interface DummyData {
    categories: Category[];
    customizations: Customization[];
    menu: MenuItem[];
}

const data = dummyData as DummyData;

async function clearAll(collectionId: string): Promise<void> {
    try {
        const list = await database.listDocuments(
            appwriteConfig.databaseId,
            collectionId
        );

        if (list.documents.length > 0) {
            await Promise.all(
                list.documents.map((doc) =>
                    database.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
                )
            );
        }
    } catch (error) {
        console.log(`No documents to clear in ${collectionId} or error:`, error);
    }
}

async function clearStorage(): Promise<void> {
    try {
        const list = await storage.listFiles(appwriteConfig.BucketID);
        
        if (list.files.length > 0) {
            await Promise.all(
                list.files.map((file) =>
                    storage.deleteFile(appwriteConfig.BucketID, file.$id)
                )
            );
        }
    } catch (error) {
        console.log("No files to clear in storage or error:", error);
    }
}

async function uploadImageToStorage(imageUrl: string): Promise<string> {
    try {
        const response = await fetch(imageUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        
        const blob = await response.blob();
        const fileName = imageUrl.split("/").pop() || `file-${Date.now()}.jpg`;

        // For React Native, we need to create a proper file object
        const fileObj = {
            name: fileName,
            type: blob.type || 'image/jpeg',
            size: blob.size,
            uri: imageUrl,
        };

        const file = await storage.createFile(
            appwriteConfig.BucketID,
            ID.unique(),
            fileObj
        );

        return storage.getFileViewURL(appwriteConfig.BucketID, file.$id);
    } catch (error) {
        console.error(`Failed to upload image ${imageUrl}:`, error);
        // Return original URL as fallback
        return imageUrl;
    }
}

async function seed(): Promise<void> {
    try {
        console.log("🌱 Starting database seeding...");

        // // 1. Clear all existing data
        // console.log("🧹 Clearing existing data...");
        // await clearAll(appwriteConfig.CategoriesCollectionId);
        // await clearAll(appwriteConfig.CustomizationCollectionId); // Fixed typo
        // await clearAll(appwriteConfig.MenuCollectionId);
        // await clearAll(appwriteConfig.MenuCustomizationCollectionId);
        // await clearStorage();

        // 2. Create Categories
        console.log("📂 Creating categories...");
        const categoryMap: Record<string, string> = {};
        for (const cat of data.categories) {
            const doc = await database.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.CategoriesCollectionId,
                ID.unique(),
                {
                    name: cat.name,
                    description: cat.description,
                }
            );
            categoryMap[cat.name] = doc.$id;
        }

        // 3. Create Customizations
        console.log("⚙️ Creating customizations...");
        const customizationMap: Record<string, string> = {};
        for (const cus of data.customizations) {
            const doc = await database.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.CustomizationCollectionId, // Fixed typo
                ID.unique(),
                {
                    name: cus.name,
                    price: cus.price,
                    type: cus.type,
                }
            );
            customizationMap[cus.name] = doc.$id;
        }

        // 4. Create Menu Items
        console.log("🍕 Creating menu items...");
        const menuMap: Record<string, string> = {};
        for (const item of data.menu) {
            console.log(`  Processing: ${item.name}`);
            
            // Upload image
            const uploadedImage = await uploadImageToStorage(item.image_url);

            // Create menu item
            const doc = await database.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.MenuCollectionId,
                ID.unique(),
                {
                    name: item.name,
                    description: item.description,
                    image_url: uploadedImage,
                    price: item.price,
                    rating: item.rating,
                    calories: item.calories,
                    protein: item.protein,
                    categories: categoryMap[item.category_name], // Make sure this matches your schema
                }
            );

            menuMap[item.name] = doc.$id;

            // 5. Create menu_customizations relationships
            for (const cusName of item.customizations) {
                if (customizationMap[cusName]) {
                    await database.createDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.MenuCustomizationCollectionId,
                        ID.unique(),
                        {
                            menu: doc.$id,
                            customization: customizationMap[cusName],
                        }
                    );
                } else {
                    console.warn(`⚠️ Customization '${cusName}' not found for menu item '${item.name}'`);
                }
            }
        }

        console.log("✅ Seeding complete!");
        
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        throw error;
    }
}

export default seed;