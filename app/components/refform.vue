<template>
  <v-form @submit.prevent="handleRFSubmit">
    <!-- <v-btn width="200" rounded="md" @click="clearForm" color="teal" class="mt-1">
      <template #prepend>
        <v-icon class="mdi mdi-format-clear"></v-icon>
      </template>
<h1 class="text-md">Clear Form</h1>
</v-btn> -->
    <div class="flex gap-3 align-center mt-2">
      <div class="flex gap-2 align-center">
        <h1>Employee ID :</h1>
        <span>
          <input
            type="text"
            class="w-full px-3 py-2 border border-gray-800 rounded-lg focus:outline-none"
            v-model="empno"
          />
        </span>
      </div>

      <div class="px-3 py-2 border rounded-lg">
        <h1>Work Order of Change: {{ won_chn }}</h1>
      </div>
      <div class="px-3 py-2 border rounded-lg">
        <h1>Model Name of Change : {{ model_chn }}</h1>
      </div>
    </div>
    <div class="mt-2 mb-2 flex gap-2">
      <div>
        <div>Start Machine</div>
        <input
          type="time"
          v-model="start_machine"
          class="w-full px-10 py-4 text-lg text-base placeholder-gray-400 transition-colors bg-white border border-gray-300 rounded focus:outline-none"
        />
      </div>
      <div>
        <div>Finish Machine</div>
        <input
          type="time"
          v-model="finish_machine"
          class="w-full px-10 py-4 text-lg text-base placeholder-gray-400 transition-colors bg-white border border-gray-300 rounded focus:outline-none"
        />
      </div>
    </div>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">1) Loader Input</div>
        <v-radio-group inline class="gap-4" v-model="load_inp">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="6" md="4" v-if="pitch_std">
        <div class="mt-3 font-semibold">Pitch Setting</div>
        <v-radio-group inline class="gap-4" v-model="pitch_rf">
          <v-radio label="10 mm." value="10 mm."></v-radio>
          <v-radio label="20 mm." value="20 mm."></v-radio>
          <v-radio label="30 mm." value="30 mm."></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">2) Stacker</div>
        <v-radio-group inline class="gap-4" v-model="stack_inp">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">3) Traceability Input</div>
        <v-radio-group inline class="gap-4" v-model="trace_inp">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">4) PCB Cleaning</div>
        <v-radio-group inline class="gap-4" v-model="cln_inp">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="6" md="4" v-show="func_std">
        <div class="mt-3 font-semibold">Function</div>
        <v-select
          v-model="func"
          :items="funcPCB"
          item-title="name"
          item-value="name"
          chips
          multiple
          clearable
          @update:model-value="func = func.filter((v) => v !== '')"
        />

        <!-- <p>{{ func }}</p> -->
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="etc_details"
          label="Etc."
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">5) Printer</div>
        <v-radio-group inline class="gap-4" v-model="printer_std">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="4" v-if="printer_std_use">
        <div class="mt-3 font-semibold">5.1 Program name</div>
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="printer_prg"
        />
        <!-- <v-radio-group inline class="gap-4" v-model="printer_prg">
            <v-radio :label="props.pcbno" :value="props.pcbno"></v-radio>
          </v-radio-group> -->
        <div class="mt-3 font-semibold">5.2 Metal Mask</div>
        <!-- <v-radio-group inline class="gap-4" v-model="metalmask">
          <v-radio
            label="Reference PCB Number"
            value="Reference PCB Number"
          ></v-radio>
          <v-radio label="REF#." value="REF"></v-radio>
        </v-radio-group> -->
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="ref_mm"
          :rules="[
            (v) => !!v || 'กรุณากรอกข้อมูล',
            (v) => (v && v.length === 3) || 'ต้องกรอก 3 ตัวอักษร',
          ]"
          maxlength="3"
        />
        <div class="mt-3 font-semibold">5.3 Squeegee</div>
        <v-radio-group inline class="gap-4" v-model="squee">
          <v-radio label="Good condition" value="Good condition"></v-radio>
        </v-radio-group>
        <div class="mt-3 font-semibold">5.4 Support PCB</div>
        <v-radio-group inline class="gap-4" v-model="sup_rf">
          <v-radio label="Backup plate" value="Backup plate"></v-radio>
          <v-radio label="Backup pin" value="Backup pin"></v-radio>
        </v-radio-group>
        <div v-if="sup_rf === 'Backup pin'">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="flex flex-col gap-2">
              <label>
                Image:
                <span class="text-red-500 mr-2">
                  * (บังคับต้องถ่ายรูปหรือเลือกรูปภาพ)
                </span>
              </label>

              <!-- MOBILE / TABLET -->
              <div
                v-if="isMobileOrTablet && !isCameraOpen"
                class="flex flex-col items-center gap-2"
              >
                <!-- ปุ่มเปิดกล้อง -->
                <button
                  type="button"
                  @click="startCamera"
                  class="flex items-center gap-2 cursor-pointer border border-dashed border-gray-400 rounded-md px-3 py-4 text-gray-500 hover:bg-gray-50 justify-center w-full"
                >
                  <Camera :size="20" />
                  <span>ถ่ายรูป</span>
                </button>

                <!-- ปุ่มเลือกไฟล์ -->
                <button
                  type="button"
                  @click="fileInput?.click()"
                  class="flex items-center gap-2 cursor-pointer border border-dashed border-gray-400 rounded-md px-3 py-4 text-gray-500 hover:bg-gray-50 justify-center w-full"
                >
                  <Image :size="20" />
                  หรือเลือกรูปจากเครื่อง
                </button>

                <!-- input ซ่อน -->
                <input
                  ref="fileInput"
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="handleImageUpload"
                />
              </div>

              <!-- DESKTOP → เลือกไฟล์ -->
              <label
                v-else-if="!isMobileOrTablet"
                class="flex items-center gap-2 cursor-pointer border border-dashed border-gray-400 rounded-md px-3 py-4 text-gray-500 hover:bg-gray-50 justify-center"
              >
                <Camera :size="20" />
                <span>เลือกรูปภาพ</span>
                <input
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="handleImageUpload"
                />
              </label>

              <!-- FULLSCREEN CAMERA -->
              <div
                v-if="isCameraOpen"
                class="fixed inset-0 bg-black z-50 flex flex-col justify-between"
              >
                <!-- กล้อง -->
                <video
                  ref="video"
                  autoplay
                  playsinline
                  class="w-full h-full object-cover"
                ></video>

                <!-- ปุ่มควบคุม -->
                <div
                  class="absolute bottom-0 left-0 w-full flex justify-center items-center gap-6 pb-6"
                >
                  <!-- ยกเลิก -->
                  <button
                    type="button"
                    @click="stopCamera"
                    class="bg-white/20 backdrop-blur text-white px-5 py-2 rounded-full"
                  >
                    ยกเลิก
                  </button>

                  <!-- ปุ่มถ่ายรูป -->
                  <button
                    type="button"
                    @click="takePhoto"
                    class="w-16 h-16 rounded-full bg-white border-4 border-gray-300"
                  ></button>
                </div>
              </div>
            </div>

            <!-- Preview -->
            <div class="flex flex-col gap-1 col-span-2 items-center">
              <img
                v-if="imagePreview"
                :src="imagePreview"
                alt="image"
                class="max-w-full max-h-[300px] object-contain"
              />

              <!-- ปุ่มหลังถ่าย -->
              <div v-if="imagePreview" class="flex gap-2 mt-2">
                <button
                  type="button"
                  @click="retake"
                  class="bg-red-500 text-white px-4 py-2 rounded"
                >
                  ถ่ายใหม่
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3 font-semibold">5.5 Solder plate number</div>
        <v-select
          v-model="solder"
          variant="outlined"
          rounded="md"
          :items="db_solder"
          item-title="SAG_SUBMATNUM"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">6) Glue</div>
        <v-radio-group inline class="gap-4" v-model="glue_rf">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="4" v-if="glue_ref_use">
        <div class="mt-3 font-semibold">6.1 Program name</div>

        <v-text-field variant="outlined" density="compact" v-model="glue_prg" />
        <!-- <v-radio-group inline class="gap-4" v-model="glue_prg">
            <v-radio  :value="props.prgnm"></v-radio>
          </v-radio-group> -->
        <div class="mt-3 font-semibold">6.2 Glue number</div>
        <v-select
          v-model="glue_num"
          variant="outlined"
          rounded="md"
          :items="db_glue"
          item-title="SAG_SUBMATNUM"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">7) Solder plate inspection</div>
        <v-radio-group inline class="gap-4" v-model="solder_use">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="4" v-if="solder_user_std">
        <div class="mt-3 font-semibold">Program name</div>
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="solder_prgnm"
          class="w-auto"
        />
        <!-- <v-radio-group inline class="gap-4" v-model="solder_prgnm">
            <v-radio  :value="props.prgnm"></v-radio>
          </v-radio-group> -->
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">8) Mounter (M/C #1)</div>
        <v-radio-group inline class="gap-4" v-model="mounter_ref_inp">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="4" v-if="mounter_ref_use">
        <div class="mt-3 font-semibold">8.1 Program name</div>
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="prg_ref_mount1"
        />
        <!-- <v-radio-group inline class="gap-4" v-model="prg_ref_mount1">
            <v-radio  :value="props.prgnm"></v-radio>
          </v-radio-group> -->
        <div class="mt-3 font-semibold">8.2 Nozzle setting</div>
        <v-radio-group inline class="gap-4" v-model="noz_ref_mount1">
          <v-radio label="Automatic" value="Automatic"></v-radio>
          <v-radio label="Manual" value="Manual"></v-radio>
        </v-radio-group>
        <div class="mt-3 font-semibold">8.3 Support PCB</div>
        <v-radio-group inline class="gap-4" v-model="sup_ref_mount1">
          <v-radio label="Pin" value="Pin"></v-radio>
          <v-radio label="Magnet" value="Magnet"></v-radio>
          <v-radio label="Sponge" value="Sponge"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">9) Mounter (M/C #2)</div>
        <v-radio-group inline class="gap-4" v-model="mounter2_ref_inp">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="4" v-if="mounter2_ref_use">
        <div class="mt-3 font-semibold">9.1 Program name</div>
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="prg_ref_mount2"
        />
        <!-- <v-radio-group inline class="gap-4" v-model="prg_ref_mount2">
            <v-radio  :value="props.prgnm"></v-radio>
          </v-radio-group> -->
        <div class="mt-3 font-semibold">9.2 Nozzle setting</div>
        <v-radio-group inline class="gap-4" v-model="noz_ref_mount2">
          <v-radio label="Automatic" value="Automatic"></v-radio>
          <v-radio label="Manual" value="Manual"></v-radio>
        </v-radio-group>
        <div class="mt-3 font-semibold">9.3 Support PCB</div>
        <v-radio-group inline class="gap-4" v-model="sup_ref_mount2">
          <v-radio label="Pin" value="Pin"></v-radio>
          <v-radio label="Magnet" value="Magnet"></v-radio>
          <v-radio label="Sponge" value="Sponge"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">10) Mounter (M/C #3)</div>
        <v-radio-group inline class="gap-4" v-model="mounter3_ref_inp">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="4" v-if="mounter3_ref_use">
        <div class="mt-3 font-semibold">10.1 Program name</div>
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="prg_ref_mount3"
        />
        <!-- <v-radio-group inline class="gap-4" v-model="prg_ref_mount3">
            <v-radio  :value="props.prgnm"></v-radio>
          </v-radio-group> -->
        <div class="mt-3 font-semibold">10.2 Nozzle setting</div>
        <v-radio-group inline class="gap-4" v-model="noz_ref_mount3">
          <v-radio label="Automatic" value="Automatic"></v-radio>
          <v-radio label="Manual" value="Manual"></v-radio>
        </v-radio-group>
        <div class="mt-3 font-semibold">10.3 Support PCB</div>
        <v-radio-group inline class="gap-4" v-model="sup_ref_mount3">
          <v-radio label="Pin" value="Pin"></v-radio>
          <v-radio label="Magnet" value="Magnet"></v-radio>
          <v-radio label="Sponge" value="Sponge"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">11) Mounter (M/C #4)</div>
        <v-radio-group inline class="gap-4" v-model="mounter4_ref_inp">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="4" v-if="mounter4_ref_use">
        <div class="mt-3 font-semibold">11.1 Program name</div>
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="prg_ref_mount4"
        />
        <!-- <v-radio-group inline class="gap-4" v-model="prg_ref_mount4">
            <v-radio  :value="props.prgnm"></v-radio>
          </v-radio-group> -->
        <div class="mt-3 font-semibold">11.2 Nozzle setting</div>
        <v-radio-group inline class="gap-4" v-model="noz_ref_mount4">
          <v-radio label="Automatic" value="Automatic"></v-radio>
          <v-radio label="Manual" value="Manual"></v-radio>
        </v-radio-group>
        <div class="mt-3 font-semibold">11.3 Support PCB</div>
        <v-radio-group inline class="gap-4" v-model="sup_ref_mount4">
          <v-radio label="Pin" value="Pin"></v-radio>
          <v-radio label="Magnet" value="Magnet"></v-radio>
          <v-radio label="Sponge" value="Sponge"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">12) Mounter Inspector</div>
        <v-radio-group inline class="gap-4" v-model="mounter_ref_inps">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="4" v-if="mounter_ref_inps_std">
        <div class="mt-3 font-semibold">12.1 Program name</div>
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="prg_ref_inspct"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">13) Reflow</div>
        <v-radio-group inline class="gap-4" v-model="reflow_rf_std">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>
      <div v-if="reflow_rf_use_std">
        <v-col cols="12" md="20">
          <div class="mt-3 font-semibold">13.1 Program name</div>
          <v-text-field
            variant="outlined"
            density="compact"
            v-model="prg_rf_reflow"
          />

          <div class="mt-3 font-semibold">13.2 Oxygen</div>
          <v-radio-group inline class="gap-4" v-model="oxygen_rf_reflow_std">
            <v-radio label="Use" value="Use"></v-radio>
            <v-radio label="Not Use" value="Not Use"></v-radio>
          </v-radio-group>
          <v-text-field
            variant="outlined"
            density="compact"
            v-model="oxyen_rf_use"
            v-if="oxygen_rf_std_use"
          />
          <div class="mt-3 font-semibold">13.3 PCB Supporter</div>
          <v-radio-group inline class="gap-4" v-model="sup_rf_reflow_std">
            <v-radio label="Use" value="Use"></v-radio>
            <v-radio label="Not Use" value="Not Use"></v-radio>
          </v-radio-group>
          <div class="mt-3 font-semibold">13.4 Temperature profile</div>
          <div class="flex justify-between gap-3">
            <div class="mt-2">
              <div>TOP Side</div>
              <div class="mt-3">CH-1</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_top_ch1"
              />
              <div class="mt-2">CH-2</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_top_ch2"
              />
              <div class="mt-2">CH-3</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_top_ch3"
              />
              <div class="mt-2">CH-4</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_top_ch4"
              />
              <div class="mt-2">CH-5</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_top_ch5"
              />
              <div class="mt-2">CH-6</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_top_ch6"
              />
              <div class="mt-2">CH-7</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_top_ch7"
              />
              <div class="mt-2">CH-8</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_top_ch8"
              />
              <div class="mt-2">CH-9</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_top_ch9"
              />
              <div class="mt-2">CH-10</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_top_ch10"
              />
              <div class="mt-2">Conveyor Speed</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_conveyor_speed"
                :step="0.01"
                :precision="2"
              />
            </div>
            <div class="mt-2">
              <div>BOTTOM Side</div>
              <div class="mt-3">CH-1</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_btm_ch1"
                :class="diffColorch1"
              />
              <div class="mt-2">CH-2</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_btm_ch2"
                :class="diffColorch2"
              />
              <div class="mt-2">CH-3</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_btm_ch3"
                :class="diffColorch3"
              />
              <div class="mt-2">CH-4</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_btm_ch4"
                :class="diffColorch4"
              />
              <div class="mt-2">CH-5</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_btm_ch5"
                :class="diffColorch5"
              />
              <div class="mt-2">CH-6</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_btm_ch6"
                :class="diffColorch6"
              />
              <div class="mt-2">CH-7</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_btm_ch7"
                :class="diffColorch7"
              />
              <div class="mt-2">CH-8</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_btm_ch8"
                :class="diffColorch8"
              />
              <div class="mt-2">CH-9</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_btm_ch9"
                :class="diffColorch9"
              />
              <div class="mt-2">CH-10</div>
              <v-number-input
                variant="outlined"
                density="compact"
                v-model="temp_rf_btm_ch10"
                :class="diffColorch10"
              />
            </div>
          </div>
        </v-col>
      </div>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">14) PCB Cooling</div>
        <v-radio-group inline class="gap-4" v-model="cooling_rf_std">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">15) Auto Optic Inspection</div>
        <v-radio-group inline class="gap-4" v-model="auto_rf_inps">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="4" v-if="auto_rf_inps_std">
        <div class="mt-3 font-semibold">Program name</div>
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="prg_rf_auto"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">16) NG Stocker</div>
        <v-radio-group inline class="gap-4" v-model="ng_stock_rf_std">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="4" v-if="ng_stock_rf_std_use">
        <div class="mt-3 font-semibold">Pitch Setting</div>
        <v-radio-group inline class="gap-4" v-model="ng_stock_rf_pitch">
          <v-radio label="10 mm." value="10 mm."></v-radio>
          <v-radio label="20 mm." value="20 mm."></v-radio>
          <v-radio label="30 mm." value="30 mm."></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">17) Tracebility Input</div>
        <v-radio-group inline class="gap-4" v-model="trace_rf_inp_std">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <div class="mt-3 font-semibold">18) Unloader Input</div>
        <v-radio-group inline class="gap-4" v-model="unloader_rf_std">
          <v-radio label="Use" value="Use"></v-radio>
          <v-radio label="Not Use" value="Not Use"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="4" v-if="unloader_rf_std_use">
        <div class="mt-3 font-semibold">Pitch Setting</div>
        <v-radio-group inline class="gap-4" v-model="unloader_rf_pitch">
          <v-radio label="10 mm." value="10 mm."></v-radio>
          <v-radio label="20 mm." value="20 mm."></v-radio>
          <v-radio label="30 mm." value="30 mm."></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row no-gutters class="justify-center mt-10">
      <div>
        <v-btn width="200" rounded="md" type="submit">
          <template #prepend>
            <v-icon class="mdi mdi-content-save"></v-icon>
          </template>
          <h1 class="text-md">Save</h1>
        </v-btn>
      </div>
    </v-row>
  </v-form>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const props = defineProps({
  id: String,
  won_chn: String,
  model_chn: String,
  empno: String,

  cus: String,
  prgnm: String,
  pcbno: String,
});

