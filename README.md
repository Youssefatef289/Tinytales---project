# TinyTales Authentication System

نظام مصادقة كامل مبني باستخدام Next.js 14 (App Router) مع TypeScript و Tailwind CSS.

## المميزات

- ✅ تسجيل حساب جديد (Register)
- ✅ تسجيل الدخول (Login)
- ✅ تفعيل الحساب (Verify Account)
- ✅ لوحة تحكم محمية (Protected Dashboard)
- ✅ حماية الصفحات باستخدام Middleware
- ✅ التحقق من البيانات باستخدام Zod
- ✅ إدارة النماذج باستخدام React Hook Form
- ✅ معالجة الأخطاء وحالات التحميل
- ✅ تصميم متجاوب (Responsive Design)

## التقنيات المستخدمة

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Axios** للاتصال بالـ API
- **React Hook Form** لإدارة النماذج
- **Zod** للتحقق من البيانات
- **ESLint & Prettier** للجودة والتنظيم

## التثبيت

1. تثبيت الحزم:

```bash
npm install
```

2. تشغيل المشروع في وضع التطوير:

```bash
npm run dev
```

3. فتح المتصفح على:

```
http://localhost:3000
```

## البنية

```
├── app/
│   ├── dashboard/      # صفحة لوحة التحكم (محمية)
│   ├── login/          # صفحة تسجيل الدخول
│   ├── register/       # صفحة التسجيل
│   ├── verify/         # صفحة تفعيل الحساب
│   ├── layout.tsx      # التخطيط الرئيسي
│   ├── page.tsx        # الصفحة الرئيسية
│   └── globals.css     # الأنماط العامة
├── components/
│   └── ui/             # المكونات المشتركة
│       ├── Input.tsx
│       ├── Button.tsx
│       └── Alert.tsx
├── lib/
│   ├── api/            # طبقة API
│   │   ├── client.ts   # إعداد Axios
│   │   └── auth.ts     # دوال المصادقة
│   ├── types/          # أنواع TypeScript
│   ├── utils/          # أدوات مساعدة
│   └── constants.ts    # الثوابت
├── middleware.ts       # Middleware لحماية الصفحات
└── package.json
```

## API Endpoints

المشروع متصل بـ API الأساسي:

**Base URL:** `https://tinytales.trendline.marketing/api`

### Endpoints المستخدمة:

- `POST /auth/register` - تسجيل حساب جديد
- `POST /auth/login` - تسجيل الدخول
- `POST /auth/verify-email` - تفعيل الحساب
- `GET /auth/user-data` - بيانات المستخدم
- `POST /auth/logout` - تسجيل الخروج

## تدفق المصادقة

1. **التسجيل (Register)**
   - المستخدم يملأ النموذج (الاسم، البريد، الهاتف، كلمة المرور)
   - يتم التحقق من البيانات على الواجهة
   - يتم إرسال الطلب إلى API
   - عند النجاح، يتم حفظ Token وتحويل المستخدم إلى صفحة التفعيل

2. **التفعيل (Verify)**
   - المستخدم يدخل كود التفعيل (123456 للاختبار)
   - يتم التحقق من الكود
   - عند النجاح، يتم تحويل المستخدم إلى صفحة تسجيل الدخول

3. **تسجيل الدخول (Login)**
   - المستخدم يدخل البريد وكلمة المرور
   - يتم حفظ Token واسم المستخدم في localStorage
   - يتم تحويل المستخدم إلى Dashboard

4. **لوحة التحكم (Dashboard)**
   - صفحة محمية تتطلب تسجيل الدخول
   - تعرض رسالة ترحيب باسم المستخدم
   - تحتوي على زر تسجيل الخروج

## الحماية

- **Middleware**: يتحقق من الصفحات المحمية
- **Client-side Protection**: كل صفحة محمية تتحقق من وجود Token
- **Token Storage**: يتم حفظ Token في localStorage
- **Auto Redirect**: إعادة التوجيه التلقائي عند عدم وجود Token

## النشر على Vercel

1. ادفع الكود إلى GitHub
2. اربط المستودع مع Vercel
3. Vercel سيكتشف Next.js تلقائياً
4. اضغط Deploy

أو باستخدام CLI:

```bash
npm i -g vercel
vercel
```

## ملاحظات

- كود التفعيل للاختبار: `123456`
- يتم حفظ Token في localStorage
- جميع الصفحات متجاوبة مع الموبايل والكمبيوتر

## التطوير

```bash
# التطوير
npm run dev

# البناء
npm run build

# التشغيل
npm start

# فحص الكود
npm run lint
```

## الترخيص

هذا المشروع مخصص للاستخدام في مهمة TinyTales.

