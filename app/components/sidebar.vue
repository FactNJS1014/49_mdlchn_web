<!-- <template>
  <v-navigation-drawer app permanent color="blue-lighten-5">
    <v-list density="comfortable" nav>
      <v-list-item
        v-for="m in filteredMenu"
        :key="m.id"
        :to="m.to"
        router
        exact
        :active="activemenu === m.to"
        @click="toggleMenu(m.to)"
        :color="activemenu === m.to ? 'light-blue-darken-4' : undefined"
        variant="tonal"
      >
        <template #prepend>
          <v-icon :icon="m.icon"></v-icon>
        </template>
        <template #title>
          <p class="font-semibold text-md">{{ m.label }}</p>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template> -->

<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    color="blue-lighten-5"
    :expand-on-hover="isRail"
    :rail="isRail"
  >
    <v-list density="comfortable" nav>
      <v-list-item
        v-for="m in filteredMenu"
        :key="m.id"
        :to="m.to"
        exact
        :active="activemenu === m.to"
        @click="handleMenuClick(m.to)"
        :color="activemenu === m.to ? 'light-blue-darken-4' : undefined"
        variant="tonal"
      >
        <template #prepend>
          <v-icon :icon="m.icon"></v-icon>
        </template>
        <template #title>
          <p class="font-semibold text-md">{{ m.label }}</p>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar d-md-none @click="drawer = !drawer">
    <v-btn icon="mdi-gesture-two-double-tap"></v-btn>
    <v-toolbar-title>Menu sidebar Model Change System</v-toolbar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

/**
 * todo : sizebar zone ----- start
 */
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay(); // เช็คว่าหน้าจอขนาดกลางขึ้นไปหรือไม่
const drawer = ref(true); // สถานะเปิด/ปิด
const isRail = ref(false); // สถานะย่อเมนูเหลือแต่ไอคอน (Optional)

// ถ้าหน้าจอเล็ก ให้ปิด drawer ไว้ก่อน
onMounted(() => {
  if (!mdAndUp.value) {
    drawer.value = false;
  }
});

const handleMenuClick = (to) => {
  toggleMenu(to); // ฟังก์ชันเดิมของคุณ
  // ถ้าหน้าจอเล็ก เมื่อกดเมนูแล้วให้ปิด Sidebar อัตโนมัติ
  if (!mdAndUp.value) {
    drawer.value = false;
  }
};
/**
 * todo : sizebar zone ----- end
 */

const route = useRoute();
const router = useRouter();

const activemenu = ref(route.path);
const userSession = useCookie("user_session");

const empCode = computed(() => {
  return userSession.value?.empno;
});

console.log(empCode.value);

watch(
  () => route.path,
  (newPath) => {
    activemenu.value = newPath;
  },
);

const toggleMenu = (menuPath: string) => {
  activemenu.value = menuPath;
};

// 🌟 เพิ่มคุณสมบัติ 'permission' เข้าไปในแต่ละเมนู
const menu = ref([
  {
    id: 1,
    icon: "mdi mdi-numeric-1-box",
    to: "/",
    label: "แบบฟอร์ม Operator",
    permission: [1, 3, 7, 9],
  },
  {
    id: 2,
    icon: "mdi mdi-numeric-2-box",
    to: "/tech_record",
    label: "แบบฟอร์ม Technichian",
    permission: [2, 4, 7, 9],
  },
  {
    id: 3,
    icon: "mdi mdi-file-document-check",
    to: "/dataApp",
    label: "อนุมัติ CP Process",
    permission: [2, 6, 7, 9],
  },
  {
    id: 4,
    icon: "mdi mdi-file-document-check",
    to: "/dataRf",
    label: "อนุมัติ RF Process",
    permission: [2, 6, 7, 9],
  },
  {
    id: 5,
    icon: "mdi mdi-chart-box",
    to: "/report",
    label: "Report CP Process",
    permission: [6, 7, 8, 9],
  },
  {
    id: 6,
    icon: "mdi mdi-chart-box",
    to: "/report2",
    label: "Report RF Process",
    permission: [6, 7, 8, 9],
  },
  {
    id: 7,
    icon: "mdi mdi-cog-box",
    to: "/settingsMaster",
    label: "Settings",
    permission: [5, 7, 9],
  },
  {
    id: 8,
    icon: "mdi mdi-database-cog",
    to: "/appMaster",
    label: "สายอนุมัติ",
    empCodeAllow: [
      "2950189",
      "2250003",
      "3040074",
      "2240003",
      "2150009",
      "2210003",
    ],
  },
]);