/**
 * TODO: สร้างตัวแปรรับค่าจาก Input Form
 */

const load_inp = ref<string>("");
const pitch_rf = ref<string>("");
const cln_inp = ref<string>("");
const func = ref<string[]>([]);
const stack_inp = ref<string>("");
const trace_inp = ref<string>("");
const etc_details = ref<string>("");
const printer_std = ref<string>("");
const printer_prg = ref<string>(props.pcbno || "");
// const metalmask = ref<string>("");
const ref_mm = ref<string>("");
const squee = ref<string>("");
const sup_rf = ref<string>("");
const solder = ref<string>("");
const glue_rf = ref<string>("");
const glue_prg = ref<string>(props.prgnm || "");
const glue_num = ref<string>("");
const solder_use = ref<string>("");
const solder_prgnm = ref<string>(props.pcbno || "");
const mounter_ref_inp = ref<string>("");
const prg_ref_mount1 = ref<string>(props.prgnm || "");
const noz_ref_mount1 = ref<string>("");
const sup_ref_mount1 = ref<string>("");
const mounter2_ref_inp = ref<string>("");
const prg_ref_mount2 = ref<string>(props.prgnm || "");
const noz_ref_mount2 = ref<string>("");
const sup_ref_mount2 = ref<string>("");
const mounter3_ref_inp = ref<string>("");
const prg_ref_mount3 = ref<string>(props.prgnm || "");
const noz_ref_mount3 = ref<string>("");
const sup_ref_mount3 = ref<string>("");
const mounter4_ref_inp = ref<string>("");
const prg_ref_mount4 = ref<string>(props.prgnm || "");
const noz_ref_mount4 = ref<string>("");
const sup_ref_mount4 = ref<string>("");
const mounter_ref_inps = ref<string>("");
const prg_ref_inspct = ref<string>(props.prgnm || "");
const reflow_rf_std = ref<string>("");
const prg_rf_reflow = ref<string>(props.pcbno || "");
const oxygen_rf_reflow_std = ref<string>("");
const oxyen_rf_use = ref<string>("Value");
const sup_rf_reflow_std = ref<string>("");
const cooling_rf_std = ref<string>("");
const auto_rf_inps = ref<string>("");
const prg_rf_auto = ref<string>(props.prgnm || "");
const ng_stock_rf_std = ref<string>("");
const ng_stock_rf_pitch = ref<string>("");
const trace_rf_inp_std = ref<string>("");
const unloader_rf_std = ref<string>("");
const unloader_rf_pitch = ref<string>("");
const temp_rf_top_ch1 = ref<number>(0);
const temp_rf_top_ch2 = ref<number>(0);
const temp_rf_top_ch3 = ref<number>(0);
const temp_rf_top_ch4 = ref<number>(0);
const temp_rf_top_ch5 = ref<number>(0);
const temp_rf_top_ch6 = ref<number>(0);
const temp_rf_top_ch7 = ref<number>(0);
const temp_rf_top_ch8 = ref<number>(0);
const temp_rf_top_ch9 = ref<number>(0);
const temp_rf_top_ch10 = ref<number>(0);
const temp_rf_btm_ch1 = ref<number>(0);
const temp_rf_btm_ch2 = ref<number>(0);
const temp_rf_btm_ch3 = ref<number>(0);
const temp_rf_btm_ch4 = ref<number>(0);
const temp_rf_btm_ch5 = ref<number>(0);
const temp_rf_btm_ch6 = ref<number>(0);
const temp_rf_btm_ch7 = ref<number>(0);
const temp_rf_btm_ch8 = ref<number>(0);
const temp_rf_btm_ch9 = ref<number>(0);
const temp_rf_btm_ch10 = ref<number>(0);
const temp_rf_conveyor_speed = ref<number>(0);
const db_glue = ref<string[]>([]);
const db_solder = ref<string[]>([]);
const start_machine = ref<string>("");
const finish_machine = ref<string>("");
const funcPCB = ref<{ name: string }[]>([
  { name: "Air blow" },
  { name: "Sticky" },
  { name: "Lonizer" },
]);

