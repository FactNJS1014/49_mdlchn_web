<template>
  <v-card>
    <v-data-iterator :items="filteredData" :items-per-page="4" :search="search">
      <template v-slot:header>
        <v-toolbar class="px-2 bg-blue-lighten-2">
          <div class="flex justify-between align-center w-[500px]">
            <v-text-field
              v-model="search"
              density="comfortable"
              placeholder="Search"
              prepend-inner-icon="mdi mdi-magnify"
              style="max-width: 300px"
              variant="solo"
              clearable
              hide-details
            ></v-text-field>
            <v-text class="text-xl font-weight-bold"> Process: CP </v-text>
          </div>
          <!-- <p class="text-sm text-gray-500">
                        Logged in as: {{ user?.username }} (Permission: {{ user?.permission }})
                    </p> -->
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid>
          <v-row dense>
            <v-col
              v-for="item in items"
              :key="item.raw.OPR_HREC_ID"
              cols="auto"
              md="6"
            >
              <v-card class="pb-3" border flat>
                <v-list-item class="mb-2 font-weight-bold">
                  <template v-slot:title>
                    <strong class="mb-2 text-h6"
                      >Document No. :{{
                        formatIssueNo(item.raw.OPR_HREC_ISSUENO)
                      }}</strong
                    >
                    <!-- <p class="mb-2 text-h6 text-red" v-if="item.raw.OPR_HREC_SENDAPP_STD == 0">
                      ยังไม่ได้ยืนยันส่งข้อมูลจากผู้สร้าง
                    </p> -->
                    <!-- <strong class="ms-3" v-if="currentAppLev == 1"
                      >ข้อมูลนี้ Sup Lead อนุมัติ</strong
                    >
                    <strong class="ms-3" v-if="currentAppLev == 2"
                      >ข้อมูลนี้ Leader อนุมัติ</strong
                    > -->
                    <!-- <strong class="ms-3" v-if="currentAppLev == 3"
                      >ถึง QC อนุมัติ</strong
                    > -->
                  </template>

                  <template v-slot:subtitle>
                    <table class="border border-blue-800">
                      <tbody>
                        <tr class="border">
                          <th class="w-40 text-left border pa-2 text-sky-800">
                            LINE:
                          </th>
                          <td class="px-2 text-sky-800">
                            {{ item.raw.OPR_HREC_LINE }}
                          </td>
                        </tr>
                        <tr class="border">
                          <th class="text-left border text-sky-800 w-30 pa-2">
                            วันที่บันทึก:
                          </th>
                          <td class="px-2 text-sky-800">
                            {{ dateFormat(item.raw.OPR_HREC_DATEREC) }}
                          </td>
                        </tr>

                        <tr class="border">
                          <th class="text-left border pa-2 text-sky-800 w-30">
                            Work Order Change:
                          </th>
                          <td class="px-2 text-sky-800">
                            {{ item.raw.OPR_HREC_WON_CHANGE }}
                          </td>
                        </tr>
                        <tr class="border">
                          <th class="text-left border pa-2 text-sky-800 w-30">
                            Model Change:
                          </th>
                          <td class="px-2 text-sky-800">
                            {{ item.raw.OPR_HREC_CHNMDLNM }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </template>
                </v-list-item>

                <div class="px-4 d-flex justify-space-between">
                  <v-btn
                    variant="flat"
                    color="primary"
                    rounded="lg"
                    @click="togglePDF(item.raw)"
                  >
                    <v-icon icon="mdi mdi-file-pdf-box" class="mr-2"></v-icon>
                    View PDF
                  </v-btn>
                  <div
                    class="d-flex align-center text-caption text-medium-emphasis me-1 gap-4"
                  >
                    <!-- ถ้า permission = 1 -->
                    <v-btn
                      v-if="
                        user?.permission == 1 ||
                        user?.permission == 2 ||
                        user?.permission == 7
                      "
                      variant="flat"
                      color="warning"
                      rounded="lg"
                      @click="ClickEditData(item.raw)"
                    >
                      <v-icon icon="mdi-pencil" class="mr-2"></v-icon>
                      แก้ไขข้อมูล
                    </v-btn>
                    <v-btn
                      v-if="
                        user?.permission == 1 ||
                        user?.permission == 2 ||
                        user?.permission == 7
                      "
                      variant="flat"
                      color="success"
                      rounded="lg"
                      @click="goAppr(item.raw)"
                    >
                      <v-icon icon="mdi-check-bold" class="mr-2"></v-icon>
                      ยืนยันส่งอนุมัติ
                    </v-btn>

                    <v-tooltip location="top" v-if="user?.permission == 9">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          icon
                          v-bind="props"
                          color="green-darken-3"
                          rounded="lg"
                          @click="updateAppr(item.raw)"
                        >
                          <v-icon color="white"> mdi-check-bold </v-icon>
                        </v-btn>
                      </template>
                      <span>อนุมัติ</span>
                    </v-tooltip>

                    <v-tooltip location="top" v-if="user?.permission == 9">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          icon
                          v-bind="props"
                          color="red-darken-3"
                          rounded="lg"
                          @click="RejectedData(item.raw.OPR_HREC_ID)"
                        >
                          <v-icon color="white"> mdi-keyboard-return </v-icon>
                        </v-btn>
                      </template>
                      <span>ส่งกลับไปแก้ไข</span>
                    </v-tooltip>

                    <v-tooltip location="bottom" v-if="user?.permission == 9">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          icon
                          v-bind="props"
                          color="red-accent-4"
                          rounded="lg"
                          @click="Deleted"
                        >
                          <v-icon color="white"> mdi-trash-can </v-icon>
                        </v-btn>
                      </template>
                      <span>ลบ (ยกเลิกเปลี่ยน)</span>
                    </v-tooltip>
                  </div>
                  <v-dialog v-model="deletedDialog" max-width="400" persistent>
                    <v-card class="pa-3">
                      <div class="mt-3 font-semibold">
                        กรอกเหตุผลในการลบข้อมูล :
                      </div>
                      <v-text-field
                        variant="outlined"
                        rounded="md"
                        v-model="remark"
                      >
                      </v-text-field>
                      <template v-slot:actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          @click="deletedDialog = false"
                          class="font-semibold"
                        >
                          Close
                        </v-btn>

                        <v-btn
                          @click="SubmitDeleted(item.raw.OPR_HREC_ID)"
                          class="font-semibold"
                        >
                          ยืนยันลบข้อมูล
                        </v-btn>
                      </template>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="rejectedDialog" max-width="400" persistent>
                    <v-card class="pa-3">
                      <v-select
                        label="เลือก Form ที่ให้กลับไปแก้ไข"
                        :items="['Operator', 'Technician']"
                        v-model="selected_form"
                        variant="outlined"
                        rounded="md"
                      ></v-select>
                      <v-text-field
                        variant="outlined"
                        rounded="md"
                        v-model="remark_rejected"
                        label="กรอกเหตุผล"
                      >
                      </v-text-field>
                      <template v-slot:actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          @click="rejectedDialog = false"
                          class="font-semibold"
                        >
                          Close
                        </v-btn>

                        <v-btn @click="SubmitRejected()" class="font-semibold">
                          ยืนยันส่งกลับ
                        </v-btn>
                      </template>
                    </v-card>
                  </v-dialog>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <cpdocs :data-item="selected_data_cp" />
        <v-dialog v-model="edit_show_dialog" width="auto">
          <v-card min-width="1000" class="pa-3">
            <cpupdate
              v-if="prs === 'CP'"
              :id="id_update"
              :data_edit="obj_rj"
              :won_select="won_select"
              :model_chn_select="model_chn_select"
              :edit_show_dialog="edit_show_dialog"
            />
            <refupdate
              v-else
              :id="id_update"
              :data_edit="obj_rj"
              :won_select="won_select"
              :model_chn_select="model_chn_select"
              :edit_show_dialog="edit_show_dialog"
            />
            <template v-slot:actions>
              <v-btn
                class="ms-auto"
                text="Close"
                @click="edit_show_dialog = false"
              ></v-btn>
            </template>
          </v-card>
        </v-dialog>
      </template>

      <!-- เรียกใช้ cpdocs.vue -->

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="justify-center d-flex align-center pa-4">
          <v-btn
            :disabled="page === 1"
            density="comfortable"
            icon="mdi mdi-menu-left"
            variant="tonal"
            rounded
            @click="prevPage"
          ></v-btn>

          <div class="mx-2 text-caption">
            Page {{ page }} of {{ pageCount }}
          </div>

          <v-btn
            :disabled="page >= pageCount"
            density="comfortable"
            icon="mdi mdi-menu-right"
            variant="tonal"
            rounded
            @click="nextPage"
          ></v-btn>
        </div>
      </template>
    </v-data-iterator>
  </v-card>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import cpdocs from "~/components/cpdocs.vue";
import Swal from "sweetalert2";

definePageMeta({
  layout: "custom",
});

const { public: config } = useRuntimeConfig();
console.log(config.apiBase);

/**
 * TODO : Use cookie for set userinfo
 */
const userSession = useCookie("user_session");

const user = ref<any>(null);
const empno = ref<string>("");

const remark = ref<string>("");

// /**
//  *  TODO: เรียกข้อมูล session ผู้ใช้งาน
//  */
// const sessionUser = async () => {
//   const res = await axios.get(`${config.apiBase}/session/user`, {
//     withCredentials: true, // ต้องใส่ เพื่อส่ง laravel_session cookie
//   });

//   user.value = res.data;
//   console.log("user session:", user.value);
//   empno.value = user.value?.empno || "";
// };

/**
 * TODO: สร้างตัวแปรเพื่อรับค่า api และ v-model
 */
const search = ref<string>("");
const all_data = ref<any>([]);
const deletedDialog = ref<boolean>(false);
const rejectedDialog = ref<boolean>(false);
const selected_form = ref<string>("");
const remark_rejected = ref<string>("");
const selected_id = ref<string>("");
const edit_show_dialog = ref<boolean>(false);
const id_update = ref<string>("");
const obj_rj = ref<any>(null);
const prs = ref<string>("");
const won_select = ref<string>("");
const model_chn_select = ref<string>("");

interface DataItem {
  OPR_HREC_LINE?: string;
  OPR_HREC_DATEREC?: string;
  OPR_HREC_STATUSMDL?: string;
  OPR_HREC_CURMDLNM?: string;
  OPR_HREC_CHNMDLNM?: string;
}

const selected_data_cp = ref<DataItem | null>(null);
const app_data_cp = ref<any>(null);
const APP_LEV = ref<any>(null);
const APP_EMP = ref<any>(null);
const OPR_HREC_ID = ref<any>(null);

const filteredData = ref<AllDataItem[]>([]);
// const pdfGen = ref<InstanceType<typeof cpdocs> | null>(null)

interface AllDataItem {
  OPR_HREC_ID: string;
  OPR_HREC_SENDAPP_STD: number; // หรือ number ถ้าใน DB เป็น number
  // ... เพิ่ม field อื่น ๆ ตามต้องการ
}

interface AppDataItem {
  APP_REC_LEVEL: string; // หรือ number
  APP_REC_EMPNO: string; // เช่น "1001,1002"
  APP_REC_EMPAPP: string; // เช่น "1001,1002"
  OPR_HREC_ID: string;
  // ... เพิ่ม field อื่น ๆ ตามต้องการ
}

//function edit data form CP
const ClickEditData = (obj: any) => {
  id_update.value = obj.OPR_HREC_ID;
  obj_rj.value = obj;
  prs.value = obj.OPR_HREC_PROCS;
  won_select.value = obj.OPR_HREC_WON_CHANGE;
  model_chn_select.value = obj.OPR_HREC_CHNMDLNM;
  edit_show_dialog.value = true;
  console.log("obj_rj:", obj_rj.value);
};

/**
 * TODO: สร้างฟังก์ชันรับค่าจาก api
 */

const GetAllData = async () => {
  try {
    const res = await axios.get(
      "http://172.22.64.11/49_modelchange/49_mdlchn_api/api/get/alldata",
      {
        params: {
          empno: empno.value,
        },
      },
    );
    console.log("Empno:", empno.value);

    all_data.value = res.data.cp;
    app_data_cp.value = res.data.app_cp;

    OPR_HREC_ID.value = [];
    APP_LEV.value = [];
    APP_EMP.value = [];

    // console.log("📦 All Data:", all_data.value);
    // console.log("📋 Approval Data:", app_data_cp.value);

    // 🔍 ลองหาจาก app_data_cp ก่อน
    app_data_cp.value.forEach((appItem: AppDataItem) => {
      const empID = appItem.APP_REC_EMPNO.includes(",")
        ? appItem.APP_REC_EMPNO.split(",")
        : [appItem.APP_REC_EMPNO];

      // console.log(
      //   "🔍 Checking APP_REC_EMPNO:",
      //   empID,
      //   "for empno:",
      //   empno.value,
      // );

      if (empID.includes(empno.value)) {
        OPR_HREC_ID.value.push(appItem.OPR_HREC_ID);
        APP_LEV.value.push(appItem.APP_REC_LEVEL);
      }

      empID.forEach((id: string) => {
        if (!APP_EMP.value.includes(id)) {
          APP_EMP.value.push(id);
        }
      });
    });

    // 🧭 ถ้าไม่พบ level ใน app_data_cp (เช่น user ไม่มีใน list)
    // → ใช้ค่า OPR_HREC_SENDAPP_STD แทน (จาก all_data)
    // if (maxFoundLevel === -1 && all_data.value.length > 0) {
    //   // หา level สูงสุดที่มีในข้อมูลทั้งหมด
    //   const itemLevel = Number(all_data.value[0].OPR_HREC_SENDAPP_STD ?? 0);
    //   maxFoundLevel = itemLevel;
    //   console.log(`ℹ️ Fallback: Using OPR_HREC_SENDAPP_STD = ${itemLevel} as APP_LEV`);
    // }

    // APP_LEV.value = maxFoundLevel;

    // console.log("✅ Final APP_LEV:", APP_LEV.value);
    // console.log("✅ Final APP_EMP:", APP_EMP.value);
    // console.log("✅ Final OPR_HREC_ID:", OPR_HREC_ID.value);
  } catch (error) {
    console.error(error);
  }
};

const currentAppLev = computed(() => {
  return APP_LEV.value.length ? APP_LEV.value[0] : null;
});

/**
 * TODO: สร้างฟังก์ชัน reject data
 */

const RejectedData = (id: string) => {
  selected_id.value = id;
  rejectedDialog.value = true;
  console.log(id);
};

const SubmitRejected = async () => {
  const payload = {
    id: selected_id.value,
    remark: remark_rejected.value,
    form: selected_form.value,
  };
  const res = await axios.put(
    "http://172.22.64.11/49_modelchange/49_mdlchn_api/api/update/reject",
    payload,
  );
  console.log(res.data);
  rejectedDialog.value = false;
  if (res.data.success === true) {
    Swal.fire({
      icon: "success",
      title: "ส่งกลับไปแก้ไขสำเร็จ",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    }).then(() => {
      GetAllData();
      filterData();
    });
  }
};

const filterData = () => {
  console.log("🔹 Start filtering data");
  const seen = new Set<number>();

  filteredData.value = [];

  all_data.value.forEach((item: any) => {
    if (seen.has(item.OPR_HREC_ID)) {
      return;
    }

    const itemLevel = item.OPR_HREC_SENDAPP_STD;
    const index = OPR_HREC_ID.value.indexOf(item.OPR_HREC_ID);

    // console.log("ItemLevel:", itemLevel);
    // console.log("Index of OPR_HREC_ID:", index);
    // console.log("APP_LEV:", APP_LEV.value[index]);

    if (index !== -1 && itemLevel === APP_LEV.value[index]) {
      // ✅ มี approval record และ level ตรง
      seen.add(item.OPR_HREC_ID);
      filteredData.value.push(item);
      //
      return;
    }

    // ✅ ไม่มี record ใน APPREC_H_TBL เลย (ยังไม่เข้า approval)
    if (index === -1 && itemLevel === 0) {
      seen.add(item.OPR_HREC_ID);
      filteredData.value.push(item);
      // console.log(`✅ SHOW (NO APP): Item ID ${item.OPR_HREC_ID}`);
      return;
    }

    if (itemLevel == 0 && !APP_EMP.value.includes(empno.value)) {
      seen.add(item.OPR_HREC_ID);
      filteredData.value.push(item);
      // console.log(`✅ SHOW (Level 0): Item ID ${item.OPR_HREC_ID}`);
      return;
    }

    // console.log(`🚫 HIDE: Item ID ${item.OPR_HREC_ID}`);
  });

  // console.log("\n🎯 Filtered Data:", filteredData.value);
};

const Deleted = () => {
  deletedDialog.value = true;
};

const SubmitDeleted = async (data: string) => {
  const payload = {
    id: data,
    remark: remark.value,
  };
  const res = await axios.put(
    "http://172.22.64.11/49_modelchange/49_mdlchn_api/api/update/std/delete",
    payload,
  );
  console.log(res.data);

  if (res.data.std === true) {
    deletedDialog.value = false;
    Swal.fire({
      icon: "success",
      title: "Delete Successfully",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      location.reload();
    });
  }
};

/**
 * TODO: สร้างฟังก์ชัน Event DOM
 *
 */

const dateFormat = (date: string) => {
  return dayjs(date).format("DD/MM/YYYY");
};

const togglePDF = async (item: DataItem) => {
  selected_data_cp.value = item;
  // console.log(selected_data_cp.value)
  // pdfGen.value?.createPdf()
};

const selected_data = ref<any>(null);

// const gotoEdit = (data: any) => {
//   localStorage.setItem("data", JSON.stringify(data));
//   navigateTo("/tech_record");
// };

/**
 * TODO:ฟังก์ชันส่งข้อมูลอนุมัติไปยังผู้อนุมัติ
 */

const goAppr = async (data: any) => {
  // console.log(data)

  const res = await axios.post(
    "http://172.22.64.11/49_modelchange/49_mdlchn_api/api/insert/approve",
    data,
  );
  if (res.data.success === true) {
    Swal.fire({
      icon: "success",
      title: "ส่งอนุมัติสำเร็จ",
      showConfirmButton: false,
      timer: 1500,
    }).then(async () => {
      await filterData();
    });
  }
};

const updateAppr = async (data: any) => {
  const index = OPR_HREC_ID.value.indexOf(data.OPR_HREC_ID);
  const payload = {
    ...data,
    APPROVE_BY: empno.value,
    APP_LEV: APP_LEV.value[index],
  };

  const res = await axios.put(
    "http://172.22.64.11/49_modelchange/49_mdlchn_api/api/update/approve",
    payload,
  );
  console.log(res.data);
  if (res.data.success === true) {
    Swal.fire({
      icon: "success",
      title: "อนุมัติสำเร็จ",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      location.reload();
    });
  }
};
const newSettingUserInfo = () => {
  user.value = userSession.value;
  empno.value = userSession.value.empno;
};

const formatIssueNo = (issueNo: string) => {
  const v = issueNo?.split("-").pop() ?? "";
  const num = parseInt(v, 10);

  if (isNaN(num)) return "";

  // ถ้าน้อยกว่า 1000 → แสดง 3 หลัก
  if (num < 1000) {
    return String(num).padStart(3, "0");
  }

  // ถ้า 1000 ขึ้นไป → แสดงเต็ม
  return String(num);
};

onMounted(async () => {
  // await sessionUser();
  await newSettingUserInfo();
  await GetAllData();
  await filterData();
});
</script>
