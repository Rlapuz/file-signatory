"use client";

import { RxCross2 } from "react-icons/rx";

import * as LR from "@uploadcare/blocks";

LR.registerBlocks(LR);

export const UploadCare = () => {
  return (
    <>
      <div class="flex items-center justify-center p-12">
        <div class="mx-auto w-full max-w-[550px] bg-white">
          <form
            class="py-6 px-9"
            method="POST">
            <div class="mb-5">
              <label
                for="email"
                class="mb-3 block text-base font-medium text-[#07074D]">
                Send files to this Signatory:
              </label>
              <input
                type="text"
                name="text"
                id="text"
                placeholder="message"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div class="mb-6 pt-4">
              <label class="mb-5 block text-xl font-semibold text-[#07074D]">
                Upload File
              </label>

              <div class="mb-8">
                <label
                  for="file"
                  class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                  <div>
                    <lr-config
                      ctx-name="my-uploader"
                      pubkey="742e3481c4552a368c72"
                      maxLocalFileSizeBytes={10000000}
                      multipleMax={10}
                      imgOnly={true}
                      sourceList="local, url, camera, gdrive, gphotos"></lr-config>

                    <lr-file-uploader-regular
                      css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.25.0/web/lr-file-uploader-regular.min.css"
                      ctx-name="my-uploader"
                      class="my-config"></lr-file-uploader-regular>
                  </div>
                </label>
              </div>

              <div class="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                <div class="flex items-center justify-between">
                  <span class="truncate pr-3 text-base font-medium text-[#07074D]">
                    banner-design.png
                  </span>
                  <button class="text-[#07074D]">
                    <RxCross2 size={23} />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Send File
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
