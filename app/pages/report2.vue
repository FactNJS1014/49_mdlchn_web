<template>
  <v-card>
    <v-tabs
      v-model="tab"
      class="text-grey-darken-1 bg-blue-lighten-5"
      color="light-blue-darken-1"
    >
      <v-tab value="complete" class="font-weight-medium">Report Complete</v-tab>
      <v-badge
        inline
        location="top right"
        color="red"
        :content="countGroupNoComplete()"
      >
        <v-tab value="no_complete" class="font-weight-medium">
          Report Not Complete
        </v-tab>
      </v-badge>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="complete">
        <v-card>
          <div class="pa-3">
            <h1 class="text-xl font-bold">เลือกช่วงวันที่แสดงผล</h1>
            <div class="flex items-center gap-2">
              <input
                type="date"
                class="w-25 px-3 py-4 text-base placeholder-gray-400 transition-colors bg-white border border-gray-300 rounded focus:outline-none"
                v-model="date_start"
                required
              />
              <input
                type="date"
                class="w-25 px-3 py-4 text-base placeholder-gray-400 transition-colors bg-white border border-gray-300 rounded focus:outline-none"
                v-model="date_end"
                required
              />
              <v-select
                v-model="line"
                variant="outlined"
                rounded="md"
                class="w-25 mt-5"
                :items="line_list"
                item-title="LINE_NAME"
                item-value="LINE_NAME"
                label="เลือก Line"
              ></v-select>
              <v-select
                v-model="customer"
                variant="outlined"
                rounded="md"
                class="w-25 mt-5"
                :items="customer_list"
                item-title="BGCD"
                item-value="BGCD"
                label="เลือก Customer"
              ></v-select>
              <v-btn color="primary" @click="fetchReportRF" rounded="md">
                <v-icon icon="mdi mdi-magnify" size="24"></v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>
        <div class="mt-2 mb-2 ms-2">
          <v-btn color="green-darken-3" @click="exportToExcel" rounded="md">
            <v-icon icon="mdi mdi-file-excel" size="24" class="mr-2"></v-icon>
            Export to Excel
          </v-btn>
        </div>
        <v-data-table
          :headers="headers"
          :items="tableItems"
          item-key="OPR_HREC_ID"
          :items-per-page="7"
          :loading="loading"
          class="mt-2"
        >
          <template #item.timeline="{ item }">
            <v-btn
              @click="openTimeline(item)"
              class="rounded-xl"
              color="teal darken-3"
            >
              <v-icon icon="mdi mdi-timeline-check" size="24"></v-icon>
            </v-btn>
          </template>
          <template #item.view="{ item }">
            <v-btn
              @click="openViewPdf(item)"
              class="rounded-xl"
              color="light-blue darken-3"
            >
              <v-icon icon="mdi mdi-file-pdf-box" size="24"></v-icon>
            </v-btn>
          </template>
          <template #item.OPR_HREC_ISSUENO="{ item }">
            {{ formatIssueNo(item.OPR_HREC_ISSUENO) }}
          </template>
          <template #item.OPR_HREC_LSTDT="{ item }">
            {{ timeformat(item.OPR_HREC_LSTDT) }}
          </template>
          <template #item.shots="{ item }">
            {{ getShots(item.OPR_HREC_WON_CHANGE, item.OPR_HREC_LOTS_CHN) }}
          </template>
        </v-data-table>
      </v-tabs-window-item>
      <v-tabs-window-item value="no_complete">
        <v-data-table
          :headers="headers_nocomplete"
          :items="tableItemsNoComplete"
          item-key="OPR_HREC_ID"
          :items-per-page="10"
          :loading="loading"
          class="mt-2"
        >
          <template #item.timeline="{ item }">
            <v-btn
              @click="openTimeline(item)"
              class="rounded-xl"
              color="teal darken-3"
            >
              <v-icon icon="mdi mdi-timeline-check" size="24"></v-icon>
            </v-btn>
          </template>
          <template #item.view="{ item }">
            <v-btn
              @click="openViewPdf(item)"
              class="rounded-xl"
              color="light-blue darken-3"
            >
              <v-icon icon="mdi mdi-file-pdf-box" size="24"></v-icon>
            </v-btn>
          </template>
          <template #item.OPR_HREC_ISSUENO="{ item }">
            {{ formatIssueNo(item.OPR_HREC_ISSUENO) }}
          </template>
          <template #item.OPR_HREC_LSTDT="{ item }">
            {{ timeformat(item.OPR_HREC_LSTDT) }}
          </template>
        </v-data-table>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>

  <Rfreport :rfItem="report_rf" />
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>
        <div>
          <p class="text-xl font-bold">Time line อนุมัติ Model Change</p>
          <p>
            หมายเอกสาร:
            {{ formatIssueNo(selected?.OPR_HREC_ISSUENO) }}
          </p>
        </div>
      </v-card-title>
      <v-card-text>
        <v-timeline align="start" side="end">
          <v-timeline-item
            v-for="level in 3"
            :key="level"
            :dot-color="selected?.levels[level].empapp != 0 ? 'green' : 'red'"
            size="small"
          >
            <div class="d-flex">
              <strong class="me-4">ผู้อนุมัติลำดับที่ {{ level }}</strong>
              <div>
                <strong>
                  {{
                    selected?.levels[level]?.empapp != 0
                      ? selected?.levels[level]?.empname
                      : "XXXXXXX"
                  }}
                </strong>
                <div class="text-caption font-semibold">
                  {{
                    selected?.levels[level]?.timestamp
                      ? DateAndTimeformat(selected?.levels[level]?.timestamp)
                      : ""
                  }}
                </div>
                <div class="text-caption">
                  {{
                    selected?.levels[level]?.empapp != 0
                      ? "Completed"
                      : "Pending"
                  }}
                </div>
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import Rfreport from "~/components/rfreport.vue";
import * as XLSX from "xlsx";
definePageMeta({
  layout: "custom",
});