//image insert
const isMobileOrTablet = ref(false);

onMounted(() => {
  const ua = navigator.userAgent.toLowerCase();

  isMobileOrTablet.value = /android|iphone|ipad|ipod|tablet|mobile/.test(ua);
});

const fileInput = ref<HTMLInputElement | null>(null);
const pin_image = ref<File | null>(null);
const isCameraOpen = ref(false);
const video = ref<HTMLVideoElement | null>(null);
const imagePreview = ref<string | null>(null);
const stream = ref<MediaStream | null>(null);

/**
 * TODO: ฟังก์ชันสำหรับจัดการรูปภาพ
 */
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  // เช็คประเภทไฟล์
  const validImageTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/webp",
  ];

  if (!validImageTypes.includes(file.type)) {
    alert("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
    target.value = "";
    return;
  }

  // สร้างชื่อไฟล์สุ่ม .jpg
  const randomName = `${Math.random().toString(36).substring(2, 9)}.jpg`;
  const renamedFile = new File([file], randomName, { type: "image/jpeg" });

  pin_image.value = renamedFile;
  imagePreview.value = URL.createObjectURL(renamedFile);
};
const startCamera = async () => {
  try {
    isCameraOpen.value = true;

    stream.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });

    if (video.value) {
      video.value.srcObject = stream.value;
    }
  } catch (err) {
    alert("เปิดกล้องไม่ได้");
  }
};

