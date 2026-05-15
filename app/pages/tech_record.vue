<template>
  <v-card class="pa-4">
    <v-tabs
      v-model="tab"
      class="text-grey-darken-1 bg-blue-lighten-5"
      color="light-blue-darken-1"
    >
      <v-tab value="one" class="font-weight-medium">TECHNICHIAN FORM</v-tab>
    </v-tabs>
    <v-card-text>
      <v-virtual-scroll :items="[1]" height="530" item-height="auto">
        <template #default>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one">
              <div
                class="flex justify-between px-2 py-3 bg-blue-500 rounded-sm align-center"
              >
                <div>
                  <span class="font-semibold">FORM FOR TECHNICHIAN</span>
                </div>
                <div class="flex gap-2">
                  <div v-if="data_count_rej > 0">
                    <v-badge
                      location="top left"
                      color="red-lighten-4"
                      :content="data_count_rej"
                      rounded="lg"
                    >
                      <v-btn
                        rounded="xl"
                        color="red-darken-4"
                        @click="dialog_rej = true"
                      >
                        <template #prepend>
                          <i class="fa fa-file-alt fa-lg"></i>
                        </template>
                        <h1>ข้อมูลที่ถูก Reject</h1>
                      </v-btn>
                    </v-badge>
                  </div>
                  <div>
                    <v-badge
                      location="top left"
                      color="blue-accent-4"
                      :content="data_count"
                      rounded="lg"
                    >
                      <v-btn
                        rounded="xl"
                        class="text-blue-darken-4 bg-cyan-accent-1"
                        @click="dialog = true"
                      >
                        <template #prepend>
                          <i class="fa fa-file-alt fa-lg"></i>
                        </template>
                        <h1>ข้อมูลจาก Operator</h1>
                      </v-btn>
                    </v-badge>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <h1 class="text-xl text-red-500">
                  <i class="mr-2 fa-solid fa-circle-info"></i>ส่วนนี้จะเป็นของ
                  Technichian หรือ Model Change ที่จะต้องบันทึก
                  <span class="font-semibold"
                    ><mark class="text-red-500"
                      >(ข้อมูลที่ได้รับในการมาบันทึกนั้น ต้องหลังจาก Operator
                      กรอกข้อมูลเสร็จสิ้นเท่านั้น)</mark
                    >
                  </span>
                  โดยกดปุ่มข้อมูลจาก Operator
                  เพื่อทำการคลิกเลือกข้อมูลมากรอกข้อมูลด้านล่างนี้
                </h1>
                <p class="text-lg text-amber-500">
                  <i class="mr-2 fa-solid fa-circle-info"></i
                  >ตรวจสอบชื่อโปรแกรมบนหน้าจอเครื่องจักร ต้องตรงกับ Assembly
                  chart part list เท่านั้น
                </p>
              </div>
              <v-switch
                v-model="prs"
                :label="`Process: ${prs}`"
                false-value="CP"
                true-value="RF"
                hide-details
                color="blue"
              ></v-switch>
              <cpform
                v-if="prs === 'CP'"
                :id="id_select"
                :won_chn="won_select"
                :data_edit="_data"
                :model_chn="model_chn_select"
                :prgnm="prog_name_select"
                :cus="customer_select"
                :empno="empno"
                :pcbno="pcbno_select"
                :id_update="id_update"
                :obj_rj="obj_rj"
              />
              <refform
                v-else
                :id="id_select"
                :won_chn="won_select"
                :model_chn="model_chn_select"
                :empno="empno"
                :data_edit="_data"
                :prgnm="prog_name_select"
                :cus="customer_select"
                :pcbno="pcbno_select"
                :id_update="id_update"
                :obj_rj="obj_rj"
              />
            </v-tabs-window-item>
          </v-tabs-window>
        </template>
      </v-virtual-scroll>
    </v-card-text>

    <v-dialog v-model="dialog" width="auto">
      <v-card min-width="1000">
        <template #prepend>
          <i class="fa fa-book fa-lg"></i>
        </template>
        <template #title>
          <h1>All Data From Operator</h1>
        </template>
        <v-card-title class="d-flex align-center pe-2">
          <i class="fa fa-box fa-lg"></i> &nbsp; ค้นหาข้อมูล Model Change

          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            density="compact"
            label="Search"
            variant="solo-filled"
            flat
            hide-details
            single-line
          >
            <template #prepend-inner>
              <v-icon icon="mdi-magnify"></v-icon>
            </template>
          </v-text-field>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          v-model:search="search"
          :filter-keys="['OPR_HREC_LINE']"
          density="compact"
          :items="data"
        >
          <template v-slot:item="{ item }">
            <tr class="text-no-wrap">
              <td>
                <div class="flex">
                  <div class="pa-2">
                    <v-btn color="blue" rounded @click="ChooseData(item)">
                      <template #prepend>
                        <v-icon icon="mdi-check"></v-icon>
                      </template>
                      <h1 class="text-md">เลือก</h1>
                    </v-btn>
                  </div>
                </div>
              </td>
              <td>
                <div class="flex">
                  <div class="pa-2">
                    <v-btn
                      color="red"
                      rounded
                      @click="SubmitDeleted(item.OPR_HREC_ID)"
                    >
                      <template #prepend>
                        <v-icon icon="mdi-delete"></v-icon>
                      </template>
                      <h1 class="text-md">ยกเลิกกรอกฟอร์ม</h1>
                    </v-btn>
                  </div>
                </div>
              </td>
              <td style="min-width: 60px">
                {{ formatIssueNo(item.OPR_HREC_ISSUENO) }}
              </td>

              <td
                style="min-width: 100px"
                v-if="item.OPR_HREC_UPDATELSTDT === null"
              >
                {{ dayjs(item.OPR_HREC_LSTDT).format("DD/MM/YYYY HH:mm") }}
              </td>
              <td style="min-width: 100px" v-else>
                {{
                  dayjs(item.OPR_HREC_UPDATELSTDT).format("DD/MM/YYYY HH:mm")
                }}
              </td>
              <td style="min-width: 100px">{{ item.OPR_HREC_PROCS }}</td>
              <td style="min-width: 100px">{{ item.OPR_HREC_LINE }}</td>
              <td style="min-width: 200px">{{ item.OPR_HREC_WON_CURRENT }}</td>
              <td style="min-width: 200px">{{ item.OPR_HREC_CURMDLNM }}</td>
              <td style="min-width: 200px">{{ item.OPR_HREC_WON_CHANGE }}</td>
              <td style="min-width: 200px">{{ item.OPR_HREC_CHNMDLNM }}</td>
            </tr>
          </template>
        </v-data-table>

        <template v-slot:actions>
          <v-btn class="ms-auto" text="Close" @click="dialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_rej" width="auto">
      <v-card min-width="1000">
        <template #prepend>
          <i class="fa fa-book fa-lg"></i>
        </template>
        <template #title>
          <h1>All Data From Operator</h1>
        </template>
        <v-card-title class="d-flex align-center pe-2">
          <i class="fa fa-box fa-lg"></i> &nbsp; ค้นหาข้อมูล Model Change

          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            density="compact"
            label="Search"
            variant="solo-filled"
            flat
            hide-details
            single-line
          >
            <template #prepend-inner>
              <v-icon icon="mdi-magnify"></v-icon>
            </template>
          </v-text-field>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table
          :headers="headers_rej"
          v-model:search="search"
          :filter-keys="['OPR_HREC_LINE']"
          density="compact"
          :items="data_rejected"
        >
          <template v-slot:item="{ item }">
            <tr class="text-no-wrap">
              <td>
                <div class="flex">
                  <div class="pa-2">
                    <v-btn
                      color="red-darken-3"
                      rounded
                      @click="ChooseUpdate(item)"
                    >
                      <h1 class="text-md">เลือก</h1>
                    </v-btn>
                  </div>
                </div>
              </td>

              <td style="min-width: 60px">
                {{ item.OPR_HREC_ISSUENO.split("-").pop().slice(3) }}
              </td>
              <td style="min-width: 100px">{{ item.OPR_HREC_PROCS }}</td>
              <td style="min-width: 100px">{{ item.OPR_HREC_LINE }}</td>
              <td style="min-width: 200px">{{ item.OPR_HREC_WON_CURRENT }}</td>
              <td style="min-width: 200px">{{ item.OPR_HREC_CURMDLNM }}</td>
              <td style="min-width: 200px">{{ item.OPR_HREC_WON_CHANGE }}</td>
              <td style="min-width: 200px">{{ item.OPR_HREC_CHNMDLNM }}</td>
              <td style="min-width: 400px">
                {{ item.OPR_HREC_TECH_RJ_REMARK }}
              </td>
            </tr>
          </template>
        </v-data-table>

        <template v-slot:actions>
          <v-btn class="ms-auto" text="Close" @click="dialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
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
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import cpform from "~/components/cpform.vue";
import refform from "~/components/refform.vue";
import cpupdate from "~/components/cpupdate.vue";
import refupdate from "~/components/refupdate.vue";
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";