const groups = ref<Record<string, any>>({});
const employees = ref<string[]>([]);
const report_rf = ref<any>(null);
const date_start = ref<string>("");
const date_end = ref<string>("");
const line = ref<string>("");
const customer = ref<string>("");
const line_list = ref<any>([]);
const customer_list = ref<any>([]);
const group_no_complete = ref<Record<string, any>>({});
const loading = ref<boolean>(true);
const tab = ref<string>("complete");
const won = ref<any>([]);

const headers = ref([
  { title: "ID", key: "OPR_HREC_ID" },
  { title: "Issue No", key: "OPR_HREC_ISSUENO" },
  { title: "Date Rec", key: "OPR_HREC_DATEREC" },
  { title: "Time Record", key: "OPR_HREC_LSTDT" },
  { title: "Line", key: "OPR_HREC_LINE" },
  { title: "Customer", key: "OPR_HREC_CUS" },
  { title: "Process RF เดิม", key: "OPR_HREC_PROCS_RF" },
  { title: "Process RF Change", key: "OPR_HREC_PROCS_RF_CHN" },
  { title: "WON Change", key: "OPR_HREC_WON_CHANGE" },
  { title: "Model Change", key: "OPR_HREC_CHNMDLNM" },
  { title: "Lot Size", key: "OPR_HREC_LOTS_CHN" },
  { title: "Shots", key: "shots" },
  { title: "Metal Mask Number", key: "TEC_RFHREC_PRINTMMREF" },
  { title: "", key: "timeline" }, // ปุ่มกด
  { title: "", key: "view" }, // ปุ่มกด
]);

const headers_nocomplete = ref([
  { title: "ID", key: "OPR_HREC_ID" },
  { title: "Issue No", key: "OPR_HREC_ISSUENO" },
  { title: "Date Rec", key: "OPR_HREC_DATEREC" },
  { title: "Time Record", key: "OPR_HREC_LSTDT" },
  { title: "Line", key: "OPR_HREC_LINE" },
  { title: "Customer", key: "OPR_HREC_CUS" },
  { title: "Process RF เดิม", key: "OPR_HREC_PROCS_RF" },
  { title: "Process RF Change", key: "OPR_HREC_PROCS_RF_CHN" },
  { title: "WON Change", key: "OPR_HREC_WON_CHANGE" },
  { title: "Model Change", key: "OPR_HREC_CHNMDLNM" },
  { title: "Lot Size", key: "OPR_HREC_LOTS_CHN" },
  { title: "Metal Mask Number", key: "TEC_RFHREC_PRINTMMREF" },
  { title: "", key: "timeline" }, // ปุ่มกด
  { title: "", key: "view" }, // ปุ่มกด
]);