const stopCamera = () => {
  stream.value?.getTracks().forEach((t) => t.stop());
  isCameraOpen.value = false;
};

const takePhoto = () => {
  if (!video.value) return;

  const canvas = document.createElement("canvas");
  canvas.width = video.value.videoWidth;
  canvas.height = video.value.videoHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.drawImage(video.value, 0, 0);

  canvas.toBlob((blob) => {
    if (!blob) return;

    const file = new File([blob], `${Date.now()}.jpg`, {
      type: "image/jpeg",
    });

    pin_image.value = file;
    imagePreview.value = URL.createObjectURL(blob);

    stopCamera();
  }, "image/jpeg");
};

const retake = () => {
  imagePreview.value = null;
  startCamera();
};

const confirmImage = () => {
  console.log(pin_image.value);
};

watch(
  () => props.pcbno,
  (newValue) => {
    printer_prg.value = newValue || "";
    prg_rf_reflow.value = newValue || "";
  },
);

watch(
  () => props.prgnm,
  (newValue) => {
    glue_prg.value = newValue || "";
    solder_prgnm.value = newValue || "";
    prg_ref_mount1.value = newValue || "";
    prg_ref_mount2.value = newValue || "";
    prg_ref_mount3.value = newValue || "";
    prg_ref_mount4.value = newValue || "";
    prg_ref_inspct.value = newValue || "";

    prg_rf_auto.value = newValue || "";
  },
);