definePageMeta({
  layout: "custom",
});

const { public: config } = useRuntimeConfig();
console.log(config.apiBase);

/**
 * TODO : Use cookie for set userinfo
 */
const userSession = useCookie("user_session");

// const user = ref<any>(null);
// const remark = ref<string>("");

// /**
//  *  TODO: เรียกข้อมูล session ผู้ใช้งาน
//  */
// const sessionUser = async () => {
//   const res = await axios.get(`${config.apiBase}/session/user`, {
//     withCredentials: true, // ต้องใส่ เพื่อส่ง laravel_session cookie
//   });

//   user.value = res.data;
//   console.log("user session:", user.value);
//   empno.value = user.value.empno;
// };

/**
 * TODO: สร้างตัวแปรรับค่าจาก v-model on template
 */

const prs = ref<string>("");
const dialog = ref<boolean>(false);
const dialog_rej = ref<boolean>(false);
const edit_show_dialog = ref<boolean>(false);

const tab = ref<string>("one");
const search = ref<string>("");
const won_select = ref<string>("");
const model_chn_select = ref<string>("");
const id_select = ref<string>("");
const empno = ref<string>("");
const customer_select = ref<string>("");
const prog_name_select = ref<string>("");
const pcbno_select = ref<string>("");

const data = ref<any>([]);
const data_count = ref<number>(0);
const data_count_rej = ref<number>(0);
const data_rejected = ref<any>([]);
const obj_rj = ref<any>([]);
const id_update = ref<string>("");

