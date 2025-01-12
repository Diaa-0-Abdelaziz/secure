<template>
  <div>
    <input
      id="search-place"
      class="controls"
      type="text"
      :placeholder="$t('Search Places')"
      v-if="!disabled"
    />
    <GmapMap id="map-picker" ref="Map" v-if="defaultLocation.latitude"
             :center="{lat:defaultLocation.latitude, lng: defaultLocation.longitude}"
             :zoom="11"
             @click="clickedPosition"
             :options="{
               zoomControl: true,
               mapTypeControl: false,
               scaleControl: false,
               streetViewControl: false,
               rotateControl: false,
               fullscreenControl: true,
               disableDefaultUI: false
           }">
      <GmapMarker ref="myMarker"
                  v-if="model.latitude || location.latitude"
                  :draggable="!this.disabled"
                  @drag="draggedPosition"
                  :position="google && new google.maps.LatLng( location.latitude, location.longitude)"/>
    </GmapMap>

  </div>
</template>

<script>
import {gmapApi} from 'vue2-google-maps';
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE} from "../../../config/config";

const {__LocationOption} = require("../../../util/options");

export default {
  name: "google-map",
  computed: {
    google: gmapApi
  },
  props:{
    model: {
      type: Object,
      default() {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    },
    setDefault: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      defaultLocation: {
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE
      },
      location: JSON.parse(JSON.stringify(__LocationOption))
    }
  },
  mounted() {
    if(this.setDefault){
      this.location.latitude = this.defaultLocation.latitude;
      this.location.longitude = this.defaultLocation.longitude;
    }
    if (this.model.latitude) {
      this.location.latitude = this.model.latitude;
      this.location.longitude = this.model.longitude;
      this.$refs.Map.$mapPromise.then((map) => {
        setTimeout(() => {
          map.panTo({lat: this.model.latitude, lng: this.model.longitude});
        }, 400)
      });
    }
    if (!this.disabled) {
        this.addSearchToMap({lat: this.location.latitude, lng: this.location.longitude})
    }

  },
  methods: {
    addSearchToMap(location) {
      this.$refs.Map.$mapPromise.then((map) => {
        if(location.lat)
          map.panTo(location)
        const input = document.getElementById("search-place");
        setTimeout(()=> input.style.display = 'initial' , 1000);
        const searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // Bias the SearchBox results towards current map's viewport.
        map.addListener("bounds_changed", () => {
          searchBox.setBounds(map.getBounds());
        });
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener("places_changed", () => {
          const places = searchBox.getPlaces();
          if (places.length === 0)  return;

          // For each place, get the icon, name and location.
          const bounds = new google.maps.LatLngBounds();

          places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
              console.log("Returned place contains no geometry");
              return;
            }

            this.location.latitude = place.geometry.location.lat();
            this.location.longitude = place.geometry.location.lng();

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
          this.$emit('input', this.location)
        });

      })
    },
    clickedPosition(pos) {
      if (this.disabled) return;
      this.location.latitude = pos.latLng.lat();
      this.location.longitude = pos.latLng.lng();
      this.$emit('input', this.location)
    },
    draggedPosition(pos) {
      this.location.latitude = pos.latLng.lat();
      this.location.longitude = pos.latLng.lng();
      this.$emit('input', this.location);
    }
  },
  watch: {
    model: {
      deep: true,
      handler(newVal) {
        if (newVal.latitude) {
          this.location = newVal;
          this.$refs.Map.$mapPromise.then((map) => {
            map.panTo({lat: newVal.latitude, lng: newVal.longitude})
          })
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