/**
 * TODO: สร้างตัวแปรรับค่าสถานะการเลือกให้แสดงข้อมูล input
 */
const pitch_std = computed<boolean>(() => load_inp.value === "Use");
const func_std = computed<boolean>(() => cln_inp.value === "Use");
const etc_std = computed(() => func.value.includes("etc"));
const printer_std_use = computed<boolean>(() => printer_std.value === "Use");
// const open_ref_use = computed<boolean>(() => metalmask.value === "REF");
const glue_ref_use = computed<boolean>(() => glue_rf.value === "Use");
const solder_user_std = computed<boolean>(() => solder_use.value === "Use");
const mounter_ref_use = computed<boolean>(
  () => mounter_ref_inp.value === "Use",
);
const mounter2_ref_use = computed<boolean>(
  () => mounter2_ref_inp.value === "Use",
);
const mounter3_ref_use = computed<boolean>(
  () => mounter3_ref_inp.value === "Use",
);
const mounter4_ref_use = computed<boolean>(
  () => mounter4_ref_inp.value === "Use",
);
const mounter_ref_inps_std = computed<boolean>(
  () => mounter_ref_inps.value === "Use",
);
const reflow_rf_use_std = computed<boolean>(
  () => reflow_rf_std.value === "Use",
);
const oxygen_rf_std_use = computed<boolean>(
  () => oxygen_rf_reflow_std.value === "Use",
);
const auto_rf_inps_std = computed<boolean>(() => auto_rf_inps.value === "Use");
const ng_stock_rf_std_use = computed<boolean>(
  () => ng_stock_rf_std.value === "Use",
);
const unloader_rf_std_use = computed<boolean>(
  () => unloader_rf_std.value === "Use",
);
const empno = computed<string>(() => props.empno || "");

const id_rf = ref<string>("");
console.log("id_rf:", props.id);

// คำนวณค่าผลต่าง
const diff = computed(() => temp_rf_top_ch1.value - temp_rf_btm_ch1.value);
const diff2 = computed(() => temp_rf_top_ch2.value - temp_rf_btm_ch2.value);
const diff3 = computed(() => temp_rf_top_ch3.value - temp_rf_btm_ch3.value);
const diff4 = computed(() => temp_rf_top_ch4.value - temp_rf_btm_ch4.value);
const diff5 = computed(() => temp_rf_top_ch5.value - temp_rf_btm_ch5.value);
const diff6 = computed(() => temp_rf_top_ch6.value - temp_rf_btm_ch6.value);
const diff7 = computed(() => temp_rf_top_ch7.value - temp_rf_btm_ch7.value);
const diff8 = computed(() => temp_rf_top_ch8.value - temp_rf_btm_ch8.value);
const diff9 = computed(() => temp_rf_top_ch9.value - temp_rf_btm_ch9.value);
const diff10 = computed(() => temp_rf_top_ch10.value - temp_rf_btm_ch10.value);

