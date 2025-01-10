<!-- frontend/src/views/admin/DashboardView.vue -->

<script setup>
import { lua, to_luastring, to_jsstring } from "fengari-web";
import axios from "axios";
import { ref, onMounted } from "vue";

const stats = ref({
  totalBookings: 0,
  pendingBookings: 0,
  completedBookings: 0,
});

onMounted(async () => {
  try {
    const { data: bookings } = await axios.get("/api/admin/stats/bookings");

    const luaScript = `
      local bookings = ...
      local summary = {
        total = 0,
        pending = 0,
        completed = 0
      }

      for _, booking in ipairs(bookings) do
        summary.total = summary.total + 1
        if booking.status == "pending" then
          summary.pending = summary.pending + 1
        elseif booking.status == "completed" then
          summary.completed = summary.completed + 1
        end
      end

      return summary
    `;

    const luaState = lua.luaL_newstate();
    lua.luaL_openlibs(luaState);

    lua.luaL_loadstring(luaState, to_luastring(luaScript));
    lua.lua_pushvalue(luaState, bookings);
    lua.lua_call(luaState, 1, 1);

    const result = to_jsstring(lua.lua_tojsstring(luaState, -1));
    lua.lua_close(luaState);

    stats.value = JSON.parse(result);
  } catch (error) {
    console.error("Failed to load bookings data:", error);
  }
});
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-gray-500 text-sm font-medium">Total Bookings</h3>
        <p class="text-3xl font-bold text-gray-900">
          {{ stats.totalBookings }}
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-gray-500 text-sm font-medium">Pending Bookings</h3>
        <p class="text-3xl font-bold text-gray-900">
          {{ stats.pendingBookings }}
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-gray-500 text-sm font-medium">Completed Bookings</h3>
        <p class="text-3xl font-bold text-gray-900">
          {{ stats.completedBookings }}
        </p>
      </div>
    </div>
  </div>
</template>