const { public: config } = useRuntimeConfig();
const user = ref<any>(null);

const permission = computed(() => {
  return Number(userSession.value?.permission || 0);
});

// ✅ กรองเมนูตามสิทธิ์
const filteredMenu = computed(() => {
  return menu.value.filter((m) => {
    // if (Array.isArray(m.permission)) {
    //   const hasAccess = m.permission.some((perm) => perm == permission.value);
    //   console.log(
    //     `📋 เมนู "${m.label}" | ผู้ใช้ = ${permission.value} | แสดงผล: ${hasAccess}`,
    //   );
    //   return hasAccess;
    // } else {
    //   return permission.value == m.permission;
    // }

    // 🔹 กรณีเช็คจากรหัสพนักงาน
    if (Array.isArray(m.empCodeAllow)) {
      const hasAccess = m.empCodeAllow.includes(empCode.value);
      console.log(
        `👤 เมนู "${m.label}" | empCode = ${empCode.value} | แสดงผล: ${hasAccess}`,
      );
      return hasAccess;
    }

    // 🔹 กรณีเช็คจาก permission (ของเดิม)
    if (Array.isArray(m.permission)) {
      return m.permission.some((perm) => perm == permission.value);
    }
  });
});

// ✅ ตรวจสอบสิทธิ์ของหน้า route ปัจจุบัน
const checkAccessToCurrentRoute = () => {
  const currentPath = route.path;
  console.log(currentPath);
  const menuItem = menu.value.find((m) => m.to === currentPath);

  // ถ้ามีเมนูนี้ แต่ผู้ใช้ไม่มีสิทธิ์ → redirect ไปหน้าแรกที่เข้าได้
  // if (menuItem && Array.isArray(menuItem.permission)) {
  //   const hasAccess = menuItem.permission.some(
  //     (perm) => permission.value == perm,
  //   );
  //   if (!hasAccess) {
  //     console.warn(`🚫 ผู้ใช้ไม่มีสิทธิ์เข้าหน้า ${currentPath}`);
  //     // หาเมนูแรกที่มีสิทธิ์เข้าได้
  //     const firstAllowed = filteredMenu.value[0];
  //     if (firstAllowed) {
  //       router.push(firstAllowed.to);
  //     } else {
  //       router.push("/"); // ถ้าไม่มีสิทธิ์เลย ให้กลับหน้า default
  //     }
  //   }
  // }

  if (!menuItem) return;

  // 🔹 เช็คจากรหัสพนักงาน
  if (Array.isArray(menuItem.empCodeAllow)) {
    const hasAccess = menuItem.empCodeAllow.includes(empCode.value);
    if (!hasAccess) {
      const firstAllowed = filteredMenu.value[0];
      router.push(firstAllowed ? firstAllowed.to : "/");
    }
  }

  // 🔹 เช็คจาก permission
  if (Array.isArray(menuItem.permission)) {
    const hasAccess = menuItem.permission.some(
      (perm) => perm == permission.value,
    );
    if (!hasAccess) {
      const firstAllowed = filteredMenu.value[0];
      router.push(firstAllowed ? firstAllowed.to : "/");
    }
  }
};

onMounted(() => {
  // sessionUser();
  checkAccessToCurrentRoute();
});
</script>
