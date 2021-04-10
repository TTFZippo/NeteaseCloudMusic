<!-- 专辑（碟） -->
<template>
  <div class="wrapper">
    {{albumData.name}}
    {{albumData.picUrl}}
  </div>
</template>

<script>
export default {
  props: {
    albumData: {
      type: Object
    }
  },
  data () {
    return {
    }
  }
}

</script>

<style scoped>
.wrapper {
  width: 200px;
  height: 200px;
  border: 1px solid red;
}
</style>