const fetchReportRF = async () => {
  loading.value = false;
  const res = await axios.get(
    "http://172.22.64.11/49_modelchange/49_mdlchn_api/api/get/reports",
  );

  const rows = res.data.rep_rf;
  // console.log(rows);

  rows.forEach((row: any) => {
    const id = row.OPR_HREC_ID;
    const level = row.APP_REC_LEVEL;
    const timestamp = row.APP_REC_TIMESTAMP;
    const stampStd = row.APP_REC_STAMP_STD;

    if (!groups.value[id]) {
      groups.value[id] = {
        OPR_HREC_ID: id,
        timestamp: timestamp,
        stampStd: stampStd,
        levels: {},
        ...row,
        raw: [],
      };
    }

    const existing = groups.value[id].levels[level];

    if (!existing || dayjs(timestamp).isAfter(dayjs(existing.timestamp))) {
      groups.value[id].levels[level] = {
        level,
        empapp: row.APP_REC_EMPAPP,
        empname: findUserName(row.APP_REC_EMPAPP),
        timestamp,
        stampStd,
        data: row,
      };
    }

    groups.value[id].raw.push(row);

    const startDate = dayjs(date_start.value);
    const endDate = dayjs(date_end.value);
    const rowDate = dayjs(row.OPR_HREC_DATEREC);
    const customerValue = customer.value.trim();

    if (rowDate.isBefore(startDate) || rowDate.isAfter(endDate)) {
      delete groups.value[id];
    }

    if (line.value && row.OPR_HREC_LINE !== line.value) {
      delete groups.value[id];
    }
    if (customerValue && row.OPR_HREC_CUS !== customerValue) {
      delete groups.value[id];
    }

    console.log(
      "customer.value:",
      `[${customer.value}]`,
      "| row.OPR_HREC_CUS:",
      `[${row.OPR_HREC_CUS}]`,
    );
  });
};
const fetchReportRFNoComplete = async () => {
  loading.value = false;
  const res = await axios.get(
    "http://172.22.64.11/49_modelchange/49_mdlchn_api/api/get/reports/nocomplete",
  );

  const rows = res.data.rep_rf_no_complete;

  rows.forEach((row: any) => {
    const id = row.OPR_HREC_ID;
    const level = row.APP_REC_LEVEL;

    if (!group_no_complete.value[id]) {
      group_no_complete.value[id] = {
        OPR_HREC_ID: id,
        levels: {},
        timestamp: row.APP_REC_TIMESTAMP ?? null,
        ...row,
        raw: [],
      };
    }

    group_no_complete.value[id].levels[level] = {
      level: level,
      empapp: row.APP_REC_EMPAPP,
      empname: findUserName(row.APP_REC_EMPAPP),
      timestamp: row.APP_REC_TIMESTAMP ?? null,
      data: row,
    };
    group_no_complete.value[id].raw.push(row);

    const startDate = dayjs(date_start.value);
    const endDate = dayjs(date_end.value);
    const rowDate = dayjs(row.OPR_HREC_DATEREC);

    if (rowDate.isBefore(startDate) || rowDate.isAfter(endDate)) {
      delete group_no_complete.value[id];
    }

    if (line.value && row.OPR_HREC_LINE !== line.value) {
      delete group_no_complete.value[id];
    }
    if (customer.value && row.OPR_HREC_CUS !== customer.value) {
      delete group_no_complete.value[id];
    }

    console.log(customer.value);

    if (customer.value === row.OPR_HREC_CUS) {
      // console.log("Match");
    } else {
      // console.log("Not Match");
    }
  });
};
const countGroupNoComplete = () => {
  return Object.values(group_no_complete.value).length;
};
const dialog = ref(false);
const selected = ref<any>(null);

const openTimeline = (item: any) => {
  selected.value = item;
  dialog.value = true;
};

const GetUsersWeb = async () => {
  const res = await axios.get(
    "http://172.22.64.11/49_modelchange/49_mdlchn_api/api/users",
  );
  // console.log(res.data)
  employees.value = res.data.ALL;
};

const findUserName = (empId: string | number) => {
  const emp = employees.value.find((e) => e.MUSR_ID == empId);

  return emp ? emp.MUSR_NAME : "ไม่พบชื่อ";
};

const openViewPdf = (data: any) => {
  report_rf.value = data;
};