const _data = ref<any>([]);
// ดึงข้อมูลจาก localStorage (เป็น string)
const stored = localStorage.getItem("data");

// ถ้ามีข้อมูล → แปลงเป็น object
if (stored) {
  _data.value = JSON.parse(stored);
} else {
  _data.value = []; // ถ้าไม่มีข้อมูล ให้เป็น array เปล่า
}

console.log("_data:", _data.value);

prs.value = _data.value.OPR_HREC_PROCS;
console.log("prs:", prs.value);

/**
 * TODO: สร้าง function เรียกข้อมูลจาก api
 */
const GetRecordFromOperator = async () => {
  try {
    const res = await axios.get(
      "http://172.22.64.11/49_modelchange/49_mdlchn_api/api/get/oprform",
    );
    data.value = res.data;
    data_count.value = data.value.length;
  } catch (error) {
    console.log(error);
  }
};

const GetRejectedData = async () => {
  try {
    const res = await axios.get(
      "http://172.22.64.11/49_modelchange/49_mdlchn_api/api/get/rejectedData",
    );
    const cp = res.data.cpData_rejected || [];
    const rf = res.data.rfData_rejected || [];

    // 🔥 รวมเป็น array เดียว
    data_rejected.value = [...cp, ...rf];

    data_count_rej.value = data_rejected.value.length;

    console.log("data_rej:", data_rejected.value);
  } catch (error) {
    console.log(error);
  }
};

