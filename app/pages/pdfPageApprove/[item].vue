<template>
  <div class="a4-page mx-auto bg-white p-9 shadow-lg">
    <div class="flex justify-end items-center mb-2">
      <p v-if="listData?.OPR_HREC_PROCS === 'CP'">F-AM-064 Rev.08</p>
      <p v-else>F-AM-008 Rev.20</p>
    </div>
    <h3 class="text-center font-bold text-xl">
      MODEL CHANGE RECORD SMT PROCESS :
      <span v-if="listData?.OPR_HREC_PROCS === 'CP'">B-SMT</span>
      <span v-else>RF</span>
    </h3>

    <div class="p-4 mt-4">
      <div class="grid grid-cols-3 gap-5">
        <div class="flex gap-1">
          <p class="font-semibold">Line:</p>
          <p>{{ listData?.OPR_HREC_LINE }}</p>
        </div>
        <div class="flex gap-1">
          <p class="font-semibold">Date:</p>
          <p v-if="listData?.OPR_HREC_UPDATELSTDT === null">
            {{ dayjs(listData?.OPR_HREC_LSTDT).format("DD/MM/YYYY") }}
          </p>
          <p v-else>
            {{ dayjs(listData?.OPR_HREC_UPDATELSTDT).format("DD/MM/YYYY") }}
          </p>
        </div>
        <div class="flex gap-1">
          <p class="font-semibold">Document No:</p>
          <p>{{ listData?.OPR_HREC_ISSUENO?.split("-").pop().slice(-3) }}</p>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-5 mt-3">
        <div class="flex lg:flex-row flex-col gap-3">
          <p class="font-semibold">Status Plan:</p>
          <div class="flex gap-4">
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_STATUSMDL === 'Urgent'"
                disabled
              />
              <p>Urgent</p>
            </div>
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_STATUSMDL === 'Normal'"
                disabled
              />
              <p>Normal</p>
            </div>
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_STATUSMDL === 'New line'"
                disabled
              />
              <p>New Line</p>
            </div>
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_STATUSMDL === 'New model'"
                disabled
              />
              <p>New Model</p>
            </div>
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_STATUSMDL === 'Over Plan'"
                disabled
              />
              <p>Over Plan</p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5 mt-3">
        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <p class="font-semibold">Current Model:</p>
            <p>{{ listData?.OPR_HREC_CURMDLNM }}</p>
          </div>
          <div class="flex lg:flex-row flex-col gap-2">
            <div class="flex gap-2">
              <p class="font-semibold">Work Order Current:</p>
              <p>{{ listData?.OPR_HREC_WON_CURRENT }}</p>
            </div>
            <div class="flex gap-2">
              <p class="font-semibold">Lot size:</p>
              <p>{{ listData?.OPR_HREC_LOTS }}</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <p class="font-semibold">Change Model:</p>
            <p>{{ listData?.OPR_HREC_CHNMDLNM }}</p>
          </div>
          <div class="flex lg:flex-row flex-col gap-2">
            <div class="flex gap-2">
              <p class="font-semibold">Work Order New:</p>
              <p>{{ listData?.OPR_HREC_WON_CHANGE }}</p>
            </div>
            <div class="flex gap-2">
              <p class="font-semibold">Lot size:</p>
              <p>{{ listData?.OPR_HREC_LOTS_CHN }}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-2 gap-5 mt-3"
        v-if="listData?.OPR_HREC_PROCS === 'CP'"
      >
        <div class="flex gap-2">
          <p class="font-semibold">Process:</p>
          <div class="flex gap-4">
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_PROCSCP === 'CP'"
                disabled
              />
              <p>CP</p>
            </div>
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_PROCSCP === 'RF'"
                disabled
              />
              <p>RF</p>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <p class="font-semibold">Process:</p>
          <div class="flex gap-4">
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_PROCSCP_CHN === 'CP'"
                disabled
              />
              <p>CP</p>
            </div>
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_PROCSCP_CHN === 'RF'"
                disabled
              />
              <p>RF</p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5 mt-3" v-else>
        <div class="flex gap-2">
          <p class="font-semibold">Process:</p>
          <div class="flex gap-4">
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_PROCS_RF === 'CP'"
                disabled
              />
              <p>CP</p>
            </div>
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_PROCS_RF === 'RF'"
                disabled
              />
              <p>RF</p>
            </div>
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_PROCS_RF === 'RF1'"
                disabled
              />
              <p>RF1</p>
            </div>
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_PROCS_RF === 'RF2'"
                disabled
              />
              <p>RF2</p>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <p class="font-semibold">Process:</p>
          <div class="flex gap-4">
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_PROCS_RF_CHN === 'CP'"
                disabled
              />
              <p>CP</p>
            </div>
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_PROCS_RF_CHN === 'RF'"
                disabled
              />
              <p>RF</p>
            </div>
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_PROCS_RF_CHN === 'RF1'"
                disabled
              />
              <p>RF1</p>
            </div>
            <div class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.OPR_HREC_PROCS_RF_CHN === 'RF2'"
                disabled
              />
              <p>RF2</p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5 mt-3">
        <div class="flex gap-3">
          <p class="font-semibold">ECN Control:</p>
          <p>{{ listData?.OPR_HREC_CONTECN }}</p>
        </div>
        <div class="flex gap-3" v-if="listData?.OPR_HREC_CONTECN === 'Have'">
          <div class="flex gap-3">
            <div class="flex gap-1">
              <p class="font-semibold">ECN Number:</p>
              <p>{{ listData?.OPR_HREC_HAVECONTECN_NO }}</p>
            </div>
            <div class="flex gap-1">
              <p class="font-semibold">ECN REV:</p>
              <p>{{ listData?.OPR_HREC_HAVECONTECN_REV }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5 mt-3">
        <div class="flex gap-3">
          <p class="font-semibold">Program name:</p>
          <p>{{ listData?.OPR_HREC_PRGMNM }}</p>
        </div>
        <div class="flex gap-3">
          <p class="font-semibold">Revision:</p>
          <p>{{ listData?.OPR_HREC_REVNO }}</p>
        </div>
        <div class="flex gap-3">
          <p class="font-semibold">PCB Number:</p>
          <p>{{ listData?.OPR_HREC_PRGMREV }}</p>
        </div>
      </div>
    </div>
    <hr class="border border-gray-300 mt-2 mb-2" />
    <div class="p-4 space-y-5">
      <!-- TODO: Loader Input CP&RF -->
      <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1">
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">1. Loader Input</h3>
          <div class="flex gap-2">
            <div
              class="flex gap-1 items-center"
              v-if="listData?.OPR_HREC_PROCS === 'CP'"
            >
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.TEC_CPHREC_LOADINP === 'Use'"
                disabled
              />
              <p>Use</p>
            </div>
            <div
              class="flex gap-1 items-center"
              v-if="listData?.OPR_HREC_PROCS === 'RF'"
            >
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.TEC_RFHREC_LOADINP === 'Use'"
                disabled
              />
              <p>Use</p>
            </div>
            <div
              class="flex gap-1 items-center"
              v-if="listData?.OPR_HREC_PROCS === 'CP'"
            >
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.TEC_CPHREC_LOADINP === 'Not Use'"
                disabled
              />
              <p>Not Use</p>
            </div>
            <div
              class="flex gap-1 items-center"
              v-if="listData?.OPR_HREC_PROCS === 'RF'"
            >
              <input
                type="checkbox"
                class="w-4 h-4 disabled:opacity-100"
                :checked="listData?.TEC_RFHREC_LOADINP === 'Not Use'"
                disabled
              />
              <p>Not Use</p>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="
            listData?.TEC_CPHREC_LOADINP === 'Use' ||
            listData?.TEC_RFHREC_LOADINP === 'Use'
          "
        >
          <h3 class="font-semibold invisible">Placeholder</h3>
          <div class="flex gap-2" v-if="listData?.OPR_HREC_PROCS === 'CP'">
            <h3 class="font-semibold">Pitch Setting:</h3>
            <p>{{ listData?.TEC_CPHREC_LOADINPPITCH }}</p>
          </div>
          <div class="flex gap-2" v-if="listData?.OPR_HREC_PROCS === 'RF'">
            <h3 class="font-semibold">Pitch Setting:</h3>
            <p>{{ listData?.TEC_RFHREC_LOADINPPITCH }}</p>
          </div>
        </div>
      </div>
      <!-- TODO: Stack CP&RF -->
      <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1">
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">2.Stack</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div
                class="flex gap-1 items-center"
                v-if="listData?.OPR_HREC_PROCS === 'CP'"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_STACK === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>
              <div
                class="flex gap-1 items-center"
                v-if="listData?.OPR_HREC_PROCS === 'RF'"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_STACK === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>
              <div
                class="flex gap-1 items-center"
                v-if="listData?.OPR_HREC_PROCS === 'CP'"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_STACK === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
              <div
                class="flex gap-1 items-center"
                v-if="listData?.OPR_HREC_PROCS === 'RF'"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_STACK === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- TODO: Traaceability Input CP&RF -->
      <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1">
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">3. Traceability Input</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div
                class="flex gap-1 items-center"
                v-if="listData?.OPR_HREC_PROCS === 'CP'"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_TRACEINP === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>
              <div
                class="flex gap-1 items-center"
                v-if="listData?.OPR_HREC_PROCS === 'RF'"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_TRACEINP === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>
              <div
                class="flex gap-1 items-center"
                v-if="listData?.OPR_HREC_PROCS === 'CP'"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_TRACEINP === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
              <div
                class="flex gap-1 items-center"
                v-if="listData?.OPR_HREC_PROCS === 'RF'"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_TRACEINP === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- TODO: PCB Cleaning Input CP&RF -->
      <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1">
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">4. PCB Cleaning</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div
                class="flex gap-1 items-center"
                v-if="listData?.OPR_HREC_PROCS === 'CP'"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_PCBCLEAN === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>
              <div
                class="flex gap-1 items-center"
                v-if="listData?.OPR_HREC_PROCS === 'RF'"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_PCBCLEAN === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>
              <div
                class="flex gap-1 items-center"
                v-if="listData?.OPR_HREC_PROCS === 'CP'"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_PCBCLEAN === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
              <div
                class="flex gap-1 items-center"
                v-if="listData?.OPR_HREC_PROCS === 'RF'"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_PCBCLEAN === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="
            listData?.TEC_CPHREC_PCBCLEAN === 'Use' ||
            listData?.TEC_RFHREC_PCBCLEAN === 'Use'
          "
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Function:</p>
            <p v-if="listData?.OPR_HREC_PROCS === 'CP'">
              {{ listData?.TEC_CPHREC_PCBCLNFUNC }}
            </p>
            <p v-if="listData?.OPR_HREC_PROCS === 'RF'">
              {{ listData?.TEC_RFHREC_PCBCLNFUNC }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Glue (M/C #1) CP -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'CP'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">5. Glue (M/C #1)</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_GLUE === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_GLUE === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_CPHREC_GLUEPROG }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Glue Number:</p>
            <p>
              {{ listData?.TEC_CPHREC_GLUENUM }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Head Unit:</p>
            <p>
              {{ listData?.TEC_CPHREC_GLUEHUNIT }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Backup pin standard no.:</p>
            <p>
              {{ listData?.TEC_CPHREC_GLUESTDNOT || "-" }}
            </p>
            <p>
              {{ "(" + (listData?.TEC_CPHREC_GLUESTDOK || "-") + ")" }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Printer RF -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'RF'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">5. Printer</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_PRINT === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_PRINT === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_RFHREC_PRINTPROG }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Metal Mask Number:</p>
            <p>
              {{ listData?.TEC_RFHREC_PRINTMMREF }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Squeegee:</p>
            <p>
              {{ listData?.TEC_RFHREC_PRINTSQUE }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Support PCB:</p>
            <p>
              {{ listData?.TEC_RFHREC_PRINTSUPT }}
            </p>
          </div>
          <div class="flex gap-2" v-if="listData?.TEC_RFHREC_PINPIC">
            <img
              class="w-48"
              :src="`http://172.22.64.11/49_modelchange/49_mdlchn_api/images/${listData?.TEC_RFHREC_PINPIC}`"
              alt=""
              @click="
                imgClick = `http://172.22.64.11/49_modelchange/49_mdlchn_api/images/${listData?.TEC_RFHREC_PINPIC}`
              "
            />
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Solder plate number:</p>
            <p>
              {{ listData?.TEC_RFHREC_PRINTSOLDER }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Glue (M/C #2) CP -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'CP'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">6. Glue (M/C #2)</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_GLUESND === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_GLUESND === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_CPHREC_GLUESNDPROG }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Glue Number:</p>
            <p>
              {{ listData?.TEC_CPHREC_GLUESNDNUM }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Head Unit:</p>
            <p>
              {{ listData?.TEC_CPHREC_GLUESNDHUNIT }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Backup pin standard no.:</p>
            <p>
              {{ listData?.TEC_CPHREC_GLUESNDNOT || "-" }}
            </p>
            <p>
              {{ "(" + (listData?.TEC_CPHREC_GLUESNDOK || "-") + ")" }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Glue RF -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'RF'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">6. Glue</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_GLUE === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_GLUE === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_RFHREC_GLUE === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_RFHREC_GLUEPROG }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Glue number:</p>
            <p>
              {{ listData?.TEC_RFHREC_GLUENUM }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Solder plate inspection RF -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'RF'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">7. Solder plate inspection</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_SOLDERINSP === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_SOLDERINSP === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_RFHREC_SOLDERINSP === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_RFHREC_SOLDERPROG }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Mounter (M/C #1) CP -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'CP'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">7. Mounter (M/C #1)</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_MNTF === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_MNTF === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_CPHREC_MNTF === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_CPHREC_MNTFPROG }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Nozzle Setting:</p>
            <p>
              {{ listData?.TEC_CPHREC_MNTFNOZ }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Support PCB:</p>
            <p>
              {{ listData?.TEC_CPHREC_MNTFSUPT }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Mounter (M/C #2) CP -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'CP'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">8. Mounter (M/C #2)</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_MNTSN === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_MNTSN === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_CPHREC_MNTSN === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_CPHREC_MNTSNPROG }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Nozzle Setting:</p>
            <p>
              {{ listData?.TEC_CPHREC_MNTSNNOZ }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Support PCB:</p>
            <p>
              {{ listData?.TEC_CPHREC_MNTSNSUPT }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Mounter (M/C #3) CP -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'CP'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">9. Mounter (M/C #3)</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_MNTTR === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_MNTTR === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_CPHREC_MNTTR === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_CPHREC_MNTTRPROG }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Nozzle Setting:</p>
            <p>
              {{ listData?.TEC_CPHREC_MNTTRNOZ }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Support PCB:</p>
            <p>
              {{ listData?.TEC_CPHREC_MNTTRSUPT }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Mounter (M/C #4) CP -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'CP'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">10. Mounter (M/C #4)</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_MNTFO === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_MNTFO === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_CPHREC_MNTFO === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_CPHREC_MNTFOPROG }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Nozzle Setting:</p>
            <p>
              {{ listData?.TEC_CPHREC_MNTFONOZ }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Support PCB:</p>
            <p>
              {{ listData?.TEC_CPHREC_MNTFOSUPT }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Mounter (M/C #1) RF -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'RF'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">8. Mounter (M/C #1)</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_MNTF === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_MNTF === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_RFHREC_MNTF === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_RFHREC_MNTFPROG }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Nozzle Setting:</p>
            <p>
              {{ listData?.TEC_RFHREC_MNTFNOZ }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Support PCB:</p>
            <p>
              {{ listData?.TEC_RFHREC_MNTFSUPT }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Mounter (M/C #2) RF -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'RF'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">9. Mounter (M/C #2)</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_MNTSN === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_MNTSN === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_RFHREC_MNTSN === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_RFHREC_MNTSNPROG }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Nozzle Setting:</p>
            <p>
              {{ listData?.TEC_RFHREC_MNTSNNOZ }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Support PCB:</p>
            <p>
              {{ listData?.TEC_RFHREC_MNTSNSUPT }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Mounter (M/C #3) RF -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'RF'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">10. Mounter (M/C #3)</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_MNTTR === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_MNTTR === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_RFHREC_MNTTR === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_RFHREC_MNTTRPROG }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Nozzle Setting:</p>
            <p>
              {{ listData?.TEC_RFHREC_MNTTRNOZ }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Support PCB:</p>
            <p>
              {{ listData?.TEC_RFHREC_MNTTRSUPT }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Mounter (M/C #4) RF -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'RF'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">11. Mounter (M/C #4)</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_MNTFO === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_MNTFO === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_RFHREC_MNTFO === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_RFHREC_MNTFOPROG }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Nozzle Setting:</p>
            <p>
              {{ listData?.TEC_RFHREC_MNTFONOZ }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Support PCB:</p>
            <p>
              {{ listData?.TEC_RFHREC_MNTFOSUPT }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Mounter Inspector CP -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'CP'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">11. Mounter Inspector</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_MNTINSP === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_MNTINSP === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_CPHREC_MNTINSP === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_CPHREC_MNTINSPPROG }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Mounter Inspector RF -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'RF'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">12. Mounter Inspector</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_MNTINSP === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_MNTINSP === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_RFHREC_MNTINSP === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_RFHREC_MNTINSPPROG }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Reflow CP -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'CP'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">12. Reflow</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_REFLOW === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_REFLOW === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_CPHREC_REFLOW === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_CPHREC_REFLPROG }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Oxygen:</p>
            <p>
              {{ listData?.TEC_CPHREC_REFLOXYGEN }}
            </p>
            <p v-if="listData?.TEC_CPHREC_REFLOXYGEN === 'Use'">
              , {{ listData?.TEC_CPHREC_REFLUSEOO }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">PCB Supporter:</p>
            <p>
              {{ listData?.TEC_CPHREC_REFLPCBSUPT }}
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <p class="font-semibold">Temperature Profile:</p>
            <div class="grid grid-cols-3 gap-3">
              <div class="flex flex-col gap-2">
                <p class="font-semibold underline">Channel</p>
                <p
                  v-for="(item, index) in 10"
                  :key="index"
                  class="font-semibold"
                >
                  CH {{ index + 1 }}
                </p>
              </div>
              <div class="flex flex-col gap-2">
                <p class="font-semibold underline">TOP Side (°C)</p>
                <p v-for="(item, index) in 10" :key="index">
                  {{ topTemps[index] }}
                </p>
              </div>
              <div class="flex flex-col gap-2">
                <p class="font-semibold underline">BOTTOM Side (°C)</p>
                <p v-for="(item, index) in 10" :key="index">
                  {{ bottomTemps[index] }}
                </p>
              </div>
            </div>
            <div class="flex gap-2">
              <p class="font-semibold">Conveyor Speed:</p>
              <p>
                {{ Number(listData?.TEC_CPHREC_CONV_SPD).toFixed(2) }} m/min
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- TODO: Reflow RF -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'RF'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">13. Reflow</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_REFLOW === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_REFLOW === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_RFHREC_REFLOW === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_RFHREC_REFLPROG }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Oxygen:</p>
            <p>
              {{ listData?.TEC_RFHREC_REFLOXYGEN }}
            </p>
            <p v-if="listData?.TEC_RFHREC_REFLOXYGEN === 'Use'">
              , <span class="font-semibold">Oxygen Use:</span>
              {{ listData?.TEC_RFHREC_REFLOO }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">PCB Supporter:</p>
            <p>
              {{ listData?.TEC_RFHREC_REFLPCBSUPT }}
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <p class="font-semibold">Temperature Profile:</p>
            <div class="grid grid-cols-3 gap-3">
              <div class="flex flex-col gap-2">
                <p class="font-semibold underline">Channel</p>
                <p
                  v-for="(item, index) in 10"
                  :key="index"
                  class="font-semibold"
                >
                  CH {{ index + 1 }}
                </p>
              </div>
              <div class="flex flex-col gap-2">
                <p class="font-semibold underline">TOP Side (°C)</p>
                <p v-for="(item, index) in 10" :key="index">
                  {{ topTempsRF[index] }}
                </p>
              </div>
              <div class="flex flex-col gap-2">
                <p class="font-semibold underline">BOTTOM Side (°C)</p>
                <p v-for="(item, index) in 10" :key="index">
                  {{ bottomTempsRF[index] }}
                </p>
              </div>
            </div>
            <div class="flex gap-2">
              <p class="font-semibold">Conveyor Speed:</p>
              <p>
                {{ Number(listData?.TEC_RFHREC_CONV_SPD).toFixed(2) }} m/min
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- TODO: PCB Cooling CP -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'CP'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">13. PCB Cooling</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_PCBCOOL === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_PCBCOOL === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- TODO: PCB Cooling RF -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'RF'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">14. PCB Cooling</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_PCBCOOL === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_PCBCOOL === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- TODO: Auto Optic Inspection CP -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'CP'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">14. Auto Optic Inspection</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_AUTO === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_AUTO === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_CPHREC_AUTO === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_CPHREC_AUTOPROG }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Auto Optic Inspection RF -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'RF'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">15. Auto Optic Inspection</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_AUTO === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_AUTO === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_RFHREC_AUTO === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Program name:</p>
            <p>
              {{ listData?.TEC_RFHREC_AUTOPROG }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: NG Stocker CP -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'CP'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">15. NG Stocker</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_NGSTCK === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_NGSTCK === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_CPHREC_NGSTCK === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Pitch Setting:</p>
            <p>
              {{ listData?.TEC_CPHREC_NGSTCKPITCH }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: NG Stocker RF -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'RF'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">16. NG Stocker</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_NGSTCK === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_NGSTCK === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_RFHREC_NGSTCK === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Pitch Setting:</p>
            <p>
              {{ listData?.TEC_RFHREC_NGSTCKPITCH }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Traceability Input CP -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'CP'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">16. Traceability Input</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_TRACE === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_TRACE === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- TODO: Traceability Input RF -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'RF'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">17. Traceability Input</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_TRACE === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_TRACE === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- TODO: Unloader Input CP -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'CP'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">17. Unloader Input</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_UNLOADER === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_CPHREC_UNLOADER === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_CPHREC_NGSTCK === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Pitch Setting:</p>
            <p>
              {{ listData?.TEC_CPHREC_UNLOADERPITCH }}
            </p>
          </div>
        </div>
      </div>
      <!-- TODO: Unloader Input RF -->
      <div
        class="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-1"
        v-if="listData?.OPR_HREC_PROCS === 'RF'"
      >
        <div class="flex flex-col gap-3">
          <h3 class="font-semibold">18. Unloader Input</h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_UNLOADER === 'Use'"
                  disabled
                />
                <p>Use</p>
              </div>

              <div class="flex gap-1 items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 disabled:opacity-100"
                  :checked="listData?.TEC_RFHREC_UNLOADER === 'Not Use'"
                  disabled
                />
                <p>Not Use</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-3"
          v-if="listData?.TEC_RFHREC_UNLOADER === 'Use'"
        >
          <h3 class="font-semibold invisible">PlaceHolder</h3>
          <div class="flex gap-2">
            <p class="font-semibold">Pitch Setting:</p>
            <p>
              {{ listData?.TEC_RFHREC_UNLOADERPITCH }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="imgClick"
        @click.self="imgClick = null"
        class="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      >
        <div class="relative max-w-[90vw] max-h-[90vh]">
          <button
            @click="imgClick = null"
            class="absolute -top-4 -right-4 w-9 h-9 flex items-center justify-center bg-white text-gray-700 rounded-full shadow-lg hover:bg-rose-500 hover:text-white transition z-10 cursor-pointer"
          >
            <span> ✕ </span>
          </button>
          <img
            :src="imgClick"
            alt=""
            class="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">


import axios from "axios";
import { useRoute } from "vue-router";
import dayjs from "dayjs";

const route = useRoute();
const id = route.params.item;
const config = useRuntimeConfig();
const imgClick = ref<string | null>(null);

/**
 * TODO: ดึงข้อมูลทั้งหมดจาก API GetAllData
 */

const listData = ref<any | null>(null);
const getData = async () => {
  try {
    const res = await axios.get(`${config.public.apiBase}/api/get/alldata`);

    console.log(res.data);

    const cp = Array.isArray(res.data.cp) ? res.data.cp : [];
    const rf = Array.isArray(res.data.rf) ? res.data.rf : [];

    const all_data = [...cp, ...rf];

    const data = all_data.find((item: any) => item?.OPR_HREC_ID === id);

    listData.value = data;

    console.log(listData.value);
  } catch (error) {
    console.log(error);
  }
};

/**
 * TODO: แสดงข้อมูลลำดับ channel ของ top
 */

const topTemps = computed(() => {
  if (!listData.value) return [];

  return Array.from({ length: 10 }, (_, i) => {
    return listData.value[`TEC_CPHREC_TOP_TEMPCH${i + 1}`];
  });
});

const topTempsRF = computed(() => {
  if (!listData.value) return [];

  return Array.from({ length: 10 }, (_, i) => {
    return listData.value[`TEC_RFHREC_TOP_TEMPCH${i + 1}`];
  });
});

/**
 * TODO: แสดงข้อมูลลำดับ channel ของ bottom
 */

const bottomTemps = computed(() => {
  if (!listData.value) return [];

  return Array.from({ length: 10 }, (_, i) => {
    return listData.value[`TEC_CPHREC_BTM_TEMPCH${i + 1}`];
  });
});

const bottomTempsRF = computed(() => {
  if (!listData.value) return [];

  return Array.from({ length: 10 }, (_, i) => {
    return listData.value[`TEC_RFHREC_BTM_TEMPCH${i + 1}`];
  });
});

onMounted(async () => {
  await getData();
});
</script>

<style scoped></style>
