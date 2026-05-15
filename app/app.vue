<script setup lang="ts">
const route = useRoute();
const router = useRouter();

// 1. สร้างตัวแปร Cookie เพื่อเก็บ Session (ตั้งชื่อ key ว่า 'user_session')
// maxAge: 60 * 60 * 8 คือให้อยู่ได้ 8 ชั่วโมง (หน่วยเป็นวินาที)
const userSession = useCookie("user_session", { maxAge: 60 * 60 * 8 });

onMounted(() => {
  // 2. เช็คว่ามี Query Parameter ส่งมาจาก URL หรือไม่
  if (route.query.empno && route.query.username) {
    //เช็คค่าและล้าง session
    if (userSession.value && userSession.value.empno !== route.query.empno) {
      userSession.value = null; // clear ของเก่า
    }

    // 3. บันทึกข้อมูลลง Cookie (เปรียบเสมือน $_SESSION['...'] = ...)
    userSession.value = {
      username: route.query.username as string,
      empno: route.query.empno as string,
      department: route.query.department as string,
      permission: route.query.USE_PERMISSION as string,
      section: route.query.sec as string,
      msect_id: route.query.MSECT_ID as string,
    };

    console.log("Session Created:", userSession.value);

    // 4. (Optional) คลีน URL ให้สวยงาม (ลบ Query String ออกไม่ให้รก)
    // เปลี่ยนจาก .../?username=PAKORN... เป็น .../ เฉยๆ
    router.replace({ query: {} });
  }

  // กรณีไม่มี Query (User กด Refresh หรือเข้ามาตรงๆ)
  // เราก็จะใช้ค่าเดิมที่อยู่ใน userSession (Cookie) ได้เลย
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
