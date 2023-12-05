<script>
export default {
  name: "TomTomMap",
  props: {
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
  created() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    initMap() {
      const mapContainer = this.$refs.mapContainer;
      if (!mapContainer) return;

      const map = tt.map({
        key: "0rTLHeC6A9vwS6HFMZTV1xEuCF56dTTt",
        container: mapContainer,
        style: "tomtom://vector/1/basic-main",
        // Utilizza le coordinate ricevute come props
        center: [this.longitude, this.latitude],
        zoom: 10,
      });
    },
  },
};
</script>

<template>
  <div ref="mapContainer" style="width: 100%; height: 400px"></div>
</template>

<style scoped lang="scss"></style>
