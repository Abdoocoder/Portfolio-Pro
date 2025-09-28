import { getFirestore, collection, getDocs, limit, query } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { app } from './firebase';

export async function checkFirestoreConnection(): Promise<boolean> {
  try {
    // محاولة قراءة وثيقة واحدة من أي مجموعة للتحقق من الاتصال
    const db = getFirestore(app);
    const testQuery = query(collection(db, 'any_collection'), limit(1));
    await getDocs(testQuery);
    console.log('تم الاتصال بـ Firestore بنجاح');
    return true;
  } catch (error) {
    console.error('خطأ في الاتصال بـ Firestore:', error);
    return false;
  }
}

export function getFirebaseErrorMessage(error: any): string {
  // ترجمة رسائل خطأ Firebase الشائعة
  const errorCode = error?.code || '';
  switch (errorCode) {
    case 'auth/invalid-api-key':
      return 'مفتاح API غير صالح';
    case 'auth/invalid-credential':
      return 'بيانات اعتماد غير صالحة';
    case 'auth/network-request-failed':
      return 'فشل في الاتصال بالشبكة';
    case 'auth/operation-not-allowed':
      return 'العملية غير مسموح بها';
    case 'auth/user-disabled':
      return 'تم تعطيل حساب المستخدم';
    case 'auth/user-not-found':
      return 'لم يتم العثور على المستخدم';
    case 'auth/wrong-password':
      return 'كلمة المرور غير صحيحة';
    case 'permission-denied':
      return 'تم رفض الإذن للوصول إلى Firestore';
    default:
      return error?.message || 'حدث خطأ غير معروف';
  }
}