// เช็คสีตามเงื่อนไข
const diffColorch1 = computed(() =>
  diff.value > 5 ? "text-red-500" : "text-green-500",
);

const diffColorch2 = computed(() =>
  diff2.value > 5 ? "text-red-500" : "text-green-500",
);

const diffColorch3 = computed(() =>
  diff3.value > 5 ? "text-red-500" : "text-green-500",
);

const diffColorch4 = computed(() =>
  diff4.value > 5 ? "text-red-500" : "text-green-500",
);

const diffColorch5 = computed(() =>
  diff5.value > 5 ? "text-red-500" : "text-green-500",
);

const diffColorch6 = computed(() =>
  diff6.value > 5 ? "text-red-500" : "text-green-500",
);

const diffColorch7 = computed(() =>
  diff7.value > 5 ? "text-red-500" : "text-green-500",
);

const diffColorch8 = computed(() =>
  diff8.value > 5 ? "text-red-500" : "text-green-500",
);

const diffColorch9 = computed(() =>
  diff9.value > 5 ? "text-red-500" : "text-green-500",
);

const diffColorch10 = computed(() =>
  diff10.value > 5 ? "text-red-500" : "text-green-500",
);

//resize image function
const resizeImage = (file: File, maxWidth: number, maxHeight: number) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => resolve(blob), file.type, 0.5);
    };
  });
};

/**
 * TODO: สร้างฟังก์ชันส่งข้อมูลไปยัง api
 */