const fetchApiLine = async () => {
  try {
    const res = await axios.get(
      "http://172.22.64.11/49_modelchange/49_mdlchn_api/api/get/line",
    );
    line_list.value = res.data;
    // console.log(line_list.value)
  } catch (error) {
    console.log(error);
  }
};
const fetchApiCustomer = async () => {
  try {
    const res = await axios.get(
      "http://172.22.64.11/49_modelchange/49_mdlchn_api/api/get/cus",
    );
    customer_list.value = res.data;
    // console.log(customer_list.value);
  } catch (error) {
    console.log(error);
  }
};
// const exportToExcel = () => {
//   const now = new Date();

//   const dateTime = dayjs(now).format("YYYY-MM-DD");

//   // สมมติใช้ WON_CHANGE จาก record แรก
//   const wonChange = tableItems.value[0]?.OPR_HREC_WON_CHANGE || "REPORT";

//   const fileName = `REPORT_RF_${dateTime}.xlsx`;

//   const data = tableItems.value.map((item: any) => ({
//     หมายเลขเอกสาร: formatIssueNo(item.OPR_HREC_ISSUENO),
//     วันที่บันทึก: item.OPR_HREC_DATEREC,
//     Line: item.OPR_HREC_LINE,
//     Customer: item.OPR_HREC_CUS,
//     Process: item.OPR_HREC_PROCS,
//     "WON Change": item.OPR_HREC_WON_CHANGE,
//     "Model Change": item.OPR_HREC_CHNMDLNM,
//     "Lot Size": item.OPR_HREC_LOTS_CHN,
//     Shots: getShots(item.OPR_HREC_WON_CHANGE, item.OPR_HREC_LOTS_CHN),
//     "Metal Mask Number": item.TEC_RFHREC_PRINTMMREF,
//   }));

//   const worksheet = XLSX.utils.json_to_sheet(data);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

//   XLSX.writeFile(workbook, fileName);
// };

const exportToExcel = () => {
  const now = new Date();
  const dateTime = dayjs(now).format("YYYY-MM-DD");

  const fileName = `REPORT_RF_${dateTime}.xlsx`;

  // ⭐ ใช้ source data จริง ไม่ใช่ table pagination
  const allRows = Object.values(groups.value);

  const data = allRows.map((item: any) => ({
    หมายเลขเอกสาร: formatIssueNo(item.OPR_HREC_ISSUENO),
    วันที่บันทึก: item.OPR_HREC_DATEREC,
    Line: item.OPR_HREC_LINE,
    Customer: item.OPR_HREC_CUS,
    "Process Doc": item.OPR_HREC_PROCS,
    "Process Current": item.OPR_HREC_PROCS_RF,
    "Process Change": item.OPR_HREC_PROCS_RF_CHN,
    "WON Change": item.OPR_HREC_WON_CHANGE,
    "Model Change": item.OPR_HREC_CHNMDLNM,
    "Lot Size": item.OPR_HREC_LOTS_CHN,
    Shots: getShots(item.OPR_HREC_WON_CHANGE, item.OPR_HREC_LOTS_CHN),
    "Metal Mask Number": item.TEC_RFHREC_PRINTMMREF,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  XLSX.writeFile(workbook, fileName);
};

const timeformat = (time: string) => {
  return dayjs(time).format("HH:mm");
};

const DateAndTimeformat = (time: string) => {
  return dayjs(time).format("DD/MM/YYYY HH:mm");
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

const fetchBlockSheetWon = async () => {
  try {
    const res = await axios.get(
      "http://172.22.64.11/49_modelchange/49_mdlchn_api/api/get/modelname",
    );

    won.value = res.data.map((row: any) => ({
      won: row.WON?.trim(),
      qty: Number(row.MDLQTY),
    }));

    console.log("won data:", won.value);
  } catch (error) {
    console.log(error);
  }
};
const getShots = (wonNo: string, lot: number) => {
  if (!wonNo || !lot) return "-";

  const found = won.value.find((w) => w.won === wonNo.trim());

  if (!found) return "-";

  const shots = lot / found.qty;

  return Math.floor(shots).toLocaleString();
};

onMounted(async () => {
  await GetUsersWeb();
  await fetchApiLine();
  await fetchApiCustomer();
  await fetchReportRF();
  await fetchReportRFNoComplete();
  await fetchBlockSheetWon();
});
// Items for DataTable
const tableItems = computed(() => Object.values(groups.value));
const tableItemsNoComplete = computed(() =>
  Object.values(group_no_complete.value),
);
</script>
