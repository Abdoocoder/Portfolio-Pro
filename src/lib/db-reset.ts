import { collection, getDocs, deleteDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const collections = ['settings', 'projects', 'skills', 'experiences', 'education', 'admins'];

async function checkFirebaseConnection() {
  try {
    // محاولة الوصول إلى مجموعة الإعدادات للتحقق من الاتصال
    const settingsRef = collection(db, 'settings');
    await getDocs(settingsRef);
    return true;
  } catch (error) {
    console.error('فشل الاتصال بـ Firebase:', error);
    return false;
  }
}

export async function resetDatabase() {
  try {
    // التحقق من الاتصال أولاً
    const isConnected = await checkFirebaseConnection();
    if (!isConnected) {
      throw new Error('لا يمكن الاتصال بقاعدة البيانات. تأكد من صحة التكوين وأذونات الوصول.');
    }

    // حذف جميع المستندات من كل مجموعة
    for (const collectionName of collections) {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const deletePromises = querySnapshot.docs.map((doc) => 
        deleteDoc(doc.ref)
      );
      await Promise.all(deletePromises);
      console.log(`تم حذف جميع المستندات من مجموعة ${collectionName}`);
    }

    // إنشاء الهيكل الأساسي للقاعدة
    await initializeDatabase();
    
    console.log('تم إعادة تعيين قاعدة البيانات بنجاح');
  } catch (error) {
    console.error('حدث خطأ أثناء إعادة تعيين قاعدة البيانات:', error);
    throw error;
  }
}

export async function initializeDatabase() {
  try {
    // إنشاء المجموعات والمستندات الأساسية
    const initialData = {
      settings: {
        site: {
          title: 'Portfolio Pro',
          description: 'موقع المطور المحترف',
          language: 'ar',
          theme: 'light',
          contact: {
            email: '',
            phone: '',
            location: ''
          }
        }
      },
      projects: [],
      skills: [],
      experiences: [],
      education: []
    };

    // إضافة البيانات الأولية
    for (const [collectionName, data] of Object.entries(initialData)) {
      if (Array.isArray(data)) {
        continue; // نتخطى المصفوفات الفارغة
      }
      const collectionRef = collection(db, collectionName);
      for (const [docId, docData] of Object.entries(data)) {
        await setDoc(doc(collectionRef, docId), {
          ...docData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
    }

    console.log('تم تهيئة قاعدة البيانات بنجاح');
  } catch (error) {
    console.error('حدث خطأ أثناء تهيئة قاعدة البيانات:', error);
    throw error;
  }
}