const handleRFSubmit = async () => {
  try {
    const formData = new FormData();
    // formData.append("pin_image", pin_image.value);
    if (pin_image.value) {
      const resizedPinImage = await resizeImage(pin_image.value, 800, 600);
      formData.append("pin_image", resizedPinImage as Blob);
    }
    formData.append("load_inp", load_inp.value);
    formData.append("pitch_rf", pitch_rf.value);
    formData.append("cln_inp", cln_inp.value);
    formData.append("func", func.value);
    formData.append("stack_inp", stack_inp.value);
    formData.append("trace_inp", trace_inp.value);
    formData.append("etc_details", etc_details.value);
    formData.append("printer_std", printer_std.value);
    formData.append("printer_prg", printer_prg.value);
    // metalmask: metalmask.value,
    formData.append("ref_mm", ref_mm.value);
    formData.append("squee", squee.value);
    formData.append("sup_rf", sup_rf.value);
    formData.append("solder", solder.value);
    formData.append("glue_rf", glue_rf.value);
    formData.append("glue_prg", glue_prg.value);
    formData.append("glue_num", glue_num.value);
    formData.append("solder_use", solder_use.value);
    formData.append("solder_prgnm", solder_prgnm.value);
    formData.append("mounter_ref_inp", mounter_ref_inp.value);
    formData.append("prg_ref_mount1", prg_ref_mount1.value);
    formData.append("noz_ref_mount1", noz_ref_mount1.value);
    formData.append("sup_ref_mount1", sup_ref_mount1.value);
    formData.append("mounter2_ref_inp", mounter2_ref_inp.value);
    formData.append("prg_ref_mount2", prg_ref_mount2.value);
    formData.append("noz_ref_mount2", noz_ref_mount2.value);
    formData.append("sup_ref_mount2", sup_ref_mount2.value);
    formData.append("mounter3_ref_inp", mounter3_ref_inp.value);
    formData.append("prg_ref_mount3", prg_ref_mount3.value);
    formData.append("noz_ref_mount3", noz_ref_mount3.value);
    formData.append("sup_ref_mount3", sup_ref_mount3.value);
    formData.append("mounter4_ref_inp", mounter4_ref_inp.value);
    formData.append("prg_ref_mount4", prg_ref_mount4.value);
    formData.append("noz_ref_mount4", noz_ref_mount4.value);
    formData.append("sup_ref_mount4", sup_ref_mount4.value);
    formData.append("mounter_ref_inps", mounter_ref_inps.value);
    formData.append("prg_ref_inspct", prg_ref_inspct.value);
    formData.append("reflow_rf_std", reflow_rf_std.value);
    formData.append("prg_rf_reflow", prg_rf_reflow.value);
    formData.append("oxygen_rf_reflow_std", oxygen_rf_reflow_std.value);
    formData.append("oxyen_rf_use", oxyen_rf_use.value);
    formData.append("sup_rf_reflow_std", sup_rf_reflow_std.value);
    formData.append("cooling_rf_std", cooling_rf_std.value);
    formData.append("auto_rf_inps", auto_rf_inps.value);
    formData.append("prg_rf_auto", prg_rf_auto.value);
    formData.append("ng_stock_rf_std", ng_stock_rf_std.value);
    formData.append("ng_stock_rf_pitch", ng_stock_rf_pitch.value);
    formData.append("trace_rf_inp_std", trace_rf_inp_std.value);
    formData.append("unloader_rf_std", unloader_rf_std.value);
    formData.append("unloader_rf_pitch", unloader_rf_pitch.value);
    formData.append("temp_rf_top_ch1", temp_rf_top_ch1.value);
    formData.append("temp_rf_top_ch2", temp_rf_top_ch2.value);
    formData.append("temp_rf_top_ch3", temp_rf_top_ch3.value);
    formData.append("temp_rf_top_ch4", temp_rf_top_ch4.value);
    formData.append("temp_rf_top_ch5", temp_rf_top_ch5.value);
    formData.append("temp_rf_top_ch6", temp_rf_top_ch6.value);
    formData.append("temp_rf_top_ch7", temp_rf_top_ch7.value);
    formData.append("temp_rf_top_ch8", temp_rf_top_ch8.value);
    formData.append("temp_rf_top_ch9", temp_rf_top_ch9.value);
    formData.append("temp_rf_top_ch10", temp_rf_top_ch10.value);
    formData.append("temp_rf_btm_ch1", temp_rf_btm_ch1.value);
    formData.append("temp_rf_btm_ch2", temp_rf_btm_ch2.value);
    formData.append("temp_rf_btm_ch3", temp_rf_btm_ch3.value);
    formData.append("temp_rf_btm_ch4", temp_rf_btm_ch4.value);
    formData.append("temp_rf_btm_ch5", temp_rf_btm_ch5.value);
    formData.append("temp_rf_btm_ch6", temp_rf_btm_ch6.value);
    formData.append("temp_rf_btm_ch7", temp_rf_btm_ch7.value);
    formData.append("temp_rf_btm_ch8", temp_rf_btm_ch8.value);
    formData.append("temp_rf_btm_ch9", temp_rf_btm_ch9.value);
    formData.append("temp_rf_btm_ch10", temp_rf_btm_ch10.value);
    formData.append("temp_rf_conveyor_speed", temp_rf_conveyor_speed.value);
    formData.append("start_machine", start_machine.value);
    formData.append("finish_machine", finish_machine.value);
    formData.append("empno", empno.value);
    formData.append("id", props.id);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const res = await axios.post(
      "http://172.22.64.11/49_modelchange/49_mdlchn_api/api/rfinsert",
      formData,
    );
    console.log(res.data);
    if (res.data.status === true) {
      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        location.reload();
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// const obj_rj = ref<any>({});
// watch(
//   () => props.obj_rj,
//   (newVal) => {
//     obj_rj.value = newVal;
//     console.log(obj_rj.value);
//   }
// );

// const showUpdate = () => {
//   load_inp.value = obj_rj.value.TEC_RFHREC_LOADINP || "";
//   pitch_rf.value = obj_rj.value.TEC_RFHREC_LOADINPPITCH || "";
//   cln_inp.value = obj_rj.value.TEC_RFHREC_PCBCLEAN || "";
//   func.value = obj_rj.value.TEC_RFHREC_PCBCLNFUNC || "";
//   stack_inp.value = obj_rj.value.TEC_RFHREC_STACK || "";
//   trace_inp.value = obj_rj.value.TEC_RFHREC_TRACEINP || "";
//   etc_details.value = obj_rj.value.TEC_RFHREC_PCBLNETC || "";
//   printer_std.value = obj_rj.value.TEC_RFHREC_PRINT || "";
//   printer_prg.value = obj_rj.value.TEC_RFHREC_PRINTPROG || "";
//   metalmask.value = obj_rj.value.TEC_RFHREC_PRINTMM || "";
//   ref_mm.value = obj_rj.value.TEC_RFHREC_PRINTMMREF || "";
//   squee.value = obj_rj.value.TEC_RFHREC_PRINTSQUE || "";
//   sup_rf.value = obj_rj.value.TEC_RFHREC_PRINTSUPT || "";
//   solder.value = obj_rj.value.TEC_RFHREC_PRINTSOLDER || "";
//   glue_rf.value = obj_rj.value.TEC_RFHREC_GLUE || "";
//   glue_prg.value = obj_rj.value.TEC_RFHREC_GLUEPROG || "";
//   glue_num.value = obj_rj.value.TEC_RFHREC_GLUENUM || "";
//   solder_use.value = obj_rj.value.TEC_RFHREC_SOLDERINSP || "";
//   solder_prgnm.value = obj_rj.value.TEC_RFHREC_SOLDERPROG || "";
//   mounter_ref_inp.value = obj_rj.value.TEC_RFHREC_MOUNTER_REF_INP || "";
//   prg_ref_mount1.value = obj_rj.value.TEC_RFHREC_PRG_REF_MOUNT1 || "";
//   noz_ref_mount1.value = obj_rj.value.TEC_RFHREC_NOZ_REF_MOUNT1 || "";
//   sup_ref_mount1.value = obj_rj.value.TEC_RFHREC_SUP_REF_MOUNT1 || "";
//   mounter2_ref_inp.value = obj_rj.value.TEC_RFHREC_MOUNTER2_REF_INP || "";
//   prg_ref_mount2.value = obj_rj.value.TEC_RFHREC_PRG_REF_MOUNT2 || "";
//   noz_ref_mount2.value = obj_rj.value.TEC_RFHREC_NOZ_REF_MOUNT2 || "";
//   sup_ref_mount2.value = obj_rj.value.TEC_RFHREC_SUP_REF_MOUNT2 || "";
//   mounter3_ref_inp.value = obj_rj.value.TEC_RFHREC_MOUNTER3_REF_INP || "";
//   prg_ref_mount3.value = obj_rj.value.TEC_RFHREC_PRG_REF_MOUNT3 || "";
//   noz_ref_mount3.value = obj_rj.value.TEC_RFHREC_NOZ_REF_MOUNT3 || "";
//   sup_ref_mount3.value = obj_rj.value.TEC_RFHREC_SUP_REF_MOUNT3 || "";
//   mounter4_ref_inp.value = obj_rj.value.TEC_RFHREC_MOUNTER4_REF_INP || "";
//   prg_ref_mount4.value = obj_rj.value.TEC_RFHREC_PRG_REF_MOUNT4 || "";
//   noz_ref_mount4.value = obj_rj.value.TEC_RFHREC_NOZ_REF_MOUNT4 || "";
//   sup_ref_mount4.value = obj_rj.value.TEC_RFHREC_SUP_REF_MOUNT4 || "";
//   mounter_ref_inps.value = obj_rj.value.TEC_RFHREC_MOUNTER_REF_INPS || "";
//   prg_ref_inspct.value = obj_rj.value.TEC_RFHREC_PRG_REF_INSPCT || "";
//   reflow_rf_std.value = obj_rj.value.TEC_RFHREC_REFLOW_RF_STD || "";
//   prg_rf_reflow.value = obj_rj.value.TEC_RFHREC_PRG_RF_REFLOW || "";
//   oxygen_rf_reflow_std.value =
//     obj_rj.value.TEC_RFHREC_OXYGEN_RF_REFLOW_STD || "";
//   oxyen_rf_use.value = obj_rj.value.TEC_RFHREC_OXYEN_RF_USE || "";
//   sup_rf_reflow_std.value = obj_rj.value.TEC_RFHREC_SUP_RF_REFLOW_STD || "";
//   cooling_rf_std.value = obj_rj.value.TEC_RFHREC_COOLING_RF_STD || "";
//   auto_rf_inps.value = obj_rj.value.TEC_RFHREC_AUTO_RF_INPS || "";
//   prg_rf_auto.value = obj_rj.value.TEC_RFHREC_PRG_RF_AUTO || "";
//   ng_stock_rf_std.value = obj_rj.value.TEC_RFHREC_NG_STOCK_RF_STD || "";
//   ng_stock_rf_pitch.value = obj_rj.value.TEC_RFHREC_NG_STOCK_RF_PITCH || "";
//   trace_rf_inp_std.value = obj_rj.value.TEC_RFHREC_TRACE_RF_INP_STD || "";
//   unloader_rf_std.value = obj_rj.value.TEC_RFHREC_UNLOADER_RF_STD || "";
//   unloader_rf_pitch.value = obj_rj.value.TEC_RFHREC_UNLOADER_RF_PITCH || "";
//   temp_rf_top_ch1.value = obj_rj.value.TEC_RFHREC_TEMP_RF_TOP_CH1 || "";
//   temp_rf_top_ch2.value = obj_rj.value.TEC_RFHREC_TEMP_RF_TOP_CH2 || "";
//   temp_rf_top_ch3.value = obj_rj.value.TEC_RFHREC_TEMP_RF_TOP_CH3 || "";
//   temp_rf_top_ch4.value = obj_rj.value.TEC_RFHREC_TEMP_RF_TOP_CH4 || "";
//   temp_rf_top_ch5.value = obj_rj.value.TEC_RFHREC_TEMP_RF_TOP_CH5 || "";
//   temp_rf_top_ch6.value = obj_rj.value.TEC_RFHREC_TEMP_RF_TOP_CH6 || "";
//   temp_rf_top_ch7.value = obj_rj.value.TEC_RFHREC_TEMP_RF_TOP_CH7 || "";
//   temp_rf_top_ch8.value = obj_rj.value.TEC_RFHREC_TEMP_RF_TOP_CH8 || "";
//   temp_rf_top_ch9.value = obj_rj.value.TEC_RFHREC_TEMP_RF_TOP_CH9 || "";
//   temp_rf_top_ch10.value = obj_rj.value.TEC_RFHREC_TEMP_RF_TOP_CH10 || "";
//   temp_rf_btm_ch1.value = obj_rj.value.TEC_RFHREC_TEMP_RF_BTM_CH1 || "";
//   temp_rf_btm_ch2.value = obj_rj.value.TEC_RFHREC_TEMP_RF_BTM_CH2 || "";
//   temp_rf_btm_ch3.value = obj_rj.value.TEC_RFHREC_TEMP_RF_BTM_CH3 || "";
//   temp_rf_btm_ch4.value = obj_rj.value.TEC_RFHREC_TEMP_RF_BTM_CH4 || "";
//   temp_rf_btm_ch5.value = obj_rj.value.TEC_RFHREC_TEMP_RF_BTM_CH5 || "";
//   temp_rf_btm_ch6.value = obj_rj.value.TEC_RFHREC_TEMP_RF_BTM_CH6 || "";
//   temp_rf_btm_ch7.value = obj_rj.value.TEC_RFHREC_TEMP_RF_BTM_CH7 || "";
//   temp_rf_btm_ch8.value = obj_rj.value.TEC_RFHREC_TEMP_RF_BTM_CH8 || "";
//   temp_rf_btm_ch9.value = obj_rj.value.TEC_RFHREC_TEMP_RF_BTM_CH9 || "";
//   temp_rf_btm_ch10.value = obj_rj.value.TEC_RFHREC_TEMP_RF_BTM_CH10 || "";
//   temp_rf_conveyor_speed.value =
//     obj_rj.value.TEC_RFHREC_TEMP_RF_CONVEYOR_SPEED || "";
// };

const fetchDB = async () => {
  const res = await axios.get(
    "http://172.22.64.11/49_modelchange/49_mdlchn_api/api/get/settings",
  );
  db_glue.value = res.data.glue;
  db_solder.value = res.data.solder;
  console.log(res.data.glue);
  console.log(res.data.solder);
};
onMounted(() => {
  fetchDB();
});
// watch(
//   () => props.obj_rj,
//   (val) => {
//     if (val) {
//       obj_rj.value = val;
//       showUpdate();
//     }
//   },
//   { immediate: true }
// );
</script>
