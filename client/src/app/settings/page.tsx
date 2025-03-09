"use client";
import Header from "@/app/(components)/Header";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setDarkMode } from "@/state";
type UserSettings = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const mockSettinngs: UserSettings[] = [
  { label: "Username", value: "sengvon", type: "text" },
  { label: "Eamil", value: "sengvonsv@gmail.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark Mode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
];

const Settings = () => {
  const [userSettigs, setUserSettings] =
    useState<UserSettings[]>(mockSettinngs);
  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettigs];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };

  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const toggleDarkMode = () => {
    dispatch(setDarkMode(!isDarkMode));
  };

  return (
    <div className="w-full">
      <Header name="Setting" />
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full  bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Setting
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettigs.map((setting, index) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="py-2 px-4">{setting.label}</td>
                <td className="py-2 px-4">
                  {setting.type === "toggle" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={() => handleToggleChange(index)}
                      />
                      {setting.type === "toggle" && setting.label === "Dark Mode"? (
                        <div
                          onClick={toggleDarkMode}
                          className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                             transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                             after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                             after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                             peer-checked:bg-blue-600"
                        ></div>
                      ) : (
                        <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                           transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                           after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                           after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                           peer-checked:bg-blue-600"
                      ></div>
                      )}
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettigs];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
