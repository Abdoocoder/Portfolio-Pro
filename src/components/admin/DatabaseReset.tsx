import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { resetDatabase } from "@/lib/db-reset";
import { useState } from "react";

export default function DatabaseReset() {
  const [isResetting, setIsResetting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    if (!window.confirm('هل أنت متأكد من أنك تريد إعادة تعيين قاعدة البيانات؟ سيتم حذف جميع البيانات.')) {
      return;
    }

    setIsResetting(true);
    setError(null);
    setSuccess(false);

    try {
      await resetDatabase();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير معروف');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إعادة تعيين قاعدة البيانات</CardTitle>
        <CardDescription>
          سيؤدي هذا الإجراء إلى حذف جميع البيانات الحالية وإعادة تهيئة قاعدة البيانات بالإعدادات الافتراضية.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="destructive"
          onClick={handleReset}
          disabled={isResetting}
        >
          {isResetting ? 'جاري إعادة التعيين...' : 'إعادة تعيين قاعدة البيانات'}
        </Button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-4 bg-green-50 text-green-600 rounded-md">
            تم إعادة تعيين قاعدة البيانات بنجاح
          </div>
        )}
      </CardContent>
    </Card>
  );
}