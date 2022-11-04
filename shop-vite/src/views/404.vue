<template>
  <div>
    <el-result icon="warning" title="Warning Tip" sub-title="Please follow the instructions">
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">Back</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