/**
 * TODO: สร้างฟังก์ชันจากการกดปุ่ม
 */
const ChooseData = (obj: any) => {
  prs.value = obj.OPR_HREC_PROCS;
  won_select.value = obj.OPR_HREC_WON_CHANGE;
  model_chn_select.value = obj.OPR_HREC_CHNMDLNM;
  id_select.value = obj.OPR_HREC_ID;
  customer_select.value = obj.OPR_HREC_CUS;
  prog_name_select.value = obj.OPR_HREC_PRGMNM;
  pcbno_select.value = obj.OPR_HREC_PRGMREV;

  dialog.value = false;
};

const ChooseUpdate = (obj: any) => {
  id_update.value = obj.OPR_HREC_ID;
  obj_rj.value = obj;
  prs.value = obj.OPR_HREC_PROCS;
  won_select.value = obj.OPR_HREC_WON_CHANGE;
  model_chn_select.value = obj.OPR_HREC_CHNMDLNM;
  edit_show_dialog.value = true;
  console.log("obj_rj:", obj_rj.value);
  dialog_rej.value = false;
};

const SubmitDeleted = async (id: string) => {
  console.log("id:", id);
  dialog.value = false;
  const button = await Swal.fire({
    title: "คุณต้องการยกเลิกข้อมูลนี้หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "ไม่, ยกเลิก!",
    confirmButtonText: "ใช่, ยกเลิก!",
  });

  if (button.isConfirmed) {
    const res = await axios.delete(
      `http://172.22.64.11/49_modelchange/49_mdlchn_api/api/delete/techform/${id}`,
    );
    console.log("res:", res.data);

    GetRecordFromOperator();
  }
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

/**
 * TODO:สร้าง array ทำหัวตาราง
 */
const headers = ref<any>([
  { title: "", align: "center" },
  { title: "", align: "center" },
  { title: "เลขเอกสาร", key: "OPR_HREC_ISSUENO" },
  { title: "วันที่และเวลา", key: "OPR_HREC_UPDATELSTDT" },
  { title: "Process", key: "OPR_HREC_PROCS" },
  { title: "Line", key: "OPR_HREC_LINE" },
  { title: "WO# เดิม", key: "OPR_HREC_WON_CURRENT" },
  { title: "Model เดิม", key: "OPR_HREC_CURMDLNM" },
  { title: "WO# ใหม่", key: "OPR_HREC_WON_CHANGE" },
  { title: "Model ใหม่", key: "OPR_HREC_CHNMDLNM" },
]);

const headers_rej = ref<any>([
  { title: "Actions", align: "center" },
  { title: "เลขเอกสาร", key: "OPR_HREC_ISSUENO" },
  { title: "Process", key: "OPR_HREC_PROCS" },
  { title: "Line", key: "OPR_HREC_LINE" },
  { title: "WO# เดิม", key: "OPR_HREC_WON_CURRENT" },
  { title: "Model เดิม", key: "OPR_HREC_CURMDLNM" },
  { title: "WO# ใหม่", key: "OPR_HREC_WON_CHANGE" },
  { title: "Model ใหม่", key: "OPR_HREC_CHNMDLNM" },
  { title: "Remark", key: "OPR_HREC_TECH_RJ_REMARK" },
]);

onMounted(() => {
  GetRecordFromOperator();
  GetRejectedData();
  // sessionUser();
  empno.value = userSession.value.empno;
});
</script>
