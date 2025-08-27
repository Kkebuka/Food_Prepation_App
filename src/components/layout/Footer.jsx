import React from "react";

export default function(){
    return (
        <>
         <footer className="border-t border-gray-200/70 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M7.5 2.25a.75.75 0 0 1 .75.75v6a2.25 2.25 0 1 1-4.5 0v-6a.75.75 0 0 1 1.5 0v2.25h.75V3a.75.75 0 0 1 1.5 0v2.25h.75V3a.75.75 0 0 1 .75-.75ZM14.25 2.25a.75.75 0 0 0-.75.75v6.75a3.75 3.75 0 0 0 3.75 3.75h.75V3a.75.75 0 0 0-1.5 0v3h-1.5V3a.75.75 0 0 0-1.5 0v3h-1.5V3a.75.75 0 0 0-.75-.75Z"/>
                </svg>
              </span>
              <span className="text-sm font-semibold text-gray-900">Foodcourt</span>
            </div>
            <p className="text-center text-xs text-gray-500 sm:text-sm">© {new Date().getFullYear()} Foodcourt. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </>
    )
}