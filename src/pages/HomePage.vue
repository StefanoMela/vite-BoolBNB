<script>
import HouseFeaturedList from "../components/houses/HouseFeaturedList.vue";

export default {


  components: { HouseFeaturedList },
};
</script>

<template>
  <h1>Case in evidenza</h1>
  <HouseFeaturedList />
</template>

<style lang="scss" scoped>
h1{
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
</style>